import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ArtikelService, ArtikelItem } from './artikel.service';

export type { ArtikelItem };

@Component({
  selector: 'app-artikel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './artikel.html',
  styleUrl: './artikel.css',
})
export class Artikel {
  private readonly router = inject(Router);
  private readonly artikelService = inject(ArtikelService);

  searchQuery = signal<string>('');
  filterKategori = signal<string>('Semua');
  filterStatus = signal<string>('Semua');

  // Deactivate / Delete Modal State
  showDeleteModal = signal<boolean>(false);
  selectedArticle = signal<ArtikelItem | null>(null);
  deleteMode = signal<'deactivate' | 'permanent'>('deactivate');
  isProcessing = signal<boolean>(false);

  // Toast Notification State
  toastMessage = signal<string>('');
  toastType = signal<'success' | 'danger' | 'info' | 'warning'>('success');
  private toastTimer: any = null;

  get artikelList(): ArtikelItem[] {
    return this.artikelService.artikelList();
  }

  get kpiStats() {
    return [
      { label: 'Total Artikel Terdata', value: this.artikelList.length.toString(), icon: 'ri-article-fill', color: 'blue' },
      { label: 'Artikel Diterbitkan', value: this.publishedCount.toString(), icon: 'ri-checkbox-circle-fill', color: 'emerald' },
      { label: 'Draf & Nonaktif', value: this.draftOrInactiveCount.toString(), icon: 'ri-draft-fill', color: 'amber' },
      { label: 'Total Pembaca (Views)', value: this.totalViewsFormatted, icon: 'ri-eye-fill', color: 'indigo' }
    ];
  }

  get totalViewsFormatted(): string {
    const total = this.artikelList.reduce((acc, a) => acc + (a.views || 0), 0);
    if (total >= 1000) {
      return (total / 1000).toFixed(1) + 'K';
    }
    return total.toLocaleString('id-ID');
  }

  get publishedCount(): number {
    return this.artikelList.filter(a => a.status === 'Diterbitkan').length;
  }

  get draftOrInactiveCount(): number {
    return this.artikelList.filter(a => a.status !== 'Diterbitkan').length;
  }

  filteredArtikelList(): ArtikelItem[] {
    const q = this.searchQuery().toLowerCase().trim();
    const kat = this.filterKategori();
    const st = this.filterStatus();

    return this.artikelList.filter(item => {
      const matchQ = !q ||
        item.judul.toLowerCase().includes(q) ||
        item.penulis.toLowerCase().includes(q) ||
        item.ringkasan.toLowerCase().includes(q) ||
        item.tags.some(t => t.toLowerCase().includes(q));
      const matchKat = kat === 'Semua' || item.kategori === kat;
      const matchSt = st === 'Semua' || item.status === st;
      return matchQ && matchKat && matchSt;
    });
  }

  goToTambah(): void {
    this.router.navigate(['/admin/konten/artikel/tambah']);
  }

  goToDetail(id: number): void {
    this.router.navigate(['/admin/konten/artikel/detail', id]);
  }

  goToEdit(id: number): void {
    this.router.navigate(['/admin/konten/artikel/edit', id]);
  }

  togglePublishStatus(item: ArtikelItem): void {
    this.artikelService.togglePublishStatus(item.id);
    const updated = this.artikelService.getArticleById(item.id);
    if (updated) {
      const isNowPublished = updated.status === 'Diterbitkan';
      this.showToast(
        `Status artikel "${item.judul}" diubah menjadi ${updated.status}.`,
        isNowPublished ? 'success' : 'info'
      );
    }
  }

  openDeleteModal(item: ArtikelItem): void {
    this.selectedArticle.set(item);
    // Default to 'deactivate' to preserve analytics data as requested!
    this.deleteMode.set('deactivate');
    this.showDeleteModal.set(true);
  }

  closeDeleteModal(): void {
    if (this.isProcessing()) return;
    this.showDeleteModal.set(false);
    this.selectedArticle.set(null);
  }

  setDeleteMode(mode: 'deactivate' | 'permanent'): void {
    this.deleteMode.set(mode);
  }

  confirmAction(): void {
    const item = this.selectedArticle();
    if (!item) return;

    this.isProcessing.set(true);

    setTimeout(() => {
      if (this.deleteMode() === 'deactivate') {
        // Soft delete: Deactivate to preserve historical analytics
        this.artikelService.deactivateArticle(item.id);
        this.showToast(
          `Artikel "${item.judul}" berhasil dinonaktifkan. Data analitik (${item.views.toLocaleString('id-ID')} views) tetap aman tersimpan.`,
          'success'
        );
      } else {
        // Hard delete: Permanent deletion
        this.artikelService.deleteArticle(item.id);
        this.showToast(
          `Artikel "${item.judul}" telah dihapus secara permanen dari basis data PSEF.`,
          'danger'
        );
      }

      this.isProcessing.set(false);
      this.closeDeleteModal();
    }, 280);
  }

  deleteArtikel(id: number): void {
    const item = this.artikelService.getArticleById(id);
    if (item) {
      this.openDeleteModal(item);
    }
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
