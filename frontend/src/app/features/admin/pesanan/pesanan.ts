import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import {
  PesananItem,
  TipePesanan,
  SumberPesanan,
  KpiPesanan,
  LayananKonsultasiRef,
  MarketplaceObatInfo,
} from './models/pesanan.model';

// Re-export for external consumers / specs
export type { PesananItem, TipePesanan, SumberPesanan, KpiPesanan, LayananKonsultasiRef, MarketplaceObatInfo };

@Component({
  selector: 'app-pesanan',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet],
  templateUrl: './pesanan.html',
  styleUrl: './pesanan.css',
})
export class Pesanan implements OnInit {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly showingDetails = signal<boolean>(false);

  // 6 KPI Cards matching UI mockup
  readonly kpiCards: KpiPesanan[] = [
    {
      title: 'Total Pesanan',
      value: '4.782',
      percentage: '12.5%',
      period: 'dari minggu lalu',
      icon: 'ri-shopping-bag-3-line',
      colorClass: 'purple',
    },
    {
      title: 'Menunggu Pembayaran',
      value: '586',
      percentage: '12.5%',
      period: 'dari minggu lalu',
      icon: 'ri-wallet-3-line',
      colorClass: 'amber',
    },
    {
      title: 'Diproses',
      value: '1.245',
      percentage: '12.5%',
      period: 'dari minggu lalu',
      icon: 'ri-archive-line',
      colorClass: 'blue',
    },
    {
      title: 'Dikirim',
      value: '2.345',
      percentage: '12.5%',
      period: 'dari minggu lalu',
      icon: 'ri-truck-line',
      colorClass: 'teal',
    },
    {
      title: 'Selesai',
      value: '521',
      percentage: '12.5%',
      period: 'dari minggu lalu',
      icon: 'ri-checkbox-circle-line',
      colorClass: 'emerald',
    },
    {
      title: 'Dibatalkan',
      value: '85',
      percentage: '12.5%',
      period: 'dari minggu lalu',
      icon: 'ri-close-circle-line',
      colorClass: 'red',
    },
  ];

  // Foundation: Tipe Pesanan Filter (Obat Resep vs Obat Non-Resep)
  readonly selectedTipeFilter = signal<'Semua' | 'Obat Resep' | 'Obat Non-Resep'>('Semua');

  // Active Category Tab (Status Pesanan)
  readonly activeCategory = signal<string>('Semua Fasilitas');
  readonly categoryTabs = [
    'Semua Fasilitas',
    'Menunggu Pembayaran',
    'Diproses',
    'Dikirim',
    'Selesai',
    'Dibatalkan',
  ];

  // Search & Filter
  readonly searchQuery = signal<string>('');
  readonly filterStatus = signal<string>('Pilih Status');

  // Pagination
  readonly page = signal<number>(1);
  readonly pageSize = signal<number>(10);
  readonly totalItems = signal<number>(12458);

