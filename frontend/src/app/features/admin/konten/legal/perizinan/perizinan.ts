import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface DokumenPerizinan {
  id: number;
  namaIzin: string;
  nomorRegistrasi: string;
  instansiPenerbit: string;
  tanggalTerbit: string;
  masaBerlaku: string;
  status: 'Aktif / Sah' | 'Masa Perpanjangan' | 'Nonaktif / Kedaluwarsa' | 'Menunggu Verifikasi';
  penanggungJawab: string;
  keterangan: string;
  fileDoc: string;
  icon: string;
  viewsCount: number;
  updatedAt: string;
}

@Component({
  selector: 'app-perizinan',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './perizinan.html',
  styleUrl: './perizinan.css',
})
export class Perizinan {
  searchQuery = signal<string>('');
  filterStatus = signal<string>('Semua');

  showModal = signal<boolean>(false);
  isEditing = signal<boolean>(false);
  formSubmitted = signal<boolean>(false);

  showDeleteModal = signal<boolean>(false);
  selectedIzin = signal<DokumenPerizinan | null>(null);
  deleteMode = signal<'deactivate' | 'permanent'>('deactivate');
  isProcessing = signal<boolean>(false);

  toastMessage = signal<string>('');
  toastType = signal<'success' | 'info' | 'danger'>('success');
  private toastTimer?: any;

  currentIzin: DokumenPerizinan = {
    id: 0,
    namaIzin: '',
    nomorRegistrasi: '',
    instansiPenerbit: 'Kementerian Kesehatan RI',
    tanggalTerbit: '',
    masaBerlaku: '5 Tahun',
    status: 'Aktif / Sah',
    penanggungJawab: '',
    keterangan: '',
    fileDoc: 'DOKUMEN_IZIN_BARU.pdf',
    icon: 'ri-government-line',
    viewsCount: 0,
    updatedAt: 'Hari Ini'
  };

