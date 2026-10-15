import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface KetentuanItem {
  id: number;
  pasal: string;
  judul: string;
  isi: string;
  kategori: string;
  status: 'Aktif' | 'Nonaktif';
  viewsCount: number;
  updatedAt: string;
}

@Component({
  selector: 'app-syarat-ketentuan',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './syarat-ketentuan.html',
  styleUrl: './syarat-ketentuan.css',
})
export class SyaratKetentuan {
  searchQuery = signal<string>('');
  filterKategori = signal<string>('Semua');
  filterStatus = signal<'Semua' | 'Aktif' | 'Nonaktif'>('Semua');

  showModal = signal<boolean>(false);
  isEditing = signal<boolean>(false);
  formSubmitted = signal<boolean>(false);

  showDeleteModal = signal<boolean>(false);
  selectedKetentuan = signal<KetentuanItem | null>(null);
  deleteMode = signal<'deactivate' | 'permanent'>('deactivate');
  isProcessing = signal<boolean>(false);

  toastMessage = signal<string>('');
  toastType = signal<'success' | 'info' | 'danger'>('success');
  private toastTimer?: any;

  infoSyarat = {
    versi: 'Versi 3.0 (Aktif)',
    tanggalPembaruan: '15 September 2026',
    statusDokumen: 'Dipublikasikan ke Web & App',
    ruangLingkup: 'Pasien, Dokter Konsultan, dan Mitra Apotek PSEF'
  };

  currentKetentuan: KetentuanItem = {
    id: 0,
    pasal: 'Ketentuan 6',
    judul: '',
    isi: '',
    kategori: 'Ketentuan Umum',
    status: 'Aktif',
    viewsCount: 0,
    updatedAt: 'Hari Ini'
  };

  ketentuanList = signal<KetentuanItem[]>([
    {
      id: 1,
      pasal: 'Ketentuan 1',
      judul: 'Definisi Layanan & Status Hukum Platform PSEF',
      isi: 'PSEF adalah Penyelenggara Sistem Elektronik Farmasi yang memfasilitasi pelayanan kefarmasian berbasis daring, mencakup telaah resep dokter, dispensing obat di apotek rekanan berizin, dan pengantaran ke pasien sesuai Permenkes No. 14 Tahun 2021.',
      kategori: 'Ketentuan Umum',
      status: 'Aktif',
      viewsCount: 22400,
      updatedAt: '15 Sep 2026'
    },
    {
      id: 2,
      pasal: 'Ketentuan 2',
      judul: 'Keabsahan & Verifikasi Resep Dokter Elektronik',
      isi: 'Resep dokter yang dilayani wajib berasal dari dokter ber-SIP aktif, memuat identitas pasien jelas, dosis dan cara pakai lengkap. Apoteker Penanggung Jawab berhak menolak atau meminta konfirmasi ulang bila ditemukan indikasi potensi overdosis atau ketidaksesuaian klinis.',
      kategori: 'Pelayanan Resep',
      status: 'Aktif',
      viewsCount: 19800,
      updatedAt: '15 Sep 2026'
    },
    {
      id: 3,
      pasal: 'Ketentuan 3',
      judul: 'Larangan Mutlak Penyerahan Sediaan Tertentu',
      isi: 'Platform PSEF tidak melayani peresepan, penjualan, maupun pengantaran obat golongan Narkotika, Psikotropika, serta prekursor farmasi tertentu sebagaimana ditegaskan dalam regulasi Kemenkes dan Badan Pengawas Obat dan Makanan (BPOM).',
      kategori: 'Batasan Hukum',
      status: 'Aktif',
      viewsCount: 25100,
      updatedAt: '10 Agu 2026'
    },
    {
      id: 4,
      pasal: 'Ketentuan 4',
      judul: 'Tanggung Jawab Pengguna & Kebenaran Riwayat Medis',
      isi: 'Pengguna wajib memberikan riwayat alergi obat, riwayat penyakit, serta data diri yang sebenarnya. Penggunaan resep palsu atau manipulasi identitas dokter merupakan tindak pidana dan akan diteruskan kepada aparat penegak hukum.',
      kategori: 'Kewajiban Pasien',
      status: 'Aktif',
      viewsCount: 17200,
      updatedAt: '15 Sep 2026'
    },
    {
      id: 5,
      pasal: 'Ketentuan 5',
      judul: 'Kebijakan Pengembalian Obat & Ganti Rugi Kerusakan',
      isi: 'Obat yang telah dibuka segelnya (tamper-evident) tidak dapat dikembalikan demi alasan sterilitas, kecuali terbukti cacat produksi kemasan dari pabrik atau salah serah oleh apotek, yang diverifikasi dalam waktu maksimal 24 jam setelah penerimaan paket.',
      kategori: 'Retur & Refund',
      status: 'Aktif',
      viewsCount: 14600,
      updatedAt: '01 Jul 2026'
    }
  ]);

