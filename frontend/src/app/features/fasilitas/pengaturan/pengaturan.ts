import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

export type PengaturanTab = 'staf' | 'etiket' | 'layanan';

export interface StafMember {
  id: string;
  nama: string;
  email: string;
  phone: string;
  role: 'APJ' | 'Aping' | 'TTK' | 'Kasir' | 'Kurir';
  roleLabel: string;
  sipStr?: string;
  status: 'Aktif' | 'Cuti' | 'Nonaktif';
  terakhirAktif: string;
  avatarColor: string;
}

export interface RolePermission {
  roleKey: 'APJ' | 'Aping' | 'TTK' | 'Kasir' | 'Kurir';
  roleName: string;
  roleBadgeClass: string;
  description: string;
  canTelaahKlinis: boolean;
  canDigitalSign: boolean;
  canDispensingRacikan: boolean;
  canChatTelefarmasi: boolean;
  canManageInventory: boolean;
  canManagePOS: boolean;
  canExportReport: boolean;
}

export interface EtiketConfig {
  namaApotekHeader: string;
  subHeaderSia: string;
  namaApj: string;
  sipaApj: string;
  teleponApotek: string;
  ukuranKertas: 'thermal-70x50' | 'thermal-50x30' | 'a4-grid';
  showQrCodeSatuSehat: boolean;
  showTandaTanganDigital: boolean;
  showBeyondUseDate: boolean;
  showInstruksiKocok: boolean;
  catatanKakiDefault: string;
  tipePreview: 'oral' | 'luar';
  // Sample patient data for live preview
  previewPasien: string;
  previewUsia: string;
  previewNoResep: string;
  previewTanggal: string;
  previewObat: string;
  previewAturanPakai: string;
  previewJumlah: string;
  previewWaktuMinum: string;
  previewCatatanKhusus: string;
}

export interface NotifikasiConfig {
  waStatusResep: boolean;
  waEstimasiPengiriman: boolean;
  waReminderMinumObat: boolean;
  waTemplatePesanan: string;
  audioAlertResepBaru: boolean;
  audioVolume: number;
  emailDailyDigest: boolean;
  emailStokKritis: boolean;
  emailPenerima: string;
  webhookUrl: string;
  webhookAktif: boolean;
}

export interface LayananItem {
  id: string;
  nama: string;
  kategori: 'resep' | 'konsultasi' | 'dispensing' | 'logistik' | 'otc';
  deskripsi: string;
  icon: string;
  aktif: boolean;
  biayaTambahan: number;
  slaEstimasi: string;
  tag: string;
  tagClass: string;
}

export interface SlaConfig {
  waktuTelaahResepMenit: number;
  waktuPenyiapanObatJadiMenit: number;
  waktuPeracikanPuyerSalepMenit: number;
  radiusMaksimalPengirimanKm: number;
  jamCutoffPengiriman: string;
  autoCancelUnpaidMinutes: number;
  modeJedaOperasional: boolean;
  alasanJeda: string;
}

@Component({
  selector: 'app-pengaturan',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './pengaturan.html',
  styleUrl: './pengaturan.css',
})
export class Pengaturan {
  private readonly router = inject(Router);

  // Active Tab
  activeTab = signal<PengaturanTab>('staf');

  // Saving state & toast feedback
  isSaving = signal<boolean>(false);
  toastMessage = signal<string>('');
  toastType = signal<'success' | 'info' | 'warning' | 'danger'>('success');
  private toastTimer?: any;

  // Staf filter & search
  stafFilterRole = signal<string>('all');
  stafSearchQuery = signal<string>('');

  // Modal Tambah Staf
  showModalStaf = signal<boolean>(false);
  modalStafForm = signal<{
    nama: string;
    email: string;
    phone: string;
    role: StafMember['role'];
    sipStr: string;
    status: StafMember['status'];
  }>({
    nama: '',
    email: '',
    phone: '',
    role: 'TTK',
    sipStr: '',
    status: 'Aktif',
  });

  // Modal Edit Hak Akses
  showModalHakAkses = signal<boolean>(false);
  selectedRoleForEdit = signal<RolePermission | null>(null);

