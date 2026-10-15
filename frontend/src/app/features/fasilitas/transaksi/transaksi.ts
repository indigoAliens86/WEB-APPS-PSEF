import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import {
  TransaksiItem,
  SumberTransaksi,
  StatusTransaksi,
  KategoriMetode,
  KpiTransaksi,
  MetodeStatItem,
} from './models/transaksi.model';

export type { TransaksiItem, SumberTransaksi, StatusTransaksi, KategoriMetode, KpiTransaksi, MetodeStatItem };

@Component({
  selector: 'app-transaksi',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet],
  templateUrl: './transaksi.html',
  styleUrl: './transaksi.css',
})
export class Transaksi implements OnInit {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly showingDetails = signal<boolean>(false);

  // 4 Top Financial KPI Summary Cards
  readonly kpiCards: KpiTransaksi[] = [
    {
      title: 'Total Volume Transaksi',
      value: 'Rp 28.450.000',
      percentage: '12.5%',
      period: 'dari bulan lalu',
      icon: 'ri-wallet-3-line',
      colorClass: 'purple',
    },
    {
      title: 'Transaksi Berhasil',
      value: 'Rp 24.120.000',
      percentage: '15.2%',
      period: '845 Transaksi',
      icon: 'ri-checkbox-circle-line',
      colorClass: 'emerald',
    },
    {
      title: 'Menunggu Pembayaran',
      value: 'Rp 2.850.000',
      percentage: '4.8%',
      period: '42 Transaksi',
      icon: 'ri-time-line',
      colorClass: 'amber',
    },
    {
      title: 'Gagal & Dibatalkan',
      value: 'Rp 1.480.000',
      percentage: '2.1%',
      period: '18 Transaksi',
      icon: 'ri-close-circle-line',
      colorClass: 'red',
    },
  ];

  // Sumber Filter Tabs
  readonly activeSumberFilter = signal<string>('Semua Sumber');
  readonly sumberTabs: string[] = [
    'Semua Sumber',
    'Pesanan Obat Resep',
    'Pesanan Obat Non-Resep',
    'Konsultasi Dokter',
    'Konsultasi Apoteker',
  ];

  // Secondary Filters
  readonly searchQuery = signal<string>('');
  readonly filterStatus = signal<string>('Semua Status');
  readonly filterMetode = signal<string>('Semua Metode');
  readonly filterTanggal = signal<string>('Pilih rentang tanggal');

  // Sidebar Analytics: Donut Chart Distribution
  readonly metodeStats: MetodeStatItem[] = [
    {
      kategori: 'Transfer Bank',
      persentase: 45,
      nominal: 'Rp. 12.800.000',
      color: '#0ab39c',
    },
    {
      kategori: 'E-Wallet',
      persentase: 30,
      nominal: 'Rp. 8.535.000',
      color: '#0284c7',
    },
    {
      kategori: 'COD',
      persentase: 15,
      nominal: 'Rp. 4.265.000',
      color: '#f97316',
    },
    {
      kategori: 'Kartu Kredit',
      persentase: 10,
      nominal: 'Rp. 2.850.000',
      color: '#6366f1',
    },
  ];

  // Pagination
  readonly page = signal<number>(1);
  readonly pageSize = signal<number>(10);
  readonly totalItems = signal<number>(845);

