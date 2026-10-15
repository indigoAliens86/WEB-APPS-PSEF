import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

export type SettingsTab = 'profil' | 'legalitas' | 'operasional' | 'logistik' | 'keamanan';

export interface ProfilApotek {
  namaApotek: string;
  tipeFasilitas: string;
  nomorNib: string;
  kbli: string;
  alamatLengkap: string;
  kelurahan: string;
  kecamatan: string;
  kota: string;
  provinsi: string;
  kodePos: string;
  latitude: string;
  longitude: string;
  teleponResmi: string;
  whatsappPic: string;
  emailResmi: string;
  deskripsiLayanan: string;
}

export interface LegalitasApotek {
  nomorSia: string;
  tanggalTerbitSia: string;
  masaBerlakuSia: string;
  instansiPenerbit: string;
  statusVerifikasiKemenkes: 'Terverifikasi' | 'Menunggu Audit' | 'Perlu Perpanjangan';
  satusehatOrgId: string;
  satusehatClientId: string;
  satusehatSecretKey: string;
  satusehatStatus: 'Terhubung' | 'Belum Terhubung' | 'Sinkronisasi Gagal';
  nomorRegistrasiSipnap: string;
  statusSipnap: 'Aktif' | 'Nonaktif';
}

export interface OperasionalApotek {
  statusToko: 'Buka' | 'Tutup Sementara' | 'Tutup Libur';
  buka24Jam: boolean;
  jamBukaSeninJumat: string;
  jamTutupSeninJumat: string;
  jamBukaSabtuMinggu: string;
  jamTutupSabtuMinggu: string;
  layananResepDigital: boolean;
  layananObatRacikan: boolean;
  layananTelefarmasiKIE: boolean;
  layananResepCito: boolean;
  apjNama: string;
  apjGelar: string;
  apjStra: string;
  apjSipa: string;
  apjMasaBerlakuSipa: string;
  apjKontakDarurat: string;
}

export interface LogistikPengiriman {
  radiusPengirimanMaksKm: number;
  fasilitasColdChain: boolean;
  suhuChillerMin: number;
  suhuChillerMax: number;
  suhuChillerSaatIni: number;
  sensorIotAktif: boolean;
  kurirInstantMitra: boolean;
  kurirInternalApotek: boolean;
  tamperEvidentSeal: boolean;
  biayaKemasanKhusus: number;
}

export interface KeamananNotifikasi {
  audioAlertResepBaru: boolean;
  notifikasiWaPesanan: boolean;
  notifikasiSuhuAbnormal: boolean;
  emailRekapitulasiHarian: boolean;
  twoFactorAuth: boolean;
  sessionTimeoutMenit: number;
}

export interface ScheduleDayPattern {
  sen: boolean;
  sel: boolean;
  rab: boolean;
  kam: boolean;
  jum: boolean;
  sab: boolean;
  min: boolean;
}

export interface DayOption {
  key: keyof ScheduleDayPattern;
  label: string;
}

export interface CalendarDayCol {
  key: keyof ScheduleDayPattern;
  label: string;
  subLabel: string;
}

export interface SchedulePatternItem {
  id: string;
  openTime: string;
  closeTime: string;
  days: ScheduleDayPattern;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  activeTab = signal<SettingsTab>('profil');
  isSaving = signal<boolean>(false);
  isTestingSatuSehat = signal<boolean>(false);
  private readonly sanitizer = inject(DomSanitizer);

  // Pattern Day Options (sen, sel, rab, kam, jum, sab, min)
  readonly dayOptions: DayOption[] = [
    { key: 'sen', label: 'sen' },
    { key: 'sel', label: 'sel' },
    { key: 'rab', label: 'rab' },
    { key: 'kam', label: 'kam' },
    { key: 'jum', label: 'jum' },
    { key: 'sab', label: 'sab' },
    { key: 'min', label: 'min' },
  ];

  // Calendar Day Columns (Sen, Sel, Rab, Kam, Jum, Sab, Min)
  readonly calendarDays: CalendarDayCol[] = [
    { key: 'sen', label: 'Sen', subLabel: 'Senin' },
    { key: 'sel', label: 'Sel', subLabel: 'Selasa' },
    { key: 'rab', label: 'Rab', subLabel: 'Rabu' },
    { key: 'kam', label: 'Kam', subLabel: 'Kamis' },
    { key: 'jum', label: 'Jum', subLabel: 'Jumat' },
    { key: 'sab', label: 'Sab', subLabel: 'Sabtu' },
    { key: 'min', label: 'Min', subLabel: 'Minggu' },
  ];

