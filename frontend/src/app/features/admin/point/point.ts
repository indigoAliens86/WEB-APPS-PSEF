import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import {
  PointItem,
  KatalogHadiahItem,
  MisiKesehatanItem,
  TopEarnerItem,
  TipeTransaksiPoint,
  SumberPoint,
  StatusPoint,
  KpiPoint,
} from './models/point.model';

export type {
  PointItem,
  KatalogHadiahItem,
  MisiKesehatanItem,
  TopEarnerItem,
  TipeTransaksiPoint,
  SumberPoint,
  StatusPoint,
  KpiPoint,
};

@Component({
  selector: 'app-point',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet],
  templateUrl: './point.html',
  styleUrl: './point.css',
})
export class Point implements OnInit {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly showingDetails = signal<boolean>(false);
  readonly showAdjustmentModal = signal<boolean>(false);

  // 4 Top Financial & Activity Health Point KPIs
  readonly kpiCards: KpiPoint[] = [
    {
      title: 'Total Poin Beredar',
      value: '2.450.800 Poin',
      percentage: '+12.4%',
      period: 'estimasi Rp 24.508.000',
      icon: 'ri-coins-line',
      colorClass: 'gold',
    },
    {
      title: 'Poin Diperoleh (Earned)',
      value: '485.200 Poin',
      percentage: '+18.4%',
      period: 'aktivitas bulan ini',
      icon: 'ri-arrow-up-circle-line',
      colorClass: 'teal',
    },
    {
      title: 'Poin Ditukarkan (Redeemed)',
      value: '312.500 Poin',
      percentage: '64.4%',
      period: 'tingkat utilisasi',
      icon: 'ri-arrow-down-circle-line',
      colorClass: 'purple',
    },
    {
      title: 'Kedaluwarsa (Expiring in 30d)',
      value: '45.600 Poin',
      percentage: '-5.2%',
      period: 'pengingat otomatis aktif',
      icon: 'ri-time-line',
      colorClass: 'red',
    },
  ];

  // Primary Navigation Tabs
  readonly activeMainTab = signal<string>('Semua Riwayat Poin');
  readonly mainTabs: string[] = [
    'Semua Riwayat Poin',
    'Perolehan (Earned)',
    'Penukaran (Redeemed)',
    'Katalog Hadiah',
    'Misi Kesehatan',
    'Leaderboard Pasien',
  ];

  // Filters
  readonly searchQuery = signal<string>('');
  readonly filterTipe = signal<string>('Semua Tipe');
  readonly filterSumber = signal<string>('Semua Sumber');
  readonly filterStatus = signal<string>('Semua Status');

  readonly tipeOptions: string[] = [
    'Semua Tipe',
    'Earned',
    'Redeemed',
    'Adjustment',
    'Expired',
  ];

  readonly sumberOptions: string[] = [
    'Semua Sumber',
    'Konsultasi Telemedisin',
    'Penebusan Obat Resep',
    'Telefarmasi Apoteker',
    'Marketplace Obat',
    'Misi Kesehatan',
    'Penukaran Voucher',
  ];

  readonly statusOptions: string[] = [
    'Semua Status',
    'Berhasil',
    'Menunggu Verifikasi',
    'Kedaluwarsa',
  ];

