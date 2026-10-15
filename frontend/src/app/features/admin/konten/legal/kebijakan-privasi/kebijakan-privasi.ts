import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface KlausulPrivasi {
  id: number;
  pasal: string;
  judul: string;
  konten: string;
  kategori: string;
  status: 'Aktif' | 'Nonaktif';
  viewsCount: number;
  terakhirDiubah: string;
}

@Component({
  selector: 'app-kebijakan-privasi',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './kebijakan-privasi.html',
  styleUrl: './kebijakan-privasi.css',
})
export class KebijakanPrivasi {
  searchQuery = signal<string>('');
  filterKategori = signal<string>('Semua');
  filterStatus = signal<'Semua' | 'Aktif' | 'Nonaktif'>('Semua');

  showModal = signal<boolean>(false);
  isEditing = signal<boolean>(false);
  formSubmitted = signal<boolean>(false);

  showDeleteModal = signal<boolean>(false);
  selectedKlausul = signal<KlausulPrivasi | null>(null);
  deleteMode = signal<'deactivate' | 'permanent'>('deactivate');
  isProcessing = signal<boolean>(false);

  toastMessage = signal<string>('');
  toastType = signal<'success' | 'info' | 'danger'>('success');
  private toastTimer?: any;

  dokumenInfo = {
    nomorDokumen: 'POL-PSEF/PDP-2026/V2.4',
    versi: '2.4 (Aktif)',
    tanggalBerlaku: '10 September 2026',
    penanggungJawab: 'Komite Kepatuhan Hukum & DPO PSEF',
    statusKepatuhan: 'Patuh UU PDP No. 27/2022 & Permenkes No. 24/2022'
  };

  currentKlausul: KlausulPrivasi = {
    id: 0,
    pasal: 'Pasal 6',
    judul: '',
    konten: '',
    kategori: 'Data Pribadi & Medis',
    status: 'Aktif',
    viewsCount: 0,
    terakhirDiubah: 'Hari Ini'
  };

  klausulList = signal<KlausulPrivasi[]>([
    {
      id: 1,
      pasal: 'Pasal 1',
      judul: 'Pengumpulan & Jenis Data Kesehatan Elektronik',
      konten: 'Platform PSEF mengumpulkan data pribadi mencakup identitas KTP, nomor WhatsApp aktif, foto/dokumen resep digital dari dokter, riwayat alergi obat, dan rekam pengobatan yang dimasukkan secara sadar oleh pasien guna keperluan pelayanan farmasi klinis.',
      kategori: 'Data Pribadi & Medis',
      status: 'Aktif',
      viewsCount: 18450,
      terakhirDiubah: '10 Sep 2026'
    },
    {
      id: 2,
      pasal: 'Pasal 2',
      judul: 'Kerahasiaan Resep & Batas Akses Tenaga Kefarmasian',
      konten: 'Setiap resep digital dilindungi sebagai dokumen rahasia medis. Akses hanya diberikan kepada Apoteker Penanggung Jawab (APJ) dan Tenaga Teknis Kefarmasian (TTK) ber-SIPA yang ditugaskan melakukan telaah klinis dan peracikan obat pada apotek rekanan terverifikasi.',
      kategori: 'Kerahasiaan Medis',
      status: 'Aktif',
      viewsCount: 14200,
      terakhirDiubah: '10 Sep 2026'
    },
    {
      id: 3,
      pasal: 'Pasal 3',
      judul: 'Standar Enkripsi & Penyimpanan Cloud Medis',
      konten: 'Seluruh transmisi data rekam medis dan transaksi pembayaran diamankan menggunakan protokol Transport Layer Security (TLS 1.3) serta enkripsi database AES-256 pada pusat data bersertifikasi ISO 27001 yang berlokasi di wilayah Republik Indonesia.',
      kategori: 'Keamanan Sistem & Server',
      status: 'Aktif',
      viewsCount: 9810,
      terakhirDiubah: '15 Agu 2026'
    },
    {
      id: 4,
      pasal: 'Pasal 4',
      judul: 'Hak Pasien Terhadap Pengelolaan Data Pribadi',
      konten: 'Pasien berhak meminta salinan riwayat tebus resep, mengajukan koreksi data identitas yang tidak akurat, serta membatasi persetujuan pemrosesan data promosi kapan saja melalui pengaturan akun di aplikasi pasien.',
      kategori: 'Hak Pengguna',
      status: 'Aktif',
      viewsCount: 12400,
      terakhirDiubah: '01 Jul 2026'
    },
    {
      id: 5,
      pasal: 'Pasal 5',
      judul: 'Pelaporan Terbatas Kepada Sistem Kemenkes (SIPNAP/SATUSEHAT)',
      konten: 'Sesuai kewajiban regulasi PSEF Kemenkes, data agregat peredaran obat tertentu dilaporkan secara otomatis ke sistem monitoring Kementerian Kesehatan RI tanpa membocorkan identitas pribadi pasien di luar ketentuan hukum.',
      kategori: 'Integrasi Regulasi',
      status: 'Aktif',
      viewsCount: 7650,
      terakhirDiubah: '10 Sep 2026'
    }
  ]);

