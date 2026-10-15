import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface FaqItem {
  id: number;
  pertanyaan: string;
  jawaban: string;
  kategori: 'Resep & Obat' | 'Telemedisin' | 'Pembayaran' | 'Pengiriman' | 'Regulasi PSEF';
  urutan: number;
  status: 'Aktif' | 'Nonaktif';
  terbuka?: boolean;
  viewsCount: number;
  helpfulCount: number;
  updatedAt: string;
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './faq.html',
  styleUrl: './faq.css',
})
export class Faq {
  searchQuery = signal<string>('');
  filterKategori = signal<string>('Semua');
  filterStatus = signal<string>('Semua');

  // Form Modal State (Tambah / Edit)
  showFormModal = signal<boolean>(false);
  isEditing = signal<boolean>(false);
  formSubmitted = signal<boolean>(false);
  currentFaq: FaqItem = {
    id: 0,
    pertanyaan: '',
    jawaban: '',
    kategori: 'Resep & Obat',
    urutan: 1,
    status: 'Aktif',
    viewsCount: 0,
    helpfulCount: 100,
    updatedAt: 'Hari ini'
  };

  // Delete Modal State (Soft Deactivate vs Permanent)
  showDeleteModal = signal<boolean>(false);
  selectedFaq = signal<FaqItem | null>(null);
  deleteMode = signal<'deactivate' | 'permanent'>('deactivate');
  isProcessing = signal<boolean>(false);

  // Toast feedback
  toastMessage = signal<string>('');
  toastType = signal<'success' | 'danger' | 'info' | 'warning'>('success');
  private toastTimer: any = null;

  faqList = signal<FaqItem[]>([
    {
      id: 1,
      pertanyaan: 'Apakah resep dokter dalam bentuk foto atau PDF sah ditebus di platform PSEF?',
      jawaban: 'Ya, sah sesuai Permenkes No. 14 Tahun 2021. Setiap resep yang diunggah akan diverifikasi langsung oleh Apoteker Penanggung Jawab (APJ) berlisensi SIPA aktif untuk memastikan keaslian SIP dokter, tanggal peresepan, serta tidak termasuk kategori obat yang dilarang diserahkan secara elektronik.',
      kategori: 'Resep & Obat',
      urutan: 1,
      status: 'Aktif',
      terbuka: true,
      viewsCount: 14850,
      helpfulCount: 97,
      updatedAt: '12 Okt 2026'
    },
    {
      id: 2,
      pertanyaan: 'Obat apa saja yang TIDAK BISA dibeli atau ditebus secara online di PSEF?',
      jawaban: 'Sesuai regulasi Badan POM dan Kemenkes RI, platform PSEF dilarang keras melayani penyerahan obat golongan Narkotika, Psikotropika, Prekursor Farmasi tertentu, serta Obat-Obat Tertentu (OOT). Pasien yang membutuhkan golongan tersebut harus berkonsultasi dan mengambil langsung di apotek fisik/rumah sakit rujukan.',
      kategori: 'Regulasi PSEF',
      urutan: 2,
      status: 'Aktif',
      terbuka: false,
      viewsCount: 19420,
      helpfulCount: 99,
      updatedAt: '08 Okt 2026'
    },
    {
      id: 3,
      pertanyaan: 'Bagaimana keamanan sediaan obat yang membutuhkan suhu khusus (rantai dingin)?',
      jawaban: 'Obat termolabil seperti Insulin, Vaksin, dan serum antibodi dikemas menggunakan kantong termal khusus (cool bag) dilengkapi ice gel pack yang menjaga suhu stabil 2°C hingga 8°C selama durasi pengiriman instan (maksimal 2 jam perjalanan kurir medis).',
      kategori: 'Pengiriman',
      urutan: 3,
      status: 'Aktif',
      terbuka: false,
      viewsCount: 8640,
      helpfulCount: 95,
      updatedAt: '05 Okt 2026'
    },
    {
      id: 4,
      pertanyaan: 'Apakah saya bisa berkonsultasi dengan apoteker setelah obat saya terima?',
      jawaban: 'Tentu. Platform PSEF menyediakan layanan Pelayanan Informasi Obat (PIO) gratis melalui Telefarmasi. Anda dapat menekan tombol "Konsultasi Apoteker" di detail pesanan Anda untuk menanyakan cara minum, efek samping, dan cara penyimpanan.',
      kategori: 'Telemedisin',
      urutan: 4,
      status: 'Aktif',
      terbuka: false,
      viewsCount: 6210,
      helpfulCount: 93,
      updatedAt: '01 Okt 2026'
    },
    {
      id: 5,
      pertanyaan: 'Bagaimana prosedur pengembalian dana (refund) jika resep ditolak apoteker?',
      jawaban: 'Jika resep tidak dapat diproses (misal: stok habis di apotek rekanan atau terdapat kontraindikasi klinis), dana Anda akan dikembalikan 100% ke rekening asal / e-wallet dalam waktu 1x24 jam kerja tanpa potongan biaya admin.',
      kategori: 'Pembayaran',
      urutan: 5,
      status: 'Aktif',
      terbuka: false,
      viewsCount: 5120,
      helpfulCount: 91,
      updatedAt: '28 Sep 2026'
    }
  ]);