  // 1. DATA STAF APOTEK
  stafList = signal<StafMember[]>([
    {
      id: 'STF-001',
      nama: 'apt. Farhan Pratama, S.Farm',
      email: 'farhan.pratama@kimiasehat-psef.id',
      phone: '0812-2233-4455',
      role: 'APJ',
      roleLabel: 'Apoteker Penanggung Jawab',
      sipStr: '19930214/SIPA-32.73/2025/1.2',
      status: 'Aktif',
      terakhirAktif: 'Baru saja',
      avatarColor: '#059669',
    },
    {
      id: 'STF-002',
      nama: 'apt. Nabila Putri, M.Clin.Pharm',
      email: 'nabila.putri@kimiasehat-psef.id',
      phone: '0813-7788-9900',
      role: 'Aping',
      roleLabel: 'Apoteker Pendamping',
      sipStr: '19950820/SIPA-32.73/2024/2.1',
      status: 'Aktif',
      terakhirAktif: '10 menit lalu',
      avatarColor: '#0d9488',
    },
    {
      id: 'STF-003',
      nama: 'Rian Dwi Saputra, A.Md.Farm',
      email: 'rian.saputra@kimiasehat-psef.id',
      phone: '0857-1122-3344',
      role: 'TTK',
      roleLabel: 'Tenaga Teknis Kefarmasian',
      sipStr: 'STRTTK-32.73/2023/5541',
      status: 'Aktif',
      terakhirAktif: '35 menit lalu',
      avatarColor: '#0284c7',
    },
    {
      id: 'STF-004',
      nama: 'Siti Rahmawati',
      email: 'siti.kasir@kimiasehat-psef.id',
      phone: '0821-4455-6677',
      role: 'Kasir',
      roleLabel: 'Kasir & Front Office',
      sipStr: '-',
      status: 'Aktif',
      terakhirAktif: '1 jam lalu',
      avatarColor: '#d97706',
    },
    {
      id: 'STF-005',
      nama: 'Budi Santoso',
      email: 'budi.kurir@kimiasehat-psef.id',
      phone: '0878-9900-1122',
      role: 'Kurir',
      roleLabel: 'Kurir Farmasi Internal',
      sipStr: '-',
      status: 'Aktif',
      terakhirAktif: '2 jam lalu',
      avatarColor: '#7c3aed',
    },
  ]);

  // 1.B MATRIKS PERMISSION ROLE (RBAC)
  rolePermissions = signal<RolePermission[]>([
    {
      roleKey: 'APJ',
      roleName: 'Apoteker Penanggung Jawab (APJ)',
      roleBadgeClass: 'badge-emerald',
      description: 'Penanggung jawab legal apotek, otorisasi penuh telaah resep dan SIPNAP',
      canTelaahKlinis: true,
      canDigitalSign: true,
      canDispensingRacikan: true,
      canChatTelefarmasi: true,
      canManageInventory: true,
      canManagePOS: true,
      canExportReport: true,
    },
    {
      roleKey: 'Aping',
      roleName: 'Apoteker Pendamping (Aping)',
      roleBadgeClass: 'badge-teal',
      description: 'Membantu telaah resep shift, konseling telefarmasi, dan supervisi racikan',
      canTelaahKlinis: true,
      canDigitalSign: true,
      canDispensingRacikan: true,
      canChatTelefarmasi: true,
      canManageInventory: true,
      canManagePOS: false,
      canExportReport: false,
    },
    {
      roleKey: 'TTK',
      roleName: 'Tenaga Teknis Kefarmasian (TTK)',
      roleBadgeClass: 'badge-sky',
      description: 'Penyiapan obat, peracikan puyer/salep, cetak etiket, dan stock checking',
      canTelaahKlinis: false,
      canDigitalSign: false,
      canDispensingRacikan: true,
      canChatTelefarmasi: false,
      canManageInventory: true,
      canManagePOS: true,
      canExportReport: false,
    },
    {
      roleKey: 'Kasir',
      roleName: 'Kasir & Front Office',
      roleBadgeClass: 'badge-amber',
      description: 'Pelayanan kasir POS, verifikasi pembayaran tebus resep, dan cetak struk',
      canTelaahKlinis: false,
      canDigitalSign: false,
      canDispensingRacikan: false,
      canChatTelefarmasi: false,
      canManageInventory: false,
      canManagePOS: true,
      canExportReport: false,
    },
    {
      roleKey: 'Kurir',
      roleName: 'Kurir Farmasi Internal',
      roleBadgeClass: 'badge-purple',
      description: 'Pengantaran obat ke pasien, serah terima resep, dan cek suhu cold-box',
      canTelaahKlinis: false,
      canDigitalSign: false,
      canDispensingRacikan: false,
      canChatTelefarmasi: false,
      canManageInventory: false,
      canManagePOS: false,
      canExportReport: false,
    },
  ]);

