import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailPromoData, TipeProgram, TargetLayanan } from '../models/promo.model';

@Component({
  selector: 'app-detail-promo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail-promo.html',
  styleUrl: './detail-promo.css',
})
export class DetailPromo implements OnInit {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly programId = signal<string>('VCH-2026-001');
  readonly copiedCode = signal<boolean>(false);

  // Detail Data Signal
  readonly detail = signal<DetailPromoData>({
    id: '#VCH-2026-001',
    cleanId: 'VCH-2026-001',
    nama: 'Diskon Konsultasi Dokter Pertama',
    tipe: 'Voucher',
    kodeVoucher: 'DOKTERSEHAT',
    deskripsi: 'Voucher promosi potongan 50% untuk konsultasi telemedisin dokter spesialis bagi pasien baru di ekosistem platform kesehatan digital PSEF.',
    status: 'Aktif',
    periodeMulai: '01 Mei 2026',
    periodeSelesai: '31 Mei 2026',
    sisaHari: 19,
    targetLayanan: 'Telemedisin Dokter',
    diskonFormatted: 'Diskon 50%',
    minTransaksiFormatted: 'Rp 50.000',
    maxDiskonFormatted: 'Rp 50.000',
    kuotaTotal: 500,
    kuotaTerpakai: 412,
    persentaseKuota: 82.4,
    totalPenghematanPasien: 'Rp 18.450.000',
    totalOmsetTerdorong: 'Rp 64.200.000',
    targetTierMembership: 'Semua Tier (Silver, Gold, Platinum)',
    syaratKetentuan: [
      'Voucher berlaku khusus untuk pasien yang pertama kali melakukan konsultasi telemedisin di PSEF.',
      'Potongan sebesar 50% dengan nilai maksimal diskon Rp 50.000 per transaksi.',
      'Minimum transaksi sebelum diskon adalah Rp 50.000.',
      'Berlaku untuk seluruh dokter spesialis dan dokter umum yang bertugas.',
      'Dapat digunakan 1 (satu) kali per akun pasien selama periode promosi aktif.',
      'Tidak dapat diuangkan atau digabungkan dengan kode kupon promo lainnya.',
      'PSEF berhak membatalkan klaim transaksi jika ditemukan indikasi penyalahgunaan akun ganda.',
    ],
    riwayatKlaim: [
      {
        no: 1,
        pasienNama: 'Andi Putra',
        pasienAvatar: 'assets/images/avatar/male.png',
        transaksiId: '#PAY25024-0012',
        layanan: 'Telemedisin dr. Andi Wijaya',
        nilaiDiskon: 'Rp 25.000',
        waktu: '24 Mei 2026 10:30 WIB',
      },
      {
        no: 2,
        pasienNama: 'Dewi Lestari',
        pasienAvatar: 'assets/images/avatar/female.png',
        transaksiId: '#PAY25024-0013',
        layanan: 'Telemedisin dr. Siti Nurhaliza',
        nilaiDiskon: 'Rp 40.000',
        waktu: '24 Mei 2026 09:15 WIB',
      },
      {
        no: 3,
        pasienNama: 'Budi Santoso',
        pasienAvatar: 'assets/images/avatar/male.png',
        transaksiId: '#PAY25024-0014',
        layanan: 'Telemedisin dr. Bambang Sudrajat',
        nilaiDiskon: 'Rp 35.000',
        waktu: '23 Mei 2026 16:45 WIB',
      },
      {
        no: 4,
        pasienNama: 'Rina Wulandari',
        pasienAvatar: 'assets/images/avatar/female.png',
        transaksiId: '#PAY25024-0015',
        layanan: 'Telemedisin dr. Andi Wijaya',
        nilaiDiskon: 'Rp 25.000',
        waktu: '23 Mei 2026 14:20 WIB',
      },
      {
        no: 5,
        pasienNama: 'Ahmad Fauzi',
        pasienAvatar: 'assets/images/avatar/male.png',
        transaksiId: '#PAY25024-0016',
        layanan: 'Telemedisin dr. Bambang Sudrajat',
        nilaiDiskon: 'Rp 30.000',
        waktu: '22 Mei 2026 11:10 WIB',
      },
    ],
  });

