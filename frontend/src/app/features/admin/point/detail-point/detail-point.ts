import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailPointData, TipeTransaksiPoint, SumberPoint } from '../models/point.model';

@Component({
  selector: 'app-detail-point',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail-point.html',
  styleUrl: './detail-point.css',
})
export class DetailPoint implements OnInit {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly pointId = signal<string>('PTS-2026-0012');

  // Detail Data Signal
  readonly detail = signal<DetailPointData>({
    id: '#PTS-2026-0012',
    cleanId: 'PTS-2026-0012',
    tipe: 'Earned',
    sumber: 'Penebusan Obat Resep',
    status: 'Berhasil',
    jumlahPoint: 285,
    nilaiRupiahKonversi: 'Rp 2.850',
    waktuTransaksi: '24 Mei 2026 10:36 WIB',
    refTransaksiId: '#INV24025-0012',
    layananTerkait: 'Penebusan Resep Digital Telemedisin PSEF',
    tenagaMedis: {
      nama: 'dr. Andi Wijaya',
      role: 'Dokter Spesialis Pemeriksa',
      sipAtauStra: 'SIP: 3273/DU/2022/451',
      avatar: 'assets/images/avatar/male.png',
    },
    pasien: {
      id: 'PSN-001',
      nama: 'Andi Putra',
      avatar: 'assets/images/avatar/male.png',
      email: 'andi.putra@gmail.com',
      telepon: '0812-3456-7890',
      tier: 'Platinum',
      tierBadgeColor: 'platinum',
    },
    saldoPasien: {
      saldoSaatIni: 3450,
      saldoSebelumTransaksi: 3165,
      saldoSetelahTransaksi: 3450,
      totalEarnedLifetime: 12850,
      totalRedeemedLifetime: 9400,
      tierMultiplier: '2.0x (Platinum Multiplier)',
    },
    rincianPoin: {
      poinDasar: 142,
      poinMultiplierTier: 143,
      poinBonusAktivitas: 0,
      totalPerolehan: 285,
      keteranganKalkulasi: 'Transaksi penebusan obat resep senilai Rp 570.000 dengan tier Platinum (2x multiplier).',
    },
    auditTrail: [
      {
        label: 'Aktivitas Transaksi Selesai',
        waktu: '24 Mei 2026 10:30 WIB',
        deskripsi: 'Pembayaran pesanan resep digital #INV24025-0012 diverifikasi oleh payment gateway.',
        completed: true,
      },
      {
        label: 'Verifikasi Sistem PSEF',
        waktu: '24 Mei 2026 10:32 WIB',
        deskripsi: 'Validasi kelayakan transaksi untuk reward Point Health otomatis.',
        completed: true,
      },
      {
        label: 'Kalkulasi Tier Multiplier',
        waktu: '24 Mei 2026 10:35 WIB',
        deskripsi: 'Menerapkan pengganda poin 2.0x untuk keanggotaan Platinum Member.',
        completed: true,
      },
      {
        label: 'Saldo Poin Dikreditkan',
        waktu: '24 Mei 2026 10:36 WIB',
        deskripsi: 'Penambahan +285 Poin ke dompet poin pasien Andi Putra berhasil dibukukan.',
        completed: true,
      },
    ],
    riwayatTerkaitPasien: [
      {
        no: 1,
        id: '#PTS-2026-0012',
        sumber: 'Penebusan Obat Resep',
        poin: 285,
        tipe: 'Earned',
        tanggal: '24 Mei 2026 10:36',
      },
      {
        no: 2,
        id: '#PTS-2026-0008',
        sumber: 'Konsultasi Telemedisin',
        poin: 150,
        tipe: 'Earned',
        tanggal: '18 Mei 2026 14:10',
      },
      {
        no: 3,
        id: '#PTS-2026-0004',
        sumber: 'Penukaran Voucher',
        poin: -500,
        tipe: 'Redeemed',
        tanggal: '10 Mei 2026 09:30',
      },
      {
        no: 4,
        id: '#PTS-2026-0001',
        sumber: 'Misi Kesehatan Rutin',
        poin: 100,
        tipe: 'Earned',
        tanggal: '01 Mei 2026 08:00',
      },
    ],
  });

  ngOnInit(): void {
    const routeId = this.route.snapshot.paramMap.get('id');
    if (routeId) {
      this.pointId.set(routeId);
    }
  }

