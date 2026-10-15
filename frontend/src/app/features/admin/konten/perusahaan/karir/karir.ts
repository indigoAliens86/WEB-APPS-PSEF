import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface LowonganKarir {
  id: number;
  posisi: string;
  departemen: 'Pelayanan Farmasi' | 'Medis & Klinis' | 'Teknologi & IT' | 'Regulasi & Mutu' | 'Operasional';
  tipeKerja: 'Penuh Waktu' | 'Paruh Waktu' | 'Shift Apotek' | 'Remote';
  lokasi: string;
  gajiPerkiraan: string;
  batasLamaran: string;
  totalPelamar: number;
  deskripsi: string;
  persyaratan: string[];
  persyaratanInput?: string;
  status: 'Aktif' | 'Ditutup';
  updatedAt: string;
}

@Component({
  selector: 'app-karir',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './karir.html',
  styleUrl: './karir.css',
})
export class Karir {
  searchQuery = signal<string>('');
  filterDepartemen = signal<string>('Semua');
  filterStatus = signal<string>('Semua');

  showModal = signal<boolean>(false);
  isEditing = signal<boolean>(false);
  formSubmitted = signal<boolean>(false);

  showDeleteModal = signal<boolean>(false);
  selectedJob = signal<LowonganKarir | null>(null);
  deleteMode = signal<'deactivate' | 'permanent'>('deactivate');
  isProcessing = signal<boolean>(false);

  toastMessage = signal<string>('');
  toastType = signal<'success' | 'info' | 'danger'>('success');
  private toastTimer?: any;

  currentJob: LowonganKarir = {
    id: 0,
    posisi: '',
    departemen: 'Pelayanan Farmasi',
    tipeKerja: 'Penuh Waktu',
    lokasi: 'Jakarta Selatan (Fulfillment Hub)',
    gajiPerkiraan: 'Kompetitif',
    batasLamaran: 'Bulan Depan',
    totalPelamar: 0,
    deskripsi: '',
    persyaratan: ['Pendidikan profesi / D3 relevan', 'Disiplin dan bertanggung jawab'],
    persyaratanInput: 'Pendidikan profesi / D3 relevan\nDisiplin dan bertanggung jawab',
    status: 'Aktif',
    updatedAt: 'Hari Ini'
  };