  // Dynamic KPI Stats: Analytics persist even if FAQs are deactivated!
  get kpiStats() {
    const list = this.faqList();
    const activeCount = list.filter(f => f.status === 'Aktif').length;
    const totalViews = list.reduce((acc, f) => acc + (f.viewsCount || 0), 0);
    const avgHelpful = list.length > 0 
      ? Math.round(list.reduce((acc, f) => acc + (f.helpfulCount || 90), 0) / list.length) 
      : 95;

    return [
      { label: 'Total Butir FAQ', value: `${list.length} Butir`, icon: 'ri-questionnaire-line', color: 'blue' },
      { label: 'FAQ Aktif Tayang', value: `${activeCount} Aktif`, icon: 'ri-checkbox-circle-line', color: 'emerald' },
      { label: 'Total Dibaca Pasien', value: totalViews.toLocaleString('id-ID') + 'x', icon: 'ri-eye-line', color: 'indigo' },
      { label: 'Rata-rata Terbantu', value: `${avgHelpful}% Pasien`, icon: 'ri-thumb-up-line', color: 'amber' }
    ];
  }

  filteredFaqList(): FaqItem[] {
    const q = this.searchQuery().toLowerCase().trim();
    const kat = this.filterKategori();
    const st = this.filterStatus();

    return this.faqList().filter(item => {
      const matchQ = !q ||
        item.pertanyaan.toLowerCase().includes(q) ||
        item.jawaban.toLowerCase().includes(q);
      const matchKat = kat === 'Semua' || item.kategori === kat;
      const matchSt = st === 'Semua' || item.status === st;
      return matchQ && matchKat && matchSt;
    });
  }

  getEmptyFaq(): FaqItem {
    const list = this.faqList && typeof this.faqList === 'function' ? this.faqList() : [];
    const maxUrutan = list.length > 0
      ? Math.max(...list.map(f => f.urutan || 0))
      : 0;

    return {
      id: 0,
      pertanyaan: '',
      jawaban: '',
      kategori: 'Resep & Obat',
      urutan: maxUrutan + 1,
      status: 'Aktif',
      viewsCount: 0,
      helpfulCount: 100,
      updatedAt: 'Hari ini'
    };
  }

  toggleAccordion(item: FaqItem): void {
    this.faqList.update(list =>
      list.map(f => f.id === item.id ? { ...f, terbuka: !f.terbuka } : f)
    );
  }

  expandAll(): void {
    this.faqList.update(list => list.map(f => ({ ...f, terbuka: true })));
  }

  collapseAll(): void {
    this.faqList.update(list => list.map(f => ({ ...f, terbuka: false })));
  }

  openAddModal(): void {
    this.isEditing.set(false);
    this.formSubmitted.set(false);
    this.currentFaq = this.getEmptyFaq();
    this.showFormModal.set(true);
  }

