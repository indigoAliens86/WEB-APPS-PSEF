import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ArtikelService, ArtikelItem } from '../artikel.service';

@Component({
  selector: 'app-tambah-artikel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tambah-artikel.html',
  styleUrl: './tambah-artikel.css',
})
export class TambahArtikel {
  private readonly router = inject(Router);
  private readonly artikelService = inject(ArtikelService);

  formData: Omit<ArtikelItem, 'id'> = {
    judul: '',
    slug: '',
    kategori: 'Edukasi Obat',
    penulis: 'apt. Rina Meilani, S.Farm',
    peranPenulis: 'Apoteker Penanggung Jawab PSEF (SIPA: 19920412/SIPA-3171/2023)',
    ringkasan: '',
    konten: '',
    tags: ['Kesehatan', 'PSEF', 'Edukasi Obat'],
    tanggalPublikasi: '',
    views: 0,
    waktuBaca: '4 Menit',
    status: 'Diterbitkan',
    coverUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80'
  };

  newTagInput = signal<string>('');
  isSlugCustomized = signal<boolean>(false);
  errorMessage = signal<string>('');

  kategoriOptions = [
    'Edukasi Obat',
    'Kesehatan Umum',
    'Penyakit Kronis',
    'Tips Apoteker',
    'Regulasi PSEF'
  ];

  statusOptions = [
    { value: 'Diterbitkan', label: 'Diterbitkan (Published Langsung)', desc: 'Artikel langsung tayang pada aplikasi pasien' },
    { value: 'Draf', label: 'Draf Internal', desc: 'Disimpan tanpa tayang ke publik' },
    { value: 'Menunggu Review', label: 'Menunggu Telaah Medis', desc: 'Menunggu verifikasi APJ / Dokter' }
  ];

  onTitleChange(newTitle: string): void {
    this.formData.judul = newTitle;
    if (!this.isSlugCustomized()) {
      this.formData.slug = this.artikelService.generateSlug(newTitle);
    }
  }

  onSlugChange(newSlug: string): void {
    this.isSlugCustomized.set(true);
    this.formData.slug = this.artikelService.generateSlug(newSlug);
  }

  addTag(): void {
    const tag = this.newTagInput().trim().replace(/^#/, '');
    if (tag && !this.formData.tags.includes(tag)) {
      this.formData.tags.push(tag);
      this.newTagInput.set('');
    }
  }

  removeTag(index: number): void {
    this.formData.tags.splice(index, 1);
  }

  goBack(): void {
    this.router.navigate(['/admin/konten']);
  }

  saveArticle(statusOverride?: 'Diterbitkan' | 'Draf'): void {
    if (statusOverride) {
      this.formData.status = statusOverride;
    }

    if (!this.formData.judul.trim()) {
      this.errorMessage.set('Judul artikel wajib diisi.');
      return;
    }

    if (!this.formData.ringkasan.trim()) {
      this.errorMessage.set('Ringkasan artikel wajib diisi untuk cuplikan pembaca.');
      return;
    }

    if (!this.formData.konten.trim()) {
      this.errorMessage.set('Naskah konten lengkap artikel wajib ditulis.');
      return;
    }

    if (!this.formData.slug.trim()) {
      this.formData.slug = this.artikelService.generateSlug(this.formData.judul);
    }

    this.artikelService.addArticle(this.formData);
    this.router.navigate(['/admin/konten']);
  }
}
