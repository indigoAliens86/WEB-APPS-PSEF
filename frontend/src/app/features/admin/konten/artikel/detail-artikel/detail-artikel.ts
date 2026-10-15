import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtikelService, ArtikelItem } from '../artikel.service';

@Component({
  selector: 'app-detail-artikel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail-artikel.html',
  styleUrl: './detail-artikel.css',
})
export class DetailArtikel implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly artikelService = inject(ArtikelService);

  artikel = signal<ArtikelItem | null>(null);
  copiedAlert = signal<boolean>(false);

  showDeleteModal = signal<boolean>(false);
  deleteMode = signal<'deactivate' | 'permanent'>('deactivate');
  isProcessing = signal<boolean>(false);
  toastMessage = signal<string>('');
  toastType = signal<'success' | 'danger' | 'info' | 'warning'>('success');
  private toastTimer: any = null;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idStr = params.get('id');
      const id = idStr ? Number(idStr) : 1;
      const found = this.artikelService.getArticleById(id) || this.artikelService.artikelList()[0] || null;
      this.artikel.set(found);
    });
  }

  goBack(): void {
    this.router.navigate(['/admin/konten']);
  }

  goToEdit(): void {
    const item = this.artikel();
    if (item) {
      this.router.navigate(['/admin/konten/artikel/edit', item.id]);
    }
  }

  toggleStatus(): void {
    const item = this.artikel();
    if (item) {
      this.artikelService.togglePublishStatus(item.id);
      const updated = this.artikelService.getArticleById(item.id);
      if (updated) {
        this.artikel.set({ ...updated });
        this.showToast(`Status artikel diubah menjadi ${updated.status}.`, 'info');
      }
    }
  }

  openDeleteModal(): void {
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
    const item = this.artikel();
    if (!item) return;

    this.isProcessing.set(true);

    setTimeout(() => {
      if (this.deleteMode() === 'deactivate') {
        this.artikelService.deactivateArticle(item.id);
        const updated = this.artikelService.getArticleById(item.id);
        if (updated) {
          this.artikel.set({ ...updated });
        }
        this.isProcessing.set(false);
        this.closeDeleteModal();
        this.showToast(
          `Artikel "${item.judul}" berhasil dinonaktifkan. Data analitik (${item.views.toLocaleString('id-ID')} views) tetap aman tersimpan.`,
          'success'
        );
      } else {
        this.artikelService.deleteArticle(item.id);
        this.isProcessing.set(false);
        this.closeDeleteModal();
        this.router.navigate(['/admin/konten']);
      }
    }, 280);
  }

  deleteArtikel(): void {
    this.openDeleteModal();
  }

  copyArticleUrl(): void {
    const item = this.artikel();
    if (item) {
      const url = `${window.location.origin}/artikel/${item.slug}`;
      navigator.clipboard?.writeText(url);
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
