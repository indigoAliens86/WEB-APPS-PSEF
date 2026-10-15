import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdukService, FasilitasProduct } from '../produk.service';

export interface StockMovement {
  tanggal: string;
  tipe: 'Masuk' | 'Keluar' | 'Penyesuaian';
  jumlah: number;
  referensi: string;
  petugas: string;
  sisaStok: number;
}

@Component({
  selector: 'app-detail-produk',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './detail-produk.html',
  styleUrl: './detail-produk.css',
})
export class DetailProduk implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  readonly produkService = inject(ProdukService);

  readonly productId = signal<string>('FAS-PRD-001');
  readonly product = signal<FasilitasProduct | null>(null);

  // Stock Adjust Modal State
  readonly isAdjustModalOpen = signal<boolean>(false);
  adjustQuantity = 0;
  adjustReason = 'Stock Opname Bulanan';

  // Stock Movement History
  readonly stockMovements = signal<StockMovement[]>([
    {
      tanggal: '24 Mei 2026 10:36',
      tipe: 'Keluar',
      jumlah: -10,
      referensi: 'Dispensing Resep #RX25024-0012',
      petugas: 'apt. Rina Meliani, S.Farm',
      sisaStok: 125,
    },
    {
      tanggal: '20 Mei 2026 14:10',
      tipe: 'Keluar',
      jumlah: -5,
      referensi: 'Penjualan Bebas Apotek #TRX-8821',
      petugas: 'apt. Rina Meliani, S.Farm',
      sisaStok: 135,
    },
    {
      tanggal: '15 Mei 2026 09:30',
      tipe: 'Masuk',
      jumlah: 50,
      referensi: 'Restock PBF Kimia Farma #INV-PBF-901',
      petugas: 'Staf Gudang Apotek',
      sisaStok: 140,
    },
  ]);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productId.set(id);
      const found = this.produkService.getProductById(id);
      if (found) {
        this.product.set(found);
      } else {
        // Fallback to first product
        this.product.set(this.produkService.products()[0]);
      }
    } else {
      this.product.set(this.produkService.products()[0]);
    }
  }

  get profitMargin(): number {
    const p = this.product();
    if (!p) return 0;
    return p.hargaJual - p.hargaBeli;
  }

  get profitMarginPercentage(): string {
    const p = this.product();
    if (!p || p.hargaBeli === 0) return '0%';
    const pct = ((p.hargaJual - p.hargaBeli) / p.hargaBeli) * 100;
    return `${pct.toFixed(1)}%`;
  }

  openAdjustModal(): void {
    const p = this.product();
    if (p) {
      this.adjustQuantity = p.stok;
    }
    this.isAdjustModalOpen.set(true);
  }

  closeAdjustModal(): void {
    this.isAdjustModalOpen.set(false);
  }

  saveStockAdjust(): void {
    const p = this.product();
    if (!p) return;

    const diff = this.adjustQuantity - p.stok;
    this.produkService.updateProduct(p.id, {
      stok: this.adjustQuantity,
    });

    // Record movement
    const newMovement: StockMovement = {
      tanggal: 'Baru saja',
      tipe: diff >= 0 ? 'Masuk' : 'Penyesuaian',
      jumlah: diff,
      referensi: `Penyesuaian: ${this.adjustReason}`,
      petugas: 'Apoteker Penanggung Jawab',
      sisaStok: this.adjustQuantity,
    };
    this.stockMovements.update((list) => [newMovement, ...list]);

    // Refresh current product
    const updated = this.produkService.getProductById(p.id);
    if (updated) {
      this.product.set(updated);
    }

    this.closeAdjustModal();
    alert('Stok fisik produk berhasil disesuaikan!');
  }

  goToEdit(): void {
    const p = this.product();
    if (p) {
      void this.router.navigate(['/fasilitas/produk/edit-produk', p.id]);
    }
  }

  goBack(): void {
    void this.router.navigate(['/fasilitas/produk']);
  }

  printBarcode(): void {
    window.print();
  }
}
