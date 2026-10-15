import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface PanduanLangkah {
  id: number;
  urutan: number;
  judul: string;
  subjudul: string;
  deskripsi: string;
  icon: string;
  tipeLayanan: 'Semua Layanan' | 'Obat Resep Digital' | 'Telemedisin' | 'Obat Bebas';
  estimasiWaktu: string;
  status: 'Aktif' | 'Nonaktif';
  tipsCatatan?: string;
}

export interface CuratedIcon {
  icon: string;
  label: string;
  category: string;
}

@Component({
  selector: 'app-cara-pesan',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cara-pesan.html',
  styleUrl: './cara-pesan.css',
})
export class CaraPesan {
  filterLayanan = signal<string>('Semua');
  searchQuery = signal<string>('');
  showModal = signal<boolean>(false);
  isEditing = signal<boolean>(false);
  validationError = signal<string>('');
  selectedIconCategory = signal<string>('Semua');

  // Delete Modal & Toast State
  showDeleteModal = signal<boolean>(false);
  stepToDelete = signal<PanduanLangkah | null>(null);
  autoReorderAfterDelete = signal<boolean>(true);
  isDeleting = signal<boolean>(false);
  toastMessage = signal<string>('');
  toastType = signal<'success' | 'danger' | 'info'>('success');
  private toastTimer: any = null;

  readonly curatedIcons: CuratedIcon[] = [
    { icon: 'ri-file-upload-line', label: 'Unggah Resep', category: 'Resep & Medis' },
    { icon: 'ri-file-text-line', label: 'Dokumen Resep', category: 'Resep & Medis' },
    { icon: 'ri-stethoscope-line', label: 'Dokter Spesialis', category: 'Resep & Medis' },
    { icon: 'ri-heart-pulse-line', label: 'Klinis & Tensi', category: 'Resep & Medis' },
    { icon: 'ri-shield-check-line', label: 'Verifikasi APJ', category: 'Farmasi & Apotek' },
    { icon: 'ri-capsule-line', label: 'Sediaan Kapsul', category: 'Farmasi & Apotek' },
    { icon: 'ri-medicine-bottle-line', label: 'Obat Cair / Sirup', category: 'Farmasi & Apotek' },
    { icon: 'ri-temp-cold-line', label: 'Rantai Dingin 2-8°C', category: 'Farmasi & Apotek' },
    { icon: 'ri-secure-payment-line', label: 'Pembayaran Sah', category: 'Transaksi' },
    { icon: 'ri-wallet-3-line', label: 'Dompet Digital', category: 'Transaksi' },
    { icon: 'ri-qr-code-line', label: 'QRIS Kemenkeu', category: 'Transaksi' },
    { icon: 'ri-bank-card-line', label: 'Virtual Account', category: 'Transaksi' },
    { icon: 'ri-box-3-line', label: 'Kemas & Segel', category: 'Pengiriman' },
    { icon: 'ri-e-bike-2-line', label: 'Kurir Medis Cepat', category: 'Pengiriman' },
    { icon: 'ri-truck-line', label: 'Ekspedisi Suhu Aman', category: 'Pengiriman' },
    { icon: 'ri-map-pin-user-line', label: 'Tiba di Pasien', category: 'Pengiriman' },
    { icon: 'ri-chat-smile-3-line', label: 'Tele-PIO Gratis', category: 'Komunikasi' },
    { icon: 'ri-customer-service-2-line', label: 'Customer Care 24/7', category: 'Komunikasi' },
    { icon: 'ri-phone-line', label: 'Panggilan Farmasi', category: 'Komunikasi' },
    { icon: 'ri-checkbox-circle-line', label: 'Verifikasi Selesai', category: 'Resep & Medis' }
  ];

  readonly iconCategories = ['Semua', 'Resep & Medis', 'Farmasi & Apotek', 'Transaksi', 'Pengiriman', 'Komunikasi'];

  readonly timePresets = [
    '1 - 2 Menit',
    '5 - 10 Menit',
    '15 - 30 Menit',
    '1 Jam',
    'Sameday / Instant',
    'Instan'
  ];

  readonly tipeLayananOptions: PanduanLangkah['tipeLayanan'][] = [
    'Semua Layanan',
    'Obat Resep Digital',
    'Telemedisin',
    'Obat Bebas'
  ];

  currentStep: PanduanLangkah = this.getEmptyStep();