  // Transaction Table Data Scoped for Pharmacy Facility
  readonly transactionList: TransaksiItem[] = [
    {
      no: 1,
      id: '#PAY25024-0012',
      cleanId: 'PAY25024-0012',
      tanggal: '24 Mei 2026',
      waktu: '10:30',
      pelanggan: {
        nama: 'Andi Putra',
        telepon: '0812-3456-7890',
        email: 'andi.putra@gmail.com',
      },
      sumber: {
        tipe: 'Pesanan Obat Resep',
        refId: '#INV24025-0012',
        subLabel: 'Penebusan Resep dr. Andi Wijaya',
        dokterAtauApoteker: 'dr. Andi Wijaya',
      },
      metode: {
        provider: 'BCA',
        logo: 'assets/images/thumbnail/bca.svg',
        accountName: 'Andi Putra',
        maskedAccount: 'BCA*****1234',
        kategori: 'Transfer Bank',
      },
      status: 'Selesai',
      statusWaktu: '24 Mei 2026 10:36',
      totalPembayaran: 'Rp. 185.000',
      totalPembayaranNum: 185000,
    },
    {
      no: 2,
      id: '#PAY25024-0013',
      cleanId: 'PAY25024-0013',
      tanggal: '24 Mei 2026',
      waktu: '10:30',
      pelanggan: {
        nama: 'Dewi Lestari',
        telepon: '0813-9876-5432',
        email: 'dewi.lestari@gmail.com',
      },
      sumber: {
        tipe: 'Konsultasi Dokter',
        refId: '#TLM-2026-0041',
        subLabel: 'Konsultasi Telemedisin Dokter',
        dokterAtauApoteker: 'dr. Andi Wijaya',
      },
      metode: {
        provider: 'OVO',
        logo: 'assets/images/thumbnail/ovo.svg',
        accountName: 'Dewi Lestari',
        maskedAccount: '081*******245',
        kategori: 'E-Wallet',
      },
      status: 'Selesai',
      statusWaktu: '24 Mei 2026 10:35',
      totalPembayaran: 'Rp. 126.000',
      totalPembayaranNum: 126000,
    },
    {
      no: 3,
      id: '#PAY25024-0014',
      cleanId: 'PAY25024-0014',
      tanggal: '24 Mei 2026',
      waktu: '10:30',
      pelanggan: {
        nama: 'Budi Santoso',
        telepon: '0812-5555-8888',
        email: 'budi.santoso@gmail.com',
      },
      sumber: {
        tipe: 'Pesanan Obat Resep',
        refId: '#INV24025-0014',
        subLabel: 'Penebusan Resep dr. Budi Setiawan',
        dokterAtauApoteker: 'dr. Budi Setiawan',
      },
      metode: {
        provider: 'GoPay',
        logo: 'assets/images/thumbnail/gopay.svg',
        accountName: 'Budi Santoso',
        maskedAccount: '081*******245',
        kategori: 'E-Wallet',
      },
      status: 'Selesai',
      statusWaktu: '24 Mei 2026 10:32',
      totalPembayaran: 'Rp. 78.500',
      totalPembayaranNum: 78500,
    },
    {
      no: 4,
      id: '#PAY25024-0015',
      cleanId: 'PAY25024-0015',
      tanggal: '24 Mei 2026',
      waktu: '10:30',
      pelanggan: {
        nama: 'Siti Rahma',
        telepon: '0813-7777-9999',
        email: 'siti.rahma@gmail.com',
      },
      sumber: {
        tipe: 'Pesanan Obat Non-Resep',
        refId: '#INV24025-0015',
        subLabel: 'Marketplace Obat Bebas (OTC)',
      },
      metode: {
        provider: 'DANA',
        logo: 'assets/images/thumbnail/dana.svg',
        accountName: 'Siti Rahma',
        maskedAccount: '081*******245',
        kategori: 'E-Wallet',
      },
      status: 'Selesai',
      statusWaktu: '24 Mei 2026 10:30',
      totalPembayaran: 'Rp. 210.000',
      totalPembayaranNum: 210000,
    },
    {
      no: 5,
      id: '#PAY25024-0016',
      cleanId: 'PAY25024-0016',
      tanggal: '24 Mei 2026',
      waktu: '10:30',
      pelanggan: {
        nama: 'Ahmad Dahlan',
        telepon: '0812-3333-4444',
        email: 'ahmad.dahlan@gmail.com',
      },
      sumber: {
        tipe: 'Konsultasi Apoteker',
        refId: '#TLF-2026-0022',
        subLabel: 'Konsultasi Telefarmasi Apoteker',
        dokterAtauApoteker: 'apt. Rina Meilani',
      },
      metode: {
        provider: 'BRI',
        logo: 'assets/images/thumbnail/bri.svg',
        accountName: 'Ahmad Dahlan',
        maskedAccount: 'BRI*****7890',
        kategori: 'Transfer Bank',
      },
      status: 'Menunggu Pembayaran',
      statusWaktu: '24 Mei 2026 10:28',
      totalPembayaran: 'Rp. 68.000',
      totalPembayaranNum: 68000,
    },
    {
      no: 6,
      id: '#PAY25024-0017',
      cleanId: 'PAY25024-0017',
      tanggal: '24 Mei 2026',
      waktu: '10:30',
      pelanggan: {
        nama: 'Ratna Sari',
        telepon: '0812-1111-2222',
        email: 'ratna.sari@gmail.com',
      },
      sumber: {
        tipe: 'Pesanan Obat Resep',
        refId: '#INV24025-0017',
        subLabel: 'Penebusan Resep dr. Andi Wijaya',
        dokterAtauApoteker: 'dr. Andi Wijaya',
      },
      metode: {
        provider: 'BNI',
        logo: 'assets/images/thumbnail/bni.svg',
        accountName: 'Ratna Sari',
        maskedAccount: 'BNI*****4567',
        kategori: 'Transfer Bank',
      },
      status: 'Dibatalkan',
      statusWaktu: '24 Mei 2026 10:25',
      totalPembayaran: 'Rp. 45.000',
      totalPembayaranNum: 45000,
    },
    {
      no: 7,
      id: '#PAY25024-0018',
      cleanId: 'PAY25024-0018',
      tanggal: '24 Mei 2026',
      waktu: '10:30',
      pelanggan: {
        nama: 'Fauzi Rahman',
        telepon: '0812-9999-0000',
        email: 'fauzi.rahman@gmail.com',
      },
      sumber: {
        tipe: 'Konsultasi Apoteker',
        refId: '#TLF-2026-0023',
        subLabel: 'Konsultasi Telefarmasi Apoteker',
        dokterAtauApoteker: 'apt. Rina Meilani',
      },
      metode: {
        provider: 'QRIS',
        logo: 'assets/images/thumbnail/qris.svg',
        accountName: 'Fauzi Rahman',
        maskedAccount: 'NMID*****9981',
        kategori: 'QRIS',
      },
      status: 'Selesai',
      statusWaktu: '24 Mei 2026 10:20',
      totalPembayaran: 'Rp. 135.000',
      totalPembayaranNum: 135000,
    },
    {
      no: 8,
      id: '#PAY25024-0019',
      cleanId: 'PAY25024-0019',
      tanggal: '24 Mei 2026',
      waktu: '10:30',
      pelanggan: {
        nama: 'Maya Indriani',
        telepon: '0813-8888-7777',
        email: 'maya.indriani@gmail.com',
      },
      sumber: {
        tipe: 'Pesanan Obat Non-Resep',
        refId: '#INV24025-0019',
        subLabel: 'Marketplace Obat Bebas (OTC)',
      },
      metode: {
        provider: 'ShopeePay',
        logo: 'assets/images/thumbnail/shopeepay.svg',
        accountName: 'Maya Indriani',
        maskedAccount: '081*******7788',
        kategori: 'E-Wallet',
      },
      status: 'Selesai',
      statusWaktu: '24 Mei 2026 10:15',
      totalPembayaran: 'Rp. 55.000',
      totalPembayaranNum: 55000,
    },
    {
      no: 9,
      id: '#PAY25024-0020',
      cleanId: 'PAY25024-0020',
      tanggal: '24 Mei 2026',
      waktu: '10:30',
      pelanggan: {
        nama: 'Rizky Pratama',
        telepon: '0812-4444-5555',
        email: 'rizky.pratama@gmail.com',
      },
      sumber: {
        tipe: 'Pesanan Obat Resep',
        refId: '#INV24025-0020',
        subLabel: 'Penebusan Resep dr. Andi Wijaya',
        dokterAtauApoteker: 'dr. Andi Wijaya',
      },
      metode: {
        provider: 'Mandiri',
        logo: 'assets/images/thumbnail/mandiri.svg',
        accountName: 'Rizky Pratama',
        maskedAccount: 'MND*****3321',
        kategori: 'Transfer Bank',
      },
      status: 'Diproses',
      statusWaktu: '24 Mei 2026 10:10',
      totalPembayaran: 'Rp. 320.000',
      totalPembayaranNum: 320000,
    },
    {
      no: 10,
      id: '#PAY25024-0021',
      cleanId: 'PAY25024-0021',
      tanggal: '24 Mei 2026',
      waktu: '10:30',
      pelanggan: {
        nama: 'Nurul Hidayah',
        telepon: '0813-6666-5555',
        email: 'nurul.hidayah@gmail.com',
      },
      sumber: {
        tipe: 'Konsultasi Dokter',
        refId: '#TLM-2026-0043',
        subLabel: 'Konsultasi Telemedisin Dokter',
        dokterAtauApoteker: 'dr. Siti Aminah',
      },
      metode: {
        provider: 'BCA',
        logo: 'assets/images/thumbnail/bca.svg',
        accountName: 'Nurul Hidayah',
        maskedAccount: 'BCA*****6655',
        kategori: 'Transfer Bank',
      },
      status: 'Selesai',
      statusWaktu: '24 Mei 2026 10:05',
      totalPembayaran: 'Rp. 52.000',
      totalPembayaranNum: 52000,
    },
  ];