  // 2. KUSTOMISASI ETIKET
  etiket = signal<EtiketConfig>({
    namaApotekHeader: 'APOTEK KIMIA SEHAT PSEF',
    subHeaderSia: 'SIA: 32.73/DPMPTSP/2025/0812 • Telp: (022) 250-8899',
    namaApj: 'apt. Farhan Pratama, S.Farm',
    sipaApj: 'SIPA: 19930214/SIPA-32.73/2025/1.2',
    teleponApotek: '(022) 250-8899',
    ukuranKertas: 'thermal-70x50',
    showQrCodeSatuSehat: true,
    showTandaTanganDigital: true,
    showBeyondUseDate: true,
    showInstruksiKocok: false,
    catatanKakiDefault: 'Jauhkan dari jangkauan anak-anak • Simpan di tempat sejuk & kering (15-25°C)',
    tipePreview: 'oral',
    // Mock Preview Data
    previewPasien: 'Tn. Hendra Gunawan (42 Th)',
    previewUsia: '42 Tahun',
    previewNoResep: 'RX-202503-0891',
    previewTanggal: '15/10/2026',
    previewObat: 'Amoxicillin Trihydrate 500 mg',
    previewAturanPakai: '3 x Sehari 1 Tablet',
    previewJumlah: '15 Tablet',
    previewWaktuMinum: 'Sesudah Makan (Tiap 8 Jam)',
    previewCatatanKhusus: 'HABISKAN SESUAI ANJURAN DOKTER',
  });

  // 2.B NOTIFIKASI GATEWAY
  notifikasi = signal<NotifikasiConfig>({
    waStatusResep: true,
    waEstimasiPengiriman: true,
    waReminderMinumObat: true,
    waTemplatePesanan: 'Halo {{nama_pasien}}, resep elektronik Anda {{nomor_resep}} telah selesai ditelaah dan diracik oleh {{nama_apotek}}. Obat saat ini dalam pengantaran kurir instan farmasi. Pantau live status di: {{link_tracking}}',
    audioAlertResepBaru: true,
    audioVolume: 80,
    emailDailyDigest: true,
    emailStokKritis: true,
    emailPenerima: 'apotek.dago@kimiasehat-psef.id',
    webhookUrl: 'https://api.kimiasehat-psef.id/webhooks/order-events',
    webhookAktif: true,
  });

  // 3. MANAJEMEN LAYANAN
  layananList = signal<LayananItem[]>([
    {
      id: 'LYN-001',
      nama: 'Tebus Resep Digital PSEF (Telemedisin)',
      kategori: 'resep',
      deskripsi: 'Penerimaan dan skrining otomatis e-resep dari platform telemedisin berizin Kemenkes RI.',
      icon: 'ri-file-list-3-line',
      aktif: true,
      biayaTambahan: 0,
      slaEstimasi: 'Max 15 Menit',
      tag: 'Wajib PSEF',
      tagClass: 'badge-emerald',
    },
    {
      id: 'LYN-002',
      nama: 'Konseling Telefarmasi (PIO) Live Chat & Video',
      kategori: 'konsultasi',
      deskripsi: 'Pelayanan Informasi Obat (PIO) secara interaktif oleh Apoteker ber-SIPA aktif.',
      icon: 'ri-customer-service-2-line',
      aktif: true,
      biayaTambahan: 0,
      slaEstimasi: 'Respons < 5 Menit',
      tag: 'Standar Kemenkes',
      tagClass: 'badge-teal',
    },
    {
      id: 'LYN-003',
      nama: 'Dispensing Sediaan Racikan (Non-Steril)',
      kategori: 'dispensing',
      deskripsi: 'Penyiapan obat racikan puyer anak, kapsul racik, salep, krim, dan larutan suspensi.',
      icon: 'ri-flask-line',
      aktif: true,
      biayaTambahan: 5000,
      slaEstimasi: 'Max 45 Menit',
      tag: 'Fasilitas Lab Racik',
      tagClass: 'badge-sky',
    },
    {
      id: 'LYN-004',
      nama: 'Layanan Resep Prioritas / Cito (< 30 Menit)',
      kategori: 'resep',
      deskripsi: 'Jalur prioritas dispensing darurat untuk resep penanganan darurat rawat jalan.',
      icon: 'ri-alarm-warning-line',
      aktif: true,
      biayaTambahan: 15000,
      slaEstimasi: 'Max 25 Menit',
      tag: 'Fast Track',
      tagClass: 'badge-amber',
    },
    {
      id: 'LYN-005',
      nama: 'Pengiriman Rantai Dingin (Cold-Chain 2-8°C)',
      kategori: 'logistik',
      deskripsi: 'Pengantaran vaksin, insulin, dan sediaan termolabil dengan coolbox ber-ice gel & segel tamper.',
      icon: 'ri-temp-cold-line',
      aktif: true,
      biayaTambahan: 7500,
      slaEstimasi: 'Max 90 Menit',
      tag: 'SOP CDOB BPOM',
      tagClass: 'badge-cyan',
    },
    {
      id: 'LYN-006',
      nama: 'Swamedikasi & Suplemen OTC (Bebas / Terbatas)',
      kategori: 'otc',
      deskripsi: 'Katalog belanja mandiri vitamin, suplemen, obat bebas, dan alat kesehatan rumah tangga.',
      icon: 'ri-capsule-line',
      aktif: true,
      biayaTambahan: 0,
      slaEstimasi: 'Max 10 Menit',
      tag: 'Katalog Toko',
      tagClass: 'badge-indigo',
    },
  ]);