  // Point Ledger Transactions Table Data
  readonly pointList = signal<PointItem[]>([
    {
      no: 1,
      id: '#PTS-2026-0012',
      cleanId: 'PTS-2026-0012',
      pasien: {
        id: 'PSN-001',
        nama: 'Andi Putra',
        avatar: 'assets/images/avatar/male.png',
        email: 'andi.putra@gmail.com',
        telepon: '0812-3456-7890',
        tier: 'Platinum',
        tierBadgeColor: 'platinum',
      },
      tipe: 'Earned',
      sumber: 'Penebusan Obat Resep',
      deskripsi: 'Reward transaksi penebusan resep digital Telemedisin dr. Andi Wijaya',
      jumlahPoint: 285,
      nilaiRupiah: 'Rp 2.850',
      saldoSebelum: 3165,
      saldoSetelah: 3450,
      tanggal: '24 Mei 2026',
      waktu: '10:36 WIB',
      status: 'Berhasil',
      refId: '#INV24025-0012',
      tenagaMedis: 'dr. Andi Wijaya',
    },
    {
      no: 2,
      id: '#PTS-2026-0013',
      cleanId: 'PTS-2026-0013',
      pasien: {
        id: 'PSN-002',
        nama: 'Dewi Lestari',
        avatar: 'assets/images/avatar/female.png',
        email: 'dewi.lestari@gmail.com',
        telepon: '0813-9876-5432',
        tier: 'Gold',
        tierBadgeColor: 'gold',
      },
      tipe: 'Earned',
      sumber: 'Konsultasi Telemedisin',
      deskripsi: 'Reward sesi telekonsultasi dokter spesialis dr. Siti Nurhaliza',
      jumlahPoint: 150,
      nilaiRupiah: 'Rp 1.500',
      saldoSebelum: 1850,
      saldoSetelah: 2000,
      tanggal: '24 Mei 2026',
      waktu: '09:20 WIB',
      status: 'Berhasil',
      refId: '#TLM-2026-0089',
      tenagaMedis: 'dr. Siti Nurhaliza',
    },
    {
      no: 3,
      id: '#PTS-2026-0014',
      cleanId: 'PTS-2026-0014',
      pasien: {
        id: 'PSN-003',
        nama: 'Budi Santoso',
        avatar: 'assets/images/avatar/male.png',
        email: 'budi.santoso@gmail.com',
        telepon: '0812-7777-8888',
        tier: 'Silver',
        tierBadgeColor: 'silver',
      },
      tipe: 'Redeemed',
      sumber: 'Penukaran Voucher',
      deskripsi: 'Penukaran 500 Poin untuk Voucher Potongan Bebas Ongkir Resep Obat',
      jumlahPoint: -500,
      nilaiRupiah: '-Rp 5.000',
      saldoSebelum: 750,
      saldoSetelah: 250,
      tanggal: '23 Mei 2026',
      waktu: '17:10 WIB',
      status: 'Berhasil',
      refId: '#RDM-2026-042',
    },
    {
      no: 4,
      id: '#PTS-2026-0015',
      cleanId: 'PTS-2026-0015',
      pasien: {
        id: 'PSN-004',
        nama: 'Rina Wulandari',
        avatar: 'assets/images/avatar/female.png',
        email: 'rina.wulandari@gmail.com',
        telepon: '0813-1111-2222',
        tier: 'Gold',
        tierBadgeColor: 'gold',
      },
      tipe: 'Earned',
      sumber: 'Marketplace Obat',
      deskripsi: 'Cashback belanja obat bebas & suplemen marketplace PSEF',
      jumlahPoint: 95,
      nilaiRupiah: 'Rp 950',
      saldoSebelum: 1420,
      saldoSetelah: 1515,
      tanggal: '23 Mei 2026',
      waktu: '14:45 WIB',
      status: 'Berhasil',
      refId: '#INV24025-0017',
    },
    {
      no: 5,
      id: '#PTS-2026-0016',
      cleanId: 'PTS-2026-0016',
      pasien: {
        id: 'PSN-005',
        nama: 'Ahmad Fauzi',
        avatar: 'assets/images/avatar/male.png',
        email: 'ahmad.fauzi@gmail.com',
        telepon: '0812-3333-5555',
        tier: 'Platinum',
        tierBadgeColor: 'platinum',
      },
      tipe: 'Earned',
      sumber: 'Misi Kesehatan',
      deskripsi: 'Bonus penyelesaian misi kepatuhan minum obat 7 hari beruntun',
      jumlahPoint: 100,
      nilaiRupiah: 'Rp 1.000',
      saldoSebelum: 2900,
      saldoSetelah: 3000,
      tanggal: '23 Mei 2026',
      waktu: '11:15 WIB',
      status: 'Berhasil',
      refId: '#MSN-2026-007',
    },
    {
      no: 6,
      id: '#PTS-2026-0017',
      cleanId: 'PTS-2026-0017',
      pasien: {
        id: 'PSN-006',
        nama: 'Siti Aminah',
        avatar: 'assets/images/avatar/female.png',
        email: 'siti.aminah@gmail.com',
        telepon: '0813-4444-9999',
        tier: 'VIP',
        tierBadgeColor: 'vip',
      },
      tipe: 'Redeemed',
      sumber: 'Penukaran Voucher',
      deskripsi: 'Penukaran 1.500 Poin untuk Sesi Konsultasi Telemedisin Dokter Spesialis Gratis',
      jumlahPoint: -1500,
      nilaiRupiah: '-Rp 15.000',
      saldoSebelum: 5800,
      saldoSetelah: 4300,
      tanggal: '22 Mei 2026',
      waktu: '16:00 WIB',
      status: 'Berhasil',
      refId: '#RDM-2026-041',
    },
    {
      no: 7,
      id: '#PTS-2026-0018',
      cleanId: 'PTS-2026-0018',
      pasien: {
        id: 'PSN-007',
        nama: 'Hendra Wijaya',
        avatar: 'assets/images/avatar/male.png',
        email: 'hendra.wijaya@gmail.com',
        telepon: '0812-4444-6666',
        tier: 'Silver',
        tierBadgeColor: 'silver',
      },
      tipe: 'Earned',
      sumber: 'Telefarmasi Apoteker',
      deskripsi: 'Reward sesi telekonseling swamedikasi apt. Rina Meilani',
      jumlahPoint: 75,
      nilaiRupiah: 'Rp 750',
      saldoSebelum: 425,
      saldoSetelah: 500,
      tanggal: '22 Mei 2026',
      waktu: '10:30 WIB',
      status: 'Berhasil',
      refId: '#TLF-2026-0045',
      tenagaMedis: 'apt. Rina Meilani',
    },
    {
      no: 8,
      id: '#PTS-2026-0019',
      cleanId: 'PTS-2026-0019',
      pasien: {
        id: 'PSN-008',
        nama: 'Maya Indah',
        avatar: 'assets/images/avatar/female.png',
        email: 'maya.indah@gmail.com',
        telepon: '0813-8888-0000',
        tier: 'Gold',
        tierBadgeColor: 'gold',
      },
      tipe: 'Adjustment',
      sumber: 'Penyesuaian Manual',
      deskripsi: 'Kompensasi bonus poin keterlambatan kurir pesanan obat resep',
      jumlahPoint: 200,
      nilaiRupiah: 'Rp 2.000',
      saldoSebelum: 1800,
      saldoSetelah: 2000,
      tanggal: '21 Mei 2026',
      waktu: '15:20 WIB',
      status: 'Berhasil',
      refId: '#ADJ-2026-003',
    },
  ]);

