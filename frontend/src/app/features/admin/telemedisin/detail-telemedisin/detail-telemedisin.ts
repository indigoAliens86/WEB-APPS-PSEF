import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

export interface ResepRekomendasi {
  no: number;
  nama: string;
  instruksi: string;
}

export interface TimelinePesananItem {
  judul: string;
  waktu: string;
  selesai: boolean;
}

@Component({
  selector: 'app-detail-telemedisin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail-telemedisin.html',
  styleUrl: './detail-telemedisin.css',
})
export class DetailTelemedisin implements OnInit {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly consultationId = signal<string>('CNS24025-0012');

  // Consultation Detail Model matching UI mockup
  readonly detail = {
    id: 'CNS24025-0012',
    metode: 'Video Call Consultation',
    waktuKonsultasi: '24 Mei 2026, 10:30 WIB (30 menit)',
    durasi: '30 menit',
    status: 'Selesai',
    dibuatPada: '24 Mei 2026, 10:30 WIB',
    selesaiPada: '24 Mei 2026, 11:00 WIB',
    pasien: {
      nama: 'Dewi Lestari',
      genderAge: 'Perempuan, 28 tahun',
      alamat: 'Jakarta Selatan',
      avatar: 'assets/images/avatar/female.png',
    },
    dokter: {
      nama: 'dr. Sarah Aulia, Sp.OG.',
      spesialisasi: 'Obstetri & Ginekologi',
      sip: 'SIP: 503/SIP-DOK/JS/2024',
      avatar: 'assets/images/avatar/female.png',
    },
    keluhanUtama: 'Nyeri saat haid dan siklus menstruasi tidak teratur selama 2 bulan terakhir',
    ringkasanKonsultasi:
      'Pasien mengeluhkan nyeri haid (dismenore) sejak 2 bulan terakhir disertai siklus menstruasi ayng tidaj teratur. Tidak ada keluhan keputihan abnormal.',
    hasilAnamnesis: [
      'Siklus Haid: 35 - 45 hari sekali',
      'Lama Haid 5-6 hari',
      'Nyeri Haid skala 5/10',
      'Riwayat penyakit tidak ada',
      'Riwayat Alergi Tidak ada',
    ],
    kesimpulan: 'Kemungkinan dismenore primer dengan siklus haid tidak teratur',
    saranDokter: [
      'Minum obat sesuai aturan pakai',
      'Hindari konsumsi obat saat perut kosong',
      'Istirahat cukup dan kelola stres',
      'Kompres hangat pada area perut bawah saat nyeri',
      'Kontrol kembali apabila keluhan tidak membaik dalam 1 bulan atau nyeri semakin berat',
    ],
    lampiran: {
      nama: 'Rekam Medis',
      ukuran: '64Kb',
      tipe: 'PDF',
    },
    resep: [
      {
        no: 1,
        nama: 'R/ Asam Mefenamat 500 mg No. X',
        instruksi: 'S. 3 dd 1 tab sesudah makan bila nyeri haid',
      },
      {
        no: 2,
        nama: 'R/ Ibuprofen 400 mg No. X',
        instruksi: 'S. 2 dd 1 tab sesudah makan bila nyeri',
      },
      {
        no: 3,
        nama: 'R/ Vitamin B Kompleks No. X',
        instruksi: 'S. 1 dd 1 tab sesudah makan pagi',
      },
    ] as ResepRekomendasi[],
    pembayaran: {
      status: 'Lunas',
      subtotal: 'Rp250.000',
      diskon: '-Rp. 35.000',
      voucher: '-Rp. 15.000',
      total: 'Rp. 200.000',
      metode: 'Transfer Bank (BCA)',
      waktu: '24 Mei 2026 10:36',
    },
    timeline: [
      { judul: 'Pesanan Dibuat', waktu: '24 Mei 2026 10:35', selesai: true },
      { judul: 'Verifikasi Resep', waktu: '24 Mei 2026 10:36', selesai: true },
      { judul: 'Pesanan Diproses', waktu: '24 Mei 2026 10:50', selesai: true },
      { judul: 'Pesanan Dikirim', waktu: '24 Mei 2026 11:30', selesai: true },
      { judul: 'Pesanan Selesai', waktu: '24 Mei 2026 14:20', selesai: true },
    ] as TimelinePesananItem[],
  };

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.consultationId.set(idParam);
    }
  }

  goBack(): void {
    this.router.navigate(['/admin/telemedisin']);
  }

  lihatDokumen(): void {
    alert('Membuka dokumen rekam medis...');
  }

  downloadPdf(): void {
    alert('Mengunduh dokumen PDF rekam medis...');
  }

  lihatRekaman(): void {
    alert('Membuka rekaman video konsultasi...');
  }
}
