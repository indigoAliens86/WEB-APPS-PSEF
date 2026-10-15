import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface CalonMitraApotek {
  id: number;
  namaApotek: string;
  kota: string;
  alamatLengkap: string;
  nomorSia: string;
  namaApj: string;
  nomorSipa: string;
  teleponKontak: string;
  tanggalDaftar: string;
  fasilitasColdChain: boolean;
  status: 'Terverifikasi' | 'Menunggu Audit' | 'Ditolak' | 'Nonaktif / Diberhentikan';
  catatanReview: string;
  totalTransaksi?: number;
}

@Component({
  selector: 'app-mitra-apotek',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mitra-apotek.html',
  styleUrl: './mitra-apotek.css',
})
export class MitraApotek {
  searchQuery = signal<string>('');
  filterStatus = signal<string>('Semua');

  // Form modal state (Tambah / Edit)
  showModal = signal<boolean>(false);
  isEditing = signal<boolean>(false);
  formSubmitted = signal<boolean>(false);

  // Detail audit modal state
  selectedMitra = signal<CalonMitraApotek | null>(null);
  showDetailModal = signal<boolean>(false);

  // Delete modal state
  showDeleteModal = signal<boolean>(false);
  deleteMode = signal<'deactivate' | 'permanent'>('deactivate');
  isProcessing = signal<boolean>(false);

  // Toast feedback state
  toastMessage = signal<string>('');
  toastType = signal<'success' | 'info' | 'danger'>('success');
  private toastTimer?: any;

  currentMitra: CalonMitraApotek = {
    id: 0,
    namaApotek: '',
    kota: 'Jakarta Selatan, DKI Jakarta',
    alamatLengkap: '',
    nomorSia: '',
    namaApj: '',
    nomorSipa: '',
    teleponKontak: '',
    tanggalDaftar: 'Hari Ini',
    fasilitasColdChain: true,
    status: 'Menunggu Audit',
    catatanReview: '',
    totalTransaksi: 0
  };

  mitraList = signal<CalonMitraApotek[]>([
    {
      id: 1,
      namaApotek: 'Apotek Kimia Sehat Sentosa',
      kota: 'Bandung, Jawa Barat',
      alamatLengkap: 'Jl. Ir. H. Juanda No. 120, Dago, Coblong, Kota Bandung',
      nomorSia: 'SIA-32.73/DPMPTSP/2025/0812',
      namaApj: 'apt. Farhan Pratama, S.Farm',
      nomorSipa: '19930214/SIPA-32.73/2025/1.2',
      teleponKontak: '0812-2233-4455',
      tanggalDaftar: '12 Okt 2026',
      fasilitasColdChain: true,
      status: 'Menunggu Audit',
      catatanReview: 'Berkas SIA dan SIPA terunggah lengkap. Menunggu jadwal inspeksi fisik fasilitas kulkas farmasi 2-8°C.',
      totalTransaksi: 0
    },
    {
      id: 2,
      namaApotek: 'Apotek Medika Prima Jaya',
      kota: 'Surabaya, Jawa Timur',
      alamatLengkap: 'Jl. Raya Darmo No. 88, Tegalsari, Kota Surabaya',
      nomorSia: 'SIA-35.78/DPMPTSP/2024/0491',
      namaApj: 'apt. Melani Dewi, S.Farm',
      nomorSipa: '19900811/SIPA-35.78/2024/2.1',
      teleponKontak: '0813-9988-7766',
      tanggalDaftar: '10 Okt 2026',
      fasilitasColdChain: true,
      status: 'Menunggu Audit',
      catatanReview: 'Dokumen verifikasi OSS sudah cocok dengan database SIPNAP Kemenkes.',
      totalTransaksi: 0
    },
    {
      id: 3,
      namaApotek: 'Apotek Sejahtera Farma 24 Jam',
      kota: 'Jakarta Timur, DKI Jakarta',
      alamatLengkap: 'Jl. Pemuda No. 45, Rawamangun, Pulo Gadung, Jakarta Timur',
      nomorSia: 'SIA-31.75/DPMPTSP/2023/1102',
      namaApj: 'apt. Bambang Hidayat, S.Farm',
      nomorSipa: '19890405/SIPA-31.75/2023/1.1',
      teleponKontak: '0818-4455-6677',
      tanggalDaftar: '05 Okt 2026',
      fasilitasColdChain: true,
      status: 'Terverifikasi',
      catatanReview: 'Telah terintegrasi dengan API PSEF dan melayani pesanan resep digital instan.',
      totalTransaksi: 3240
    },
    {
      id: 4,
      namaApotek: 'Apotek Berkah Sehat Abadi',
      kota: 'Medan, Sumatera Utara',
      alamatLengkap: 'Jl. Iskandar Muda No. 19, Medan Baru, Kota Medan',
      nomorSia: 'SIA-12.71/DPMPTSP/2024/0934',
      namaApj: 'apt. Sri Wahyuni, S.Farm',
      nomorSipa: '19921109/SIPA-12.71/2024/2.0',
      teleponKontak: '0852-6677-8899',
      tanggalDaftar: '01 Okt 2026',
      fasilitasColdChain: false,
      status: 'Ditolak',
      catatanReview: 'Masa berlaku SIA kurang dari 3 bulan dan belum memiliki sediaan chiller pendingin vaksin.',
      totalTransaksi: 0
    }
  ]);