  get kpiStats() {
    const list = this.klausulList();
    const activeCount = list.filter(k => k.status === 'Aktif').length;
    const totalViews = list.reduce((acc, k) => acc + (k.viewsCount || 0), 0);

    return [
      { label: 'Total Klausul PDP', value: `${list.length} Pasal`, icon: 'ri-file-shield-line', color: 'blue' },
      { label: 'Klausul Aktif Berlaku', value: `${activeCount} Aktif`, icon: 'ri-checkbox-circle-line', color: 'emerald' },
      { label: 'Total Pembaca Terverifikasi', value: totalViews.toLocaleString('id-ID') + 'x', icon: 'ri-eye-line', color: 'indigo' },
      { label: 'Status Audit UU PDP', value: '100% Patuh', icon: 'ri-shield-check-line', color: 'amber' }
    ];
  }

  filteredKlausulList(): KlausulPrivasi[] {
    const q = this.searchQuery().toLowerCase().trim();
    const kat = this.filterKategori();
    const st = this.filterStatus();

    return this.klausulList().filter(k => {
      const matchQ = !q ||
        k.pasal.toLowerCase().includes(q) ||
        k.judul.toLowerCase().includes(q) ||
        k.konten.toLowerCase().includes(q) ||
        k.kategori.toLowerCase().includes(q);
      const matchKat = kat === 'Semua' || k.kategori === kat;
      const matchSt = st === 'Semua' || k.status === st;
      return matchQ && matchKat && matchSt;
    });
  }

  getEmptyKlausul(): KlausulPrivasi {
    const count = this.klausulList ? this.klausulList().length + 1 : 1;
    return {
      id: 0,
      pasal: `Pasal ${count}`,
      judul: '',
      konten: '',
      kategori: 'Data Pribadi & Medis',
      status: 'Aktif',
      viewsCount: 0,
      terakhirDiubah: 'Hari Ini'
    };
  }

  openAddModal() {
    this.isEditing.set(false);
    this.formSubmitted.set(false);
    this.currentKlausul = this.getEmptyKlausul();
    this.showModal.set(true);
  }

  openEditModal(item: KlausulPrivasi) {
    this.isEditing.set(true);
    this.formSubmitted.set(false);
    this.currentKlausul = { ...item };
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
  }

  saveKlausul() {
    this.formSubmitted.set(true);
    if (!this.currentKlausul.judul.trim() || !this.currentKlausul.konten.trim() || !this.currentKlausul.pasal.trim()) {
      return;
    }

    if (this.isEditing()) {
      this.klausulList.update(list =>
        list.map(k => k.id === this.currentKlausul.id ? {
          ...this.currentKlausul,
          judul: this.currentKlausul.judul.trim(),
          konten: this.currentKlausul.konten.trim(),
          pasal: this.currentKlausul.pasal.trim(),
          terakhirDiubah: 'Hari Ini'
        } : k)
      );
      this.showToast(`Klausul ${this.currentKlausul.pasal} berhasil diperbarui.`, 'success');
    } else {
      const newId = Math.max(0, ...this.klausulList().map(k => k.id)) + 1;
      const newItem: KlausulPrivasi = {
        ...this.currentKlausul,
        id: newId,
        judul: this.currentKlausul.judul.trim(),
        konten: this.currentKlausul.konten.trim(),
        pasal: this.currentKlausul.pasal.trim(),
        viewsCount: 0,
        terakhirDiubah: 'Hari Ini'
      };
      this.klausulList.update(list => [newItem, ...list]);
      this.showToast(`Pasal baru "${newItem.pasal}" berhasil diterbitkan ke Kebijakan Privasi.`, 'success');
    }
    this.closeModal();
  }

  toggleStatus(item: KlausulPrivasi) {
    const isNowActive = item.status !== 'Aktif';
    const s = isNowActive ? 'Aktif' : 'Nonaktif';
    this.klausulList.update(list =>
      list.map(k => k.id === item.id ? { ...k, status: s } : k)
    );
    this.showToast(
      `Status ${item.pasal} diubah menjadi ${isNowActive ? 'Aktif (Berlaku Publik)' : 'Nonaktif (Arsip Audit)'}.`,
      isNowActive ? 'success' : 'info'
    );
  }

  openDeleteModal(item: KlausulPrivasi) {
    this.selectedKlausul.set(item);
    this.deleteMode.set('deactivate');
    this.showDeleteModal.set(true);
  }

  closeDeleteModal() {
    this.showDeleteModal.set(false);
    this.selectedKlausul.set(null);
  }

  setDeleteMode(mode: 'deactivate' | 'permanent') {
    this.deleteMode.set(mode);
  }

  confirmDeleteAction() {
    const target = this.selectedKlausul();
    if (!target) return;

    this.isProcessing.set(true);

    setTimeout(() => {
      if (this.deleteMode() === 'deactivate') {
        this.klausulList.update(list =>
          list.map(k => k.id === target.id ? { ...k, status: 'Nonaktif' } : k)
        );
        this.showToast(
          `Klausul ${target.pasal} berhasil dinonaktifkan. Data pembaca & jejak audit tetap terjaga.`,
          'info'
        );
      } else {
        this.klausulList.update(list => list.filter(k => k.id !== target.id));
        this.showToast(
          `Klausul ${target.pasal} telah dihapus permanen dari sistem.`,
          'danger'
        );
      }

      this.isProcessing.set(false);
      this.closeDeleteModal();
    }, 350);
  }

  downloadPdf() {
    this.showToast('Menyiapkan Berkas Resmi Kebijakan Privasi & PDP PSEF (PDF)...', 'info');
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