  lowonganList = signal<LowonganKarir[]>([
    {
      id: 1,
      posisi: 'Apoteker Pendamping (Aping) - Telefarmasi',
      departemen: 'Pelayanan Farmasi',
      tipeKerja: 'Penuh Waktu',
      lokasi: 'Jakarta Selatan (Fulfillment Hub)',
      gajiPerkiraan: 'Rp 7.500.000 - Rp 9.500.000',
      batasLamaran: '31 Oktober 2026',
      totalPelamar: 18,
      deskripsi: 'Bertanggung jawab melakukan telaah klinis resep digital, verifikasi interaksi obat, serta memberikan konseling tele-PIO kepada pasien.',
      persyaratan: ['Pendidikan Profesi Apoteker (S.Farm, Apt)', 'Memiliki STRA dan bersedia mengurus SIPA aktif', 'Pengalaman minimal 1 tahun di apotek / RS', 'Komunikatif dan teliti'],
      status: 'Aktif',
      updatedAt: '12 Sep 2026'
    },
    {
      id: 2,
      posisi: 'Tenaga Teknis Kefarmasian (TTK) Dispensing',
      departemen: 'Pelayanan Farmasi',
      tipeKerja: 'Shift Apotek',
      lokasi: 'Jakarta Selatan & Tangerang',
      gajiPerkiraan: 'Rp 5.200.000 - Rp 6.800.000',
      batasLamaran: '15 November 2026',
      totalPelamar: 34,
      deskripsi: 'Menyiapkan obat sesuai resep terverifikasi, mencetak etiket aturan pakai, dan mengemas sediaan rantai dingin dengan segel tamper-evident.',
      persyaratan: ['D3 Farmasi dengan STRTTK aktif', 'Mampu membaca resep tulisan tangan dokter dengan cepat', 'Bersedia bekerja dalam shift bergantian'],
      status: 'Aktif',
      updatedAt: '15 Sep 2026'
    },
    {
      id: 3,
      posisi: 'Dokter Spesialis Konsultan Telemedisin (Sp.A / Sp.PD)',
      departemen: 'Medis & Klinis',
      tipeKerja: 'Paruh Waktu',
      lokasi: 'Remote / Online Telekonsultasi',
      gajiPerkiraan: 'Fee per Sesi Konsultasi',
      batasLamaran: '20 November 2026',
      totalPelamar: 12,
      deskripsi: 'Memberikan layanan konsultasi telemedisin, menegakkan diagnosis daring, serta menerbitkan resep elektronik resmi melalui sistem PSEF.',
      persyaratan: ['Dokter Spesialis ber-STR dan SIP aktif', 'Memiliki pengalaman klinis minimal 2 tahun', 'Fasih menggunakan EMR / Rekam Medis Elektronik'],
      status: 'Aktif',
      updatedAt: '20 Agu 2026'
    },
    {
      id: 4,
      posisi: 'Regulatory Affairs & Pharmacovigilance Specialist',
      departemen: 'Regulasi & Mutu',
      tipeKerja: 'Penuh Waktu',
      lokasi: 'Kantor Pusat Jakarta',
      gajiPerkiraan: 'Rp 9.000.000 - Rp 12.000.000',
      batasLamaran: '05 November 2026',
      totalPelamar: 8,
      deskripsi: 'Mengawal kepatuhan izin PSEF Kemenkes, sinkronisasi SIPNAP BPOM, pelaporan e-MESO, serta pemeliharaan standar Good Pharmacy Practice.',
      persyaratan: ['Apoteker dengan pengalaman Regulatory Affairs minimal 2 tahun', 'Memahami regulasi Permenkes No. 14/2021 dan CDOB', 'Keahlian audit dokumentasi'],
      status: 'Aktif',
      updatedAt: '05 Sep 2026'
    },
    {
      id: 5,
      posisi: 'Senior Frontend Developer (Angular & TS)',
      departemen: 'Teknologi & IT',
      tipeKerja: 'Penuh Waktu',
      lokasi: 'Jakarta / Hybrid',
      gajiPerkiraan: 'Rp 14.000.000 - Rp 19.000.000',
      batasLamaran: '30 Oktober 2026',
      totalPelamar: 26,
      deskripsi: 'Mengembangkan antarmuka sistem web admin farmasi, portal apoteker, dan integrasi API telemedicine resep real-time.',
      persyaratan: ['Pengalaman minimal 3 tahun dengan Angular & TypeScript', 'Fasih dalam reactive state, UI design, dan REST API', 'Memahami security best practices'],
      status: 'Aktif',
      updatedAt: '01 Sep 2026'
    }
  ]);

  get kpiStats() {
    const list = this.lowonganList();
    const activeCount = list.filter(j => j.status === 'Aktif').length;
    const totalApplicants = list.reduce((acc, j) => acc + (j.totalPelamar || 0), 0);
    const avgApplicants = list.length > 0 ? Math.round(totalApplicants / list.length) : 0;

    return [
      { label: 'Total Posisi Karir', value: `${list.length} Posisi`, icon: 'ri-briefcase-line', color: 'blue' },
      { label: 'Lowongan Aktif Buka', value: `${activeCount} Aktif`, icon: 'ri-checkbox-circle-line', color: 'emerald' },
      { label: 'Total Berkas Pelamar', value: `${totalApplicants} CV Masuk`, icon: 'ri-user-shared-line', color: 'indigo' },
      { label: 'Rata-rata per Posisi', value: `${avgApplicants} Pelamar`, icon: 'ri-pie-chart-line', color: 'amber' }
    ];
  }

  filteredLowonganList(): LowonganKarir[] {
    const q = this.searchQuery().toLowerCase().trim();
    const dep = this.filterDepartemen();
    const st = this.filterStatus();

    return this.lowonganList().filter(item => {
      const matchQ = !q ||
        item.posisi.toLowerCase().includes(q) ||
        item.lokasi.toLowerCase().includes(q) ||
        item.deskripsi.toLowerCase().includes(q);
      const matchDep = dep === 'Semua' || item.departemen === dep;
      const matchSt = st === 'Semua' || item.status === st;
      return matchQ && matchDep && matchSt;
    });
  }

