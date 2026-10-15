import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailLaporanData, KategoriLaporan, FormatLaporan } from '../models/laporan.model';

@Component({
  selector: 'app-detail-laporan',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail-laporan.html',
  styleUrl: './detail-laporan.css',
})
export class DetailLaporan implements OnInit {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly reportId = signal<string>('REP-2026-001');

  // Detail Data Signal
  readonly detail = signal<DetailLaporanData>({
    id: '#REP-2026-001',
    cleanId: 'REP-2026-001',
    judul: 'Laporan Rekapitulasi Pendapatan & Settlement Gateway PSEF',
    deskripsi: 'Rekapitulasi komprehensif seluruh perputaran dana transaksi layanan PSEF mencakup penebusan obat resep, pembelian obat bebas di marketplace, jasa telekonsultasi dokter/apoteker, serta settlement bank mitra payment gateway.',
    kategori: 'Keuangan & Transaksi',
    format: 'PDF',
    ukuranFile: '3.4 MB',
    status: 'Siap Unduh',
    periode: 'Mei 2026 (01 Mei 2026 - 24 Mei 2026)',
    waktuTerbit: '24 Mei 2026 11:00 WIB',
    pic: {
      nama: 'Ahmad Fauzi, SE',
      role: 'Finance & Settlement Lead PSEF',
      email: 'ahmad.fauzi@psef.kemkes.go.id',
      avatar: 'assets/images/avatar/male.png',
    },
    digitalSignature: {
      hashSha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      certifiedBy: 'Kementerian Kesehatan RI - BSrE PSEF CA',
      validUntil: '31 Desember 2026',
    },
    ringkasanEksekutif: [
      {
        label: 'Gross Transaction Value',
        value: 'Rp 148.750.000',
        subtext: '+12.5% vs bulan sebelumnya',
        icon: 'ri-wallet-3-line',
        colorClass: 'emerald',
      },
      {
        label: 'Volume Transaksi Berhasil',
        value: '1.285 Transaksi',
        subtext: 'Success rate 98.2%',
        icon: 'ri-checkbox-circle-line',
        colorClass: 'teal',
      },
      {
        label: 'Total Dana Disalurkan ke Apotek',
        value: 'Rp 118.250.000',
        subtext: 'Settlement H+1 lunas',
        icon: 'ri-bank-card-line',
        colorClass: 'blue',
      },
      {
        label: 'Nilai Rata-rata Transaksi (AOV)',
        value: 'Rp 115.750',
        subtext: 'Rata-rata keranjang pasien',
        icon: 'ri-funds-line',
        colorClass: 'purple',
      },
    ],
    tabelHeaders: ['No', 'Metode Pembayaran', 'Volume Transaksi', 'Total Nilai (IDR)', 'Fee Gateway', 'Status Settlement'],
    pratinjauTabel: [
      {
        no: 1,
        kolom1: 'BCA Virtual Account',
        kolom2: '580 Transaksi (45.1%)',
        kolom3: 'Rp 67.125.000',
        kolom4: 'Rp 1.450.000',
        kolom5: 'Terselesaikan (Settled)',
      },
      {
        no: 2,
        kolom1: 'QRIS / E-Wallet (GoPay, OVO, DANA)',
        kolom2: '390 Transaksi (30.4%)',
        kolom3: 'Rp 45.280.000',
        kolom4: 'Rp 980.000',
        kolom5: 'Terselesaikan (Settled)',
      },
      {
        no: 3,
        kolom1: 'BRI & BNI Virtual Account',
        kolom2: '215 Transaksi (16.7%)',
        kolom3: 'Rp 24.845.000',
        kolom4: 'Rp 537.500',
        kolom5: 'Terselesaikan (Settled)',
      },
      {
        no: 4,
        kolom1: 'Kartu Kredit / Debit Online',
        kolom2: '100 Transaksi (7.8%)',
        kolom3: 'Rp 11.500.000',
        kolom4: 'Rp 345.000',
        kolom5: 'Terselesaikan (Settled)',
      },
    ],
    auditRiwayat: [
      {
        label: 'Dokumen Laporan Diterbitkan',
        waktu: '24 Mei 2026 11:00 WIB',
        user: 'Ahmad Fauzi, SE',
        role: 'Finance Admin',
        icon: 'ri-file-add-line',
      },
      {
        label: 'Verifikasi Integritas SHA-256 Selesai',
        waktu: '24 Mei 2026 11:02 WIB',
        user: 'System Bot PSEF Integrity',
        role: 'Automated Validator',
        icon: 'ri-shield-check-line',
      },
      {
        label: 'Dokumen Ditandatangani Digital',
        waktu: '24 Mei 2026 11:05 WIB',
        user: 'apt. Rina Meilani, S.Farm.',
        role: 'Apoteker Penanggung Jawab',
        icon: 'ri-fingerprint-line',
      },
    ],
  });

