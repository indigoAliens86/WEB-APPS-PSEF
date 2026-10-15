import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BannerService, BannerItem } from '../banner.service';

@Component({
  selector: 'app-detail-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail-banner.html',
  styleUrl: './detail-banner.css',
})
export class DetailBanner implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly bannerService = inject(BannerService);

  banner = signal<BannerItem | null>(null);
  previewDevice = signal<'desktop' | 'mobile'>('desktop');
  copiedAlert = signal<boolean>(false);

  // Modal State for Soft Delete (Deactivation) & Analytics Protection
  showDeleteModal = signal<boolean>(false);
  deleteMode = signal<'deactivate' | 'permanent'>('deactivate');
  isProcessing = signal<boolean>(false);

  // Toast feedback
  toastMessage = signal<string>('');
  toastType = signal<'success' | 'danger' | 'info' | 'warning'>('success');
  private toastTimer: any = null;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idStr = params.get('id');
      const id = idStr ? Number(idStr) : 1;
      const found = this.bannerService.getBannerById(id) || this.bannerService.bannerList()[0] || null;
      this.banner.set(found);
    });
  }

  get calculatedCtr(): string {
    const b = this.banner();
    if (!b || b.totalImpresi === 0) return '0.00%';
    const ctr = (b.totalKlik / b.totalImpresi) * 100;
    return `${ctr.toFixed(2)}%`;
  }

  goBack(): void {
    this.router.navigate(['/admin/konten']);
  }

  goToEdit(): void {
    const item = this.banner();
    if (item) {
      this.router.navigate(['/admin/konten/banner/edit', item.id]);
    }
  }

  toggleStatus(): void {
    const item = this.banner();
    if (item) {
      this.bannerService.toggleStatus(item.id);
      const updated = this.bannerService.getBannerById(item.id);
      if (updated) {
        this.banner.set({ ...updated });
        const isNowActive = updated.status === 'Aktif';
        this.showToast(
          `Status banner diubah menjadi ${isNowActive ? 'Aktif (Sedang Tayang)' : 'Nonaktif (Arsip)'}.`,
          isNowActive ? 'success' : 'info'
        );
      }
    }
  }

  openDeleteModal(): void {
    // Default to 'deactivate' to preserve marketing & analytics data
    this.deleteMode.set('deactivate');
    this.showDeleteModal.set(true);
  }

  closeDeleteModal(): void {
    if (this.isProcessing()) return;
    this.showDeleteModal.set(false);
  }

  setDeleteMode(mode: 'deactivate' | 'permanent'): void {
    this.deleteMode.set(mode);
  }

  confirmAction(): void {
    const item = this.banner();
    if (!item) return;

    this.isProcessing.set(true);

    setTimeout(() => {
      if (this.deleteMode() === 'deactivate') {
        // Soft delete: Deactivate to preserve historical campaign analytics
        this.bannerService.deactivateBanner(item.id);
        const updated = this.bannerService.getBannerById(item.id);
        if (updated) {
          this.banner.set({ ...updated });
        }
        this.showToast(
          `Banner "${item.judul}" berhasil dinonaktifkan. Data analitik (${item.totalImpresi.toLocaleString('id-ID')} impresi, ${item.totalKlik.toLocaleString('id-ID')} klik) tetap aman tersimpan.`,
          'success'
        );
        this.isProcessing.set(false);
        this.closeDeleteModal();
      } else {
        // Hard delete: Permanent deletion
        this.bannerService.deleteBanner(item.id);
        this.isProcessing.set(false);
        this.closeDeleteModal();
        this.router.navigate(['/admin/konten']);
      }
    }, 280);
  }

  deleteBanner(): void {
    this.openDeleteModal();
  }

  copyLink(): void {
    const item = this.banner();
    if (item) {
      navigator.clipboard?.writeText(item.targetUrl);
      this.copiedAlert.set(true);
      setTimeout(() => this.copiedAlert.set(false), 2500);
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
