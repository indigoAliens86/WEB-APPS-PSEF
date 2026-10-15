import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BannerService, BannerItem, GradientOption } from '../banner.service';

@Component({
  selector: 'app-tambah-banner',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tambah-banner.html',
  styleUrl: './tambah-banner.css',
})
export class TambahBanner {
  private readonly router = inject(Router);
  private readonly bannerService = inject(BannerService);

  readonly gradientPresets: GradientOption[] = this.bannerService.gradientPresets;

  formData: Omit<BannerItem, 'id'> = {
    judul: '',
    subjudul: '',
    posisi: 'Hero Slider Beranda',
    targetUrl: '/admin/pesanan',
    urutan: 1,
    tanggalMulai: '15 Okt 2026',
    tanggalSelesai: '31 Des 2026',
    totalKlik: 0,
    totalImpresi: 0,
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80',
    gradientBg: 'linear-gradient(135deg, #0284c7 0%, #1e40af 100%)',
    status: 'Aktif',
    ctaText: 'Tebus Resep Sekarang'
  };

  previewDevice = signal<'desktop' | 'mobile'>('desktop');
  uploadedFileName = signal<string>('default-banner.webp');
  uploadedFileSize = signal<string>('340 KB');
  uploadErrorMessage = signal<string>('');
  isDragging = signal<boolean>(false);
  showUrlInput = signal<boolean>(false);
  errorMessage = signal<string>('');

  posisiOptions: BannerItem['posisi'][] = [
    'Hero Slider Beranda',
    'Promo Spesial Obat',
    'Banner Telefarmasi',
    'Popup Pengumuman'
  ];

  selectGradient(gradient: GradientOption): void {
    this.formData.gradientBg = gradient.value;
  }

  // File Upload Handlers
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      this.processFile(file);
    }
    input.value = '';
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(true);
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);
  }

  onFileDropped(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);

    const file = event.dataTransfer?.files?.[0];
    if (file) {
      this.processFile(file);
    }
  }

  private processFile(file: File): void {
    if (!file.type.startsWith('image/')) {
      this.uploadErrorMessage.set('Format berkas tidak valid. Harap pilih gambar (JPG, PNG, WEBP, atau SVG).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      this.uploadErrorMessage.set('Ukuran gambar melebihi batas 5MB.');
      return;
    }

    this.uploadErrorMessage.set('');
    this.uploadedFileName.set(file.name);
    const sizeKB = Math.round(file.size / 1024);
    this.uploadedFileSize.set(file.size > 1024 * 1024 ? (file.size / (1024 * 1024)).toFixed(1) + ' MB' : `${sizeKB} KB`);

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        this.formData.imageUrl = e.target.result as string;
      }
    };
    reader.readAsDataURL(file);
  }

  removeImage(): void {
    this.formData.imageUrl = '';
    this.uploadedFileName.set('');
    this.uploadedFileSize.set('');
    this.uploadErrorMessage.set('');
  }

  onImageError(): void {
    this.formData.imageUrl = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80';
  }

  goBack(): void {
    this.router.navigate(['/admin/konten']);
  }

  saveBanner(): void {
    if (!this.formData.judul.trim()) {
      this.errorMessage.set('Judul utama banner wajib diisi!');
      return;
    }

    if (!this.formData.imageUrl.trim()) {
      this.errorMessage.set('Gambar visual banner wajib diunggah atau diisi URL-nya!');
      return;
    }

    this.errorMessage.set('');
    const created = this.bannerService.addBanner(this.formData);
    this.router.navigate(['/admin/konten/banner/detail', created.id]);
  }
}
