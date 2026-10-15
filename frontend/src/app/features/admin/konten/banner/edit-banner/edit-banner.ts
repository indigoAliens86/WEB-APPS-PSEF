import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BannerService, BannerItem, GradientOption } from '../banner.service';

@Component({
  selector: 'app-edit-banner',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-banner.html',
  styleUrl: './edit-banner.css',
})
export class EditBanner implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly bannerService = inject(BannerService);

  readonly gradientPresets: GradientOption[] = this.bannerService.gradientPresets;

  bannerId: number = 0;
  formData: BannerItem = {
    id: 0,
    judul: '',
    subjudul: '',
    posisi: 'Hero Slider Beranda',
    targetUrl: '',
    urutan: 1,
    tanggalMulai: '',
    tanggalSelesai: '',
    totalKlik: 0,
    totalImpresi: 0,
    imageUrl: '',
    gradientBg: 'linear-gradient(135deg, #0284c7 0%, #1e40af 100%)',
    status: 'Aktif',
    ctaText: 'Tebus Sekarang'
  };

  previewDevice = signal<'desktop' | 'mobile'>('desktop');
  uploadedFileName = signal<string>('banner-visual.webp');
  uploadedFileSize = signal<string>('420 KB');
  uploadErrorMessage = signal<string>('');
  isDragging = signal<boolean>(false);
  showUrlInput = signal<boolean>(false);
  errorMessage = signal<string>('');
  successMessage = signal<string>('');

  posisiOptions: BannerItem['posisi'][] = [
    'Hero Slider Beranda',
    'Promo Spesial Obat',
    'Banner Telefarmasi',
    'Popup Pengumuman'
  ];

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idStr = params.get('id');
      const id = idStr ? Number(idStr) : 1;
      this.bannerId = id;
      const found = this.bannerService.getBannerById(id);
      if (found) {
        this.formData = { ...found };
        if (!this.formData.ctaText) {
          this.formData.ctaText = 'Lihat Penawaran';
        }
      } else {
        // Fallback to first banner
        const first = this.bannerService.bannerList()[0];
        if (first) {
          this.formData = { ...first };
          this.bannerId = first.id;
        }
      }
    });
  }

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

  goToDetail(): void {
    this.router.navigate(['/admin/konten/banner/detail', this.bannerId]);
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
    this.bannerService.updateBanner(this.bannerId, this.formData);
    this.successMessage.set('Perubahan banner berhasil disimpan!');
    setTimeout(() => {
      this.router.navigate(['/admin/konten/banner/detail', this.bannerId]);
    }, 700);
  }
}
