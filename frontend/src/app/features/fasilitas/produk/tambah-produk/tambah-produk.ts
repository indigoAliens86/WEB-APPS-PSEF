import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProdukService, MasterCatalogItem, FasilitasProduct } from '../produk.service';

@Component({
  selector: 'app-tambah-produk',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tambah-produk.html',
  styleUrl: './tambah-produk.css',
})
export class TambahProduk {
  private readonly router = inject(Router);
  readonly produkService = inject(ProdukService);

  // Mode Selection: 'katalog' or 'manual'
  readonly activeMode = signal<'katalog' | 'manual'>('katalog');

  // Master Catalog Browser State
  readonly catalogSearch = signal<string>('');
  readonly catalogCategory = signal<string>('Semua Kategori');
  readonly selectedCatalogItem = signal<MasterCatalogItem | null>(null);

  // Form for Katalog Mode (Pricing & Stock Management)
  katalogForm = {
    hargaBeli: 0,
    hargaJual: 0,
    diskon: 0,
    stokAwal: 50,
    stokMin: 10,
    batchNumber: 'BTC-2026-001',
    expiredDate: '2028-12-31',
    rakLokasi: 'Rak A-01',
    barcode: '',
  };

  // Form for Manual Mode (Complete Product Data)
  manualForm: {
    name: string;
    genericName: string;
    bpomNumber: string;
    kategori: string;
    golongan: 'Bebas' | 'Bebas Terbatas' | 'Keras' | 'Herbal' | 'Alat Kesehatan';
    bentukSediaan: string;
    satuan: string;
    manufacturer: string;
    deskripsi: string;
    komposisi: string;
    aturanPakai: string;
    hargaBeli: number;
    hargaJual: number;
    diskon: number;
    stokAwal: number;
    stokMin: number;
    batchNumber: string;
    expiredDate: string;
    rakLokasi: string;
    barcode: string;
  } = {
    name: '',
    genericName: '',
    bpomNumber: '',
    kategori: 'Obat Bebas',
    golongan: 'Bebas',
    bentukSediaan: 'Tablet',
    satuan: 'Strip (10 Tablet)',
    manufacturer: '',
    deskripsi: '',
    komposisi: '',
    aturanPakai: '',
    hargaBeli: 0,
    hargaJual: 0,
    diskon: 0,
    stokAwal: 50,
    stokMin: 10,
    batchNumber: '',
    expiredDate: '',
    rakLokasi: 'Rak A-01',
    barcode: '',
  };

  // Categories list
  readonly categories = [
    'Semua Kategori',
    'Obat Bebas',
    'Obat Bebas Terbatas',
    'Obat Keras',
    'Suplemen & Vitamin',
    'Herbal',
    'Alat Kesehatan',
  ];

  // Filtered master catalog items
  readonly filteredCatalog = computed(() => {
    const q = this.catalogSearch().toLowerCase().trim();
    const cat = this.catalogCategory();

    return this.produkService.masterCatalog().filter((item) => {
      const matchQ =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.genericName.toLowerCase().includes(q) ||
        item.bpomNumber.toLowerCase().includes(q) ||
        item.activeIngredients.toLowerCase().includes(q);

      const matchCat = cat === 'Semua Kategori' || item.category === cat;
      return matchQ && matchCat;
    });
  });

  setMode(mode: 'katalog' | 'manual'): void {
    this.activeMode.set(mode);
  }

  selectCatalogItem(item: MasterCatalogItem): void {
    this.selectedCatalogItem.set(item);
    // Populate default suggestions
    this.katalogForm.hargaBeli = item.suggestedHpp;
    this.katalogForm.hargaJual = item.suggestedHET;
    this.katalogForm.barcode = `899${Math.floor(1000000000 + Math.random() * 9000000000)}`;
    this.katalogForm.batchNumber = `BTC-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
  }

  resetSelectedCatalog(): void {
    this.selectedCatalogItem.set(null);
  }

  saveKatalogProduct(): void {
    const item = this.selectedCatalogItem();
    if (!item) return;

    if (this.katalogForm.hargaJual <= 0) {
      alert('Mohon masukkan harga jual yang valid.');
      return;
    }

    const nextId = this.produkService.products().length + 1;
    const newSku = `SKU-${String(nextId).padStart(3, '0')}-${item.name.substring(0, 3).toUpperCase()}`;

    this.produkService.addProduct({
      sku: newSku,
      barcode: this.katalogForm.barcode || `899${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      name: item.name,
      genericName: item.genericName,
      bpomNumber: item.bpomNumber,
      kategori: item.category,
      golongan: item.golongan,
      bentukSediaan: item.dosageForm,
      satuan: item.unit,
      manufacturer: item.manufacturer,
      source: 'Katalog',
      catalogCode: item.code,
      hargaBeli: this.katalogForm.hargaBeli,
      hargaJual: this.katalogForm.hargaJual,
      diskon: this.katalogForm.diskon,
      stok: this.katalogForm.stokAwal,
      stokMin: this.katalogForm.stokMin,
      batchNumber: this.katalogForm.batchNumber,
      expiredDate: this.katalogForm.expiredDate,
      rakLokasi: this.katalogForm.rakLokasi,
      deskripsi: item.description,
      aturanPakai: item.dosageInstructions,
      komposisi: item.activeIngredients,
      thumbnail: item.thumbnail,
    });

    alert(`Produk "${item.name}" berhasil ditambahkan ke inventaris apotek!`);
    void this.router.navigate(['/fasilitas/produk']);
  }

  saveManualProduct(): void {
    if (!this.manualForm.name || !this.manualForm.bpomNumber) {
      alert('Mohon lengkapi nama produk dan nomor izin edar BPOM.');
      return;
    }
    if (this.manualForm.hargaJual <= 0) {
      alert('Mohon masukkan harga jual yang valid.');
      return;
    }

    const nextId = this.produkService.products().length + 1;
    const newSku = `SKU-MNL-${String(nextId).padStart(3, '0')}`;

    this.produkService.addProduct({
      sku: newSku,
      barcode: this.manualForm.barcode || `899${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      name: this.manualForm.name,
      genericName: this.manualForm.genericName || this.manualForm.name,
      bpomNumber: this.manualForm.bpomNumber,
      kategori: this.manualForm.kategori,
      golongan: this.manualForm.golongan,
      bentukSediaan: this.manualForm.bentukSediaan,
      satuan: this.manualForm.satuan,
      manufacturer: this.manualForm.manufacturer || 'Produksi Apotek / Rekanan',
      source: 'Manual',
      hargaBeli: this.manualForm.hargaBeli,
      hargaJual: this.manualForm.hargaJual,
      diskon: this.manualForm.diskon,
      stok: this.manualForm.stokAwal,
      stokMin: this.manualForm.stokMin,
      batchNumber: this.manualForm.batchNumber || `BTC-MNL-${Math.floor(100 + Math.random() * 900)}`,
      expiredDate: this.manualForm.expiredDate || '2028-12-31',
      rakLokasi: this.manualForm.rakLokasi,
      deskripsi: this.manualForm.deskripsi,
      aturanPakai: this.manualForm.aturanPakai,
      komposisi: this.manualForm.komposisi,
      thumbnail: 'assets/images/thumbnail/vitamin-b.svg',
    });

    alert(`Produk manual "${this.manualForm.name}" berhasil ditambahkan ke inventaris apotek!`);
    void this.router.navigate(['/fasilitas/produk']);
  }

  goBack(): void {
    void this.router.navigate(['/fasilitas/produk']);
  }
}