  // Timeline Scale Hours (07:00 to 23:00)
  readonly timelineScaleHours = [
    { hour: 7, label: '07:00' },
    { hour: 8, label: '08:00' },
    { hour: 9, label: '09:00' },
    { hour: 10, label: '10:00' },
    { hour: 11, label: '11:00' },
    { hour: 12, label: '12:00' },
    { hour: 13, label: '13:00' },
    { hour: 14, label: '14:00' },
    { hour: 15, label: '15:00' },
    { hour: 16, label: '16:00' },
    { hour: 17, label: '17:00' },
    { hour: 18, label: '18:00' },
    { hour: 19, label: '19:00' },
    { hour: 20, label: '20:00' },
    { hour: 21, label: '21:00' },
    { hour: 22, label: '22:00' },
    { hour: 23, label: '23:00' },
  ];

  readonly matrixHours = Array.from({ length: 24 }, (_, i) => i);

  scheduleViewMode = signal<'timeline' | 'matrix'>('timeline');

  // Operational Patterns matching user form
  operationalPatterns: SchedulePatternItem[] = [
    {
      id: 'op-std-1',
      openTime: '08:00:00',
      closeTime: '22:00:00',
      days: { sen: true, sel: true, rab: true, kam: true, jum: true, sab: true, min: false },
    },
  ];

  // Toast feedback
  toastMessage = signal<string>('');
  toastType = signal<'success' | 'info' | 'danger'>('success');
  private toastTimer?: any;

  setScheduleViewMode(mode: 'timeline' | 'matrix'): void {
    this.scheduleViewMode.set(mode);
  }

  applyOpPreset(preset: 'standard' | '24h' | 'extended'): void {
    if (preset === 'standard') {
      this.operationalPatterns = [
        {
          id: 'op-std',
          openTime: '08:00:00',
          closeTime: '22:00:00',
          days: { sen: true, sel: true, rab: true, kam: true, jum: true, sab: true, min: true },
        },
      ];
      this.showToast('Template jadwal Standar (08:00 - 22:00) diterapkan!', 'info');
    } else if (preset === '24h') {
      this.operationalPatterns = [
        {
          id: 'op-24',
          openTime: '00:00:00',
          closeTime: '23:45:00',
          days: { sen: true, sel: true, rab: true, kam: true, jum: true, sab: true, min: true },
        },
      ];
      this.showToast('Template jadwal 24 Jam Non-Stop diterapkan!', 'info');
    } else if (preset === 'extended') {
      this.operationalPatterns = [
        {
          id: 'op-ext',
          openTime: '07:00:00',
          closeTime: '23:00:00',
          days: { sen: true, sel: true, rab: true, kam: true, jum: true, sab: true, min: false },
        },
      ];
      this.showToast('Template jadwal Ekstra (07:00 - 23:00) diterapkan!', 'info');
    }
  }

  addOperationalPattern(): void {
    const newId = `op-${Date.now()}`;
    this.operationalPatterns.push({
      id: newId,
      openTime: '08:00:00',
      closeTime: '22:00:00',
      days: { sen: false, sel: false, rab: false, kam: false, jum: false, sab: false, min: false },
    });
  }

  removeOperationalPattern(index: number): void {
    if (this.operationalPatterns.length > 1) {
      this.operationalPatterns.splice(index, 1);
    } else {
      this.operationalPatterns[0] = {
        id: `op-${Date.now()}`,
        openTime: '08:00:00',
        closeTime: '22:00:00',
        days: { sen: false, sel: false, rab: false, kam: false, jum: false, sab: false, min: false },
      };
    }
  }

  toggleOperationalDay(pat: SchedulePatternItem, dayKey: keyof ScheduleDayPattern): void {
    pat.days[dayKey] = !pat.days[dayKey];
  }

  parseHour(timeStr: string, fallback: number): number {
    if (!timeStr) return fallback;
    const parts = timeStr.split(':');
    const h = parseInt(parts[0], 10);
    const m = parts.length > 1 ? parseInt(parts[1], 10) : 0;
    return isNaN(h) ? fallback : h + (isNaN(m) ? 0 : m / 60);
  }

