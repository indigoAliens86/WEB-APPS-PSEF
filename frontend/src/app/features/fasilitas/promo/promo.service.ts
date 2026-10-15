import { Injectable, signal, computed } from '@angular/core';
import {
  PromoItem,
  DetailPromoData,
  KpiPromo,
  StatusProgram,
  TipeProgram,
} from './models/promo.model';

@Injectable({
  providedIn: 'root',
})
export class PromoService {
  readonly currentFacilityName = 'Apotek Kimia Sehat PSEF';

  readonly promoList = signal<PromoItem[]>([
    {
      id: '#VCH-FAS-001',
      cleanId: 'VCH-FAS-001',
      nama: 'Voucher Tebus Resep Pertama Apotek',
      tipe: 'Voucher',
      kodeVoucher: 'KIMIASEHAT20',
      deskripsi:
        'Voucher potongan 20% bagi pasien yang menebus resep obat pertama kali secara digital di Apotek Kimia Sehat PSEF.',
      diskon: {
        tipe: 'Persentase',
        nilai: 20,
        formatted: 'Diskon 20%',
        maxDiskon: 'Rp 40.000',
      },
      minTransaksi: 'Rp 100.000',
      periodeMulai: '01 Mei 2026',
      periodeSelesai: '31 Mei 2026',
      kuotaTotal: 300,
      kuotaTerpakai: 245,
      status: 'Aktif',
      targetLayanan: 'Pesanan Resep Apotek',
      badgeColor: 'purple',
      bannerBg: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)',
      fasilitasPenerbit: 'Apotek Kimia Sehat PSEF',
      syaratKetentuan: [
        'Voucher berlaku khusus untuk penebusan resep dokter di Apotek Kimia Sehat PSEF.',
        'Maksimal potongan harga adalah Rp 40.000 per transaksi.',
        'Minimal transaksi penebusan resep adalah Rp 100.000.',
        'Berlaku untuk 1 (satu) kali penggunaan per akun pasien.',
        'Tidak dapat digabungkan dengan promo bundling lainnya.',
      ],
    },
    {
      id: '#PRM-FAS-002',
      cleanId: 'PRM-FAS-002',
      nama: 'Campaign Tebus Murah Vitamin C & D3 Imunitas',
      tipe: 'Campaign',
      deskripsi:
        'Promo bundling vitamin dan suplemen daya tahan tubuh keluarga dengan potongan harga langsung di apotek.',
      diskon: {
        tipe: 'Nominal',
        nilai: 25000,
        formatted: 'Potongan Rp 25.000',
      },
      minTransaksi: 'Rp 80.000',
      periodeMulai: '10 Mei 2026',
      periodeSelesai: '25 Mei 2026',
      kuotaTotal: 500,
      kuotaTerpakai: 388,
      status: 'Aktif',
      targetLayanan: 'Obat Bebas & Suplemen',
      badgeColor: 'teal',
      bannerBg: 'linear-gradient(135deg, #059669 0%, #0d9488 100%)',
      fasilitasPenerbit: 'Apotek Kimia Sehat PSEF',
      syaratKetentuan: [
        'Promo potongan harga otomatis diterapkan saat checkout suplemen kategori Imunitas.',
        'Minimal pembelian Rp 80.000 untuk produk suplemen bertanda khusus.',
        'Berlaku selama persediaan kuota promosi masih ada.',
      ],
    },
    {
      id: '#VCH-FAS-003',
      cleanId: 'VCH-FAS-003',
      nama: 'Gratis Ongkir Instant Kurir Obat Resep',
      tipe: 'Voucher',
      kodeVoucher: 'ONGKIRFREE',
      deskripsi:
        'Gratis biaya pengantaran obat instant kurir radius hingga 10 km dari lokasi Apotek Kimia Sehat.',
      diskon: {
        tipe: 'Gratis Ongkir',
        nilai: 15000,
        formatted: 'Gratis Ongkir',
        maxDiskon: 'Rp 15.000',
      },
      minTransaksi: 'Rp 50.000',
      periodeMulai: '01 Mei 2026',
      periodeSelesai: '30 Jun 2026',
      kuotaTotal: 400,
      kuotaTerpakai: 312,
      status: 'Aktif',
      targetLayanan: 'Pesanan Resep Apotek',
      badgeColor: 'emerald',
      bannerBg: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      fasilitasPenerbit: 'Apotek Kimia Sehat PSEF',
      syaratKetentuan: [
        'Berlaku untuk pengantaran pesanan resep obat melalui kurir instant apotek.',
        'Maksimal subsidi ongkos kirim sebesar Rp 15.000.',
        'Minimal transaksi belanja obat Rp 50.000.',
      ],
    },
    {
      id: '#VCH-FAS-004',
      cleanId: 'VCH-FAS-004',
      nama: 'Potongan Sesi Konseling Telefarmasi Apoteker',
      tipe: 'Diskon Telefarmasi',
      kodeVoucher: 'KONSELING15',
      deskripsi:
        'Diskon 15% untuk sesi edukasi kepatuhan obat dan tele-konseling farmasi klinis bersama apoteker penanggung jawab.',
      diskon: {
        tipe: 'Persentase',
        nilai: 15,
        formatted: 'Diskon 15%',
        maxDiskon: 'Rp 20.000',
      },
      minTransaksi: 'Rp 35.000',
      periodeMulai: '15 Mei 2026',
      periodeSelesai: '15 Jun 2026',
      kuotaTotal: 200,
      kuotaTerpakai: 78,
      status: 'Aktif',
      targetLayanan: 'Konseling Telefarmasi',
      badgeColor: 'blue',
      bannerBg: 'linear-gradient(135deg, #2563eb 0%, #0284c7 100%)',
      fasilitasPenerbit: 'Apotek Kimia Sehat PSEF',
      syaratKetentuan: [
        'Berlaku khusus untuk pemesanan jadwal konseling daring telefarmasi apoteker.',
        'Maksimal potongan senilai Rp 20.000.',
        'Dapat dijadwalkan pada hari kerja apoteker bertugas.',
      ],
    },
    {
      id: '#PRM-FAS-005',
      cleanId: 'PRM-FAS-005',
      nama: 'Paket Skrining Gula Darah & Kolesterol Mandiri',
      tipe: 'Campaign',
      deskripsi:
        'Penawaran hemat pembelian strip cek gula darah dan tensimeter digital bersertifikat Kemenkes di etalase apotek.',
      diskon: {
        tipe: 'Nominal',
        nilai: 30000,
        formatted: 'Potongan Rp 30.000',
      },
      minTransaksi: 'Rp 150.000',
      periodeMulai: '20 Mei 2026',
      periodeSelesai: '10 Jun 2026',
      kuotaTotal: 150,
      kuotaTerpakai: 24,
      status: 'Segera Hadir',
      targetLayanan: 'Alat Kesehatan & Diagnostik',
      badgeColor: 'amber',
      bannerBg: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      fasilitasPenerbit: 'Apotek Kimia Sehat PSEF',
      syaratKetentuan: [
        'Program promo berlaku mulai 20 Mei 2026.',
        'Potongan harga langsung untuk pembelian produk alat kesehatan bertanda khusus.',
        'Minimal belanja Rp 150.000.',
      ],
    },
    {
      id: '#VCH-FAS-006',
      cleanId: 'VCH-FAS-006',
      nama: 'Voucher Peduli Pasien Kronis & Lansia',
      tipe: 'Voucher',
      kodeVoucher: 'LANSIAKRONIS',
      deskripsi:
        'Subsidi diskon obat rutin bulanan untuk pasien hipertensi, diabetes, dan penyakit kronis terdaftar di Apotek.',
      diskon: {
        tipe: 'Nominal',
        nilai: 35000,
        formatted: 'Potongan Rp 35.000',
      },
      minTransaksi: 'Rp 120.000',
      periodeMulai: '01 Apr 2026',
      periodeSelesai: '30 Apr 2026',
      kuotaTotal: 250,
      kuotaTerpakai: 250,
      status: 'Berakhir',
      targetLayanan: 'Pesanan Resep Apotek',
      badgeColor: 'purple',
      bannerBg: 'linear-gradient(135deg, #64748b 0%, #475569 100%)',
      fasilitasPenerbit: 'Apotek Kimia Sehat PSEF',
      syaratKetentuan: [
        'Berlaku untuk penebusan obat kronis rutin.',
        'Program telah berakhir pada 30 April 2026.',
      ],
    },
  ]);

  // Computed KPI stats
  readonly kpiCards = computed<KpiPromo[]>(() => {
    const list = this.promoList();
    const activeCount = list.filter((p) => p.status === 'Aktif').length;
    const totalClaims = list.reduce((sum, p) => sum + p.kuotaTerpakai, 0);

    return [
      {
        title: 'Program Promo Aktif',
        value: `${activeCount} Program`,
        percentage: '+2 baru',
        period: 'bulan ini',
        icon: 'ri-price-tag-3-line',
        colorClass: 'purple',
      },
      {
        title: 'Total Voucher Terklaim',
        value: `${totalClaims.toLocaleString('id-ID')} Klaim`,
        percentage: '81.2%',
        period: 'tingkat klaim pasien',
        icon: 'ri-coupon-3-line',
        colorClass: 'teal',
      },
      {
        title: 'Diskon Diberikan',
        value: 'Rp 18.650.000',
        percentage: '+15.4%',
        period: 'penghematan pasien apotek',
        icon: 'ri-hand-coin-line',
        colorClass: 'emerald',
      },
      {
        title: 'Pasien Penerima Manfaat',
        value: '1.047 Pasien',
        percentage: '+12.8%',
        period: 'loyalitas pelanggan',
        icon: 'ri-user-heart-line',
        colorClass: 'blue',
      },
    ];
  });

  getPromoById(id: string): PromoItem | undefined {
    const clean = id.replace('#', '').trim().toLowerCase();
    return this.promoList().find(
      (p) => p.cleanId.toLowerCase() === clean || p.id.toLowerCase() === id.toLowerCase()
    );
  }

  getDetailPromoData(id: string): DetailPromoData {
    const item = this.getPromoById(id) || this.promoList()[0];
    const percentage = item.kuotaTotal > 0 ? Math.round((item.kuotaTerpakai / item.kuotaTotal) * 100) : 0;

    return {
      id: item.id,
      cleanId: item.cleanId,
      nama: item.nama,
      tipe: item.tipe,
      kodeVoucher: item.kodeVoucher,
      deskripsi: item.deskripsi,
      status: item.status,
      periodeMulai: item.periodeMulai,
      periodeSelesai: item.periodeSelesai,
      sisaHari: 14,
      targetLayanan: item.targetLayanan,
      diskonFormatted: item.diskon.formatted,
      minTransaksiFormatted: item.minTransaksi,
      maxDiskonFormatted: item.diskon.maxDiskon || item.diskon.formatted,
      kuotaTotal: item.kuotaTotal,
      kuotaTerpakai: item.kuotaTerpakai,
      persentaseKuota: percentage,
      totalPenghematanPasien: 'Rp 6.125.000',
      totalOmsetTerdorong: 'Rp 32.450.000',
      fasilitasPenerbit: this.currentFacilityName,
      syaratKetentuan: item.syaratKetentuan || [
        'Voucher hanya berlaku untuk transaksi layanan atau produk pada Apotek Kimia Sehat PSEF.',
        'Promo berlaku sesuai dengan masa aktif dan kuota yang tersedia.',
        'Tidak dapat digabungkan dengan kode promo lain kecuali dinyatakan lain.',
        'Apotek berhak membatalkan promo apabila terindikasi transaksi yang tidak wajar.',
      ],
      riwayatKlaim: [
        {
          no: 1,
          pasienNama: 'Andi Putra',
          pasienAvatar: '/assets/images/avatar/male.png',
          transaksiId: '#TRX-FAS-2026-081',
          layanan: 'Penebusan Resep Obat Batuk & Alergi',
          nilaiDiskon: 'Rp 20.000',
          waktu: '14 Okt 2026 14:15 WIB',
        },
        {
          no: 2,
          pasienNama: 'Siti Nurhaliza',
          pasienAvatar: '/assets/images/avatar/female.png',
          transaksiId: '#TRX-FAS-2026-082',
          layanan: 'Pembelian Suplemen Vitamin C 500mg',
          nilaiDiskon: 'Rp 25.000',
          waktu: '14 Okt 2026 11:30 WIB',
        },
        {
          no: 3,
          pasienNama: 'Budi Santoso',
          pasienAvatar: '/assets/images/avatar/male.png',
          transaksiId: '#TRX-FAS-2026-079',
          layanan: 'Resep Hipertensi Bulanan',
          nilaiDiskon: 'Rp 35.000',
          waktu: '13 Okt 2026 16:45 WIB',
        },
        {
          no: 4,
          pasienNama: 'Rina Wulandari',
          pasienAvatar: '/assets/images/avatar/female.png',
          transaksiId: '#TRX-FAS-2026-075',
          layanan: 'Konseling Telefarmasi Asma',
          nilaiDiskon: 'Rp 15.000',
          waktu: '12 Okt 2026 10:20 WIB',
        },
        {
          no: 5,
          pasienNama: 'Ahmad Fauzi',
          pasienAvatar: '/assets/images/avatar/male.png',
          transaksiId: '#TRX-FAS-2026-068',
          layanan: 'Alat Cek Gula Darah EasyTouch',
          nilaiDiskon: 'Rp 30.000',
          waktu: '11 Okt 2026 09:10 WIB',
        },
      ],
    };
  }

  addPromo(data: Partial<PromoItem>): PromoItem {
    const list = this.promoList();
    const count = list.length + 1;
    const prefix = data.tipe === 'Voucher' ? 'VCH' : data.tipe === 'Diskon Telefarmasi' ? 'TLF' : 'PRM';
    const id = `#${prefix}-FAS-${String(count).padStart(3, '0')}`;
    const cleanId = id.replace('#', '');

    const formattedDiskon =
      data.diskon?.tipe === 'Persentase'
        ? `Diskon ${data.diskon.nilai}%`
        : data.diskon?.tipe === 'Nominal'
        ? `Potongan Rp ${(data.diskon.nilai || 0).toLocaleString('id-ID')}`
        : data.diskon?.tipe === 'Gratis Ongkir'
        ? 'Gratis Ongkir'
        : `Diskon ${data.diskon?.nilai || 0}`;

    const newPromo: PromoItem = {
      id,
      cleanId,
      nama: data.nama || 'Promo Apotek Baru',
      tipe: data.tipe || 'Voucher',
      kodeVoucher: data.tipe === 'Voucher' ? (data.kodeVoucher || 'PROMOFAS').toUpperCase() : undefined,
      deskripsi: data.deskripsi || 'Program promo resmi Apotek Kimia Sehat PSEF.',
      diskon: {
        tipe: data.diskon?.tipe || 'Persentase',
        nilai: data.diskon?.nilai || 10,
        formatted: formattedDiskon,
        maxDiskon: data.diskon?.maxDiskon,
      },
      minTransaksi: data.minTransaksi || 'Rp 50.000',
      periodeMulai: data.periodeMulai || '15 Okt 2026',
      periodeSelesai: data.periodeSelesai || '15 Nov 2026',
      kuotaTotal: data.kuotaTotal || 100,
      kuotaTerpakai: 0,
      status: (data.status as StatusProgram) || 'Aktif',
      targetLayanan: data.targetLayanan || 'Obat Bebas & Suplemen',
      badgeColor: data.tipe === 'Voucher' ? 'purple' : data.tipe === 'Diskon Telefarmasi' ? 'blue' : 'teal',
      bannerBg:
        data.tipe === 'Voucher'
          ? 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)'
          : data.tipe === 'Diskon Telefarmasi'
          ? 'linear-gradient(135deg, #2563eb 0%, #0284c7 100%)'
          : 'linear-gradient(135deg, #059669 0%, #0d9488 100%)',
      fasilitasPenerbit: this.currentFacilityName,
      syaratKetentuan: data.syaratKetentuan || [
        'Voucher hanya berlaku untuk transaksi pada Apotek Kimia Sehat PSEF.',
        'Promo berlaku selama kuota masih tersedia.',
      ],
    };

    this.promoList.update((prev) => [newPromo, ...prev]);
    return newPromo;
  }

  updatePromo(cleanId: string, updated: Partial<PromoItem>): boolean {
    let found = false;
    this.promoList.update((items) =>
      items.map((item) => {
        if (item.cleanId.toLowerCase() === cleanId.toLowerCase() || item.id.toLowerCase() === cleanId.toLowerCase()) {
          found = true;
          return {
            ...item,
            ...updated,
            diskon: {
              ...item.diskon,
              ...(updated.diskon || {}),
            },
          };
        }
        return item;
      })
    );
    return found;
  }

  deletePromo(cleanId: string): void {
    this.promoList.update((items) =>
      items.filter((item) => item.cleanId.toLowerCase() !== cleanId.toLowerCase() && item.id.toLowerCase() !== cleanId.toLowerCase())
    );
  }

  toggleStatus(cleanId: string): void {
    this.promoList.update((items) =>
      items.map((item) => {
        if (item.cleanId.toLowerCase() === cleanId.toLowerCase() || item.id.toLowerCase() === cleanId.toLowerCase()) {
          const newStatus: StatusProgram = item.status === 'Aktif' ? 'Nonaktif' : 'Aktif';
          return { ...item, status: newStatus };
        }
        return item;
      })
    );
  }
}
