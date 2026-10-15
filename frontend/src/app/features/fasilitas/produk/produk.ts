import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ProdukService, FasilitasProduct } from './produk.service';

export interface ProductKpiCard {
  title: string;
  value: string;
  subtext: string;
  icon: string;
  colorClass: 'teal' | 'blue' | 'amber' | 'red';
}

@Component({
  selector: 'app-produk',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet],
  templateUrl: './produk.html',
  styleUrl: './produk.css',
})
export class Produk implements OnInit {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  readonly produkService = inject(ProdukService);

  readonly showingDetails = signal<boolean>(false);

  // Filters
  readonly searchQuery = signal<string>('');
  readonly selectedCategory = signal<string>('Semua Kategori');
  readonly selectedStatus = signal<string>('Semua Status');
  readonly selectedSource = signal<string>('Semua Sumber');

  // Categories
  readonly categories = [
    'Semua Kategori',
    'Obat Bebas',
    'Obat Bebas Terbatas',
    'Obat Keras',
    'Suplemen & Vitamin',
    'Herbal',
    'Alat Kesehatan',
  ];

  // Pagination
  readonly page = signal<number>(1);
  readonly pageSize = signal<number>(10);

  // Modal Delete
  readonly deletingProduct = signal<FasilitasProduct | null>(null);

  // KPI Cards computed from ProdukService
  readonly kpiCards = computed<ProductKpiCard[]>(() => [
    {
      title: 'Total Katalog Fasilitas',
      value: String(this.produkService.totalProdukCount()),
      subtext: 'Produk aktif dalam inventaris',
      icon: 'ri-medicine-bottle-line',
      colorClass: 'teal',
    },
    {
      title: 'Stok Tersedia',
      value: String(this.produkService.stokTersediaCount()),
      subtext: 'Stok aman siap dispensing',
      icon: 'ri-checkbox-circle-line',
      colorClass: 'blue',
    },
    {
      title: 'Stok Menipis',
      value: String(this.produkService.stokMenipisCount()),
      subtext: 'Mendekati batas reorder minimum',
      icon: 'ri-alert-line',
      colorClass: 'amber',
    },
    {
      title: 'Stok Habis',
      value: String(this.produkService.stokHabisCount()),
      subtext: 'Segera lakukan restock',
      icon: 'ri-close-circle-line',
      colorClass: 'red',
    },
  ]);

  readonly filteredProducts = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    const cat = this.selectedCategory();
    const stat = this.selectedStatus();
    const src = this.selectedSource();

    return this.produkService.products().filter((p) => {
      const matchQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.genericName.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.bpomNumber.toLowerCase().includes(q) ||
        p.barcode.toLowerCase().includes(q);

      const matchCat = cat === 'Semua Kategori' || p.kategori === cat;
      const matchStat = stat === 'Semua Status' || p.status === stat;
      const matchSrc = src === 'Semua Sumber' || p.source === src;

      return matchQuery && matchCat && matchStat && matchSrc;
    });
  });

  readonly paginatedProducts = computed(() => {
    const start = (this.page() - 1) * this.pageSize();
    return this.filteredProducts().slice(start, start + this.pageSize());
  });

  readonly totalPages = computed(() =>
    Math.ceil(this.filteredProducts().length / this.pageSize()) || 1
  );

  ngOnInit(): void {
    this.updateShowingDetails();
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateShowingDetails();
      });
  }

  private updateShowingDetails(): void {
    const url = this.router.url;
    const isChild =
      url.includes('/fasilitas/produk/tambah-produk') ||
      url.includes('/fasilitas/produk/detail-produk') ||
      url.includes('/fasilitas/produk/edit-produk') ||
      (this.route.children.length > 0 &&
        this.route.snapshot.firstChild !== null);
    this.showingDetails.set(isChild);
  }

  setPage(p: number): void {
    if (p >= 1 && p <= this.totalPages()) {
      this.page.set(p);
    }
  }

  resetFilters(): void {
    this.searchQuery.set('');
    this.selectedCategory.set('Semua Kategori');
    this.selectedStatus.set('Semua Status');
    this.selectedSource.set('Semua Sumber');
    this.page.set(1);
  }

  openAdd(): void {
    this.showingDetails.set(true);
    void this.router.navigate(['/fasilitas/produk/tambah-produk']);
  }

  openDetail(product: FasilitasProduct): void {
    this.showingDetails.set(true);
    void this.router.navigate(['/fasilitas/produk/detail-produk', product.id]);
  }

  openEdit(product: FasilitasProduct): void {
    this.showingDetails.set(true);
    void this.router.navigate(['/fasilitas/produk/edit-produk', product.id]);
  }

  confirmDelete(product: FasilitasProduct): void {
    this.deletingProduct.set(product);
  }

  executeDelete(): void {
    const target = this.deletingProduct();
    if (target) {
      this.produkService.deleteProduct(target.id);
      this.deletingProduct.set(null);
    }
  }

  closeDeleteModal(): void {
    this.deletingProduct.set(null);
  }

  exportData(): void {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['No,SKU,Nama Produk,NIE BPOM,Kategori,Golongan,Bentuk Sediaan,Sumber,Harga Beli,Harga Jual,Stok,Status,Lokasi Rak']
        .concat(
          this.filteredProducts().map(
            (r, i) =>
              `${i + 1},"${r.sku}","${r.name}","${r.bpomNumber}","${r.kategori}","${r.golongan}","${r.bentukSediaan}","${r.source}",${r.hargaBeli},${r.hargaJual},${r.stok},"${r.status}","${r.rakLokasi}"`
          )
        )
        .join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'daftar_inventaris_produk_fasilitas.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