  getEmptyJob(): LowonganKarir {
    const nextId = Math.max(0, ...this.lowonganList().map(j => j.id)) + 1;
    return {
      id: nextId,
      posisi: '',
      departemen: 'Pelayanan Farmasi',
      tipeKerja: 'Penuh Waktu',
      lokasi: 'Jakarta Selatan (Fulfillment Hub)',
      gajiPerkiraan: 'Kompetitif',
      batasLamaran: '30 November 2026',
      totalPelamar: 0,
      deskripsi: '',
      persyaratan: ['Pendidikan profesi / D3 relevan', 'Disiplin dan bertanggung jawab'],
      persyaratanInput: 'Pendidikan profesi / D3 relevan\nDisiplin dan bertanggung jawab',
      status: 'Aktif',
      updatedAt: 'Hari Ini'
    };
  }

  openAddModal() {
    this.isEditing.set(false);
    this.formSubmitted.set(false);
    this.currentJob = this.getEmptyJob();
    this.showModal.set(true);
  }

  openEditModal(item: LowonganKarir) {
    this.isEditing.set(true);
    this.formSubmitted.set(false);
    this.currentJob = {
      ...item,
      persyaratanInput: item.persyaratan.join('\n')
    };
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
  }

  saveJob() {
    this.formSubmitted.set(true);
    if (!this.currentJob.posisi.trim() || !this.currentJob.deskripsi.trim()) {
      return;
    }

    const reqs = (this.currentJob.persyaratanInput || '')
      .split('\n')
      .map(r => r.trim())
      .filter(r => r.length > 0);

    if (this.isEditing()) {
      this.lowonganList.update(list =>
        list.map(j => j.id === this.currentJob.id ? {
          ...this.currentJob,
          posisi: this.currentJob.posisi.trim(),
          deskripsi: this.currentJob.deskripsi.trim(),
          persyaratan: reqs.length > 0 ? reqs : this.currentJob.persyaratan,
          updatedAt: 'Hari Ini'
        } : j)
      );
      this.showToast(`Lowongan "${this.currentJob.posisi}" berhasil diperbarui.`, 'success');
    } else {
      const newId = Math.max(0, ...this.lowonganList().map(j => j.id)) + 1;
      const newItem: LowonganKarir = {
        ...this.currentJob,
        id: newId,
        posisi: this.currentJob.posisi.trim(),
        deskripsi: this.currentJob.deskripsi.trim(),
        persyaratan: reqs.length > 0 ? reqs : ['Memiliki kualifikasi relevan'],
        totalPelamar: 0,
        updatedAt: 'Hari Ini'
      };
      this.lowonganList.update(list => [newItem, ...list]);
      this.showToast(`Lowongan kerja baru "${newItem.posisi}" berhasil dibuka.`, 'success');
    }
    this.closeModal();
  }

  toggleStatus(item: LowonganKarir) {
    const isNowActive = item.status !== 'Aktif';
    const s = isNowActive ? 'Aktif' : 'Ditutup';
    this.lowonganList.update(list =>
      list.map(j => j.id === item.id ? { ...j, status: s } : j)
    );
    this.showToast(
      `Status lowongan ${item.posisi} diubah menjadi ${s}.`,
      isNowActive ? 'success' : 'info'
    );
  }

  openDeleteModal(item: LowonganKarir) {
    this.selectedJob.set(item);
    this.deleteMode.set('deactivate');
    this.showDeleteModal.set(true);
  }

  closeDeleteModal() {
    this.showDeleteModal.set(false);
    this.selectedJob.set(null);
  }

  setDeleteMode(mode: 'deactivate' | 'permanent') {
    this.deleteMode.set(mode);
  }

  confirmDeleteAction() {
    const target = this.selectedJob();
    if (!target) return;

    this.isProcessing.set(true);

    setTimeout(() => {
      if (this.deleteMode() === 'deactivate') {
        this.lowonganList.update(list =>
          list.map(j => j.id === target.id ? { ...j, status: 'Ditutup' } : j)
        );
        this.showToast(
          `Lowongan "${target.posisi}" berhasil ditutup. ${target.totalPelamar} riwayat berkas pelamar tetap aman.`,
          'info'
        );
      } else {
        this.lowonganList.update(list => list.filter(j => j.id !== target.id));
        this.showToast(
          `Lowongan "${target.posisi}" telah dihapus permanen dari sistem.`,
          'danger'
        );
      }

      this.isProcessing.set(false);
      this.closeDeleteModal();
    }, 350);
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
