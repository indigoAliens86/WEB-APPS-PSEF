import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailTransaksiData, SumberTransaksi } from '../models/transaksi.model';

@Component({
  selector: 'app-detail-transaksi',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail-transaksi.html',
  styleUrl: './detail-transaksi.css',
})
export class DetailTransaksi implements OnInit {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly txId = signal<string>('PAY25024-0012');
  readonly copiedRef = signal<boolean>(false);

  // Detail Data Model for Transaction
  readonly detail = signal<DetailTransaksiData>({
    id: '#PAY25024-0012',
    cleanId: 'PAY25024-0012',
    status: 'Selesai',
    waktuTransaksi: '24 Mei 2026 10:30 WIB',
    waktuSelesai: '24 Mei 2026 10:36 WIB',
    noReferensiGateway: 'PG-BCA-889102458921',
    sumber: {
      tipe: 'Pesanan Obat Resep',
      refId: '#INV24025-0012',
      deskripsi: 'Penebusan Resep Digital dari Layanan Telemedisin Dokter',
      namaLayanan: 'Telemedisin & Penebusan Obat Resep PSEF',
      tenagaKesehatan: {
        nama: 'dr. Andi Wijaya',
        role: 'Dokter Spesialis Pemeriksa',
        sipAtauStra: 'SIP: 3273/DU/2022/451',
        avatar: 'assets/images/avatar/male.png',
      },
    },
    pelanggan: {
      nama: 'Andi Putra',
      telepon: '0812-3456-7890',
      email: 'andi.putra@gmail.com',
      nik: '3275010101010001',
      alamat: 'Jalan Merdeka No.1 , Jakarta Pusat, DKI Jakarta 10110',
      avatar: 'assets/images/avatar/male.png',
    },
    metodePembayaran: {
      provider: 'BCA',
      logo: 'assets/images/thumbnail/bca.svg',
      kategori: 'Transfer Bank',
      noRekening: 'BCA 1234567890',
      atasNama: 'Andi Putra',
      statusSettlement: 'Settled (Dana Diterima Apotek PSEF)',
    },
    rincianItem: [
      {
        no: 1,
        nama: 'Paracetamol 500mg (Tablet)',
        kategori: 'Obat Resep',
        qty: 10,
        harga: 'Rp 5.000',
        subtotal: 'Rp 50.000',
      },
      {
        no: 2,
        nama: 'Vitamin C 500mg (Tablet)',
        kategori: 'Obat Resep',
        qty: 10,
        harga: 'Rp 7.000',
        subtotal: 'Rp 70.000',
      },
      {
        no: 3,
        nama: 'Jasa Konsultasi Telemedisin dr. Andi Wijaya',
        kategori: 'Jasa Medis',
        qty: 1,
        harga: 'Rp 50.000',
        subtotal: 'Rp 50.000',
      },
    ],
    biaya: {
      subtotal: 'Rp 170.000',
      jasaLayanan: 'Rp 5.000',
      ongkosKirim: 'Rp 15.000',
      diskon: '-Rp 5.000',
      biayaAplikasi: 'Rp 0',
      totalPembayaran: 'Rp 185.000',
    },
    timeline: [
      {
        label: 'Tagihan Dibuat',
        waktu: '24 Mei 2026 10:30 WIB',
        completed: true,
        deskripsi: 'Tagihan transaksi dibuat otomatis oleh gateway PSEF.',
      },
      {
        label: 'Instruksi Pembayaran Diterbitkan',
        waktu: '24 Mei 2026 10:31 WIB',
        completed: true,
        deskripsi: 'Virtual Account BCA berhasil digenerate dan dikirim ke pasien.',
      },
      {
        label: 'Pembayaran Diterima Bank BCA',
        waktu: '24 Mei 2026 10:35 WIB',
        completed: true,
        deskripsi: 'Bank BCA mengonfirmasi transfer dana berhasil diverifikasi.',
      },
      {
        label: 'Settlement Selesai',
        waktu: '24 Mei 2026 10:36 WIB',
        completed: true,
        deskripsi: 'Dana dialokasikan ke apotek mitra dan pesanan masuk antrean proses.',
      },
    ],
  });

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.txId.set(idParam);
      const isCleanParam = idParam.replace(/[^0-9]/g, '');
      const lastDigit = parseInt(isCleanParam.slice(-1) || '0', 10);