  perizinanList = signal<DokumenPerizinan[]>([
    {
      id: 1,
      namaIzin: 'Tanda Daftar Penyelenggara Sistem Elektronik Farmasi (PSEF)',
      nomorRegistrasi: 'PSEF-912026/KMK/IV/2026',
      instansiPenerbit: 'Kementerian Kesehatan Republik Indonesia',
      tanggalTerbit: '14 April 2024',
      masaBerlaku: '14 April 2029 (5 Tahun)',
      status: 'Aktif / Sah',
      penanggungJawab: 'apt. Rina Meilani, S.Farm (APJ Utama)',
      keterangan: 'Legalitas resmi penyelenggaraan tebus resep digital dan pelayanan informasi obat jarak jauh sesuai Permenkes No. 14/2021.',
      fileDoc: 'SK_PSEF_KEMENKES_2026.pdf',
      icon: 'ri-government-line',
      viewsCount: 31200,
      updatedAt: '14 Apr 2026'
    },
    {
      id: 2,
      namaIzin: 'Tanda Daftar Penyelenggara Sistem Elektronik (PSE Kominfo)',
      nomorRegistrasi: '009823.01/DJAI.PSE/03/2026',
      instansiPenerbit: 'Kementerian Komunikasi dan Informatika RI (OSS)',
      tanggalTerbit: '20 Maret 2024',
      masaBerlaku: 'Berlaku Selama Operasional',
      status: 'Aktif / Sah',
      penanggungJawab: 'PT Medika Farmasi Sejahtera PSEF',
      keterangan: 'Pendaftaran portal transaksi dan sistem telemedisin pada repositori Penyelenggara Sistem Elektronik Domestik.',
      fileDoc: 'TDPSE_KOMINFO_009823.pdf',
      icon: 'ri-global-line',
      viewsCount: 24500,
      updatedAt: '20 Mar 2026'
    },
    {
      id: 3,
      namaIzin: 'Surat Izin Apotek (SIA) Fasilitas Induk PSEF',
      nomorRegistrasi: '503/SIA-PSEF/DPMPTSP/JKT/2026',
      instansiPenerbit: 'Dinas Penanaman Modal & Pelayanan Terpadu Satu Pintu',
      tanggalTerbit: '10 Januari 2025',
      masaBerlaku: '10 Januari 2030',
      status: 'Aktif / Sah',
      penanggungJawab: 'apt. Ahmad Fauzi, S.Farm (Kepala Hub)',
      keterangan: 'Izin sarana apotek fisik fulfillment penyimpanan dan peracikan sediaan farmasi dengan standar GPP (Good Pharmacy Practice).',
      fileDoc: 'SIA_INDUK_DPMPTSP_2026.pdf',
      icon: 'ri-hospital-line',
      viewsCount: 19800,
      updatedAt: '10 Jan 2026'
    },
    {
      id: 4,
      namaIzin: 'SIPA Apoteker Penanggung Jawab (APJ)',
      nomorRegistrasi: '19910412/SIPA-31.74/2026/2.1',
      instansiPenerbit: 'Suku Dinas Kesehatan Kota & IAI',
      tanggalTerbit: '05 Februari 2026',
      masaBerlaku: '05 Februari 2031 (Mengikuti STRA)',
      status: 'Aktif / Sah',
      penanggungJawab: 'apt. Rina Meilani, S.Farm (STRA: 19910412/STRA-IAI/2015)',
      keterangan: 'Surat Izin Praktik Apoteker resmi penanggung jawab telaah resep dan farmakoterapi pasien PSEF.',
      fileDoc: 'SIPA_APJ_RINA_2026.pdf',
      icon: 'ri-nurse-line',
      viewsCount: 16400,
      updatedAt: '05 Feb 2026'
    },
    {
      id: 5,
      namaIzin: 'Sertifikasi Keamanan Informasi ISO/IEC 27001:2022',
      nomorRegistrasi: 'ISO-27001-MED-88912/IDN',
      instansiPenerbit: 'Badan Sertifikasi Manajemen Internasional (Akreditasi KAN)',
      tanggalTerbit: '18 Mei 2025',
      masaBerlaku: '18 Mei 2028',
      status: 'Aktif / Sah',
      penanggungJawab: 'Chief Information Security Officer (CISO)',
      keterangan: 'Audit pemenuhan standar kontrol keamanan data rekam medis elektronik dan enkripsi data transaksi farmasi.',
      fileDoc: 'CERT_ISO_27001_MEDIKA.pdf',
      icon: 'ri-shield-check-line',
      viewsCount: 22100,
      updatedAt: '18 Mei 2026'
    }
  ]);

  get kpiStats() {
    const list = this.perizinanList();
    const activeCount = list.filter(i => i.status === 'Aktif / Sah').length;
    const totalViews = list.reduce((acc, i) => acc + (i.viewsCount || 0), 0);

    return [
      { label: 'Total Dokumen Izin', value: `${list.length} Izin`, icon: 'ri-file-text-line', color: 'blue' },
      { label: 'Izin Sah & Berlaku', value: `${activeCount} Dokumen`, icon: 'ri-checkbox-circle-line', color: 'emerald' },
      { label: 'Inspeksi & Kunjungan Publik', value: totalViews.toLocaleString('id-ID') + 'x', icon: 'ri-eye-line', color: 'indigo' },
      { label: 'Tingkat Kepatuhan Regulasi', value: '100% Sah', icon: 'ri-verified-badge-line', color: 'amber' }
    ];
  }

  filteredPerizinanList(): DokumenPerizinan[] {
    const q = this.searchQuery().toLowerCase().trim();
    const st = this.filterStatus();

    return this.perizinanList().filter(item => {
      const matchQ = !q ||
        item.namaIzin.toLowerCase().includes(q) ||
        item.nomorRegistrasi.toLowerCase().includes(q) ||
        item.instansiPenerbit.toLowerCase().includes(q) ||
        item.penanggungJawab.toLowerCase().includes(q);
      const matchSt = st === 'Semua' || item.status === st;
      return matchQ && matchSt;
    });
  }

  getEmptyIzin(): DokumenPerizinan {
    return {
      id: 0,
      namaIzin: '',
      nomorRegistrasi: '',
      instansiPenerbit: 'Kementerian Kesehatan RI',
      tanggalTerbit: '',
      masaBerlaku: '5 Tahun',
      status: 'Aktif / Sah',
      penanggungJawab: '',
      keterangan: '',
      fileDoc: 'DOKUMEN_IZIN_BARU.pdf',
      icon: 'ri-government-line',
      viewsCount: 0,
      updatedAt: 'Hari Ini'
    };
  }