  // Filtered Transactions
  readonly filteredTransactions = computed(() => {
    let list = this.transactionList;

    // 1. Filter by Sumber Tab
    const tab = this.activeSumberFilter();
    if (tab !== 'Semua Sumber') {
      list = list.filter((i) => i.sumber.tipe === tab);
    }

    // 2. Filter by Status Dropdown
    const status = this.filterStatus();
    if (status && status !== 'Semua Status') {
      list = list.filter((i) => i.status === status);
    }

    // 3. Filter by Metode Dropdown
    const metode = this.filterMetode();
    if (metode && metode !== 'Semua Metode') {
      list = list.filter((i) => i.metode.kategori === metode);
    }

    // 4. Filter by Search Query
    const query = this.searchQuery().toLowerCase().trim();
    if (query) {
      list = list.filter(
        (i) =>
          i.id.toLowerCase().includes(query) ||
          i.pelanggan.nama.toLowerCase().includes(query) ||
          i.pelanggan.telepon.toLowerCase().includes(query) ||
          i.sumber.refId.toLowerCase().includes(query) ||
          i.sumber.subLabel.toLowerCase().includes(query) ||
          i.metode.provider.toLowerCase().includes(query) ||
          i.metode.maskedAccount.toLowerCase().includes(query)
      );
    }

    return list;
  });