      if (lastDigit === 3 || lastDigit === 8) {
        this.switchSourcePreview('Konsultasi Dokter');
      } else if (lastDigit === 6 || lastDigit === 1) {
        this.switchSourcePreview('Konsultasi Apoteker');
      } else if (lastDigit === 5 || lastDigit === 7 || lastDigit === 0) {
        this.switchSourcePreview('Pesanan Obat Non-Resep');
      } else {
        this.switchSourcePreview('Pesanan Obat Resep');
      }

      this.detail.update((cur) => ({
        ...cur,
        id: idParam.startsWith('PAY') ? `#${idParam}` : `#PAY-${idParam}`,
        cleanId: idParam,
      }));
    }
  }

  switchSourcePreview(tipe: SumberTransaksi): void {
    if (tipe === 'Konsultasi Dokter') {
      this.detail.update((cur) => ({
        ...cur,
        sumber: {
          tipe: 'Konsultasi Dokter',
          refId: '#TLM-2026-0041',
          deskripsi: 'Biaya Sesi Konsultasi Telemedisin Pasien dengan Dokter Spesialis',
          namaLayanan: 'Konsultasi Dokter Online (Telemedisin PSEF)',
          tenagaKesehatan: {
            nama: 'dr. Andi Wijaya',
            role: 'Dokter Spesialis Penyakit Dalam',
            sipAtauStra: 'SIP: 3273/DU/2022/451',
            avatar: 'assets/images/avatar/male.png',
          },
        },
        metodePembayaran: {
          provider: 'OVO',
          logo: 'assets/images/thumbnail/ovo.svg',
          kategori: 'E-Wallet',
          noRekening: '0812-3456-7890',
          atasNama: 'Andi Putra',
          statusSettlement: 'Settled (E-Wallet OVO Gateway)',
        },
        rincianItem: [
          {
            no: 1,
            nama: 'Sesi Telekonsultasi Dokter Spesialis (30 Menit)',
            kategori: 'Jasa Medis',
            qty: 1,
            harga: 'Rp 120.000',
            subtotal: 'Rp 120.000',
          },
          {
            no: 2,
            nama: 'Penerbitan Salinan Resep Digital Elektronik',
            kategori: 'Layanan Farmasi',
            qty: 1,
            harga: 'Rp 6.000',
            subtotal: 'Rp 6.000',
          },
        ],
        biaya: {
          subtotal: 'Rp 126.000',
          jasaLayanan: 'Rp 0',
          ongkosKirim: 'Rp 0',
          diskon: 'Rp 0',
          biayaAplikasi: 'Rp 0',
          totalPembayaran: 'Rp 126.000',
        },
      }));
    } else if (tipe === 'Konsultasi Apoteker') {
      this.detail.update((cur) => ({
        ...cur,
        sumber: {
          tipe: 'Konsultasi Apoteker',
          refId: '#TLF-2026-0022',
          deskripsi: 'Biaya Konseling Swamedikasi & Rekomendasi Terapi Obat Telefarmasi',
          namaLayanan: 'Telefarmasi & Konseling Apoteker PSEF',
          tenagaKesehatan: {
            nama: 'apt. Rina Meilani, S.Farm.',
            role: 'Apoteker Penanggung Jawab',
            sipAtauStra: 'STRA: 19920415/STRA-UI/2018',
            avatar: 'assets/images/avatar/female.png',
          },
        },
        metodePembayaran: {
          provider: 'BRI',
          logo: 'assets/images/thumbnail/bri.svg',
          kategori: 'Transfer Bank',
          noRekening: 'BRI 9876543210',
          atasNama: 'Andi Putra',
          statusSettlement: 'Settled (BRI Virtual Account)',
        },
        rincianItem: [
          {
            no: 1,
            nama: 'Layanan Konseling Telefarmasi Apoteker',
            kategori: 'Jasa Farmasi',
            qty: 1,
            harga: 'Rp 30.000',
            subtotal: 'Rp 30.000',
          },
          {
            no: 2,
            nama: 'Biaya Administrasi & Pencatatan Rekam Farmasi',
            kategori: 'Administrasi',
            qty: 1,
            harga: 'Rp 2.500',
            subtotal: 'Rp 2.500',
          },
        ],
        biaya: {
          subtotal: 'Rp 32.500',
          jasaLayanan: 'Rp 0',
          ongkosKirim: 'Rp 0',
          diskon: 'Rp 0',
          biayaAplikasi: 'Rp 0',
          totalPembayaran: 'Rp 32.500',
        },
      }));
    } else if (tipe === 'Pesanan Obat Non-Resep') {
      this.detail.update((cur) => ({
        ...cur,
        sumber: {
          tipe: 'Pesanan Obat Non-Resep',
          refId: '#INV24025-0015',
          deskripsi: 'Pembelian Obat Bebas / OTC Mandiri via Marketplace Obat PSEF',
          namaLayanan: 'Marketplace Obat Bebas (OTC)',
          tenagaKesehatan: undefined,
        },
        metodePembayaran: {
          provider: 'DANA',
          logo: 'assets/images/thumbnail/dana.svg',
          kategori: 'E-Wallet',
          noRekening: '0812-3456-7890',
          atasNama: 'Andi Putra',
          statusSettlement: 'Settled (DANA Gateway)',
        },
        rincianItem: [
          {
            no: 1,
            nama: 'Sanmol 500mg Tablet (Strip)',
            kategori: 'Obat Bebas',
            qty: 5,
            harga: 'Rp 14.000',
            subtotal: 'Rp 70.000',
          },
          {
            no: 2,
            nama: 'Vitamin C 500mg Tablet (Botol)',
            kategori: 'Suplemen',
            qty: 2,
            harga: 'Rp 65.000',
            subtotal: 'Rp 130.000',
          },
        ],
        biaya: {
          subtotal: 'Rp 200.000',
          jasaLayanan: 'Rp 0',
          ongkosKirim: 'Rp 15.000',
          diskon: '-Rp 5.000',
          biayaAplikasi: 'Rp 0',
          totalPembayaran: 'Rp 210.000',
        },
      }));
    } else {
      // Default: Pesanan Obat Resep
      this.detail.update((cur) => ({
        ...cur,
        sumber: {
          tipe: 'Pesanan Obat Resep',
          refId: '#INV24025-0012',
          deskripsi: 'Penebusan Resep Digital dari Layanan Telemedisin Dokter',
          namaLayanan: 'Telemedisin & Penebusan Obat Resep PSEF',
          tenagaKesehatan: {
            nama: 'dr. Andi Wijaya',
            role: 'Dokter Spesialis Pemeriksa',
            sipAtauStra: 'SIP: 3273/DU/2022/451',
            avatar: 'assets/images/avatar/male.png',
          },
        },
        metodePembayaran: {
          provider: 'BCA',
          logo: 'assets/images/thumbnail/bca.svg',
          kategori: 'Transfer Bank',
          noRekening: 'BCA 1234567890',
          atasNama: 'Andi Putra',
          statusSettlement: 'Settled (Dana Diterima Apotek PSEF)',
        },
        rincianItem: [
          {
            no: 1,
            nama: 'Paracetamol 500mg (Tablet)',
            kategori: 'Obat Resep',
            qty: 10,
            harga: 'Rp 5.000',
            subtotal: 'Rp 50.000',
          },
          {
            no: 2,
            nama: 'Vitamin C 500mg (Tablet)',
            kategori: 'Obat Resep',
            qty: 10,
            harga: 'Rp 7.000',
            subtotal: 'Rp 70.000',
          },
          {
            no: 3,
            nama: 'Jasa Konsultasi Telemedisin dr. Andi Wijaya',
            kategori: 'Jasa Medis',
            qty: 1,
            harga: 'Rp 50.000',
            subtotal: 'Rp 50.000',
          },
        ],
        biaya: {
          subtotal: 'Rp 170.000',
          jasaLayanan: 'Rp 5.000',
          ongkosKirim: 'Rp 15.000',
          diskon: '-Rp 5.000',
          biayaAplikasi: 'Rp 0',
          totalPembayaran: 'Rp 185.000',
        },
      }));
    }
  }

  goBack(): void {
    this.router.navigate(['/fasilitas/transaksi']);
  }

  copyRefId(): void {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      void navigator.clipboard.writeText(this.detail().noReferensiGateway);
    }
    this.copiedRef.set(true);
    setTimeout(() => this.copiedRef.set(false), 2000);
  }

  printInvoice(): void {
    window.print();
  }
}