  // Data: Katalog Hadiah Penukaran (Reward Catalog)
  readonly rewardCatalog = signal<KatalogHadiahItem[]>([
    {
      id: '#RWD-001',
      nama: 'Voucher Bebas Ongkir Pengiriman Obat',
      kategori: 'Gratis Ongkir',
      poinDibutuhkan: 500,
      nilaiRupiah: 'Rp 15.000',
      stokTersedia: 450,
      totalDitukar: 1240,
      icon: 'ri-truck-line',
      colorClass: 'blue',
    },
    {
      id: '#RWD-002',
      nama: 'Gratis Sesi Konsultasi Telemedisin Dokter',
      kategori: 'Voucher Konsultasi',
      poinDibutuhkan: 1500,
      nilaiRupiah: 'Rp 50.000',
      stokTersedia: 120,
      totalDitukar: 680,
      icon: 'ri-stethoscope-line',
      colorClass: 'teal',
    },
    {
      id: '#RWD-003',
      nama: 'Potongan Diskon Penebusan Resep Rp 25.000',
      kategori: 'Diskon Obat',
      poinDibutuhkan: 2500,
      nilaiRupiah: 'Rp 25.000',
      stokTersedia: 200,
      totalDitukar: 890,
      icon: 'ri-capsule-line',
      colorClass: 'purple',
    },
    {
      id: '#RWD-004',
      nama: 'Paket Suplemen Multivitamin Imun Booster',
      kategori: 'Merchandise Sehat',
      poinDibutuhkan: 3000,
      nilaiRupiah: 'Rp 65.000',
      stokTersedia: 50,
      totalDitukar: 240,
      icon: 'ri-gift-line',
      colorClass: 'amber',
    },
    {
      id: '#RWD-005',
      nama: 'Voucher Skrining Lab Gula Darah & Kolesterol',
      kategori: 'Skrining Lab',
      poinDibutuhkan: 4500,
      nilaiRupiah: 'Rp 120.000',
      stokTersedia: 80,
      totalDitukar: 310,
      icon: 'ri-heart-pulse-line',
      colorClass: 'emerald',
    },
  ]);