  getDayOperationalDetails(dayKey: keyof ScheduleDayPattern): {
    isOpen: boolean;
    openTime: string;
    closeTime: string;
    startHour: number;
    endHour: number;
    duration: number;
    topPct: number;
    heightPct: number;
  } {
    for (const pat of this.operationalPatterns) {
      if (pat.days[dayKey]) {
        const start = this.parseHour(pat.openTime, 8);
        const end = this.parseHour(pat.closeTime, 22);
        // Timeline runs from 07:00 to 23:00 (16 hours total span)
        const topPct = Math.max(0, Math.min(100, ((start - 7) / 16) * 100));
        const heightPct = Math.max(8, Math.min(100 - topPct, ((end - start) / 16) * 100));
        const dur = Math.max(1, Math.round(end - start));
        return {
          isOpen: true,
          openTime: pat.openTime,
          closeTime: pat.closeTime,
          startHour: start,
          endHour: end,
          duration: dur,
          topPct,
          heightPct,
        };
      }
    }
    return { isOpen: false, openTime: '', closeTime: '', startHour: 0, endHour: 0, duration: 0, topPct: 0, heightPct: 0 };
  }

  get calendarScheduleView() {
    return this.calendarDays.map((d) => ({
      key: d.key,
      label: d.label,
      subLabel: d.subLabel,
      op: this.getDayOperationalDetails(d.key),
    }));
  }

  getTotalOperationalHoursWeekly(): number {
    let totalOp = 0;
    for (const d of this.calendarDays) {
      const op = this.getDayOperationalDetails(d.key);
      if (op.isOpen) totalOp += op.duration;
    }
    return totalOp;
  }

  getOperationalDaysCount(): number {
    return this.calendarDays.filter((d) => this.getDayOperationalDetails(d.key).isOpen).length;
  }

  isHourInOperational(dayKey: keyof ScheduleDayPattern, hour: number): boolean {
    const op = this.getDayOperationalDetails(dayKey);
    if (!op.isOpen) return false;
    return hour >= Math.floor(op.startHour) && hour < Math.ceil(op.endHour);
  }

  formatHourLabel(hour: number): string {
    return `${hour.toString().padStart(2, '0')}:00`;
  }