  // Interactive Switcher for comprehensive testing of different transaction flows
  switchSourcePreview(sumber: 'Resep' | 'Telemedisin' | 'Penukaran' | 'Misi'): void {
    if (sumber === 'Telemedisin') {
      this.detail.set({
        ...this.detail(),
        id: '#PTS-2026-0013',
        cleanId: 'PTS-2026-0013',
        tipe: 'Earned',
        sumber: 'Konsultasi Telemedisin',
        jumlahPoint: 150,
        nilaiRupiahKonversi: 'Rp 1.500',
        waktuTransaksi: '24 Mei 2026 09:20 WIB',
        refTransaksiId: '#TLM-2026-0089',
        layananTerkait: 'Sesi Konsultasi Telemedisin Dokter Spesialis',
        tenagaMedis: {
          nama: 'dr. Siti Nurhaliza',
          role: 'Dokter Spesialis Anak',
          sipAtauStra: 'SIP: 3171/DS/2021/892',
          avatar: 'assets/images/avatar/female.png',
        },
        saldoPasien: {
          saldoSaatIni: 2000,
          saldoSebelumTransaksi: 1850,
          saldoSetelahTransaksi: 2000,
          totalEarnedLifetime: 6500,
          totalRedeemedLifetime: 4500,
          tierMultiplier: '1.5x (Gold Multiplier)',
        },
        rincianPoin: {
          poinDasar: 100,
          poinMultiplierTier: 50,
          poinBonusAktivitas: 0,
          totalPerolehan: 150,
          keteranganKalkulasi: 'Biaya telekonsultasi dokter spesialis Rp 150.000 dengan tier Gold (1.5x multiplier).',
        },
      });
    } else if (sumber === 'Penukaran') {
      this.detail.set({
        ...this.detail(),
        id: '#PTS-2026-0014',
        cleanId: 'PTS-2026-0014',
        tipe: 'Redeemed',
        sumber: 'Penukaran Voucher',
        jumlahPoint: -500,
        nilaiRupiahKonversi: '-Rp 5.000',
        waktuTransaksi: '23 Mei 2026 17:10 WIB',
        refTransaksiId: '#RDM-2026-042',
        layananTerkait: 'Penukaran 500 Poin untuk Voucher Potongan Bebas Ongkir Resep',
        tenagaMedis: undefined,
        saldoPasien: {
          saldoSaatIni: 250,
          saldoSebelumTransaksi: 750,
          saldoSetelahTransaksi: 250,
          totalEarnedLifetime: 2800,
          totalRedeemedLifetime: 2550,
          tierMultiplier: '1.0x (Silver Tier)',
        },
        rincianPoin: {
          poinDasar: -500,
          poinMultiplierTier: 0,
          poinBonusAktivitas: 0,
          totalPerolehan: -500,
          keteranganKalkulasi: 'Penukaran voucher potongan biaya kirim kurir ekspres resep obat PSEF.',
        },
      });
    } else if (sumber === 'Misi') {
      this.detail.set({
        ...this.detail(),
        id: '#PTS-2026-0016',
        cleanId: 'PTS-2026-0016',
        tipe: 'Earned',
        sumber: 'Misi Kesehatan',
        jumlahPoint: 100,
        nilaiRupiahKonversi: 'Rp 1.000',
        waktuTransaksi: '23 Mei 2026 11:15 WIB',
        refTransaksiId: '#MSN-2026-007',
        layananTerkait: 'Misi Gamifikasi: Kepatuhan Minum Obat Resep 7 Hari Berturut-turut',
        tenagaMedis: undefined,
        saldoPasien: {
          saldoSaatIni: 3000,
          saldoSebelumTransaksi: 2900,
          saldoSetelahTransaksi: 3000,
          totalEarnedLifetime: 7420,
          totalRedeemedLifetime: 4420,
          tierMultiplier: 'Bonus Tetap Misi',
        },
        rincianPoin: {
          poinDasar: 100,
          poinMultiplierTier: 0,
          poinBonusAktivitas: 0,
          totalPerolehan: 100,
          keteranganKalkulasi: 'Reward penyelesaian checklist reminder minum obat pasien selama 7 hari tanpa terputus.',
        },
      });
    } else {
      // Default: Resep
      this.detail.set({
        ...this.detail(),
        id: '#PTS-2026-0012',
        cleanId: 'PTS-2026-0012',
        tipe: 'Earned',
        sumber: 'Penebusan Obat Resep',
        jumlahPoint: 285,
        nilaiRupiahKonversi: 'Rp 2.850',
        waktuTransaksi: '24 Mei 2026 10:36 WIB',
        refTransaksiId: '#INV24025-0012',
        layananTerkait: 'Penebusan Resep Digital Telemedisin PSEF',
        tenagaMedis: {
          nama: 'dr. Andi Wijaya',
          role: 'Dokter Spesialis Pemeriksa',
          sipAtauStra: 'SIP: 3273/DU/2022/451',
          avatar: 'assets/images/avatar/male.png',
        },
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/admin/point']);
  }

  printReceipt(): void {
    window.print();
  }
}