  // Data: Misi Kesehatan Pasien (Gamification Health Missions)
  readonly healthMissions = signal<MisiKesehatanItem[]>([
    {
      id: '#MSN-001',
      judul: 'Kepatuhan Minum Obat Rutin 7 Hari',
      kategori: 'Kepatuhan Obat',
      rewardPoin: 100,
      pesertaAktif: 1420,
      tingkatSelesai: '84.2%',
      icon: 'ri-check-double-line',
      status: 'Aktif',
    },
    {
      id: '#MSN-002',
      judul: 'Pemeriksaan Rutin Kontrol Penyakit Kronis',
      kategori: 'Telemedisin',
      rewardPoin: 250,
      pesertaAktif: 650,
      tingkatSelesai: '91.0%',
      icon: 'ri-stethoscope-line',
      status: 'Aktif',
    },
    {
      id: '#MSN-003',
      judul: 'Lengkapi Biodata Riwayat Medis Digital',
      kategori: 'Skrining Rutin',
      rewardPoin: 150,
      pesertaAktif: 2840,
      tingkatSelesai: '76.5%',
      icon: 'ri-file-user-line',
      status: 'Aktif',
    },
    {
      id: '#MSN-004',
      judul: 'Konseling Apoteker Swamedikasi Sehat',
      kategori: 'Pola Hidup Sehat',
      rewardPoin: 75,
      pesertaAktif: 820,
      tingkatSelesai: '68.0%',
      icon: 'ri-nurse-line',
      status: 'Aktif',
    },
  ]);

  // Data: Leaderboard Pasien Teraktif
  readonly topEarners = signal<TopEarnerItem[]>([
    {
      peringkat: 1,
      pasien: {
        id: 'PSN-006',
        nama: 'Siti Aminah',
        avatar: 'assets/images/avatar/female.png',
        email: 'siti.aminah@gmail.com',
        telepon: '0813-4444-9999',
        tier: 'VIP',
        tierBadgeColor: 'vip',
      },
      totalPoinBulanIni: 1450,
      lifetimePoin: 12450,
      totalAktivitas: 24,
    },
    {
      peringkat: 2,
      pasien: {
        id: 'PSN-001',
        nama: 'Andi Putra',
        avatar: 'assets/images/avatar/male.png',
        email: 'andi.putra@gmail.com',
        telepon: '0812-3456-7890',
        tier: 'Platinum',
        tierBadgeColor: 'platinum',
      },
      totalPoinBulanIni: 1285,
      lifetimePoin: 9850,
      totalAktivitas: 18,
    },
    {
      peringkat: 3,
      pasien: {
        id: 'PSN-005',
        nama: 'Ahmad Fauzi',
        avatar: 'assets/images/avatar/male.png',
        email: 'ahmad.fauzi@gmail.com',
        telepon: '0812-3333-5555',
        tier: 'Platinum',
        tierBadgeColor: 'platinum',
      },
      totalPoinBulanIni: 980,
      lifetimePoin: 7420,
      totalAktivitas: 14,
    },
    {
      peringkat: 4,
      pasien: {
        id: 'PSN-002',
        nama: 'Dewi Lestari',
        avatar: 'assets/images/avatar/female.png',
        email: 'dewi.lestari@gmail.com',
        telepon: '0813-9876-5432',
        tier: 'Gold',
        tierBadgeColor: 'gold',
      },
      totalPoinBulanIni: 840,
      lifetimePoin: 5200,
      totalAktivitas: 12,
    },
    {
      peringkat: 5,
      pasien: {
        id: 'PSN-004',
        nama: 'Rina Wulandari',
        avatar: 'assets/images/avatar/female.png',
        email: 'rina.wulandari@gmail.com',
        telepon: '0813-1111-2222',
        tier: 'Gold',
        tierBadgeColor: 'gold',
      },
      totalPoinBulanIni: 710,
      lifetimePoin: 4100,
      totalAktivitas: 9,
    },
  ]);

  // Form State for Manual Adjustment Modal
  adjustmentForm = {
    pasienId: 'PSN-001',
    pasienNama: 'Andi Putra',
    tipe: 'Penambahan' as 'Penambahan' | 'Pengurangan',
    jumlahPoin: 150,
    alasan: 'Bonus Loyalitas Event Kesehatan',
  };