  // 3.B SLA WAKTU PELAYANAN
  sla = signal<SlaConfig>({
    waktuTelaahResepMenit: 15,
    waktuPenyiapanObatJadiMenit: 20,
    waktuPeracikanPuyerSalepMenit: 45,
    radiusMaksimalPengirimanKm: 15,
    jamCutoffPengiriman: '21:00',
    autoCancelUnpaidMinutes: 60,
    modeJedaOperasional: false,
    alasanJeda: '',
  });

  // Filtered staff computed getter
  get filteredStafList(): StafMember[] {
    const roleFilter = this.stafFilterRole();
    const query = this.stafSearchQuery().toLowerCase().trim();

    return this.stafList().filter(s => {
      const matchRole = roleFilter === 'all' || s.role === roleFilter;
      const matchQuery = !query ||
        s.nama.toLowerCase().includes(query) ||
        s.email.toLowerCase().includes(query) ||
        (s.sipStr && s.sipStr.toLowerCase().includes(query));
      return matchRole && matchQuery;
    });
  }

  // Count active services
  get activeServicesCount(): number {
    return this.layananList().filter(l => l.aktif).length;
  }

  // Count active staff
  get activeStaffCount(): number {
    return this.stafList().filter(s => s.status === 'Aktif').length;
  }

  // --------------------------------------------------------------------------
  // ACTIONS & METHODS
  // --------------------------------------------------------------------------
  setTab(tab: PengaturanTab): void {
    this.activeTab.set(tab);
  }

  saveAllSettings(): void {
    this.isSaving.set(true);

    setTimeout(() => {
      this.isSaving.set(false);
      this.showToast('Semua konfigurasi pengaturan fasilitas berhasil disimpan dan disinkronkan!', 'success');
    }, 600);
  }

  // Staf Management
  openTambahStafModal(): void {
    this.modalStafForm.set({
      nama: '',
      email: '',
      phone: '',
      role: 'TTK',
      sipStr: '',
      status: 'Aktif',
    });
    this.showModalStaf.set(true);
  }

  closeTambahStafModal(): void {
    this.showModalStaf.set(false);
  }

  submitTambahStaf(): void {
    const f = this.modalStafForm();
    if (!f.nama.trim() || !f.email.trim()) {
      this.showToast('Nama staf dan email wajib diisi!', 'warning');
      return;
    }

    const roleLabels: Record<StafMember['role'], string> = {
      APJ: 'Apoteker Penanggung Jawab',
      Aping: 'Apoteker Pendamping',
      TTK: 'Tenaga Teknis Kefarmasian',
      Kasir: 'Kasir & Front Office',
      Kurir: 'Kurir Farmasi Internal',
    };

    const avatarColors: Record<StafMember['role'], string> = {
      APJ: '#059669',
      Aping: '#0d9488',
      TTK: '#0284c7',
      Kasir: '#d97706',
      Kurir: '#7c3aed',
    };

    const newId = `STF-00${this.stafList().length + 1}`;
    const newMember: StafMember = {
      id: newId,
      nama: f.nama.trim(),
      email: f.email.trim(),
      phone: f.phone.trim() || '-',
      role: f.role,
      roleLabel: roleLabels[f.role],
      sipStr: f.sipStr.trim() || '-',
      status: f.status,
      terakhirAktif: 'Baru ditambahkan',
      avatarColor: avatarColors[f.role],
    };

    this.stafList.update(list => [...list, newMember]);
    this.closeTambahStafModal();
    this.showToast(`Staf "${newMember.nama}" berhasil ditambahkan sebagai ${newMember.roleLabel}!`, 'success');
  }