  // Table Data with foundation for Konsultasi vs Marketplace
  readonly orderList: PesananItem[] = [
    {
      no: 1,
      id: '#INV-24025-0012',
      cleanId: 'INV24025-0012',
      pelanggan: {
        nama: 'Dewi Lestari',
        telepon: '0813-9876-5432',
      },
      tanggal: '24 Mei 2026',
      tipePesanan: 'Obat Resep',
      sumberPesanan: 'Konsultasi Dokter',
      layananKonsultasi: {
        idKonsultasi: 'TLM-2026-0041',
        jenisLayanan: 'Telemedisin',
        tenagaKesehatan: {
          nama: 'dr. Andi Wijaya',
          role: 'Dokter Spesialis',
          sipAtauStra: 'SIP: 3273/DU/2022/451',
        },
        klinikAtauApotek: 'Klinik PSEF Health Center',
        tanggalKonsultasi: '24 Mei 2026',
        statusPenebusan: 'Ditebus Pasien',
      },
      resep: {
        dokter: 'Resep dr. Andi Wijaya',
        tanggal: '24 Mei 2026',
        noResep: '#RX25024-0012',
      },
      status: 'Selesai',
      statusWaktu: '24 Mei 2026 15:45',
      totalItem: '4 Obat',
      totalPembayaran: 'Rp. 185.000',
      metodePembayaran: {
        nama: 'Transfer Bank',
        detail: 'BCA*******1234',
      },
    },
    {
      no: 2,
      id: '#INV-24025-0013',
      cleanId: 'INV24025-0013',
      pelanggan: {
        nama: 'Dewi Lestari',
        telepon: '0813-9876-5432',
      },
      tanggal: '24 Mei 2026',
      tipePesanan: 'Obat Non-Resep',
      sumberPesanan: 'Marketplace Obat',
      marketplaceInfo: {
        isTersedia: false,
        channelName: 'Marketplace Obat Bebas PSEF',
        statusKetersediaan: 'Belum Tersedia',
        catatanIntegrasi: 'Layanan Pembelian Obat Marketplace saat ini belum tersedia secara publik.',
      },
      status: 'Selesai',
      statusWaktu: '24 Mei 2026 15:45',
      totalItem: '4 Obat',
      totalPembayaran: 'Rp. 185.000',
      metodePembayaran: {
        nama: 'Transfer Bank',
        detail: 'BCA*******1234',
      },
    },
    {
      no: 3,
      id: '#INV-24025-0014',
      cleanId: 'INV24025-0014',
      pelanggan: {
        nama: 'Dewi Lestari',
        telepon: '0813-9876-5432',
      },
      tanggal: '24 Mei 2026',
      tipePesanan: 'Obat Resep',
      sumberPesanan: 'Konsultasi Dokter',
      layananKonsultasi: {
        idKonsultasi: 'TLM-2026-0042',
        jenisLayanan: 'Telemedisin',
        tenagaKesehatan: {
          nama: 'dr. Andi Wijaya',
          role: 'Dokter Spesialis',
          sipAtauStra: 'SIP: 3273/DU/2022/451',
        },
        klinikAtauApotek: 'Klinik PSEF Health Center',
        tanggalKonsultasi: '24 Mei 2026',
        statusPenebusan: 'Ditebus Pasien',
      },
      resep: {
        dokter: 'Resep dr. Andi Wijaya',
        tanggal: '24 Mei 2026',
        noResep: '#RX25024-0014',
      },
      status: 'Selesai',
      statusWaktu: '24 Mei 2026 15:45',
      totalItem: '4 Obat',
      totalPembayaran: 'Rp. 185.000',
      metodePembayaran: {
        nama: 'Transfer Bank',
        detail: 'BCA*******1234',
      },
    },
    {
      no: 4,
      id: '#INV-24025-0015',
      cleanId: 'INV24025-0015',
      pelanggan: {
        nama: 'Dewi Lestari',
        telepon: '0813-9876-5432',
      },
      tanggal: '24 Mei 2026',
      tipePesanan: 'Obat Non-Resep',
      sumberPesanan: 'Marketplace Obat',
      marketplaceInfo: {
        isTersedia: false,
        channelName: 'Marketplace Obat Bebas PSEF',
        statusKetersediaan: 'Belum Tersedia',
        catatanIntegrasi: 'Layanan Pembelian Obat Marketplace saat ini belum tersedia secara publik.',
      },
      status: 'Selesai',
      statusWaktu: '24 Mei 2026 15:45',
      totalItem: '4 Obat',
      totalPembayaran: 'Rp. 185.000',
      metodePembayaran: {
        nama: 'Transfer Bank',
        detail: 'BCA*******1234',
      },
    },
    {
      no: 5,
      id: '#INV-24025-0016',
      cleanId: 'INV24025-0016',
      pelanggan: {
        nama: 'Dewi Lestari',
        telepon: '0813-9876-5432',
      },
      tanggal: '24 Mei 2026',
      tipePesanan: 'Obat Resep',
      sumberPesanan: 'Konsultasi Apoteker',
      layananKonsultasi: {
        idKonsultasi: 'TLF-2026-0022',
        jenisLayanan: 'Telefarmasi',
        tenagaKesehatan: {
          nama: 'apt. Rina Meilani, S.Farm.',
          role: 'Apoteker Penanggung Jawab',
          sipAtauStra: 'STRA: 19920415/STRA-UI/2018',
        },
        klinikAtauApotek: 'Apotek PSEF Mitra Farma 01',
        tanggalKonsultasi: '24 Mei 2026',
        statusPenebusan: 'Ditebus Pasien',
      },
      resep: {
        dokter: 'Konsultasi apt. Rina Meilani',
        tanggal: '24 Mei 2026',
        noResep: '#RX25024-0016',
      },
      status: 'Selesai',
      statusWaktu: '24 Mei 2026 15:45',
      totalItem: '4 Obat',
      totalPembayaran: 'Rp. 185.000',
      metodePembayaran: {
        nama: 'Transfer Bank',
        detail: 'BCA*******1234',
      },
    },
    {
      no: 6,
      id: '#INV-24025-0017',
      cleanId: 'INV24025-0017',
      pelanggan: {
        nama: 'Dewi Lestari',
        telepon: '0813-9876-5432',
      },
      tanggal: '24 Mei 2026',
      tipePesanan: 'Obat Non-Resep',
      sumberPesanan: 'Marketplace Obat',
      marketplaceInfo: {
        isTersedia: false,
        channelName: 'Marketplace Obat Bebas PSEF',
        statusKetersediaan: 'Belum Tersedia',
        catatanIntegrasi: 'Layanan Pembelian Obat Marketplace saat ini belum tersedia secara publik.',
      },
      status: 'Selesai',
      statusWaktu: '24 Mei 2026 15:45',
      totalItem: '4 Obat',
      totalPembayaran: 'Rp. 185.000',
      metodePembayaran: {
        nama: 'Transfer Bank',
        detail: 'BCA*******1234',
      },
    },
    {
      no: 7,
      id: '#INV-24025-0018',
      cleanId: 'INV24025-0018',
      pelanggan: {
        nama: 'Dewi Lestari',
        telepon: '0813-9876-5432',
      },
      tanggal: '24 Mei 2026',
      tipePesanan: 'Obat Resep',
      sumberPesanan: 'Konsultasi Apoteker',
      layananKonsultasi: {
        idKonsultasi: 'TLF-2026-0023',
        jenisLayanan: 'Telefarmasi',
        tenagaKesehatan: {
          nama: 'apt. Rina Meilani, S.Farm.',
          role: 'Apoteker Penanggung Jawab',
          sipAtauStra: 'STRA: 19920415/STRA-UI/2018',
        },
        klinikAtauApotek: 'Apotek PSEF Mitra Farma 01',
        tanggalKonsultasi: '24 Mei 2026',
        statusPenebusan: 'Ditebus Pasien',
      },
      resep: {
        dokter: 'Konsultasi apt. Rina Meilani',
        tanggal: '24 Mei 2026',
        noResep: '#RX25024-0018',
      },
      status: 'Selesai',
      statusWaktu: '24 Mei 2026 15:45',
      totalItem: '4 Obat',
      totalPembayaran: 'Rp. 185.000',
      metodePembayaran: {
        nama: 'Transfer Bank',
        detail: 'BCA*******1234',
      },
    },
    {
      no: 8,
      id: '#INV-24025-0019',
      cleanId: 'INV24025-0019',
      pelanggan: {
        nama: 'Dewi Lestari',
        telepon: '0813-9876-5432',
      },
      tanggal: '24 Mei 2026',
      tipePesanan: 'Obat Non-Resep',
      sumberPesanan: 'Marketplace Obat',
      marketplaceInfo: {
        isTersedia: false,
        channelName: 'Marketplace Obat Bebas PSEF',
        statusKetersediaan: 'Belum Tersedia',
        catatanIntegrasi: 'Layanan Pembelian Obat Marketplace saat ini belum tersedia secara publik.',
      },
      status: 'Selesai',
      statusWaktu: '24 Mei 2026 15:45',
      totalItem: '4 Obat',
      totalPembayaran: 'Rp. 185.000',
      metodePembayaran: {
        nama: 'Transfer Bank',
        detail: 'BCA*******1234',
      },
    },
    {
      no: 9,
      id: '#INV-24025-0020',
      cleanId: 'INV24025-0020',
      pelanggan: {
        nama: 'Dewi Lestari',
        telepon: '0813-9876-5432',
      },
      tanggal: '24 Mei 2026',
      tipePesanan: 'Obat Resep',
      sumberPesanan: 'Konsultasi Dokter',
      layananKonsultasi: {
        idKonsultasi: 'TLM-2026-0043',
        jenisLayanan: 'Telemedisin',
        tenagaKesehatan: {
          nama: 'dr. Andi Wijaya',
          role: 'Dokter Spesialis',
          sipAtauStra: 'SIP: 3273/DU/2022/451',
        },
        klinikAtauApotek: 'Klinik PSEF Health Center',
        tanggalKonsultasi: '24 Mei 2026',
        statusPenebusan: 'Ditebus Pasien',
      },
      resep: {
        dokter: 'Resep dr. Andi Wijaya',
        tanggal: '24 Mei 2026',
        noResep: '#RX25024-0020',
      },
      status: 'Selesai',
      statusWaktu: '24 Mei 2026 15:45',
      totalItem: '4 Obat',
      totalPembayaran: 'Rp. 185.000',
      metodePembayaran: {
        nama: 'Transfer Bank',
        detail: 'BCA*******1234',
      },
    },
    {
      no: 10,
      id: '#INV-24025-0021',
      cleanId: 'INV24025-0021',
      pelanggan: {
        nama: 'Dewi Lestari',
        telepon: '0813-9876-5432',
      },
      tanggal: '24 Mei 2026',
      tipePesanan: 'Obat Non-Resep',
      sumberPesanan: 'Marketplace Obat',
      marketplaceInfo: {
        isTersedia: false,
        channelName: 'Marketplace Obat Bebas PSEF',
        statusKetersediaan: 'Belum Tersedia',
        catatanIntegrasi: 'Layanan Pembelian Obat Marketplace saat ini belum tersedia secara publik.',
      },
      status: 'Selesai',
      statusWaktu: '24 Mei 2026 15:45',
      totalItem: '4 Obat',
      totalPembayaran: 'Rp. 185.000',
      metodePembayaran: {
        nama: 'Transfer Bank',
        detail: 'BCA*******1234',
      },
    },
  ];