  langkahList = signal<PanduanLangkah[]>([
    {
      id: 1,
      urutan: 1,
      judul: 'Unggah Resep Digital atau Pilih Konsultasi',
      subjudul: 'Langkah awal verifikasi kebutuhan medis pasien',
      deskripsi: 'Pasien memotret/mengunggah file resep resmi dari dokter dengan SIP aktif, atau langsung memilih sesi telemedisin dengan dokter spesialis rekanan PSEF.',
      icon: 'ri-file-upload-line',
      tipeLayanan: 'Obat Resep Digital',
      estimasiWaktu: '1 - 2 Menit',
      status: 'Aktif',
      tipsCatatan: 'Pastikan nomor SIP dokter, tanggal penulisan resep, dan identitas pasien terbaca jelas tanpa bayangan.'
    },
    {
      id: 2,
      urutan: 2,
      judul: 'Telaah Resep & Verifikasi Apoteker PJ',
      subjudul: 'Standar mutu farmasi klinis & kepatuhan Kemenkes',
      deskripsi: 'Apoteker Penanggung Jawab (APJ) memeriksa keabsahan resep, dosis obat, potensi interaksi obat, dan kesesuaian stok di apotek fulfillment terdekat.',
      icon: 'ri-shield-check-line',
      tipeLayanan: 'Obat Resep Digital',
      estimasiWaktu: '5 - 10 Menit',
      status: 'Aktif',
      tipsCatatan: 'Apoteker Penanggung Jawab akan menghubungi via Tele-PIO jika ditemukan potensi interaksi obat berbahaya.'
    },
    {
      id: 3,
      urutan: 3,
      judul: 'Konfirmasi Rincian & Pembayaran Aman',
      subjudul: 'Multi-metode pembayaran elektronik terdaftar',
      deskripsi: 'Pasien menyetujui rincian obat, etiket aturan pakai, dan ongkir rantai dingin, lalu menyelesaikan transaksi melalui QRIS, Virtual Account, atau E-Wallet.',
      icon: 'ri-secure-payment-line',
      tipeLayanan: 'Semua Layanan',
      estimasiWaktu: 'Instan',
      status: 'Aktif',
      tipsCatatan: 'Resep obat keras hanya diproses setelah pembayaran berhasil diverifikasi sistem PSEF.'
    },
    {
      id: 4,
      urutan: 4,
      judul: 'Dispensing & Pengemasan Rantai Dingin',
      subjudul: 'Segel keamanan tamper-evident & cold chain',
      deskripsi: 'Obat diracik/disiapkan di fasilitas farmasi berizin PSEF, disegel rahasia (tamper-evident), dan dikemas termal (2-8°C untuk sediaan termolabil seperti insulin).',
      icon: 'ri-box-3-line',
      tipeLayanan: 'Semua Layanan',
      estimasiWaktu: '15 - 30 Menit',
      status: 'Aktif',
      tipsCatatan: 'Kemasan insulin dan vaksin dilengkapi ice gel pack dan segel indikator pemantau suhu.'
    },
    {
      id: 5,
      urutan: 5,
      judul: 'Pengiriman Cepat & Konseling Telefarmasi',
      subjudul: 'Pelacakan kurir terpadu & layanan tanya apoteker',
      deskripsi: 'Kurir medis mengantarkan obat langsung ke alamat pasien. Setelah obat diterima, pasien mendapatkan nomor antrean konseling tele-PIO gratis.',
      icon: 'ri-e-bike-2-line',
      tipeLayanan: 'Semua Layanan',
      estimasiWaktu: 'Sameday / Instant',
      status: 'Aktif',
      tipsCatatan: 'Periksa keutuhan segel tamper-evident sebelum menandatangani bukti serah terima sediaan farmasi.'
    }
  ]);

  get filteredIcons(): CuratedIcon[] {
    const cat = this.selectedIconCategory();
    if (cat === 'Semua') return this.curatedIcons;
    return this.curatedIcons.filter(i => i.category === cat);
  }

  filteredLangkahList(): PanduanLangkah[] {
    const query = this.searchQuery().toLowerCase().trim();
    const layanan = this.filterLayanan();

    return this.langkahList()
      .slice()
      .sort((a, b) => a.urutan - b.urutan)
      .filter(item => {
        const matchQuery = !query ||
          item.judul.toLowerCase().includes(query) ||
          item.subjudul.toLowerCase().includes(query) ||
          item.deskripsi.toLowerCase().includes(query) ||
          (item.tipsCatatan && item.tipsCatatan.toLowerCase().includes(query));
        const matchLayanan = layanan === 'Semua' || item.tipeLayanan === layanan;
        return matchQuery && matchLayanan;
      });
  }

  getEmptyStep(): PanduanLangkah {
    const nextUrutan = this.langkahList ? Math.max(0, ...this.langkahList().map(s => s.urutan)) + 1 : 1;
    return {
      id: 0,
      urutan: nextUrutan,
      judul: '',
      subjudul: '',
      deskripsi: '',
      icon: 'ri-file-upload-line',
      tipeLayanan: 'Semua Layanan',
      estimasiWaktu: '5 - 10 Menit',
      status: 'Aktif',
      tipsCatatan: ''
    };
  }

