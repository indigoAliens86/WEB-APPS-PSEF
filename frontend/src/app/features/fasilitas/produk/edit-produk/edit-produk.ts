import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdukService, FasilitasProduct } from '../produk.service';

@Component({
  selector: 'app-edit-produk',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-produk.html',
  styleUrl: './edit-produk.css',
})
export class EditProduk implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  readonly produkService = inject(ProdukService);

  readonly productId = signal<string>('');
  readonly product = signal<FasilitasProduct | null>(null);

  // Form Model
  formModel = {
    name: '',
    genericName: '',
    bpomNumber: '',
    kategori: 'Obat Bebas',
    golongan: 'Bebas' as FasilitasProduct['golongan'],
    bentukSediaan: 'Tablet',
    satuan: 'Strip',
    manufacturer: '',
    hargaBeli: 0,
    hargaJual: 0,
    diskon: 0,
    stok: 0,
    stokMin: 10,
    batchNumber: '',
    expiredDate: '',
    rakLokasi: '',
    deskripsi: '',
    aturanPakai: '',
    komposisi: '',
    efekSamping: '',
    kontraindikasi: '',
  };

  readonly isSubmitting = signal<boolean>(false);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productId.set(id);
      const found = this.produkService.getProductById(id);
      if (found) {
        this.product.set(found);
        this.populateForm(found);
      } else {
        // Fallback to first product
        const fallback = this.produkService.products()[0];
        if (fallback) {
          this.productId.set(fallback.id);
          this.product.set(fallback);
          this.populateForm(fallback);
        }
      }
    } else {
      const fallback = this.produkService.products()[0];
      if (fallback) {
        this.productId.set(fallback.id);
        this.product.set(fallback);
        this.populateForm(fallback);
      }
    }
  }

  private populateForm(p: FasilitasProduct): void {
    this.formModel = {
      name: p.name,
      genericName: p.genericName,
      bpomNumber: p.bpomNumber,
      kategori: p.kategori,
      golongan: p.golongan,
      bentukSediaan: p.bentukSediaan,
      satuan: p.satuan,
      manufacturer: p.manufacturer,
      hargaBeli: p.hargaBeli,
      hargaJual: p.hargaJual,
      diskon: p.diskon,
      stok: p.stok,
      stokMin: p.stokMin,
      batchNumber: p.batchNumber,
      expiredDate: p.expiredDate,
      rakLokasi: p.rakLokasi,
      deskripsi: p.deskripsi,
      aturanPakai: p.aturanPakai,
      komposisi: p.komposisi,
      efekSamping: p.efekSamping || '',
      kontraindikasi: p.kontraindikasi || '',
    };
  }

  get profitMargin(): number {
    return this.formModel.hargaJual - this.formModel.hargaBeli;
  }

  get profitMarginPct(): string {
    if (this.formModel.hargaBeli <= 0) return '0%';
    const pct = ((this.formModel.hargaJual - this.formModel.hargaBeli) / this.formModel.hargaBeli) * 100;
    return `${pct.toFixed(1)}%`;
  }

  saveChanges(): void {
    const p = this.product();
    if (!p) return;

    if (this.formModel.hargaJual <= 0) {
      alert('Harga jual produk harus lebih besar dari 0!');
      return;
    }

    if (this.formModel.stok < 0) {
      alert('Jumlah stok tidak boleh bernilai negatif!');
      return;
    }

    this.isSubmitting.set(true);

    const updates: Partial<FasilitasProduct> = {
      hargaBeli: this.formModel.hargaBeli,
      hargaJual: this.formModel.hargaJual,
      diskon: this.formModel.diskon,
      stok: this.formModel.stok,
      stokMin: this.formModel.stokMin,
      batchNumber: this.formModel.batchNumber,
      expiredDate: this.formModel.expiredDate,
      rakLokasi: this.formModel.rakLokasi,
      aturanPakai: this.formModel.aturanPakai,
      deskripsi: this.formModel.deskripsi,
    };

    // If manual, allow editing full identity
    if (p.source === 'Manual') {
      updates.name = this.formModel.name;
      updates.genericName = this.formModel.genericName;
      updates.bpomNumber = this.formModel.bpomNumber;
      updates.kategori = this.formModel.kategori;
      updates.golongan = this.formModel.golongan;
      updates.bentukSediaan = this.formModel.bentukSediaan;
      updates.satuan = this.formModel.satuan;
      updates.manufacturer = this.formModel.manufacturer;
      updates.komposisi = this.formModel.komposisi;
      updates.efekSamping = this.formModel.efekSamping;
      updates.kontraindikasi = this.formModel.kontraindikasi;
    }

    this.produkService.updateProduct(p.id, updates);
    this.isSubmitting.set(false);

    alert(`Perubahan data produk "${this.formModel.name}" berhasil disimpan!`);
    void this.router.navigate(['/fasilitas/produk/detail-produk', p.id]);
  }

  goBack(): void {
    const p = this.product();
    if (p) {
      void this.router.navigate(['/fasilitas/produk/detail-produk', p.id]);
    } else {
      void this.router.navigate(['/fasilitas/produk']);
    }
  }
}
