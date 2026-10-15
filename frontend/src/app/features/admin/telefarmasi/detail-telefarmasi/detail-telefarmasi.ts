import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

export interface ResepItem {
  no: number;
  nama: string;
  bentuk: string;
  thumbnail: string;
  aturanPakai: string;
  jumlah: string;
  harga: string;
}

export interface TimelineStep {
  label: string;
  waktu: string;
  completed: boolean;
}

@Component({
  selector: 'app-detail-telefarmasi',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail-telefarmasi.html',
  styleUrl: './detail-telefarmasi.css',
})
export class DetailTelefarmasi implements OnInit {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly consultId = signal<string>('CNS24025-0012');

  // Consultation Details Model matching Image 2
  readonly detail = signal({
    id: 'CNS24025-0012',
    metode: 'Video Call Consultation',
    tanggal: '24 Mei 2026, 10:30 WIB (30 menit)',
    durasi: '30 menit',
    status: 'Selesai',
    dibuatPada: '24 Mei 2026, 10:30 WIB',
    selesaiPada: '24 Mei 2026, 11:00 WIB',
    dibuatOleh: 'apt. Rina Meliani, S.Farm',

    pasien: {
      nama: 'Dewi Lestari',
      genderDanUsia: 'Perempuan, 28 tahun',
      alamat: 'Jakarta Selatan',
      avatar: 'assets/images/avatar/female.png',
    },

    apoteker: {
      nama: 'apt. Rina Meliani, S.Farm',
      spesialisasi: 'Farmasi Klinis',
      sip: 'SIP: 503/SIP-DOK/JS/2024',
      avatar: 'assets/images/avatar/female.png',
    },

    keluhanUtama: 'Nyeri saat haid dan siklus menstruasi tidak teratur selama 2 bulan terkahir',

    ringkasanKonsultasi:
      'Pasien mengeluhkan nyeri haid (dismenore) sejak 2 bulan terakhir disertai siklus menstruasi ayng tidaj teratur. Tidak ada keluhan keputihan abnormal.',

    anamnesisList: [
      'Siklus Haid: 35 – 45 hari sekali',
      'Lama Haid 5-6 hari',
      'Nyeri Haid skala 5/10',
      'Riwayat penyakit tidak ada',
      'Riwayat Alergi Tidak ada',
    ],

    kesimpulan: 'Kemungkinan dismenore primer dengan siklus haid tidak teratur',

    saranApoteker: [
      'Minum obat sesuai aturan pakai',
      'Hindari konsumsi obat saat perut kosong',
      'Istirahat cukup dan kelola stres',
      'Kompres hangat pada area perut bawah saat nyeri',
      'Kontrol kembali apabila keluhan tidak membaik dalam 1 bulan atau nyeri semakin berat',
    ],

    lampiran: {
      nama: 'Rekam Medis',
      ukuran: '64Kb',
      format: 'PDF',
    },

    resepObat: [
      {
        no: 1,
        nama: 'Ibuprofen 400mg',
        bentuk: 'Tablet',
        thumbnail: 'assets/images/thumbnail/ibuprofen.svg',
        aturanPakai: '1 tablet, 3x sehari sesudah makan',
        jumlah: '10 tablet',
        harga: 'Rp. 8.000',
      },
      {
        no: 2,
        nama: 'Asam Mefenamat 500mg',
        bentuk: 'Tablet',
        thumbnail: 'assets/images/thumbnail/asam-mefenamat.svg',
        aturanPakai: '1 tablet, 3x sehari saat nyeri haid',
        jumlah: '10 tablet',
        harga: 'Rp. 9.500',
      },
      {
        no: 3,
        nama: 'Vitamin B Kompleks',
        bentuk: 'Tablet',
        thumbnail: 'assets/images/thumbnail/vitamin-b.svg',
        aturanPakai: '1 tablet, 1x sehari sesudah makan',
        jumlah: '10 tablet',
        harga: 'Rp. 5.000',
      },
    ] as ResepItem[],

    pembayaran: {
      status: 'Lunas',
      subtotal: 'Rp250.000',
      diskonProduk: '-Rp. 35.000',
      voucher: '-Rp. 15.000',
      totalPembayaran: 'Rp. 200.000',
      metodePembayaran: 'Transfer Bank (BCA)',
      waktuPembayaran: '24 Mei 2026 10:36',
    },

    timeline: [
      { label: 'Pesanan Dibuat', waktu: '24 Mei 2026 10:35', completed: true },
      { label: 'Verifikasi Resep', waktu: '24 Mei 2026 10:36', completed: true },
      { label: 'Pesanan Diproses', waktu: '24 Mei 2026 10:50', completed: true },
      { label: 'Pesanan Dikirim', waktu: '24 Mei 2026 11:30', completed: true },
      { label: 'Pesanan Selesai', waktu: '24 Mei 2026 14:20', completed: true },
    ] as TimelineStep[],
  });

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.consultId.set(idParam);
      this.detail.update((cur) => ({
        ...cur,
        id: idParam.startsWith('CNS') ? idParam : `CNS24025-${idParam}`,
      }));
    }
  }

  goBack(): void {
    this.router.navigate(['/admin/telefarmasi']);
  }

  lihatDokumen(): void {
    alert('Membuka Rekam Medis PDF...');
  }

  downloadPdf(): void {
    alert('Mengunduh dokumen Rekam Medis PDF...');
  }

  lihatRekaman(): void {
    alert('Membuka rekaman video sesi konsultasi...');
  }
}