  ngOnInit(): void {
    const routeId = this.route.snapshot.paramMap.get('id');
    if (routeId) {
      this.programId.set(routeId);
      if (routeId.includes('PRM') || routeId.toLowerCase().includes('campaign')) {
        this.switchPreviewType('Campaign');
      } else if (routeId.includes('MBR') || routeId.toLowerCase().includes('member') || routeId.toLowerCase().includes('gold') || routeId.toLowerCase().includes('platinum') || routeId.toLowerCase().includes('silver') || routeId.toLowerCase().includes('vip')) {
        this.switchPreviewType('Membership');
      } else {
        this.switchPreviewType('Voucher');
      }
    }
  }

  // Interactive Type Preview Switcher for thorough testing & review
  switchPreviewType(tipe: TipeProgram): void {
    if (tipe === 'Campaign') {
      this.detail.set({
        id: '#PRM-2026-003',
        cleanId: 'PRM-2026-003',
        nama: 'Flash Sale Vitamin & Suplemen Herbal',
        tipe: 'Campaign',
        kodeVoucher: undefined,
        deskripsi: 'Program diskon kilat otomatis hingga 30% tanpa perlu memasukkan kode kupon, berlaku untuk seluruh etalase multivitamin dan suplemen daya tahan tubuh di marketplace obat PSEF.',
        status: 'Aktif',
        periodeMulai: '20 Mei 2026',
        periodeSelesai: '27 Mei 2026',
        sisaHari: 7,
        targetLayanan: 'Marketplace Obat',
        diskonFormatted: 'Diskon s.d 30%',
        minTransaksiFormatted: 'Rp 75.000',
        maxDiskonFormatted: 'Rp 40.000',
        kuotaTotal: 800,
        kuotaTerpakai: 620,
        persentaseKuota: 77.5,
        totalPenghematanPasien: 'Rp 14.800.000',
        totalOmsetTerdorong: 'Rp 58.900.000',
        targetTierMembership: 'Seluruh Pasien & Pengguna Umum',
        syaratKetentuan: [
          'Promo diaplikasikan secara otomatis di keranjang checkout saat memenuhi syarat produk.',
          'Maksimal potongan harga adalah Rp 40.000 per transaksi checkout obat.',
          'Berlaku untuk produk dengan tag Flash Sale Vitamin PSEF.',
          'Bebas biaya administrasi untuk pembayaran instan Virtual Account dan QRIS.',
          'Maksimal pembelian 5 produk per jenis multivitamin per pengguna.',
        ],
        riwayatKlaim: [
          {
            no: 1,
            pasienNama: 'Hendra Wijaya',
            pasienAvatar: 'assets/images/avatar/male.png',
            transaksiId: '#PAY25024-0018',
            layanan: 'Marketplace Vitamin C 500mg',
            nilaiDiskon: 'Rp 18.000',
            waktu: '24 Mei 2026 10:20 WIB',
          },
          {
            no: 2,
            pasienNama: 'Maya Indah',
            pasienAvatar: 'assets/images/avatar/female.png',
            transaksiId: '#PAY25024-0019',
            layanan: 'Marketplace Suplemen Imun Herbal',
            nilaiDiskon: 'Rp 24.000',
            waktu: '24 Mei 2026 10:15 WIB',
          },
        ],
      });
    } else if (tipe === 'Membership') {
      this.detail.set({
        id: '#MBR-TIER-003',
        cleanId: 'platinum-member',
        nama: 'Platinum Member - Program Loyalitas Prioritas',
        tipe: 'Membership',
        kodeVoucher: 'PLATINUMVIP',
        deskripsi: 'Tingkatan membership pasien loyalitas tinggi PSEF dengan akumulasi belanja minimal Rp 5.000.000 atau perolehan di atas 2.000 poin dalam 12 bulan terakhir.',
        status: 'Aktif',
        periodeMulai: '01 Jan 2026',
        periodeSelesai: '31 Des 2026',
        sisaHari: 233,
        targetLayanan: 'Semua Layanan',
        diskonFormatted: 'Diskon 20% & Bebas Ongkir',
        minTransaksiFormatted: 'Rp 0 (Tanpa Minimum)',
        maxDiskonFormatted: 'Tanpa Batas Maksimal',
        kuotaTotal: 1500,
        kuotaTerpakai: 980,
        persentaseKuota: 65.3,
        totalPenghematanPasien: 'Rp 42.600.000',
        totalOmsetTerdorong: 'Rp 185.000.000',
        targetTierMembership: 'Tier Platinum (Pasien Aktif Terdaftar)',
        syaratKetentuan: [
          'Status Platinum dievaluasi secara otomatis setiap 365 hari kalender.',
          'Mendapatkan diskon tetap 20% untuk semua konsultasi dokter spesialis & umum.',
          'Gratis biaya pengiriman pesanan obat resep ke seluruh area faskes terdaftar.',
          'Layanan darurat panggilan telemedisin siaga 24/7 bebas biaya reservasi.',
          'Poin reward transaksi dilipatgandakan sebesar 2x lipat (multiplier 200%).',
        ],
        riwayatKlaim: [
          {
            no: 1,
            pasienNama: 'Dian Permata',
            pasienAvatar: 'assets/images/avatar/female.png',
            transaksiId: '#PAY25024-0020',
            layanan: 'Konseling Telefarmasi Platinum',
            nilaiDiskon: 'Rp 30.000',
            waktu: '24 Mei 2026 10:05 WIB',
          },
          {
            no: 2,
            pasienNama: 'Andi Putra',
            pasienAvatar: 'assets/images/avatar/male.png',
            transaksiId: '#PAY25024-0012',
            layanan: 'Bebas Ongkir Pengiriman Obat',
            nilaiDiskon: 'Rp 15.000',
            waktu: '24 Mei 2026 10:30 WIB',
          },
        ],
      });
    } else {
      // Default: Voucher
      this.detail.set({
        id: '#VCH-2026-001',
        cleanId: 'VCH-2026-001',
        nama: 'Diskon Konsultasi Dokter Pertama',
        tipe: 'Voucher',
        kodeVoucher: 'DOKTERSEHAT',
        deskripsi: 'Voucher promosi potongan 50% untuk konsultasi telemedisin dokter spesialis bagi pasien baru di ekosistem platform kesehatan digital PSEF.',
        status: 'Aktif',
        periodeMulai: '01 Mei 2026',
        periodeSelesai: '31 Mei 2026',
        sisaHari: 19,
        targetLayanan: 'Telemedisin Dokter',
        diskonFormatted: 'Diskon 50%',
        minTransaksiFormatted: 'Rp 50.000',
        maxDiskonFormatted: 'Rp 50.000',
        kuotaTotal: 500,
        kuotaTerpakai: 412,
        persentaseKuota: 82.4,
        totalPenghematanPasien: 'Rp 18.450.000',
        totalOmsetTerdorong: 'Rp 64.200.000',
        targetTierMembership: 'Semua Tier (Silver, Gold, Platinum)',
        syaratKetentuan: [
          'Voucher berlaku khusus untuk pasien yang pertama kali melakukan konsultasi telemedisin di PSEF.',
          'Potongan sebesar 50% dengan nilai maksimal diskon Rp 50.000 per transaksi.',
          'Minimum transaksi sebelum diskon adalah Rp 50.000.',
          'Berlaku untuk seluruh dokter spesialis dan dokter umum yang bertugas.',
          'Dapat digunakan 1 (satu) kali per akun pasien selama periode promosi aktif.',
          'Tidak dapat diuangkan atau digabungkan dengan kode kupon promo lainnya.',
          'PSEF berhak membatalkan klaim transaksi jika ditemukan indikasi penyalahgunaan akun ganda.',
        ],
        riwayatKlaim: [
          {
            no: 1,
            pasienNama: 'Andi Putra',
            pasienAvatar: 'assets/images/avatar/male.png',
            transaksiId: '#PAY25024-0012',
            layanan: 'Telemedisin dr. Andi Wijaya',
            nilaiDiskon: 'Rp 25.000',
            waktu: '24 Mei 2026 10:30 WIB',
          },
          {
            no: 2,
            pasienNama: 'Dewi Lestari',
            pasienAvatar: 'assets/images/avatar/female.png',
            transaksiId: '#PAY25024-0013',
            layanan: 'Telemedisin dr. Siti Nurhaliza',
            nilaiDiskon: 'Rp 40.000',
            waktu: '24 Mei 2026 09:15 WIB',
          },
          {
            no: 3,
            pasienNama: 'Budi Santoso',
            pasienAvatar: 'assets/images/avatar/male.png',
            transaksiId: '#PAY25024-0014',
            layanan: 'Telemedisin dr. Bambang Sudrajat',
            nilaiDiskon: 'Rp 35.000',
            waktu: '23 Mei 2026 16:45 WIB',
          },
        ],
      });
    }
  }

  copyCode(): void {
    if (this.detail().kodeVoucher) {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        void navigator.clipboard.writeText(this.detail().kodeVoucher!);
      }
      this.copiedCode.set(true);
      setTimeout(() => this.copiedCode.set(false), 2000);
    }
  }

  goBack(): void {
    this.router.navigate(['/admin/promo']);
  }

  printReport(): void {
    window.print();
  }
}