  // Foundation Computed Counts
  readonly totalOrdersCount = computed(() => this.orderList.length);
  readonly resepOrdersCount = computed(
    () => this.orderList.filter((i) => i.tipePesanan === 'Obat Resep').length
  );
  readonly nonResepOrdersCount = computed(
    () => this.orderList.filter((i) => i.tipePesanan === 'Obat Non-Resep').length
  );

  readonly filteredOrders = computed(() => {
    let list = this.orderList;

    // 1. Filter by Tipe Pesanan Switcher (Foundation: Obat Resep vs Non-Resep)
    const tipe = this.selectedTipeFilter();
    if (tipe !== 'Semua') {
      list = list.filter((i) => i.tipePesanan === tipe);
    }

    // 2. Filter by active category tab (Status)
    const cat = this.activeCategory();
    if (cat === 'Menunggu Pembayaran') {
      list = list.filter((i) => i.status === 'Menunggu Pembayaran');
    } else if (cat === 'Diproses') {
      list = list.filter((i) => i.status === 'Diproses');
    } else if (cat === 'Dikirim') {
      list = list.filter((i) => i.status === 'Dikirim');
    } else if (cat === 'Selesai') {
      list = list.filter((i) => i.status === 'Selesai');
    } else if (cat === 'Dibatalkan') {
      list = list.filter((i) => i.status === 'Dibatalkan');
    }

    // 3. Filter by search query
    const query = this.searchQuery().toLowerCase().trim();
    if (query) {
      list = list.filter(
        (i) =>
          i.pelanggan.nama.toLowerCase().includes(query) ||
          i.pelanggan.telepon.toLowerCase().includes(query) ||
          i.id.toLowerCase().includes(query) ||
          i.tipePesanan.toLowerCase().includes(query) ||
          i.sumberPesanan.toLowerCase().includes(query) ||
          (i.resep?.dokter && i.resep.dokter.toLowerCase().includes(query))
      );
    }

    // 4. Filter by status dropdown
    const status = this.filterStatus();
    if (status && status !== 'Pilih Status') {
      list = list.filter((i) => i.status === status);
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
      url.includes('/admin/pesanan/detail-pesanan') ||
      url.includes('/admin/pesanan/INV') ||
      (this.route.children.length > 0 &&
        this.route.snapshot.firstChild !== null);
    this.showingDetails.set(isChild);
  }

  setTipeFilter(tipe: 'Semua' | 'Obat Resep' | 'Obat Non-Resep'): void {
    this.selectedTipeFilter.set(tipe);
  }

  setCategory(tab: string): void {
    this.activeCategory.set(tab);
  }

  viewDetail(item: PesananItem): void {
    this.showingDetails.set(true);
    this.router.navigate(['/admin/pesanan/detail-pesanan', item.cleanId]);
  }

  // Resep Modal State
  readonly showResepModal = signal<boolean>(false);
  readonly activeResep = signal<{
    noResep: string;
    noPesanan: string;
    dokter: string;
    sip: string;
    klinik: string;
    tanggal: string;
    sumberLayanan?: string;
    pasien: {
      nama: string;
      telepon: string;
      usia: string;
      gender: string;
    };
    apoteker: {
      nama: string;
      stra: string;
      tanggalVerifikasi: string;
    };
    items: {
      rNum: number;
      namaObat: string;
      aturanPakai: string;
      jumlah: string;
    }[];
  } | null>(null);

  openResepModal(item: PesananItem): void {
    const isDoctor = item.sumberPesanan === 'Konsultasi Dokter';
    const docOrApoteker = item.resep?.dokter || (isDoctor ? 'dr. Andi Wijaya' : 'apt. Rina Meilani, S.Farm.');
    const sipOrStra = isDoctor ? 'SIP: 3273/DU/2022/451' : 'STRA: 19920415/STRA-UI/2018';
    const klinikName = isDoctor ? 'Klinik PSEF Health Center' : 'Apotek PSEF Mitra Farma 01';

    this.activeResep.set({
      noResep: item.resep?.noResep || '#RX25024-0012',
      noPesanan: item.id,
      dokter: docOrApoteker,
      sip: sipOrStra,
      klinik: klinikName,
      tanggal: item.tanggal,
      sumberLayanan: item.sumberPesanan,
      pasien: {
        nama: item.pelanggan.nama,
        telepon: item.pelanggan.telepon,
        usia: '34 Tahun',
        gender: 'Perempuan',
      },
      apoteker: {
        nama: 'apt. Rina Meilani, S.Farm., M.Farm-Klin',
        stra: '19920415/STRA-UI/2018',
        tanggalVerifikasi: '24 Mei 2026 10:36 WIB',
      },
      items: [
        {
          rNum: 1,
          namaObat: 'Paracetamol 500mg Tablet',
          aturanPakai: 'S. 3 dd tab 1 p.c. (3x sehari 1 tablet sesudah makan bila demam/nyeri)',
          jumlah: '10 Tablet',
        },
        {
          rNum: 2,
          namaObat: 'Vitamin C 500mg Tablet',
          aturanPakai: 'S. 1 dd tab 1 p.c. (1x sehari 1 tablet sesudah makan pagi)',
          jumlah: '10 Tablet',
        },
        {
          rNum: 3,
          namaObat: 'Amoxicillin 500mg Tablet',
          aturanPakai: 'S. 3 dd tab 1 p.c. (3x sehari 1 tablet sesudah makan - HARUS DIHABISKAN)',
          jumlah: '15 Tablet',
        },
        {
          rNum: 4,
          namaObat: 'Omeprazol 20mg Kapsul',
          aturanPakai: 'S. 2 dd caps 1 a.c. (2x sehari 1 kapsul 30 menit sebelum makan)',
          jumlah: '10 Kapsul',
        },
      ],
    });
    this.showResepModal.set(true);
  }

  closeResepModal(): void {
    this.showResepModal.set(false);
    this.activeResep.set(null);
  }

  printResep(): void {
    window.print();
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Selesai':
        return 'badge-selesai';
      case 'Menunggu Pembayaran':
        return 'badge-menunggu';
      case 'Diproses':
        return 'badge-diproses';
      case 'Dikirim':
        return 'badge-dikirim';
      case 'Dibatalkan':
        return 'badge-dibatalkan';
      default:
        return '';
    }
  }
}