  // Filtered List Computed
  readonly filteredPointList = computed(() => {
    let list = this.pointList();

    // 1. Primary Tab Filter
    const tab = this.activeMainTab();
    if (tab === 'Perolehan (Earned)') {
      list = list.filter((i) => i.tipe === 'Earned');
    } else if (tab === 'Penukaran (Redeemed)') {
      list = list.filter((i) => i.tipe === 'Redeemed');
    }

    // 2. Filter Tipe Dropdown
    const t = this.filterTipe();
    if (t && t !== 'Semua Tipe') {
      list = list.filter((i) => i.tipe === t);
    }

    // 3. Filter Sumber Dropdown
    const s = this.filterSumber();
    if (s && s !== 'Semua Sumber') {
      list = list.filter((i) => i.sumber === s);
    }

    // 4. Filter Status Dropdown
    const st = this.filterStatus();
    if (st && st !== 'Semua Status') {
      list = list.filter((i) => i.status === st);
    }

    // 5. Search Query
    const q = this.searchQuery().toLowerCase().trim();
    if (q) {
      list = list.filter(
        (i) =>
          i.id.toLowerCase().includes(q) ||
          i.pasien.nama.toLowerCase().includes(q) ||
          i.pasien.email.toLowerCase().includes(q) ||
          i.refId.toLowerCase().includes(q) ||
          i.deskripsi.toLowerCase().includes(q)
      );
    }

    return list;
  });

  // Dynamic counts
  readonly earnedCount = computed(() => this.pointList().filter((i) => i.tipe === 'Earned').length);
  readonly redeemedCount = computed(() => this.pointList().filter((i) => i.tipe === 'Redeemed').length);

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
      url.includes('/admin/point/detail-point') ||
      url.includes('/admin/point/PTS') ||
      (this.route.children.length > 0 && this.route.snapshot.firstChild !== null);
    this.showingDetails.set(isChild);
  }

  setMainTab(tab: string): void {
    this.activeMainTab.set(tab);
  }

  viewDetail(item: PointItem): void {
    this.showingDetails.set(true);
    this.router.navigate(['/admin/point/detail-point', item.cleanId]);
  }

  viewPatientPoints(patientId: string): void {
    this.showingDetails.set(true);
    this.router.navigate(['/admin/point/detail-point', patientId]);
  }

  openAdjustmentModal(): void {
    this.showAdjustmentModal.set(true);
  }

  closeAdjustmentModal(): void {
    this.showAdjustmentModal.set(false);
  }

  saveAdjustment(): void {
    if (this.adjustmentForm.jumlahPoin <= 0) {
      alert('Jumlah poin harus lebih besar dari 0');
      return;
    }

    const isAdd = this.adjustmentForm.tipe === 'Penambahan';
    const poinAmount = isAdd ? this.adjustmentForm.jumlahPoin : -this.adjustmentForm.jumlahPoin;
    const newId = `#PTS-2026-00${this.pointList().length + 1}`;

    const newRecord: PointItem = {
      no: this.pointList().length + 1,
      id: newId,
      cleanId: newId.replace('#', ''),
      pasien: {
        id: this.adjustmentForm.pasienId,
        nama: this.adjustmentForm.pasienNama,
        avatar: 'assets/images/avatar/male.png',
        email: 'andi.putra@gmail.com',
        telepon: '0812-3456-7890',
        tier: 'Platinum',
        tierBadgeColor: 'platinum',
      },
      tipe: 'Adjustment',
      sumber: 'Penyesuaian Manual',
      deskripsi: this.adjustmentForm.alasan,
      jumlahPoint: poinAmount,
      nilaiRupiah: (isAdd ? 'Rp ' : '-Rp ') + (this.adjustmentForm.jumlahPoin * 10).toLocaleString('id-ID'),
      saldoSebelum: 3450,
      saldoSetelah: 3450 + poinAmount,
      tanggal: '12 Okt 2026',
      waktu: '17:50 WIB',
      status: 'Berhasil',
      refId: '#ADJ-2026-004',
    };

    this.pointList.update((items) => [newRecord, ...items]);
    this.closeAdjustmentModal();
    alert(`Penyesuaian poin untuk ${this.adjustmentForm.pasienNama} (${poinAmount > 0 ? '+' : ''}${poinAmount} Poin) berhasil disimpan!`);
  }

  exportData(): void {
    alert('Mengunduh Laporan Buku Besar Poin Loyalitas Pasien PSEF (Excel/CSV)...');
  }

  getTypeClass(tipe: TipeTransaksiPoint): string {
    switch (tipe) {
      case 'Earned':
        return 'type-earned';
      case 'Redeemed':
        return 'type-redeemed';
      case 'Adjustment':
        return 'type-adjustment';
      case 'Expired':
        return 'type-expired';
      default:
        return '';
    }
  }

  getStatusClass(status: StatusPoint): string {
    switch (status) {
      case 'Berhasil':
        return 'badge-berhasil';
      case 'Menunggu Verifikasi':
        return 'badge-menunggu';
      case 'Kedaluwarsa':
        return 'badge-kedaluwarsa';
      default:
        return '';
    }
  }
}
