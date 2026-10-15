import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { PromoService } from './promo.service';
import { PromoItem, StatusProgram, TargetLayanan, TipeProgram } from './models/promo.model';

@Component({
  selector: 'app-promo',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet],
  templateUrl: './promo.html',
  styleUrl: './promo.css',
})
export class Promo implements OnInit {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  readonly promoService = inject(PromoService);

  readonly showingDetails = signal<boolean>(false);
  readonly copiedCode = signal<string | null>(null);
  readonly viewMode = signal<'table' | 'cards'>('table');
  readonly deletingItem = signal<PromoItem | null>(null);

  // Tabs
  readonly activeMainTab = signal<string>('Semua Promo');
  readonly mainTabs: string[] = [
    'Semua Promo',
    'Voucher Diskon Apotek',
    'Campaign Diskon Produk',
    'Diskon Telefarmasi',
  ];

  // Filters
  readonly searchQuery = signal<string>('');
  readonly filterStatus = signal<string>('Semua Status');
  readonly filterTargetLayanan = signal<string>('Semua Layanan');

  readonly statusOptions: string[] = [
    'Semua Status',
    'Aktif',
    'Segera Hadir',
    'Berakhir',
    'Nonaktif',
  ];

  readonly targetOptions: string[] = [
    'Semua Layanan',
    'Obat Bebas & Suplemen',
    'Pesanan Resep Apotek',
    'Konseling Telefarmasi',
    'Alat Kesehatan & Diagnostik',
  ];

  // Computed Promo counts
  readonly voucherCount = computed(
    () => this.promoService.promoList().filter((p) => p.tipe === 'Voucher').length
  );
  readonly campaignCount = computed(
    () => this.promoService.promoList().filter((p) => p.tipe === 'Campaign').length
  );
  readonly telefarmasiCount = computed(
    () => this.promoService.promoList().filter((p) => p.tipe === 'Diskon Telefarmasi').length
  );

  // Filtered List
  readonly filteredPromoList = computed(() => {
    let list = this.promoService.promoList();

    // 1. Tab filter
    const mainTab = this.activeMainTab();
    if (mainTab === 'Voucher Diskon Apotek') {
      list = list.filter((p) => p.tipe === 'Voucher');
    } else if (mainTab === 'Campaign Diskon Produk') {
      list = list.filter((p) => p.tipe === 'Campaign');
    } else if (mainTab === 'Diskon Telefarmasi') {
      list = list.filter((p) => p.tipe === 'Diskon Telefarmasi');
    }

    // 2. Status filter
    const st = this.filterStatus();
    if (st && st !== 'Semua Status') {
      list = list.filter((p) => p.status === st);
    }

    // 3. Target Layanan filter
    const tgt = this.filterTargetLayanan();
    if (tgt && tgt !== 'Semua Layanan') {
      list = list.filter((p) => p.targetLayanan === tgt || p.targetLayanan === 'Semua Layanan');
    }

    // 4. Search Query
    const q = this.searchQuery().toLowerCase().trim();
    if (q) {
      list = list.filter(
        (p) =>
          p.nama.toLowerCase().includes(q) ||
          p.id.toLowerCase().includes(q) ||
          (p.kodeVoucher && p.kodeVoucher.toLowerCase().includes(q)) ||
          p.deskripsi.toLowerCase().includes(q) ||
          p.targetLayanan.toLowerCase().includes(q)
      );
    }

    return list;
  });

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
      url.includes('/fasilitas/promo/tambah-promo') ||
      url.includes('/fasilitas/promo/tambah') ||
      url.includes('/fasilitas/promo/detail-promo') ||
      url.includes('/fasilitas/promo/edit-promo') ||
      url.includes('/fasilitas/promo/VCH') ||
      url.includes('/fasilitas/promo/PRM') ||
      url.includes('/fasilitas/promo/TLF') ||
      (this.route.children.length > 0 && this.route.snapshot.firstChild !== null);
    this.showingDetails.set(isChild);
  }

  setMainTab(tab: string): void {
    this.activeMainTab.set(tab);
  }

  setViewMode(mode: 'table' | 'cards'): void {
    this.viewMode.set(mode);
  }

  copyVoucherCode(code: string): void {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      void navigator.clipboard.writeText(code);
    }
    this.copiedCode.set(code);
    setTimeout(() => this.copiedCode.set(null), 2000);
  }

  openTambah(): void {
    this.showingDetails.set(true);
    void this.router.navigate(['/fasilitas/promo/tambah-promo']);
  }

  openDetail(item: PromoItem): void {
    this.showingDetails.set(true);
    void this.router.navigate(['/fasilitas/promo/detail-promo', item.cleanId]);
  }

  openEdit(item: PromoItem): void {
    this.showingDetails.set(true);
    void this.router.navigate(['/fasilitas/promo/edit-promo', item.cleanId]);
  }

  toggleProgramStatus(item: PromoItem): void {
    this.promoService.toggleStatus(item.cleanId);
  }

  confirmDelete(item: PromoItem): void {
    this.deletingItem.set(item);
  }

  executeDelete(): void {
    const target = this.deletingItem();
    if (target) {
      this.promoService.deletePromo(target.cleanId);
      this.deletingItem.set(null);
    }
  }

  closeDeleteModal(): void {
    this.deletingItem.set(null);
  }

  exportData(): void {
    const header = 'ID,Nama Program,Tipe,Kode Voucher,Diskon,Min Transaksi,Periode,Kuota Terpakai,Kuota Total,Status,Layanan\n';
    const rows = this.filteredPromoList().map((p) =>
      `"${p.id}","${p.nama}","${p.tipe}","${p.kodeVoucher || '-'}","${p.diskon.formatted}","${p.minTransaksi}","${p.periodeMulai} - ${p.periodeSelesai}","${p.kuotaTerpakai}","${p.kuotaTotal}","${p.status}","${p.targetLayanan}"`
    ).join('\n');

    const blob = new Blob([`\uFEFF${header}${rows}`], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `promo-apotek-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
  }

  getStatusClass(status: StatusProgram): string {
    switch (status) {
      case 'Aktif':
        return 'badge-aktif';
      case 'Segera Hadir':
        return 'badge-segera';
      case 'Berakhir':
        return 'badge-berakhir';
      case 'Nonaktif':
        return 'badge-nonaktif';
      default:
        return '';
    }
  }

  getQuotaPercentage(terpakai: number, total: number): number {
    if (!total || total === 0) return 0;
    return Math.min(100, Math.round((terpakai / total) * 100));
  }
}
