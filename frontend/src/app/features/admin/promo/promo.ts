import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import {
  PromoItem,
  MembershipTierItem,
  TipeProgram,
  StatusProgram,
  TargetLayanan,
  KpiPromo,
} from './models/promo.model';

export type { PromoItem, MembershipTierItem, TipeProgram, StatusProgram, TargetLayanan, KpiPromo };

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

  readonly showingDetails = signal<boolean>(false);
  readonly copiedCode = signal<string | null>(null);
  readonly showCreateModal = signal<boolean>(false);
  readonly viewMode = signal<'table' | 'cards'>('table');

  // KPI Summary Cards
  readonly kpiCards: KpiPromo[] = [
    {
      title: 'Total Program Aktif',
      value: '18 Program',
      percentage: '+3 baru',
      period: 'bulan ini',
      icon: 'ri-price-tag-3-line',
      colorClass: 'purple',
    },
    {
      title: 'Voucher Terklaim',
      value: '4.892 Klaim',
      percentage: '78.4%',
      period: 'tingkat pemakaian',
      icon: 'ri-coupon-3-line',
      colorClass: 'teal',
    },
    {
      title: 'Total Diskon Pasien',
      value: 'Rp 34.650.000',
      percentage: '+18.2%',
      period: 'penghematan pasien',
      icon: 'ri-hand-coin-line',
      colorClass: 'emerald',
    },
    {
      title: 'Pasien Member Aktif',
      value: '8.420 Pasien',
      percentage: '+14.5%',
      period: 'loyalitas member',
      icon: 'ri-vip-crown-line',
      colorClass: 'amber',
    },
  ];

  // Primary Tab Navigation
  readonly activeMainTab = signal<string>('Semua Program');
  readonly mainTabs: string[] = [
    'Semua Program',
    'Voucher Diskon',
    'Campaign Promo',
    'Tingkatan Membership',
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
    'Telemedisin Dokter',
    'Telefarmasi Apoteker',
    'Pesanan Obat Resep',
    'Marketplace Obat',
  ];

  // Data: Promo & Voucher Programs
  readonly promoList = signal<PromoItem[]>([
    {
      id: '#VCH-2026-001',
      cleanId: 'VCH-2026-001',
      nama: 'Diskon Konsultasi Dokter Pertama',
      tipe: 'Voucher',
      kodeVoucher: 'DOKTERSEHAT',
      deskripsi: 'Potongan 50% untuk konsultasi telemedisin dokter spesialis pasien baru PSEF',
      diskon: {
        tipe: 'Persentase',
        nilai: 50,
        formatted: 'Diskon 50%',
        maxDiskon: 'Rp 50.000',
      },
      minTransaksi: 'Rp 50.000',
      periodeMulai: '01 Mei 2026',
      periodeSelesai: '31 Mei 2026',
      kuotaTotal: 500,
      kuotaTerpakai: 412,
      status: 'Aktif',
      targetLayanan: 'Telemedisin Dokter',
      badgeColor: 'teal',
      bannerBg: 'linear-gradient(135deg, #0ab39c 0%, #059669 100%)',
    },
    {
      id: '#VCH-2026-002',
      cleanId: 'VCH-2026-002',
      nama: 'Tebus Resep Digital Hemat',
      tipe: 'Voucher',
      kodeVoucher: 'RESEPHEMAT25',
      deskripsi: 'Potongan Rp 25.000 untuk penebusan obat resep dari telekonsultasi PSEF',
      diskon: {
        tipe: 'Nominal',
        nilai: 25000,
        formatted: 'Potongan Rp 25.000',
        maxDiskon: 'Rp 25.000',
      },
      minTransaksi: 'Rp 150.000',
      periodeMulai: '10 Mei 2026',
      periodeSelesai: '10 Jun 2026',
      kuotaTotal: 1000,
      kuotaTerpakai: 780,
      status: 'Aktif',
      targetLayanan: 'Pesanan Obat Resep',
      badgeColor: 'purple',
      bannerBg: 'linear-gradient(135deg, #7c3aed 0%, #6366f1 100%)',
    },
    {
      id: '#PRM-2026-003',
      cleanId: 'PRM-2026-003',
      nama: 'Flash Sale Vitamin & Suplemen Herbal',
      tipe: 'Campaign',
      deskripsi: 'Diskon kilat hingga 30% untuk produk multivitamin dan obat bebas marketplace apotek',
      diskon: {
        tipe: 'Persentase',
        nilai: 30,
        formatted: 'Hingga 30%',
        maxDiskon: 'Rp 40.000',
      },
      minTransaksi: 'Rp 75.000',
      periodeMulai: '20 Mei 2026',
      periodeSelesai: '27 Mei 2026',
      kuotaTotal: 800,
      kuotaTerpakai: 620,
      status: 'Aktif',
      targetLayanan: 'Marketplace Obat',
      badgeColor: 'amber',
      bannerBg: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)',
    },
    {
      id: '#VCH-2026-004',
      cleanId: 'VCH-2026-004',
      nama: 'Bebas Ongkir Antar Obat Kilat',
      tipe: 'Voucher',
      kodeVoucher: 'KIRIMGRATIS',
      deskripsi: 'Subsidi ongkos kirim ekspres kurir instan seluruh wilayah Jabodetabek',
      diskon: {
        tipe: 'Gratis Ongkir',
        nilai: 15000,
        formatted: 'Gratis Ongkir Rp 15.000',
        maxDiskon: 'Rp 15.000',
      },
      minTransaksi: 'Rp 100.000',
      periodeMulai: '01 Mei 2026',
      periodeSelesai: '31 Mei 2026',
      kuotaTotal: 1200,
      kuotaTerpakai: 1150,
      status: 'Aktif',
      targetLayanan: 'Semua Layanan',
      badgeColor: 'blue',
      bannerBg: 'linear-gradient(135deg, #2563eb 0%, #0284c7 100%)',
    },
    {
      id: '#PRM-2026-005',
      cleanId: 'PRM-2026-005',
      nama: 'Konseling Swamedikasi Apoteker Siaga',
      tipe: 'Campaign',
      deskripsi: 'Diskon 40% konsultasi telefarmasi apoteker untuk pencegahan penyakit musiman',
      diskon: {
        tipe: 'Persentase',
        nilai: 40,
        formatted: 'Diskon 40%',
        maxDiskon: 'Rp 20.000',
      },
      minTransaksi: 'Rp 25.000',
      periodeMulai: '15 Mei 2026',
      periodeSelesai: '15 Jun 2026',
      kuotaTotal: 600,
      kuotaTerpakai: 320,
      status: 'Aktif',
      targetLayanan: 'Telefarmasi Apoteker',
      badgeColor: 'emerald',
      bannerBg: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    },
    {
      id: '#VCH-2026-006',
      cleanId: 'VCH-2026-006',
      nama: 'Voucher Khusus Hari Kesehatan Nasional',
      tipe: 'Voucher',
      kodeVoucher: 'HKN2026',
      deskripsi: 'Kupon promo perayaan hari kesehatan nasional untuk seluruh transaksi pasien',
      diskon: {
        tipe: 'Nominal',
        nilai: 50000,
        formatted: 'Potongan Rp 50.000',
        maxDiskon: 'Rp 50.000',
      },
      minTransaksi: 'Rp 200.000',
      periodeMulai: '01 Jun 2026',
      periodeSelesai: '07 Jun 2026',
      kuotaTotal: 1500,
      kuotaTerpakai: 0,
      status: 'Segera Hadir',
      targetLayanan: 'Semua Layanan',
      badgeColor: 'purple',
      bannerBg: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
    },
    {
      id: '#VCH-2026-007',
      cleanId: 'VCH-2026-007',
      nama: 'Promo Penebusan Resep Kronis',
      tipe: 'Voucher',
      kodeVoucher: 'KRONISSEHAT',
      deskripsi: 'Voucher khusus pasien penderita penyakit kronis (Diabetes, Hipertensi) penebusan rutin',
      diskon: {
        tipe: 'Persentase',
        nilai: 15,
        formatted: 'Diskon 15%',
        maxDiskon: 'Rp 75.000',
      },
      minTransaksi: 'Rp 300.000',
      periodeMulai: '01 Apr 2026',
      periodeSelesai: '30 Apr 2026',
      kuotaTotal: 500,
      kuotaTerpakai: 500,
      status: 'Berakhir',
      targetLayanan: 'Pesanan Obat Resep',
      badgeColor: 'teal',
      bannerBg: 'linear-gradient(135deg, #0f766e 0%, #115e59 100%)',
    },
    {
      id: '#PRM-2026-008',
      cleanId: 'PRM-2026-008',
      nama: 'Cashback Poin Reward Telemedisin',
      tipe: 'Campaign',
      deskripsi: 'Ekstra cashback 5.000 poin loyalitas PSEF setiap kali konsultasi dengan dokter spesialis',
      diskon: {
        tipe: 'Cashback Point',
        nilai: 5000,
        formatted: '+5.000 Poin',
        maxDiskon: '5.000 Poin',
      },
      minTransaksi: 'Rp 100.000',
      periodeMulai: '01 Mei 2026',
      periodeSelesai: '31 Mei 2026',
      kuotaTotal: 1000,
      kuotaTerpakai: 640,
      status: 'Aktif',
      targetLayanan: 'Telemedisin Dokter',
      badgeColor: 'blue',
      bannerBg: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
    },
  ]);

  // Data: Membership Loyalty Tiers
  readonly membershipTiers = signal<MembershipTierItem[]>([
    {
      id: '#MBR-TIER-001',
      cleanId: 'silver-member',
      nama: 'Silver Member',
      tierLevel: 1,
      tagline: 'Tier Pemula untuk Seluruh Pasien Terdaftar',
      minBelanjaTahunan: 'Rp 0',
      minPoin: 0,
      totalAnggota: 4820,
      colorTheme: 'silver',
      icon: 'ri-shield-user-line',
      cashbackPoin: '1% Poin Reward',
      diskonKonsultasi: 'Diskon Konsultasi 5%',
      diskonOngkir: 'Diskon Ongkir Rp 5.000',
      benefits: [
        'Cashback poin 1% setiap transaksi pembayaran',
        'Voucher konsultasi perdana potongan Rp 15.000',
        'Akses riwayat resep & rekam medis digital PSEF',
        'Reminder otomatis jadwal minum obat',
      ],
      status: 'Aktif',
    },
    {
      id: '#MBR-TIER-002',
      cleanId: 'gold-member',
      nama: 'Gold Member',
      tierLevel: 2,
      tagline: 'Tier Pasien Rutin & Keluarga Sehat',
      minBelanjaTahunan: 'Rp 1.500.000',
      minPoin: 500,
      totalAnggota: 2350,
      colorTheme: 'gold',
      icon: 'ri-medal-line',
      cashbackPoin: '2.5% Poin Reward',
      diskonKonsultasi: 'Diskon Konsultasi 10%',
      diskonOngkir: 'Gratis Ongkir 2x / Bulan',
      benefits: [
        'Cashback poin 2.5% untuk semua layanan',
        'Diskon 10% setiap telekonsultasi dokter & apoteker',
        'Gratis ongkos kirim pesanan obat 2x per bulan',
        'Antrean verifikasi resep diprioritaskan',
        'Konsultasi swamedikasi apoteker bebas antre',
      ],
      status: 'Aktif',
    },
    {
      id: '#MBR-TIER-003',
      cleanId: 'platinum-member',
      nama: 'Platinum Member',
      tierLevel: 3,
      tagline: 'Tier Premium untuk Pasien Perawatan Intensif',
      minBelanjaTahunan: 'Rp 5.000.000',
      minPoin: 2000,
      totalAnggota: 980,
      colorTheme: 'platinum',
      icon: 'ri-vip-diamond-line',
      cashbackPoin: '5% Poin Reward',
      diskonKonsultasi: 'Diskon Konsultasi 20%',
      diskonOngkir: 'Bebas Ongkir Unlimited',
      benefits: [
        'Cashback poin 5% multiplier ganda',
        'Diskon 20% tanpa batas maksimal untuk telemedisin',
        'Gratis pengiriman ekspres unlimited (min. belanja 50rb)',
        'Layanan Telemedisin Darurat Siaga 24/7',
        'Konseling personal dengan Apoteker Penanggung Jawab',
        'Voucher ulang tahun senilai Rp 100.000',
      ],
      status: 'Aktif',
    },
    {
      id: '#MBR-TIER-004',
      cleanId: 'vip-priority',
      nama: 'VIP Priority',
      tierLevel: 4,
      tagline: 'Program Korporat & Keanggotaan Eksklusif VIP',
      minBelanjaTahunan: 'Rp 15.000.000',
      minPoin: 5000,
      totalAnggota: 270,
      colorTheme: 'vip',
      icon: 'ri-vip-crown-fill',
      cashbackPoin: '8% Poin Reward',
      diskonKonsultasi: 'Konsultasi Gratis / Bulan',
      diskonOngkir: 'Pengiriman Same-Day Gratis',
      benefits: [
        'Dedicated Medical Care Coordinator & Personal Pharmacist',
        '1x Sesi konsultasi dokter spesialis gratis setiap bulan',
        'Diskon 25% untuk seluruh penebusan obat resep',
        'Antar obat Same-Day VIP Courier dengan kemasan termal',
        'Paket skrining lab kesehatan tahunan bekerjasama dengan faskes',
        'Akses antrean prioritas 0 menit',
      ],
      status: 'Aktif',
    },
  ]);

  // Form State for Modal Create Program
  newProgram = {
    tipe: 'Voucher' as TipeProgram,
    nama: '',
    kodeVoucher: '',
    diskonTipe: 'Persentase' as 'Persentase' | 'Nominal' | 'Gratis Ongkir' | 'Cashback Point',
    nilaiDiskon: 20,
    maxDiskon: 'Rp 30.000',
    minTransaksi: 'Rp 50.000',
    targetLayanan: 'Semua Layanan' as TargetLayanan,
    kuotaTotal: 500,
    periodeMulai: '2026-06-01',
    periodeSelesai: '2026-06-30',
    deskripsi: '',
  };

  // Filtered List Computed
  readonly filteredPromoList = computed(() => {
    let list = this.promoList();

    // 1. Tab Filter
    const mainTab = this.activeMainTab();
    if (mainTab === 'Voucher Diskon') {
      list = list.filter((p) => p.tipe === 'Voucher');
    } else if (mainTab === 'Campaign Promo') {
      list = list.filter((p) => p.tipe === 'Campaign');
    }

    // 2. Status Filter
    const st = this.filterStatus();
    if (st && st !== 'Semua Status') {
      list = list.filter((p) => p.status === st);
    }

    // 3. Target Layanan Filter
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
          p.deskripsi.toLowerCase().includes(q)
      );
    }

    return list;
  });

  // Dynamic Metrics
  readonly voucherCount = computed(() => this.promoList().filter((p) => p.tipe === 'Voucher').length);
  readonly campaignCount = computed(() => this.promoList().filter((p) => p.tipe === 'Campaign').length);
  readonly membershipCount = computed(() => this.membershipTiers().length);

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
      url.includes('/admin/promo/detail-promo') ||
      url.includes('/admin/promo/PRM') ||
      url.includes('/admin/promo/VCH') ||
      url.includes('/admin/promo/MBR') ||
      url.includes('/admin/promo/silver') ||
      url.includes('/admin/promo/gold') ||
      url.includes('/admin/promo/platinum') ||
      url.includes('/admin/promo/vip') ||
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

  viewDetail(item: PromoItem): void {
    this.showingDetails.set(true);
    this.router.navigate(['/admin/promo/detail-promo', item.cleanId]);
  }

  viewTierDetail(tier: MembershipTierItem): void {
    this.showingDetails.set(true);
    this.router.navigate(['/admin/promo/detail-promo', tier.cleanId]);
  }

  toggleProgramStatus(item: PromoItem): void {
    this.promoList.update((items) =>
      items.map((i) => {
        if (i.id === item.id) {
          const newStatus: StatusProgram = i.status === 'Aktif' ? 'Nonaktif' : 'Aktif';
          return { ...i, status: newStatus };
        }
        return i;
      })
    );
  }

  openCreateModal(): void {
    this.showCreateModal.set(true);
  }

  closeCreateModal(): void {
    this.showCreateModal.set(false);
  }

  saveNewProgram(): void {
    if (!this.newProgram.nama) {
      alert('Silakan masukkan nama program promo/voucher');
      return;
    }

    const newId =
      this.newProgram.tipe === 'Voucher'
        ? `#VCH-2026-00${this.promoList().length + 1}`
        : `#PRM-2026-00${this.promoList().length + 1}`;

    const formattedDiskon =
      this.newProgram.diskonTipe === 'Persentase'
        ? `Diskon ${this.newProgram.nilaiDiskon}%`
        : this.newProgram.diskonTipe === 'Nominal'
        ? `Potongan Rp ${this.newProgram.nilaiDiskon.toLocaleString('id-ID')}`
        : this.newProgram.diskonTipe === 'Gratis Ongkir'
        ? 'Gratis Ongkir'
        : `+${this.newProgram.nilaiDiskon} Poin`;

    const newItem: PromoItem = {
      id: newId,
      cleanId: newId.replace('#', ''),
      nama: this.newProgram.nama,
      tipe: this.newProgram.tipe,
      kodeVoucher:
        this.newProgram.tipe === 'Voucher'
          ? (this.newProgram.kodeVoucher || 'VCHNEW').toUpperCase()
          : undefined,
      deskripsi: this.newProgram.deskripsi || 'Program promo kesehatan PSEF',
      diskon: {
        tipe: this.newProgram.diskonTipe,
        nilai: this.newProgram.nilaiDiskon,
        formatted: formattedDiskon,
        maxDiskon: this.newProgram.maxDiskon,
      },
      minTransaksi: this.newProgram.minTransaksi,
      periodeMulai: this.newProgram.periodeMulai,
      periodeSelesai: this.newProgram.periodeSelesai,
      kuotaTotal: this.newProgram.kuotaTotal,
      kuotaTerpakai: 0,
      status: 'Aktif',
      targetLayanan: this.newProgram.targetLayanan,
      badgeColor: this.newProgram.tipe === 'Voucher' ? 'purple' : 'teal',
      bannerBg:
        this.newProgram.tipe === 'Voucher'
          ? 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)'
          : 'linear-gradient(135deg, #059669 0%, #0d9488 100%)',
    };

    this.promoList.update((prev) => [newItem, ...prev]);
    this.closeCreateModal();
    alert(`Program "${newItem.nama}" berhasil ditambahkan!`);
  }

  exportData(): void {
    alert('Mengunduh Laporan Rekapitulasi Program Voucher, Promo & Membership PSEF...');
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