  ngOnInit(): void {
    const routeId = this.route.snapshot.paramMap.get('id');
    if (routeId) {
      this.reportId.set(routeId);
      if (routeId.includes('002')) {
        this.switchReportType('Farmasi');
      } else if (routeId.includes('003')) {
        this.switchReportType('Medis');
      } else if (routeId.includes('004')) {
        this.switchReportType('Kemenkes');
      } else {
        this.switchReportType('Keuangan');
      }
    }
  }

  // Interactive Switcher to test various report formats and categories
  switchReportType(tipe: 'Keuangan' | 'Farmasi' | 'Medis' | 'Kemenkes'): void {
    if (tipe === 'Farmasi') {
      this.detail.set({
        id: '#REP-2026-002',
        cleanId: 'REP-2026-002',
        judul: 'Laporan Pelayanan Resep Elektronik & Distribusi Obat PSEF',
        deskripsi: 'Audit komprehensif terhadap 2.450 lembar resep digital yang masuk dari telemedisin dokter, mencakup verifikasi telaah resep apoteker, ketersediaan stok, peracikan obat, dan integritas kurir pengantaran termal.',
        kategori: 'Pelayanan Farmasi (PSEF)',
        format: 'XLSX',
        ukuranFile: '5.2 MB',
        status: 'Siap Unduh',
        periode: 'Mei 2026 (01 Mei 2026 - 24 Mei 2026)',
        waktuTerbit: '24 Mei 2026 09:30 WIB',
        pic: {
          nama: 'apt. Rina Meilani, S.Farm.',
          role: 'Apoteker Penanggung Jawab PSEF',
          email: 'rina.meilani@psef.kemkes.go.id',
          avatar: 'assets/images/avatar/female.png',
        },
        digitalSignature: {
          hashSha256: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
          certifiedBy: 'STRA Kemenkes RI - Verifikasi Apoteker',
          validUntil: '31 Desember 2026',
        },
        ringkasanEksekutif: [
          {
            label: 'Total Resep Digital Diterima',
            value: '2.450 Lembar Resep',
            subtext: '100% tervalidasi tanda tangan dokter',
            icon: 'ri-file-text-line',
            colorClass: 'purple',
          },
          {
            label: 'Resep Selesai Ditebus Pasien',
            value: '2.385 Lembar (97.3%)',
            subtext: 'Rata-rata proses 14.5 menit',
            icon: 'ri-checkbox-circle-line',
            colorClass: 'emerald',
          },
          {
            label: 'Obat Terbanyak Diserahkan',
            value: 'Paracetamol & Vitamin C',
            subtext: 'Kategori analgesik & imun booster',
            icon: 'ri-capsule-line',
            colorClass: 'teal',
          },
          {
            label: 'Tingkat Kepatuhan Telaah Resep',
            value: '99.8% Sesuai Standar',
            subtext: '0 insiden medication error',
            icon: 'ri-shield-check-line',
            colorClass: 'blue',
          },
        ],
        tabelHeaders: ['No', 'Kategori Obat', 'Jumlah Resep', 'Total Unit Obat', 'Rata-rata Waktu Telaah', 'Status Kepatuhan'],
        pratinjauTabel: [
          {
            no: 1,
            kolom1: 'Analgesik & Antipiretik (Paracetamol dll)',
            kolom2: '940 Lembar',
            kolom3: '9.400 Tablet',
            kolom4: '4.2 Menit',
            kolom5: '100% Sesuai Standar',
          },
          {
            no: 2,
            kolom1: 'Multivitamin & Suplemen Daya Tahan',
            kolom2: '720 Lembar',
            kolom3: '4.320 Kapsul / Botol',
            kolom4: '3.5 Menit',
            kolom5: '100% Sesuai Standar',
          },
          {
            no: 3,
            kolom1: 'Antihipertensi & Diabetes (Obat Kronis)',
            kolom2: '480 Lembar',
            kolom3: '14.400 Tablet',
            kolom4: '6.8 Menit',
            kolom5: '100% Sesuai Standar',
          },
          {
            no: 4,
            kolom1: 'Antibiotik Terbatas (Resep Wajib)',
            kolom2: '310 Lembar',
            kolom3: '3.100 Kapsul',
            kolom4: '8.1 Menit',
            kolom5: '100% Sesuai Standar',
          },
        ],
        auditRiwayat: [
          {
            label: 'Laporan Resep Elektronik Diekstrak',
            waktu: '24 Mei 2026 09:25 WIB',
            user: 'apt. Rina Meilani, S.Farm.',
            role: 'Apoteker PJ',
            icon: 'ri-file-add-line',
          },
          {
            label: 'Validasi Ketersediaan Sediaan Farmasi',
            waktu: '24 Mei 2026 09:28 WIB',
            user: 'Sistem Integrasi Gudang Farmasi',
            role: 'Warehouse Subsystem',
            icon: 'ri-database-2-line',
          },
        ],
      });
    } else if (tipe === 'Medis') {
      this.detail.set({
        id: '#REP-2026-003',
        cleanId: 'REP-2026-003',
        judul: 'Laporan Kinerja Layanan Telemedisin & Beban Kerja Dokter',
        deskripsi: 'Evaluasi produktivitas dan kualitas penanganan telekonsultasi dokter umum dan spesialis PSEF, durasi konsultasi per pasien, kepatuhan penulisan rekam medis elektronik, serta rating kepuasan pasien.',
        kategori: 'Konsultasi Medis',
        format: 'PDF',
        ukuranFile: '2.8 MB',
        status: 'Siap Unduh',
        periode: 'Mei 2026 (01 Mei 2026 - 24 Mei 2026)',
        waktuTerbit: '23 Mei 2026 16:45 WIB',
        pic: {
          nama: 'dr. Budi Rahardjo, Sp.A',
          role: 'Ketua Komite Medis PSEF',
          email: 'budi.rahardjo@psef.kemkes.go.id',
          avatar: 'assets/images/avatar/male.png',
        },
        digitalSignature: {
          hashSha256: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
          certifiedBy: 'IDI & Konsil Kedokteran Indonesia (KKI)',
          validUntil: '31 Desember 2026',
        },
        ringkasanEksekutif: [
          {
            label: 'Total Sesi Telekonsultasi',
            value: '890 Sesi',
            subtext: 'Rata-rata 37 sesi/hari',
            icon: 'ri-stethoscope-line',
            colorClass: 'blue',
          },
          {
            label: 'Tingkat Kepuasan Pasien',
            value: '4.92 / 5.00 Bintang',
            subtext: 'Berdasarkan 812 ulasan',
            icon: 'ri-star-line',
            colorClass: 'amber',
          },
          {
            label: 'Rata-rata Durasi Konsultasi',
            value: '18.4 Menit',
            subtext: 'Standar minimal 15 menit',
            icon: 'ri-time-line',
            colorClass: 'teal',
          },
          {
            label: 'Penerbitan Resep Elektronik',
            value: '782 Resep (87.8%)',
            subtext: 'Resep terbit pasca asesmen',
            icon: 'ri-file-edit-line',
            colorClass: 'purple',
          },
        ],
        tabelHeaders: ['No', 'Dokter Spesialis', 'Spesialisasi', 'Jumlah Sesi', 'Rata-rata Durasi', 'Skor Rating'],
        pratinjauTabel: [
          {
            no: 1,
            kolom1: 'dr. Andi Wijaya',
            kolom2: 'Spesialis Penyakit Dalam',
            kolom3: '240 Sesi',
            kolom4: '20.5 Menit',
            kolom5: '4.95 / 5.0 (Sangat Puas)',
          },
          {
            no: 2,
            kolom1: 'dr. Siti Nurhaliza',
            kolom2: 'Spesialis Anak (Pediatri)',
            kolom3: '215 Sesi',
            kolom4: '19.2 Menit',
            kolom5: '4.93 / 5.0 (Sangat Puas)',
          },
          {
            no: 3,
            kolom1: 'dr. Bambang Sudrajat',
            kolom2: 'Spesialis Jantung & Pembuluh',
            kolom3: '185 Sesi',
            kolom4: '22.0 Menit',
            kolom5: '4.90 / 5.0 (Sangat Puas)',
          },
          {
            no: 4,
            kolom1: 'dr. Dian Sastro',
            kolom2: 'Dokter Umum / General Practitioner',
            kolom3: '250 Sesi',
            kolom4: '14.8 Menit',
            kolom5: '4.88 / 5.0 (Sangat Puas)',
          },
        ],
        auditRiwayat: [
          {
            label: 'Laporan Komite Medis Disusun',
            waktu: '23 Mei 2026 16:30 WIB',
            user: 'dr. Budi Rahardjo, Sp.A',
            role: 'Ketua Komite Medis',
            icon: 'ri-file-add-line',
          },
          {
            label: 'Persetujuan Direktur Medis',
            waktu: '23 Mei 2026 16:40 WIB',
            user: 'Direksi Pelayanan Medis PSEF',
            role: 'Medical Director',
            icon: 'ri-check-double-line',
          },
        ],
      });
    } else if (tipe === 'Kemenkes') {
      this.detail.set({
        id: '#REP-2026-004',
        cleanId: 'REP-2026-004',
        judul: 'Laporan Kepatuhan SIPNAP & Monitoring Narkotika/Psikotropika',
        deskripsi: 'Laporan kepatuhan regulasi wajib Kementerian Kesehatan Republik Indonesia dan Badan Pengawas Obat dan Makanan (BPOM) untuk pemantauan peredaran sediaan farmasi tertentu, pencegahan penyalahgunaan, dan verifikasi SIP dokter.',
        kategori: 'Kepatuhan Regulasi Kemenkes',
        format: 'PDF',
        ukuranFile: '1.9 MB',
        status: 'Siap Unduh',
        periode: 'Mei 2026 (01 Mei 2026 - 24 Mei 2026)',
        waktuTerbit: '23 Mei 2026 14:15 WIB',
        pic: {
          nama: 'apt. Rina Meilani, S.Farm.',
          role: 'Apoteker Penanggung Jawab PSEF',
          email: 'rina.meilani@psef.kemkes.go.id',
          avatar: 'assets/images/avatar/female.png',
        },
        digitalSignature: {
          hashSha256: '4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a',
          certifiedBy: 'Direktorat Jenderal Farmasi & Alkes Kemenkes RI',
          validUntil: '31 Desember 2026',
        },
        ringkasanEksekutif: [
          {
            label: 'Kepatuhan Pelaporan SIPNAP',
            value: '100% Tepat Waktu',
            subtext: 'Bebas sanksi & audit bersih',
            icon: 'ri-shield-check-line',
            colorClass: 'teal',
          },
          {
            label: 'Total Resep Obat Terbatas',
            value: '140 Transaksi',
            subtext: 'Semua resep diverifikasi 2 apoteker',
            icon: 'ri-file-shield-line',
            colorClass: 'blue',
          },
          {
            label: 'Verifikasi Validitas SIP Dokter',
            value: '100% Terdaftar KKI',
            subtext: 'Sinkronisasi real-time Kemenkes',
            icon: 'ri-id-card-line',
            colorClass: 'purple',
          },
          {
            label: 'Hasil Audit Inspeksi Mandiri',
            value: 'GRADE A (Sempurna)',
            subtext: 'Sesuai PMK No. 14 Tahun 2021',
            icon: 'ri-award-line',
            colorClass: 'emerald',
          },
        ],
        tabelHeaders: ['No', 'Nama Sediaan Obat', 'Golongan Obat', 'Jumlah Diserahkan', 'Dokter Penulis Resep', 'Status Verifikasi SIPNAP'],
        pratinjauTabel: [
          {
            no: 1,
            kolom1: 'Alprazolam 0.5mg Tablet',
            kolom2: 'Psikotropika Gol. IV',
            kolom3: '30 Tablet',
            kolom4: 'dr. Bambang Sudrajat, Sp.KJ',
            kolom5: 'Terlapor SIPNAP (Verified)',
          },
          {
            no: 2,
            kolom1: 'Codeine 10mg Tablet',
            kolom2: 'Narkotika Gol. III',
            kolom3: '20 Tablet',
            kolom4: 'dr. Andi Wijaya, Sp.P',
            kolom5: 'Terlapor SIPNAP (Verified)',
          },
          {
            no: 3,
            kolom1: 'Diazepam 2mg Tablet',
            kolom2: 'Psikotropika Gol. IV',
            kolom3: '15 Tablet',
            kolom4: 'dr. Siti Nurhaliza, Sp.A',
            kolom5: 'Terlapor SIPNAP (Verified)',
          },
        ],
        auditRiwayat: [
          {
            label: 'Ekspor Data SIPNAP Kemenkes Otomatis',
            waktu: '23 Mei 2026 14:10 WIB',
            user: 'Sistem Gateway Kemenkes PSEF',
            role: 'Government API Integrator',
            icon: 'ri-upload-cloud-line',
          },
          {
            label: 'Penerimaan Konfirmasi Terima BPOM',
            waktu: '23 Mei 2026 14:15 WIB',
            user: 'BPOM Server Regulatory Endpoint',
            role: 'External Validator',
            icon: 'ri-checkbox-circle-line',
          },
        ],
      });
    } else {
      // Default: Keuangan
      this.detail.set({
        ...this.detail(),
        id: '#REP-2026-001',
        cleanId: 'REP-2026-001',
        kategori: 'Keuangan & Transaksi',
        judul: 'Laporan Rekapitulasi Pendapatan & Settlement Gateway PSEF',
        format: 'PDF',
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/admin/laporan']);
  }

  downloadReport(): void {
    alert(`Mengunduh berkas resmi "${this.detail().judul}.${this.detail().format.toLowerCase()}" (${this.detail().ukuranFile})...`);
  }

  printReport(): void {
    window.print();
  }
}