  openAddModal() {
    this.isEditing.set(false);
    this.formSubmitted.set(false);
    this.currentIzin = this.getEmptyIzin();
    this.showModal.set(true);
  }

  openEditModal(item: DokumenPerizinan) {
    this.isEditing.set(true);
    this.formSubmitted.set(false);
    this.currentIzin = { ...item };
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
  }

  saveIzin() {
    this.formSubmitted.set(true);
    if (!this.currentIzin.namaIzin.trim() || !this.currentIzin.nomorRegistrasi.trim()) {
      return;
    }

    if (this.isEditing()) {
      this.perizinanList.update(list =>
        list.map(i => i.id === this.currentIzin.id ? {
          ...this.currentIzin,
          namaIzin: this.currentIzin.namaIzin.trim(),
          nomorRegistrasi: this.currentIzin.nomorRegistrasi.trim(),
          updatedAt: 'Hari Ini'
        } : i)
      );
      this.showToast(`Dokumen perizinan "${this.currentIzin.namaIzin.substring(0, 32)}..." berhasil diperbarui.`, 'success');
    } else {
      const newId = Math.max(0, ...this.perizinanList().map(i => i.id)) + 1;
      const newItem: DokumenPerizinan = {
        ...this.currentIzin,
        id: newId,
        namaIzin: this.currentIzin.namaIzin.trim(),
        nomorRegistrasi: this.currentIzin.nomorRegistrasi.trim(),
        viewsCount: 0,
        updatedAt: 'Hari Ini'
      };
      this.perizinanList.update(list => [newItem, ...list]);
      this.showToast(`Dokumen izin baru "${newItem.namaIzin.substring(0, 32)}..." berhasil ditambahkan.`, 'success');
    }
    this.closeModal();
  }

  toggleStatus(item: DokumenPerizinan) {
    const isNowActive = item.status !== 'Aktif / Sah';
    const s = isNowActive ? 'Aktif / Sah' : 'Nonaktif / Kedaluwarsa';
    this.perizinanList.update(list =>
      list.map(i => i.id === item.id ? { ...i, status: s } : i)
    );
    this.showToast(
      `Status dokumen izin diubah menjadi ${s}.`,
      isNowActive ? 'success' : 'info'
    );
  }

  openDeleteModal(item: DokumenPerizinan) {
    this.selectedIzin.set(item);
    this.deleteMode.set('deactivate');
    this.showDeleteModal.set(true);
  }

  closeDeleteModal() {
    this.showDeleteModal.set(false);
    this.selectedIzin.set(null);
  }

  setDeleteMode(mode: 'deactivate' | 'permanent') {
    this.deleteMode.set(mode);
  }

  confirmDeleteAction() {
    const target = this.selectedIzin();
    if (!target) return;

    this.isProcessing.set(true);

    setTimeout(() => {
      if (this.deleteMode() === 'deactivate') {
        this.perizinanList.update(list =>
          list.map(i => i.id === target.id ? { ...i, status: 'Nonaktif / Kedaluwarsa' } : i)
        );
        this.showToast(
          `Dokumen izin "${target.nomorRegistrasi}" berhasil dinonaktifkan. Catatan riwayat lisensi tetap aman.`,
          'info'
        );
      } else {
        this.perizinanList.update(list => list.filter(i => i.id !== target.id));
        this.showToast(
          `Dokumen izin "${target.nomorRegistrasi}" telah dihapus permanen dari sistem.`,
          'danger'
        );
      }

      this.isProcessing.set(false);
      this.closeDeleteModal();
    }, 350);
  }

  downloadDoc(file: string) {
    this.showToast(`Mengunduh berkas legalitas resmi: ${file}`, 'info');
  }

  showToast(msg: string, type: 'success' | 'info' | 'danger' = 'success'): void {
    if (this.toastTimer) clearTimeout(this.toastTimer);
    this.toastMessage.set(msg);
    this.toastType.set(type);
    this.toastTimer = setTimeout(() => {
      this.toastMessage.set('');
    }, 4000);
  }
}