  get kpiStats() {
    const list = this.mitraList();
    const verified = list.filter(m => m.status === 'Terverifikasi').length;
    const pending = list.filter(m => m.status === 'Menunggu Audit').length;
    const totalTrx = list.reduce((acc, m) => acc + (m.totalTransaksi || 0), 0);

    return [
      { label: 'Total Mitra Apotek', value: `${list.length} Apotek`, icon: 'ri-store-2-fill', color: 'blue' },
      { label: 'Menunggu Audit Berkas', value: `${pending} Apotek`, icon: 'ri-time-fill', color: 'amber' },
      { label: 'Apotek Aktif Melayani', value: `${verified} Terverifikasi`, icon: 'ri-checkbox-circle-fill', color: 'emerald' },
      { label: 'Akumulasi Resep Mitra', value: totalTrx > 0 ? `${totalTrx.toLocaleString('id-ID')} Resep` : '450.000+ Resep', icon: 'ri-file-check-line', color: 'indigo' }
    ];
  }

  filteredMitraList(): CalonMitraApotek[] {
    const q = this.searchQuery().toLowerCase().trim();
    const st = this.filterStatus();

    return this.mitraList().filter(m => {
      const matchQ = !q ||
        m.namaApotek.toLowerCase().includes(q) ||
        m.kota.toLowerCase().includes(q) ||
        m.namaApj.toLowerCase().includes(q) ||
        m.nomorSia.toLowerCase().includes(q);
      const matchSt = st === 'Semua' || m.status === st;
      return matchQ && matchSt;
    });
  }

  getEmptyMitra(): CalonMitraApotek {
    const nextId = Math.max(0, ...this.mitraList().map(m => m.id)) + 1;
    return {
      id: nextId,
      namaApotek: '',
      kota: 'Jakarta Selatan, DKI Jakarta',
      alamatLengkap: '',
      nomorSia: '',
      namaApj: '',
      nomorSipa: '',
      teleponKontak: '',
      tanggalDaftar: 'Hari Ini',
      fasilitasColdChain: true,
      status: 'Menunggu Audit',
      catatanReview: '',
      totalTransaksi: 0
    };
  }

  openAddModal() {
    this.isEditing.set(false);
    this.formSubmitted.set(false);
    this.currentMitra = this.getEmptyMitra();
    this.showModal.set(true);
  }

  openEditModal(item: CalonMitraApotek) {
    this.isEditing.set(true);
    this.formSubmitted.set(false);
    this.currentMitra = { ...item };
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
  }

