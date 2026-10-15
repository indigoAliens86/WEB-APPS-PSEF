import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtikelService, ArtikelItem } from '../artikel.service';

@Component({
  selector: 'app-edit-artikel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-artikel.html',
  styleUrl: './edit-artikel.css',
})
export class EditArtikel implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly artikelService = inject(ArtikelService);

  artikelId = signal<number>(1);
  formData: ArtikelItem = this.artikelService.getEmptyArtikel();
  newTagInput = signal<string>('');
  errorMessage = signal<string>('');
  successAlert = signal<boolean>(false);

  kategoriOptions = [
    'Edukasi Obat',
    'Kesehatan Umum',
    'Penyakit Kronis',
    'Tips Apoteker',
    'Regulasi PSEF'
  ];

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idStr = params.get('id');
      const id = idStr ? Number(idStr) : 1;
      this.artikelId.set(id);

      const existing = this.artikelService.getArticleById(id) || this.artikelService.artikelList()[0];
      if (existing) {
        this.formData = {
          ...existing,
          tags: [...existing.tags]
        };
      }
    });
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

  goToDetail(): void {
    this.router.navigate(['/admin/konten/artikel/detail', this.artikelId()]);
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
      this.errorMessage.set('Ringkasan artikel wajib diisi.');
      return;
    }

    if (!this.formData.konten.trim()) {
      this.errorMessage.set('Naskah konten artikel wajib diisi.');
      return;
    }

    if (!this.formData.slug.trim()) {
      this.formData.slug = this.artikelService.generateSlug(this.formData.judul);
    }

    this.artikelService.updateArticle(this.formData);
    this.successAlert.set(true);
    setTimeout(() => {
      this.router.navigate(['/admin/konten/artikel/detail', this.formData.id]);
    }, 600);
  }
}