  get kpiStats() {
    const list = this.ketentuanList();
    const activeCount = list.filter(k => k.status === 'Aktif').length;
    const totalViews = list.reduce((acc, k) => acc + (k.viewsCount || 0), 0);

    return [
      { label: 'Total Klausul S&K', value: `${list.length} Ketentuan`, icon: 'ri-file-list-3-line', color: 'blue' },
      { label: 'Ketentuan Aktif Mengikat', value: `${activeCount} Aktif`, icon: 'ri-checkbox-circle-line', color: 'emerald' },
      { label: 'Total Pembaca & Persetujuan', value: totalViews.toLocaleString('id-ID') + 'x', icon: 'ri-eye-line', color: 'indigo' },
      { label: 'Validitas Hukum Kemenkes', value: '100% Sah', icon: 'ri-scales-3-line', color: 'amber' }
    ];
  }

  filteredKetentuanList(): KetentuanItem[] {
    const q = this.searchQuery().toLowerCase().trim();
    const kat = this.filterKategori();
    const st = this.filterStatus();

    return this.ketentuanList().filter(k => {
      const matchQ = !q ||
        k.pasal.toLowerCase().includes(q) ||
        k.judul.toLowerCase().includes(q) ||
        k.isi.toLowerCase().includes(q) ||
        k.kategori.toLowerCase().includes(q);
      const matchKat = kat === 'Semua' || k.kategori === kat;
      const matchSt = st === 'Semua' || k.status === st;
      return matchQ && matchKat && matchSt;
    });
  }

  getEmptyKetentuan(): KetentuanItem {
    const count = this.ketentuanList ? this.ketentuanList().length + 1 : 1;
    return {
      id: 0,
      pasal: `Ketentuan ${count}`,
      judul: '',
      isi: '',
      kategori: 'Ketentuan Umum',
      status: 'Aktif',
      viewsCount: 0,
      updatedAt: 'Hari Ini'
    };
  }

  openAddModal() {
    this.isEditing.set(false);
    this.formSubmitted.set(false);
    this.currentKetentuan = this.getEmptyKetentuan();
    this.showModal.set(true);
  }

  openEditModal(item: KetentuanItem) {
    this.isEditing.set(true);
    this.formSubmitted.set(false);
    this.currentKetentuan = { ...item };
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
  }

  saveKetentuan() {
    this.formSubmitted.set(true);
    if (!this.currentKetentuan.judul.trim() || !this.currentKetentuan.isi.trim() || !this.currentKetentuan.pasal.trim()) {
      return;
    }

    if (this.isEditing()) {
      this.ketentuanList.update(list =>
        list.map(k => k.id === this.currentKetentuan.id ? {
          ...this.currentKetentuan,
          pasal: this.currentKetentuan.pasal.trim(),
          judul: this.currentKetentuan.judul.trim(),
          isi: this.currentKetentuan.isi.trim(),
          updatedAt: 'Hari Ini'
        } : k)
      );
      this.showToast(`Klausul "${this.currentKetentuan.pasal}" berhasil diperbarui.`, 'success');
    } else {
      const newId = Math.max(0, ...this.ketentuanList().map(k => k.id)) + 1;
      const newItem: KetentuanItem = {
        ...this.currentKetentuan,
        id: newId,
        pasal: this.currentKetentuan.pasal.trim(),
        judul: this.currentKetentuan.judul.trim(),
        isi: this.currentKetentuan.isi.trim(),
        viewsCount: 0,
        updatedAt: 'Hari Ini'
      };
      this.ketentuanList.update(list => [newItem, ...list]);
      this.showToast(`Klausul baru "${newItem.pasal}" berhasil diterbitkan ke Syarat & Ketentuan.`, 'success');
    }
    this.closeModal();
  }

  toggleStatus(item: KetentuanItem) {
    const isNowActive = item.status !== 'Aktif';
    const s = isNowActive ? 'Aktif' : 'Nonaktif';
    this.ketentuanList.update(list =>
      list.map(k => k.id === item.id ? { ...k, status: s } : k)
    );
    this.showToast(
      `Status ${item.pasal} diubah menjadi ${isNowActive ? 'Aktif (Berlaku Mengikat)' : 'Nonaktif (Arsip)'}.`,
      isNowActive ? 'success' : 'info'
    );
  }

  openDeleteModal(item: KetentuanItem) {
    this.selectedKetentuan.set(item);
    this.deleteMode.set('deactivate');
    this.showDeleteModal.set(true);
  }

  closeDeleteModal() {
    this.showDeleteModal.set(false);
    this.selectedKetentuan.set(null);
  }

  setDeleteMode(mode: 'deactivate' | 'permanent') {
    this.deleteMode.set(mode);
  }

  confirmDeleteAction() {
    const target = this.selectedKetentuan();
    if (!target) return;

    this.isProcessing.set(true);

    setTimeout(() => {
      if (this.deleteMode() === 'deactivate') {
        this.ketentuanList.update(list =>
          list.map(k => k.id === target.id ? { ...k, status: 'Nonaktif' } : k)
        );
        this.showToast(
          `Klausul "${target.pasal}" berhasil dinonaktifkan. Data pembaca & catatan hukum tetap terjaga.`,
          'info'
        );
      } else {
        this.ketentuanList.update(list => list.filter(k => k.id !== target.id));
        this.showToast(
          `Klausul "${target.pasal}" telah dihapus permanen dari sistem.`,
          'danger'
        );
      }

      this.isProcessing.set(false);
      this.closeDeleteModal();
    }, 350);
  }

  downloadPdf() {
    this.showToast('Menyiapkan Berkas Resmi Syarat & Ketentuan Layanan PSEF (PDF)...', 'info');
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