  saveMitra() {
    this.formSubmitted.set(true);
    if (!this.currentMitra.namaApotek.trim() || !this.currentMitra.nomorSia.trim() || !this.currentMitra.namaApj.trim()) {
      return;
    }

    if (this.isEditing()) {
      this.mitraList.update(list =>
        list.map(m => m.id === this.currentMitra.id ? {
          ...this.currentMitra,
          namaApotek: this.currentMitra.namaApotek.trim(),
          nomorSia: this.currentMitra.nomorSia.trim(),
          namaApj: this.currentMitra.namaApj.trim()
        } : m)
      );
      this.showToast(`Data mitra "${this.currentMitra.namaApotek}" berhasil diperbarui.`, 'success');
    } else {
      const newId = Math.max(0, ...this.mitraList().map(m => m.id)) + 1;
      const newItem: CalonMitraApotek = {
        ...this.currentMitra,
        id: newId,
        namaApotek: this.currentMitra.namaApotek.trim(),
        nomorSia: this.currentMitra.nomorSia.trim(),
        namaApj: this.currentMitra.namaApj.trim(),
        totalTransaksi: 0
      };
      this.mitraList.update(list => [newItem, ...list]);
      this.showToast(`Mitra Apotek baru "${newItem.namaApotek}" berhasil didaftarkan.`, 'success');
    }
    this.closeModal();
  }

  viewDetail(item: CalonMitraApotek) {
    this.selectedMitra.set(item);
    this.showDetailModal.set(true);
  }

  closeDetailModal() {
    this.showDetailModal.set(false);
  }

  setVerifikasi(item: CalonMitraApotek, newStatus: 'Terverifikasi' | 'Ditolak' | 'Menunggu Audit') {
    this.mitraList.update(list =>
      list.map(m => m.id === item.id ? { ...m, status: newStatus } : m)
    );
    if (this.selectedMitra()?.id === item.id) {
      this.selectedMitra.update(m => m ? { ...m, status: newStatus } : null);
    }
    this.showToast(`Status kemitraan ${item.namaApotek} diubah menjadi ${newStatus}.`, 'info');
  }

  toggleStatus(item: CalonMitraApotek) {
    const isNowActive = item.status !== 'Terverifikasi';
    const s = isNowActive ? 'Terverifikasi' : 'Nonaktif / Diberhentikan';
    this.mitraList.update(list =>
      list.map(m => m.id === item.id ? { ...m, status: s } : m)
    );
    this.showToast(
      `Status kemitraan ${item.namaApotek} diubah menjadi ${s}.`,
      isNowActive ? 'success' : 'info'
    );
  }

  openDeleteModal(item: CalonMitraApotek) {
    this.selectedMitra.set(item);
    this.deleteMode.set('deactivate');
    this.showDeleteModal.set(true);
  }

  closeDeleteModal() {
    this.showDeleteModal.set(false);
  }

  setDeleteMode(mode: 'deactivate' | 'permanent') {
    this.deleteMode.set(mode);
  }

  confirmDeleteAction() {
    const target = this.selectedMitra();
    if (!target) return;

    this.isProcessing.set(true);

    setTimeout(() => {
      if (this.deleteMode() === 'deactivate') {
        this.mitraList.update(list =>
          list.map(m => m.id === target.id ? { ...m, status: 'Nonaktif / Diberhentikan' } : m)
        );
        this.showToast(
          `Kemitraan "${target.namaApotek}" berhasil dinonaktifkan. Data histori transaksi resep tetap utuh terjaga.`,
          'info'
        );
      } else {
        this.mitraList.update(list => list.filter(m => m.id !== target.id));
        this.showToast(
          `Mitra apotek "${target.namaApotek}" telah dihapus permanen dari sistem.`,
          'danger'
        );
      }

      this.isProcessing.set(false);
      this.closeDeleteModal();
      this.closeDetailModal();
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
