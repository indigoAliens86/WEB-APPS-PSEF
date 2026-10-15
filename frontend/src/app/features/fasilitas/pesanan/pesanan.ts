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
      value: '2.480',
      percentage: '12.5%',
      period: 'dari minggu lalu',
      icon: 'ri-shopping-bag-3-line',
      colorClass: 'purple',
    },
    {
      title: 'Menunggu Pembayaran',
      value: '312',
      percentage: '12.5%',
      period: 'dari minggu lalu',
      icon: 'ri-wallet-3-line',
      colorClass: 'amber',
    },
    {
      title: 'Diproses',
      value: '648',
      percentage: '12.5%',
      period: 'dari minggu lalu',
      icon: 'ri-archive-line',
      colorClass: 'blue',
    },
    {
      title: 'Dikirim',
      value: '1.180',
      percentage: '12.5%',
      period: 'dari minggu lalu',
      icon: 'ri-truck-line',
      colorClass: 'teal',
    },
    {
      title: 'Selesai',
      value: '298',
      percentage: '12.5%',
      period: 'dari minggu lalu',
      icon: 'ri-checkbox-circle-line',
      colorClass: 'emerald',
    },
    {
      title: 'Dibatalkan',
      value: '42',
      percentage: '12.5%',
      period: 'dari minggu lalu',
      icon: 'ri-close-circle-line',
      colorClass: 'red',
    },
  ];

  // Foundation: Tipe Pesanan Filter (Obat Resep vs Obat Non-Resep)
  readonly selectedTipeFilter = signal<'Semua' | 'Obat Resep' | 'Obat Non-Resep'>('Semua');

  // Active Category Tab (Status Pesanan)
  readonly activeCategory = signal<string>('Semua Pesanan');
  readonly categoryTabs = [
    'Semua Pesanan',
    'Menunggu Pembayaran',
    'Diproses',
    'Dikirim',
    'Selesai',
    'Dibatalkan',
  ];

  // Search & Filter
  readonly searchQuery = signal<string>('');
  readonly filterStatus = signal<string>('Pilih Status');

  // Master Data Pesanan Apotek PSEF
  readonly allOrders = signal<PesananItem[]>([
    {
      no: 1,
      id: '#INV-24025-0012',
      cleanId: 'INV24025-0012',
      pelanggan: {
        nama: 'Ahmad Dahlan',
        telepon: '0812-3456-7890',
      },
      tanggal: '24 Mei 2026',
      tipePesanan: 'Obat Resep',
      sumberPesanan: 'Konsultasi Dokter',
      layananKonsultasi: {
        idKonsultasi: 'TLM-2026-0081',
        jenisLayanan: 'Telemedisin',
        tenagaKesehatan: {
          nama: 'dr. Andi Wijaya, Sp.PD',
          role: 'Dokter Spesialis Penyakit Dalam',
          sipAtauStra: 'SIP: 3273/DU/2022/451',
        },
        klinikAtauApotek: 'Klinik PSEF Health Center',
        tanggalKonsultasi: '24 Mei 2026',
        statusPenebusan: 'Ditebus Pasien',
      },
      resep: {
        dokter: 'dr. Andi Wijaya',
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
        nama: 'Siti Rahmawati',
        telepon: '0821-4567-8901',
      },
      tanggal: '24 Mei 2026',
      tipePesanan: 'Obat Resep',
      sumberPesanan: 'Konsultasi Apoteker',
      layananKonsultasi: {
        idKonsultasi: 'TLF-2026-0021',
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
        noResep: '#RX25024-0013',
      },
      status: 'Diproses',
      statusWaktu: '24 Mei 2026 14:10',
      totalItem: '2 Obat',
      totalPembayaran: 'Rp. 95.000',
      metodePembayaran: {
        nama: 'GoPay',
        detail: '0821*******8901',
      },
    },
    {
      no: 3,
      id: '#INV-24025-0014',
      cleanId: 'INV24025-0014',
      pelanggan: {
        nama: 'Budi Santoso',
        telepon: '0852-9876-5432',
      },
      tanggal: '24 Mei 2026',
      tipePesanan: 'Obat Resep',
      sumberPesanan: 'Konsultasi Dokter',
      layananKonsultasi: {
        idKonsultasi: 'TLM-2026-0082',
        jenisLayanan: 'Telemedisin',
        tenagaKesehatan: {
          nama: 'dr. Budi Setiawan, Sp.A',
          role: 'Dokter Spesialis Anak',
          sipAtauStra: 'SIP: 3171/DU/2021/308',
        },
        klinikAtauApotek: 'Klinik PSEF Health Center',
        tanggalKonsultasi: '24 Mei 2026',
        statusPenebusan: 'Ditebus Pasien',
      },
      resep: {
        dokter: 'dr. Budi Setiawan',
        tanggal: '24 Mei 2026',
        noResep: '#RX25024-0014',
      },
      status: 'Dikirim',
      statusWaktu: '24 Mei 2026 12:30',
      totalItem: '3 Obat',
      totalPembayaran: 'Rp. 142.500',
      metodePembayaran: {
        nama: 'QRIS Dinamis',
        detail: 'ShopeePay',
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
        nama: 'Hendra Gunawan',
        telepon: '0811-2233-4455',
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
      status: 'Menunggu Pembayaran',
      statusWaktu: '24 Mei 2026 16:00',
      totalItem: '2 Obat',
      totalPembayaran: 'Rp. 68.000',
      metodePembayaran: {
        nama: 'Virtual Account',
        detail: 'Mandiri Livin',
      },
    },
    {
      no: 6,
      id: '#INV-24025-0017',
      cleanId: 'INV24025-0017',
      pelanggan: {
        nama: 'Ratna Sari',
        telepon: '0878-1122-3344',
      },
      tanggal: '23 Mei 2026',
      tipePesanan: 'Obat Resep',
      sumberPesanan: 'Konsultasi Dokter',
      layananKonsultasi: {
        idKonsultasi: 'TLM-2026-0079',
        jenisLayanan: 'Telemedisin',
        tenagaKesehatan: {
          nama: 'dr. Andi Wijaya, Sp.PD',
          role: 'Dokter Spesialis Penyakit Dalam',
          sipAtauStra: 'SIP: 3273/DU/2022/451',
        },
        klinikAtauApotek: 'Klinik PSEF Health Center',
        tanggalKonsultasi: '23 Mei 2026',
        statusPenebusan: 'Ditebus Pasien',
      },
      resep: {
        dokter: 'dr. Andi Wijaya',
        tanggal: '23 Mei 2026',
        noResep: '#RX25024-0010',
      },
      status: 'Dibatalkan',
      statusWaktu: '23 Mei 2026 20:00',
      totalItem: '1 Obat',
      totalPembayaran: 'Rp. 45.000',
      metodePembayaran: {
        nama: 'Transfer Bank',
        detail: 'BRI',
      },
    },
    {
      no: 7,
      id: '#INV-24025-0018',
      cleanId: 'INV24025-0018',
      pelanggan: {
        nama: 'Fauzi Rahman',
        telepon: '0812-7788-9900',
      },
      tanggal: '23 Mei 2026',
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
        tanggalKonsultasi: '23 Mei 2026',
        statusPenebusan: 'Ditebus Pasien',
      },
      resep: {
        dokter: 'Konsultasi apt. Rina Meilani',
        tanggal: '23 Mei 2026',
        noResep: '#RX25024-0018',
      },
      status: 'Selesai',
      statusWaktu: '23 Mei 2026 15:45',
      totalItem: '3 Obat',
      totalPembayaran: 'Rp. 135.000',
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
        nama: 'Maya Indriani',
        telepon: '0813-2233-7788',
      },
      tanggal: '23 Mei 2026',
      tipePesanan: 'Obat Non-Resep',
      sumberPesanan: 'Marketplace Obat',
      marketplaceInfo: {
        isTersedia: false,
        channelName: 'Marketplace Obat Bebas PSEF',
        statusKetersediaan: 'Belum Tersedia',
        catatanIntegrasi: 'Layanan Pembelian Obat Marketplace saat ini belum tersedia secara publik.',
      },
      status: 'Selesai',
      statusWaktu: '23 Mei 2026 15:45',
      totalItem: '2 Obat',
      totalPembayaran: 'Rp. 55.000',
      metodePembayaran: {
        nama: 'ShopeePay',
        detail: '0813*******7788',
      },
    },
  ]);

  // Computed Counts for Switcher
  readonly totalOrdersCount = computed(() => this.allOrders().length);
  readonly resepOrdersCount = computed(
    () => this.allOrders().filter((i) => i.tipePesanan === 'Obat Resep').length
  );
  readonly nonResepOrdersCount = computed(
    () => this.allOrders().filter((i) => i.tipePesanan === 'Obat Non-Resep').length
  );

  // Filtered Orders Pipeline
  readonly filteredOrders = computed(() => {
    let list = this.allOrders();

    // 1. Filter by Tipe Pesanan
    const tipe = this.selectedTipeFilter();
    if (tipe !== 'Semua') {
      list = list.filter((i) => i.tipePesanan === tipe);
    }

    // 2. Filter by Category tab
    const cat = this.activeCategory();
    if (cat && cat !== 'Semua Pesanan' && cat !== 'Semua Fasilitas') {
      list = list.filter((i) => i.status === cat);
    }

    // 3. Search query
    const q = this.searchQuery().trim().toLowerCase();
    if (q) {
      list = list.filter(
        (i) =>
          i.id.toLowerCase().includes(q) ||
          i.cleanId.toLowerCase().includes(q) ||
          i.pelanggan.nama.toLowerCase().includes(q) ||
          i.pelanggan.telepon.includes(q) ||
          (i.resep?.dokter && i.resep.dokter.toLowerCase().includes(q))
      );
    }

    // 4. Filter by status dropdown
    const status = this.filterStatus();
    if (status && status !== 'Pilih Status') {
      list = list.filter((i) => i.status === status);
    }

    return list;
  });

  readonly totalItems = computed(() => this.filteredOrders().length);

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
      url.includes('/fasilitas/pesanan/detail-pesanan') ||
      url.includes('/fasilitas/pesanan/INV') ||
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
    void this.router.navigate(['/fasilitas/pesanan/detail-pesanan', item.cleanId]);
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