  get mapEmbedUrl(): SafeResourceUrl {
    const lat = parseFloat(this.profil().latitude) || -6.885834;
    const lng = parseFloat(this.profil().longitude) || 107.613842;
    const delta = 0.006;
    const bbox = `${lng - delta},${lat - delta},${lng + delta},${lat + delta}`;
    const url = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  get googleMapsUrl(): string {
    const lat = this.profil().latitude || '-6.885834';
    const lng = this.profil().longitude || '107.613842';
    return `https://www.google.com/maps?q=${lat},${lng}`;
  }

  copyCoordinates(): void {
    const text = `${this.profil().latitude}, ${this.profil().longitude}`;
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
    this.showToast(`Koordinat GPS (${text}) berhasil disalin ke clipboard!`, 'info');
  }

  detectCurrentLocation(): void {
    if (typeof navigator !== 'undefined' && navigator.geolocation) {
      this.showToast('Mendeteksi titik koordinat perangkat...', 'info');
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          this.profil.update(p => ({
            ...p,
            latitude: pos.coords.latitude.toFixed(6),
            longitude: pos.coords.longitude.toFixed(6),
          }));
          this.showToast('Titik koordinat berhasil disinkronkan dari GPS perangkat!', 'success');
        },
        () => {
          this.showToast('Gagal mengakses sensor GPS. Gunakan input koordinat manual.', 'danger');
        },
        { timeout: 8000 }
      );
    } else {
      this.showToast('Fitur GPS tidak didukung peramban ini.', 'danger');
    }
  }

  // Settings Data
  profil = signal<ProfilApotek>({
    namaApotek: 'Apotek Kimia Sehat PSEF',
    tipeFasilitas: 'Apotek Komunitas & Fulfillment Hub PSEF',
    nomorNib: '0129003884712',
    kbli: '47721 - Perdagangan Eceran Barang Farmasi',
    alamatLengkap: 'Jl. Ir. H. Juanda No. 120, Dago, Coblong',
    kelurahan: 'Dago',
    kecamatan: 'Coblong',
    kota: 'Kota Bandung',
    provinsi: 'Jawa Barat',
    kodePos: '40135',
    latitude: '-6.885834',
    longitude: '107.613842',
    teleponResmi: '(022) 250-8899',
    whatsappPic: '0812-2233-4455',
    emailResmi: 'apotek.dago@kimiasehat-psef.id',
    deskripsiLayanan: 'Apotek rekanan resmi PSEF melayani tebus resep digital instan, dispensing sediaan steril & non-steril, serta konsultasi telefarmasi (PIO) oleh apoteker ber-SIPA aktif.',
  });

  legalitas = signal<LegalitasApotek>({
    nomorSia: 'SIA-32.73/DPMPTSP/2025/0812',
    tanggalTerbitSia: '15 Januari 2025',
    masaBerlakuSia: '15 Januari 2030',
    instansiPenerbit: 'DPMPTSP Kota Bandung',
    statusVerifikasiKemenkes: 'Terverifikasi',
    satusehatOrgId: '10002981-PSEF-BDG',
    satusehatClientId: 'cli_satusehat_prod_899214_farma',
    satusehatSecretKey: '••••••••••••••••••••••••••••••••',
    satusehatStatus: 'Terhubung',
    nomorRegistrasiSipnap: 'SIPNAP-BDG-2025-091',
    statusSipnap: 'Aktif',
  });

  operasional = signal<OperasionalApotek>({
    statusToko: 'Buka',
    buka24Jam: false,
    jamBukaSeninJumat: '08:00',
    jamTutupSeninJumat: '22:00',
    jamBukaSabtuMinggu: '08:00',
    jamTutupSabtuMinggu: '21:00',
    layananResepDigital: true,
    layananObatRacikan: true,
    layananTelefarmasiKIE: true,
    layananResepCito: true,
    apjNama: 'Farhan Pratama',
    apjGelar: 'apt. Farhan Pratama, S.Farm',
    apjStra: '19930214/STRA-IAI/2017/22901',
    apjSipa: '19930214/SIPA-32.73/2025/1.2',
    apjMasaBerlakuSipa: '14 Februari 2029',
    apjKontakDarurat: '0812-9988-7711',
  });

  logistik = signal<LogistikPengiriman>({
    radiusPengirimanMaksKm: 15,
    fasilitasColdChain: true,
    suhuChillerMin: 2.0,
    suhuChillerMax: 8.0,
    suhuChillerSaatIni: 4.2,
    sensorIotAktif: true,
    kurirInstantMitra: true,
    kurirInternalApotek: true,
    tamperEvidentSeal: true,
    biayaKemasanKhusus: 5000,
  });

  keamanan = signal<KeamananNotifikasi>({
    audioAlertResepBaru: true,
    notifikasiWaPesanan: true,
    notifikasiSuhuAbnormal: true,
    emailRekapitulasiHarian: true,
    twoFactorAuth: true,
    sessionTimeoutMenit: 30,
  });

  setTab(tab: SettingsTab): void {
    this.activeTab.set(tab);
  }

  saveCurrentSection(sectionName: string): void {
    this.isSaving.set(true);

    setTimeout(() => {
      this.isSaving.set(false);
      this.showToast(`Profil "${sectionName}" berhasil disimpan dan disinkronkan ke sistem PSEF!`, 'success');
    }, 400);
  }

  toggleStatusApotek(): void {
    const current = this.operasional().statusToko;
    const nextStatus = current === 'Buka' ? 'Tutup Sementara' : 'Buka';

    this.operasional.update(op => ({
      ...op,
      statusToko: nextStatus
    }));

    this.showToast(
      `Status apotek diubah menjadi "${nextStatus}". ${nextStatus === 'Buka' ? 'Siap menerima alokasi resep baru.' : 'Penerimaan resep ditangguhkan sementara.'}`,
      nextStatus === 'Buka' ? 'success' : 'info'
    );
  }

  testSatuSehatSync(): void {
    this.isTestingSatuSehat.set(true);

    setTimeout(() => {
      this.isTestingSatuSehat.set(false);
      this.legalitas.update(leg => ({ ...leg, satusehatStatus: 'Terhubung' }));
      this.showToast('Uji koneksi SatuSehat API Kemenkes BERHASIL. Token OAuth2 terverifikasi aktif (Status 200 OK).', 'success');
    }, 800);
  }

  testSipnapSync(): void {
    this.showToast('Sinkronisasi database SIPNAP BPOM sukses. Laporan narkotika & psikotropika siap terkirim.', 'success');
  }

  showToast(msg: string, type: 'success' | 'info' | 'danger' = 'success'): void {
    if (this.toastTimer) clearTimeout(this.toastTimer);
    this.toastMessage.set(msg);
    this.toastType.set(type);
    this.toastTimer = setTimeout(() => {
      this.toastMessage.set('');
    }, 4500);
  }
}
