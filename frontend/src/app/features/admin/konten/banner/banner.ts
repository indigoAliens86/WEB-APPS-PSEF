import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BannerService, BannerItem } from './banner.service';

export type { BannerItem };

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './banner.html',
  styleUrl: './banner.css',
})
export class Banner {
  private readonly router = inject(Router);
  private readonly bannerService = inject(BannerService);

  searchQuery = signal<string>('');
  filterPosisi = signal<string>('Semua');
  filterStatus = signal<string>('Semua');

  // Modal State for Soft Delete (Deactivation) & Analytics Protection
  showDeleteModal = signal<boolean>(false);
  selectedBanner = signal<BannerItem | null>(null);
  deleteMode = signal<'deactivate' | 'permanent'>('deactivate');
  isProcessing = signal<boolean>(false);

  // Toast feedback
  toastMessage = signal<string>('');
  toastType = signal<'success' | 'danger' | 'info' | 'warning'>('success');
  private toastTimer: any = null;

  get bannerList(): BannerItem[] {
    return this.bannerService.bannerList();
  }

  // Dynamic KPI Stats: Total impressions and clicks persist even if banners are deactivated!
  get kpiStats() {
    const list = this.bannerList;
    const activeCount = list.filter(b => b.status === 'Aktif').length;
    const totalClicks = list.reduce((acc, b) => acc + (b.totalKlik || 0), 0);
    const totalImpressions = list.reduce((acc, b) => acc + (b.totalImpresi || 0), 0);
    const avgCtr = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(2) + '%' : '0.00%';

    return [
      { label: 'Banner Aktif Tayang', value: `${activeCount}`, icon: 'ri-slideshow-3-line', color: 'blue' },
      { label: 'Total Klik Kampanye', value: totalClicks.toLocaleString('id-ID'), icon: 'ri-cursor-line', color: 'emerald' },
      { label: 'CTR Rata-rata', value: avgCtr, icon: 'ri-percent-line', color: 'amber' },
      { label: 'Total Impresi Tampil', value: totalImpressions.toLocaleString('id-ID'), icon: 'ri-eye-line', color: 'indigo' }
    ];
  }

  filteredBannerList(): BannerItem[] {
    const q = this.searchQuery().toLowerCase().trim();
    const pos = this.filterPosisi();
    const st = this.filterStatus();

    return this.bannerList.filter(item => {
      const matchQ = !q ||
        item.judul.toLowerCase().includes(q) ||
        item.subjudul.toLowerCase().includes(q) ||
        item.targetUrl.toLowerCase().includes(q);
      const matchPos = pos === 'Semua' || item.posisi === pos;
      const matchSt = st === 'Semua' || item.status === st;
      return matchQ && matchPos && matchSt;
    });
  }

  goToTambah(): void {
    this.router.navigate(['/admin/konten/banner/tambah']);
  }

  goToDetail(id: number): void {
    this.router.navigate(['/admin/konten/banner/detail', id]);
  }

  goToEdit(id: number): void {
    this.router.navigate(['/admin/konten/banner/edit', id]);
  }

  toggleStatus(item: BannerItem): void {
    this.bannerService.toggleStatus(item.id);
    const updated = this.bannerService.getBannerById(item.id);
    const isNowActive = updated?.status === 'Aktif';
    this.showToast(
      `Status banner "${item.judul}" diubah menjadi ${isNowActive ? 'Aktif (Sedang Tayang)' : 'Nonaktif (Arsip)'}.`,
      isNowActive ? 'success' : 'info'
    );
  }

  calculateItemCtr(item: BannerItem): string {
    if (!item.totalImpresi || item.totalImpresi === 0) return '0.00%';
    return ((item.totalKlik / item.totalImpresi) * 100).toFixed(2) + '%';
  }

  openDeleteModal(item: BannerItem): void {
    this.selectedBanner.set(item);
    // Default to 'deactivate' to preserve marketing & analytics data
    this.deleteMode.set('deactivate');
    this.showDeleteModal.set(true);
  }

  closeDeleteModal(): void {
    if (this.isProcessing()) return;
    this.showDeleteModal.set(false);
    this.selectedBanner.set(null);
  }

  setDeleteMode(mode: 'deactivate' | 'permanent'): void {
    this.deleteMode.set(mode);
  }

  confirmAction(): void {
    const item = this.selectedBanner();
    if (!item) return;

    this.isProcessing.set(true);

    setTimeout(() => {
      if (this.deleteMode() === 'deactivate') {
        // Soft delete: Deactivate to preserve historical campaign analytics
        this.bannerService.deactivateBanner(item.id);
        this.showToast(
          `Banner "${item.judul}" berhasil dinonaktifkan. Data analitik (${item.totalImpresi.toLocaleString('id-ID')} impresi, ${item.totalKlik.toLocaleString('id-ID')} klik) tetap aman tersimpan.`,
          'success'
        );
      } else {
        // Hard delete: Permanent deletion
        this.bannerService.deleteBanner(item.id);
        this.showToast(
          `Banner "${item.judul}" telah dihapus secara permanen dari basis data PSEF.`,
          'danger'
        );
      }

      this.isProcessing.set(false);
      this.closeDeleteModal();
    }, 280);
  }

  deleteBanner(id: number): void {
    const item = this.bannerService.getBannerById(id);
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