  openAddModal(): void {
    this.isEditing.set(false);
    this.validationError.set('');
    this.selectedIconCategory.set('Semua');
    this.currentStep = this.getEmptyStep();
    this.showModal.set(true);
  }

  openEditModal(item: PanduanLangkah): void {
    this.isEditing.set(true);
    this.validationError.set('');
    this.selectedIconCategory.set('Semua');
    this.currentStep = { ...item };
    this.showModal.set(true);
  }

  closeModal(): void {
    this.showModal.set(false);
    this.validationError.set('');
  }

  selectIcon(iconName: string): void {
    this.currentStep.icon = iconName;
  }

  setTimePreset(time: string): void {
    this.currentStep.estimasiWaktu = time;
  }

  saveStep(): void {
    if (!this.currentStep.judul.trim()) {
      this.validationError.set('Judul langkah wajib diisi!');
      return;
    }

    if (!this.currentStep.deskripsi.trim()) {
      this.validationError.set('Deskripsi detail instruksi langkah wajib diisi!');
      return;
    }

    if (!this.currentStep.urutan || this.currentStep.urutan < 1) {
      this.validationError.set('Nomor urutan langkah harus berupa bilangan positif minimal 1.');
      return;
    }

    this.validationError.set('');

    if (this.isEditing()) {
      this.langkahList.update(list =>
        list.map(item => item.id === this.currentStep.id ? { ...this.currentStep } : item)
      );
    } else {
      const newId = Math.max(0, ...this.langkahList().map(s => s.id)) + 1;
      this.langkahList.update(list => [...list, { ...this.currentStep, id: newId }]);
    }

    this.closeModal();
  }

  toggleStatus(item: PanduanLangkah): void {
    const newStatus = item.status === 'Aktif' ? 'Nonaktif' : 'Aktif';
    this.langkahList.update(list =>
      list.map(s => s.id === item.id ? { ...s, status: newStatus } : s)
    );
  }

  openDeleteModal(item: PanduanLangkah): void {
    this.stepToDelete.set(item);
    this.showDeleteModal.set(true);
  }

  closeDeleteModal(): void {
    if (this.isDeleting()) return;
    this.showDeleteModal.set(false);
    this.stepToDelete.set(null);
  }

  confirmDelete(): void {
    const target = this.stepToDelete();
    if (!target) return;

    this.isDeleting.set(true);

    setTimeout(() => {
      const targetId = target.id;
      const targetUrutan = target.urutan;
      const targetJudul = target.judul;

      if (this.autoReorderAfterDelete()) {
        this.langkahList.update(list => {
          const remaining = list
            .filter(item => item.id !== targetId)
            .sort((a, b) => a.urutan - b.urutan);

          return remaining.map((item, index) => ({
            ...item,
            urutan: index + 1
          }));
        });
      } else {
        this.langkahList.update(list => list.filter(item => item.id !== targetId));
      }

      this.isDeleting.set(false);
      this.closeDeleteModal();
      this.showToast(`Langkah #${targetUrutan} "${targetJudul}" berhasil dihapus dari panduan.`, 'success');
    }, 280);
  }

  deleteStep(id: number): void {
    const item = this.langkahList().find(s => s.id === id);
    if (item) {
      this.openDeleteModal(item);
    }
  }

  showToast(message: string, type: 'success' | 'danger' | 'info' = 'success'): void {
    this.toastMessage.set(message);
    this.toastType.set(type);
    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
    }
    this.toastTimer = setTimeout(() => {
      this.toastMessage.set('');
    }, 3800);
  }

  moveUp(item: PanduanLangkah): void {
    const sorted = [...this.langkahList()].sort((a, b) => a.urutan - b.urutan);
    const index = sorted.findIndex(s => s.id === item.id);
    if (index > 0) {
      const prev = sorted[index - 1];
      const temp = item.urutan;
      item.urutan = prev.urutan;
      prev.urutan = temp;
      this.langkahList.update(list =>
        list.map(s => {
          if (s.id === item.id) return { ...s, urutan: item.urutan };
          if (s.id === prev.id) return { ...s, urutan: prev.urutan };
          return s;
        })
      );
    }
  }

  moveDown(item: PanduanLangkah): void {
    const sorted = [...this.langkahList()].sort((a, b) => a.urutan - b.urutan);
    const index = sorted.findIndex(s => s.id === item.id);
    if (index < sorted.length - 1) {
      const next = sorted[index + 1];
      const temp = item.urutan;
      item.urutan = next.urutan;
      next.urutan = temp;
      this.langkahList.update(list =>
        list.map(s => {
          if (s.id === item.id) return { ...s, urutan: item.urutan };
          if (s.id === next.id) return { ...s, urutan: next.urutan };
          return s;
        })
      );
    }
  }
}