  toggleStafStatus(staf: StafMember): void {
    const nextStatus: StafMember['status'] = staf.status === 'Aktif' ? 'Nonaktif' : 'Aktif';
    this.stafList.update(list =>
      list.map(s => (s.id === staf.id ? { ...s, status: nextStatus } : s))
    );
    this.showToast(`Status staf ${staf.nama} diubah menjadi "${nextStatus}".`, 'info');
  }

  deleteStaf(stafId: string, nama: string): void {
    if (confirm(`Apakah Anda yakin ingin menghapus akses staf "${nama}" dari sistem fasilitas?`)) {
      this.stafList.update(list => list.filter(s => s.id !== stafId));
      this.showToast(`Akses staf "${nama}" berhasil dicabut dari sistem.`, 'info');
    }
  }

  // Etiket Preview Switcher
  setTipeEtiket(tipe: 'oral' | 'luar'): void {
    this.etiket.update(e => ({
      ...e,
      tipePreview: tipe,
      previewObat: tipe === 'oral' ? 'Amoxicillin Trihydrate 500 mg' : 'Hydrocortisone Cream 1% Tube 5g',
      previewAturanPakai: tipe === 'oral' ? '3 x Sehari 1 Tablet' : '2 x Sehari Oleskan Tipis',
      previewJumlah: tipe === 'oral' ? '15 Tablet' : '1 Tube',
      previewWaktuMinum: tipe === 'oral' ? 'Sesudah Makan (Tiap 8 Jam)' : 'Pada Bagian Kulit yang Sakit',
      previewCatatanKhusus: tipe === 'oral' ? 'HABISKAN SESUAI ANJURAN DOKTER' : 'OBAT LUAR - TIDAK BOLEH DITELAN',
    }));
  }

  testPrintEtiket(): void {
    this.showToast('Perintah cetak thermal dikirim ke printer label: [Thermal Zebra ZD220 - 70x50mm] OK!', 'success');
  }

  testSendWaNotification(): void {
    this.showToast('Uji coba pengiriman pesan WhatsApp Gateway BERHASIL ke nomor uji (+62 812-2233-4455).', 'success');
  }

  playTestAudioAlert(): void {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.setValueAtTime(880.00, ctx.currentTime + 0.12); // A5
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } catch {
      // Audio fallback
    }
    this.showToast('Bel alarm audio pesanan darurat diuji (Volume: ' + this.notifikasi().audioVolume + '%).', 'info');
  }

  // Layanan Toggles
  toggleLayanan(layanan: LayananItem): void {
    layanan.aktif = !layanan.aktif;
    this.showToast(
      `Layanan "${layanan.nama}" ${layanan.aktif ? 'diaktifkan' : 'dinonaktifkan'}.`,
      layanan.aktif ? 'success' : 'warning'
    );
  }

  toggleModeJeda(): void {
    this.sla.update(s => {
      const nextMode = !s.modeJedaOperasional;
      return {
        ...s,
        modeJedaOperasional: nextMode,
        alasanJeda: nextMode ? 'Stok opname rutin & kalibrasi cold-chain' : '',
      };
    });

    if (this.sla().modeJedaOperasional) {
      this.showToast('Mode Jeda Darurat DIAKTIFKAN. Layanan apotek ditangguhkan sementara di portal publik PSEF.', 'warning');
    } else {
      this.showToast('Mode Jeda dinonaktifkan. Layanan apotek kembali NORMAL menerima pesanan resep.', 'success');
    }
  }

  showToast(msg: string, type: 'success' | 'info' | 'warning' | 'danger' = 'success'): void {
    if (this.toastTimer) clearTimeout(this.toastTimer);
    this.toastMessage.set(msg);
    this.toastType.set(type);
    this.toastTimer = setTimeout(() => {
      this.toastMessage.set('');
    }, 4500);
  }

  goToProfile(): void {
    void this.router.navigate(['/fasilitas/profile']);
  }
}