  openEditModal(item: FaqItem): void {
    this.isEditing.set(true);
    this.formSubmitted.set(false);
    this.currentFaq = { ...item };
    this.showFormModal.set(true);
  }

  closeFormModal(): void {
    this.showFormModal.set(false);
  }

  saveFaq(): void {
    this.formSubmitted.set(true);
    if (!this.currentFaq.pertanyaan.trim() || !this.currentFaq.jawaban.trim()) {
      return;
    }

    if (this.isEditing()) {
      this.faqList.update(list =>
        list.map(f => f.id === this.currentFaq.id ? {
          ...this.currentFaq,
          pertanyaan: this.currentFaq.pertanyaan.trim(),
          jawaban: this.currentFaq.jawaban.trim(),
          updatedAt: 'Hari ini'
        } : f)
      );
      this.showToast(
        `FAQ "${this.currentFaq.pertanyaan.substring(0, 36)}..." berhasil diperbarui.`,
        'success'
      );
    } else {
      const nextId = Math.max(0, ...this.faqList().map(f => f.id)) + 1;
      const newFaq: FaqItem = {
        ...this.currentFaq,
        id: nextId,
        pertanyaan: this.currentFaq.pertanyaan.trim(),
        jawaban: this.currentFaq.jawaban.trim(),
        viewsCount: 0,
        helpfulCount: 100,
        updatedAt: 'Hari ini',
        terbuka: false
      };
      this.faqList.update(list => [newFaq, ...list]);
      this.showToast('Butir FAQ baru berhasil ditambahkan ke pusat bantuan pasien.', 'success');
    }

    this.closeFormModal();
  }

  toggleStatus(item: FaqItem): void {
    const isNowActive = item.status !== 'Aktif';
    const s = isNowActive ? 'Aktif' : 'Nonaktif';
    this.faqList.update(list =>
      list.map(f => f.id === item.id ? { ...f, status: s } : f)
    );
    this.showToast(
      `Status FAQ diubah menjadi ${isNowActive ? 'Aktif (Tampil Publik)' : 'Nonaktif (Arsip)'}.`,
      isNowActive ? 'success' : 'info'
    );
  }

  // Delete / Soft Deactivate Modal Handlers
  openDeleteModal(item: FaqItem): void {
    this.selectedFaq.set(item);
    // Default to 'deactivate' to preserve helpfulness and views analytics!
    this.deleteMode.set('deactivate');
    this.showDeleteModal.set(true);
  }

  closeDeleteModal(): void {
    if (this.isProcessing()) return;
    this.showDeleteModal.set(false);
    this.selectedFaq.set(null);
  }

  setDeleteMode(mode: 'deactivate' | 'permanent'): void {
    this.deleteMode.set(mode);
  }

  confirmDeleteAction(): void {
    const item = this.selectedFaq();
    if (!item) return;

    this.isProcessing.set(true);

    setTimeout(() => {
      if (this.deleteMode() === 'deactivate') {
        // Soft delete: Deactivate to preserve historical analytics
        this.faqList.update(list =>
          list.map(f => f.id === item.id ? { ...f, status: 'Nonaktif' } : f)
        );
        this.showToast(
          `FAQ berhasil dinonaktifkan. Data analitik (${item.viewsCount.toLocaleString('id-ID')} pembaca, ${item.helpfulCount}% terbantu) tetap aman tersimpan.`,
          'success'
        );
      } else {
        // Hard delete: Permanent deletion
        this.faqList.update(list => list.filter(f => f.id !== item.id));
        this.showToast(
          `FAQ "${item.pertanyaan.substring(0, 36)}..." telah dihapus secara permanen dari basis data PSEF.`,
          'danger'
        );
      }

      this.isProcessing.set(false);
      this.closeDeleteModal();
    }, 280);
  }

  showToast(message: string, type: 'success' | 'danger' | 'info' | 'warning' = 'success'): void {
    this.toastMessage.set(message);
    this.toastType.set(type);
    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
    }
    this.toastTimer = setTimeout(() => {
      this.toastMessage.set('');
    }, 4000);
  }
}