  // Dynamic Sidebar Stats calculation based on filtered/current data
  readonly totalVolumeFiltered = computed(() => {
    const sum = this.filteredTransactions().reduce((acc, cur) => acc + cur.totalPembayaranNum, 0);
    return 'Rp. ' + sum.toLocaleString('id-ID');
  });

  readonly countFiltered = computed(() => this.filteredTransactions().length);

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
      url.includes('/fasilitas/transaksi/detail-transaksi') ||
      url.includes('/fasilitas/transaksi/PAY') ||
      (this.route.children.length > 0 && this.route.snapshot.firstChild !== null);
    this.showingDetails.set(isChild);
  }

  setSumberFilter(tab: string): void {
    this.activeSumberFilter.set(tab);
  }

  viewDetail(item: TransaksiItem): void {
    this.showingDetails.set(true);
    void this.router.navigate(['/fasilitas/transaksi/detail-transaksi', item.cleanId]);
  }

  exportData(): void {
    alert('Mengunduh Laporan Rekapitulasi Transaksi Fasilitas Apotek (Excel/CSV)...');
  }

  getStatusClass(status: StatusTransaksi): string {
    switch (status) {
      case 'Selesai':
        return 'badge-selesai';
      case 'Menunggu Pembayaran':
        return 'badge-menunggu';
      case 'Diproses':
        return 'badge-diproses';
      case 'Gagal':
      case 'Dibatalkan':
        return 'badge-gagal';
      case 'Refund':
        return 'badge-refund';
      default:
        return '';
    }
  }
}
