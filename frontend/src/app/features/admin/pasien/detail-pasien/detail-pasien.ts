import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

export type PrimaryTab =
  | 'riwayat-kesehatan'
  | 'pesanan'
  | 'resep'
  | 'pembayaran'
  | 'telemedicine'
  | 'telefarmasi'
  | 'rekam-medis';

export type RekamMedisSubTab =
  | 'timeline'
  | 'ringkasan'
  | 'resep'
  | 'hasil-lab'
  | 'perubahan';

export interface RiwayatKesehatanItem {
  id: string;
  day: string;
  monthYear: string;
  time: string;
  faskes: string;
  faskesKota: string;
  dokter: string;
  dokterSpesialis: string;
  dokterAvatar: string;
  keluhan: string;
  diagnosa: string;
  tindakan: string[];
  resep?: {
    nama: string;
    aturanPakai: string;
    harga: string;
  }[];
  catatanTambahan?: string;
  pemeriksaanFisik?: {
    suhu: string;
    tensi: string;
    nadi: string;
    respirasi: string;
    beratBadan: string;
    tinggiBadan: string;
    imt: string;
  };
  informasiKunjungan?: {
    nomorKunjungan: string;
    tanggal: string;
    durasi: string;
    metode: string;
    dokter: string;
    spesialisasi: string;
    terakhirDiperbarui: string;
  };
}

export interface PesananItem {
  id: string;
  trxId: string;
  tanggal: string;
  tipe: 'Obat Resep' | 'Obat Non-Resep';
  resepInfo?: {
    nomor: string;
    dokter: string;
    tanggal: string;
  };
  status: 'Selesai' | 'Diproses' | 'Dibatalkan';
  statusWaktu: string;
  totalItem: string;
  totalPembayaran: string;
  metodePembayaran: string;
}

export interface PesananProduct {
  no: number;
  nama: string;
  kategori: string;
  nomorResep: string;
  dokter: string;
  harga: number;
  qty: number;
  jumlah: number;
}

export interface ResepItem {
  nomorResep: string;
  tanggalResep: string;
  faskes: string;
  lokasiFaskes: string;
  dokter: string;
  spesialisasi: string;
  status: 'Diproses' | 'Selesai' | 'Dibatalkan';
  totalObat: string;
}

export interface ResepObatDetail {
  nama: string;
  dosis: string;
  aturanPakai: string;
  jumlah: string;
  harga?: number;
}

export interface PembayaranItem {
  noTransaksi: string;
  tanggal: string;
  sumberTipe: 'Pesanan' | 'Resep';
  sumberNomor: string;
  metodeKode: 'bca' | 'ovo' | 'gopay' | 'dana' | 'bri' | 'bni' | 'qris';
  metodeNama: string;
  metodeDetail: string;
  dokter: string;
  status: 'Selesai' | 'Gagal' | 'Menunggu';
  totalPembayaran: string;
  nominal: number;
}

export interface TelemedicineItem {
  id: string;
  invId: string;
  tanggal: string;
  dokter: string;
  spesialisasi: string;
  keluhan: string;
  status: 'Berlangsung' | 'Selesai' | 'Dibatalkan';
  durasi: string;
  nomorResep?: string;
  resepDibuat?: boolean;
}

export interface TelefarmasiItem {
  nomorResep: string;
  invId: string;
  tanggalResep: string;
  apoteker: string;
  sip: string;
  keluhan: string;
  status: 'Berlangsung' | 'Selesai' | 'Dibatalkan';
  durasi: string;
}

export interface RekamMedisTimelineItem {
  id: string;
  tanggal: string;
  tipe: 'konsultasi' | 'lab' | 'resep';
  judul: string;
  dokter: string;
  status: string;
  keluhan?: string;
  tindakan?: string;
  diagnosa?: string;
  jenisPemeriksaan?: string;
  catatan?: string;
  obatList?: string[];
}

export interface LabResultGroup {
  judul: string;
  tanggal: string;
  status: string;
  items: {
    pemeriksaan: string;
    hasil: string;
    satuan: string;
    nilaiRujukan: string;
    status: string;
  }[];
}

export interface RekamMedisAuditLog {
  tanggal: string;
  petugas: string;
  peran: string;
  modul: 'Catatan medis' | 'Resep' | 'Hasil Lab' | 'Imunisasi';
  perubahan: string;
  status: 'Diperbarui' | 'Ditambahkan' | 'Dihapus';
  keterangan: string;
}

@Component({
  selector: 'app-detail-pasien',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './detail-pasien.html',
  styleUrl: './detail-pasien.css',
})
export class DetailPasien implements OnInit {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly activeTab = signal<PrimaryTab>('riwayat-kesehatan');
  readonly riwayatKesehatanViewMode = signal<'list' | 'detail'>('list');
  readonly pesananViewMode = signal<'list' | 'detail'>('list');
  readonly rekamMedisSubTab = signal<RekamMedisSubTab>('timeline');

  readonly patientId = signal('PSN-001');

  // Filter signals
  readonly searchQuery = signal('');
  readonly filterStatus = signal('Semua Status');
  readonly filterTipe = signal('Semua Tipe');
  readonly filterMetode = signal('Semua Metode');

  // Filter signals for Riwayat Kesehatan
  readonly filterRiwayatTanggal = signal('');
  readonly filterRiwayatDokter = signal('Semua Dokter');
  readonly filterRiwayatFaskes = signal('Semua Fasilitas');
  readonly filterRiwayatQuery = signal('');

  // Patient Profile Data matching mockups exactly
  readonly patient = {
    id: 'PSN-001',
    nik: '3275010101010001',
    name: 'Andi Putra',
    gender: 'Laki-laki',
    age: '34 Tahun',
    tipe: 'Pasien Umum/ Pasien BPJS',
    status: 'Aktif',
    healthPoints: '12.458',
    pointsGrowth: '+12.5% dari minggu lalu',
    phone: '0812-3456-7890',
    email: 'andi.putra@gmail.com',
    birthDate: '01-01-1990',
    address: 'Jalan Merdeka No.1 , Jakarta Pusat, DKI Jakarta 10110',
    stats: {
      totalPesanan: '18 Pesanan',
      totalResep: '7 Resep',
      totalPembayaran: 'Rp. 2.450.000',
    },
  };

  // Tab 1: Riwayat Kesehatan Data
  readonly riwayatKesehatan = {
    keluhanUtama: 'Demam, Sakit Kepala, Batuk',
    riwayatKeluhan:
      'Pasien mengeluhkan demam sejak 2 hari yang lalu, disertai sakit kepala dan batuk berdahak. Tidak ada sesak napas. Nafsu makan menurun dan badan terasa lemas. Pasien sudah minum obat penurun demam namun belum membaik.',
    diagnosa: 'ISPA (Infeksi Saluran Pernapasan Akut)',
    tindakan: ['Konsultasi', 'Resep 3 Obat'],
    resep: [
      {
        nama: 'Paracetamol 500 mg',
        aturanPakai: '3 x sehari 1 tablet (Setelah makan)',
        harga: 'Rp. 7.000',
      },
      {
        nama: 'Ambroxol 30 mg',
        aturanPakai: '3 x sehari 1 tablet (Setelah makan)',
        harga: 'Rp. 10.000',
      },
      {
        nama: 'Vitamin C 500 mg',
        aturanPakai: '1 x sehari 1 tablet (Setelah makan)',
        harga: 'Rp. 12.000',
      },
    ],
    catatanTambahan:
      'Istirahat cukup, perbanyak minum air putih dan kontrol kembali jika keluhan tidak membaik dalam 3 hari.',
    pemeriksaanFisik: {
      suhu: '38°C',
      tensi: '120/80 mmHg',
      nadi: '88 bpm',
      respirasi: '18 x/menit',
      beratBadan: '70kg',
      tinggiBadan: '170cm',
      imt: '24.2 (Normal)',
    },
    informasiKunjungan: {
      nomorKunjungan: '#VISIT25024-0012',
      tanggal: '24 Mei 2026, 10:30',
      durasi: '18 Menit',
      metode: 'Video Call',
      dokter: 'dr. Andi Wijaya',
      spesialisasi: 'Dokter Umum',
      terakhirDiperbarui: '24 Mei 2026, 10:48',
    },
    riwayatSebelumnya: [
      {
        tanggal: '10 Mei 2026',
        keluhan: 'Sakit Kepala, Mual',
        dokter: 'dr. Rina Meilani',
        status: 'Selesai',
      },
      {
        tanggal: '05 Apr 2026',
        keluhan: 'Flu, Pilek, Bersin',
        dokter: 'dr. Budi Santoso',
        status: 'Selesai',
      },
      {
        tanggal: '10 Mei 2026',
        keluhan: 'Pusing, Tegang',
        dokter: 'dr. Siti Aminah',
        status: 'Selesai',
      },
    ],
  };

  // Tab 1: Timeline List Data (Daftar Riwayat Kesehatan)
  readonly riwayatKesehatanList: RiwayatKesehatanItem[] = [
    {
      id: '#VISIT25024-0012',
      day: '24',
      monthYear: 'Mei 2026',
      time: '10:30',
      faskes: 'Klinik Sehat',
      faskesKota: 'Jakarta Pusat',
      dokter: 'dr. Andi Wijaya',
      dokterSpesialis: 'Dokter Umum',
      dokterAvatar: 'assets/images/avatar/male.png',
      keluhan: 'Demam, Sakit Kepala Batuk',
      diagnosa: 'ISPA (Infeksi Saluran Pernapasan Akun)',
      tindakan: ['Konsultasi', 'Resep 3 Obat'],
      resep: [
        {
          nama: 'Paracetamol 500 mg',
          aturanPakai: '3 x sehari 1 tablet (Setelah makan)',
          harga: 'Rp. 7.000',
        },
        {
          nama: 'Ambroxol 30 mg',
          aturanPakai: '3 x sehari 1 tablet (Setelah makan)',
          harga: 'Rp. 10.000',
        },
        {
          nama: 'Vitamin C 500 mg',
          aturanPakai: '1 x sehari 1 tablet (Setelah makan)',
          harga: 'Rp. 12.000',
        },
      ],
      catatanTambahan:
        'Istirahat cukup, perbanyak minum air putih dan kontrol kembali jika keluhan tidak membaik dalam 3 hari.',
      pemeriksaanFisik: {
        suhu: '38°C',
        tensi: '120/80 mmHg',
        nadi: '88 bpm',
        respirasi: '18 x/menit',
        beratBadan: '70kg',
        tinggiBadan: '170cm',
        imt: '24.2 (Normal)',
      },
      informasiKunjungan: {
        nomorKunjungan: '#VISIT25024-0012',
        tanggal: '24 Mei 2026, 10:30',
        durasi: '18 Menit',
        metode: 'Video Call',
        dokter: 'dr. Andi Wijaya',
        spesialisasi: 'Dokter Umum',
        terakhirDiperbarui: '24 Mei 2026, 10:48',
      },
    },
    {
      id: '#VISIT25024-0011',
      day: '10',
      monthYear: 'Mei 2026',
      time: '09:45',
      faskes: 'Klinik Sehat',
      faskesKota: 'Jakarta Pusat',
      dokter: 'dr. rina Meilani',
      dokterSpesialis: 'Dokter Umum',
      dokterAvatar: 'assets/images/avatar/female.png',
      keluhan: 'Nyeri Lambung, Mual',
      diagnosa: 'Gastritis',
      tindakan: ['Konsultasi', 'Resep 2 Obat'],
      resep: [
        {
          nama: 'Omeprazole 20 mg',
          aturanPakai: '2 x sehari 1 tablet (Sebelum makan)',
          harga: 'Rp. 15.000',
        },
        {
          nama: 'Antasida Doen',
          aturanPakai: '3 x sehari 1 tablet (Kunyah)',
          harga: 'Rp. 5.000',
        },
      ],
      catatanTambahan:
        'Hindari makanan pedas dan asam, makan teratur tepat waktu.',
      pemeriksaanFisik: {
        suhu: '36.8°C',
        tensi: '115/75 mmHg',
        nadi: '80 bpm',
        respirasi: '16 x/menit',
        beratBadan: '70kg',
        tinggiBadan: '170cm',
        imt: '24.2 (Normal)',
      },
      informasiKunjungan: {
        nomorKunjungan: '#VISIT25024-0011',
        tanggal: '10 Mei 2026, 09:45',
        durasi: '15 Menit',
        metode: 'Video Call',
        dokter: 'dr. rina Meilani',
        spesialisasi: 'Dokter Umum',
        terakhirDiperbarui: '10 Mei 2026, 10:00',
      },
    },
    {
      id: '#VISIT25024-0010',
      day: '05',
      monthYear: 'Apr 2026',
      time: '14:20',
      faskes: 'Klinik Sehat',
      faskesKota: 'Jakarta Pusat',
      dokter: 'dr. Budi Santoso',
      dokterSpesialis: 'Dokter Umum',
      dokterAvatar: 'assets/images/avatar/male.png',
      keluhan: 'Flu, Pilek, Bersin',
      diagnosa: 'Commond Cold',
      tindakan: ['Konsultasi', 'Resep 2 Obat'],
      resep: [
        {
          nama: 'Cetirizine 10 mg',
          aturanPakai: '1 x sehari 1 tablet (Malam)',
          harga: 'Rp. 8.000',
        },
        {
          nama: 'Vitamin C 500 mg',
          aturanPakai: '1 x sehari 1 tablet (Setelah makan)',
          harga: 'Rp. 12.000',
        },
      ],
      catatanTambahan:
        'Gunakan masker, hindari paparan debu dan udara dingin.',
      pemeriksaanFisik: {
        suhu: '37.1°C',
        tensi: '120/80 mmHg',
        nadi: '82 bpm',
        respirasi: '18 x/menit',
        beratBadan: '70kg',
        tinggiBadan: '170cm',
        imt: '24.2 (Normal)',
      },
      informasiKunjungan: {
        nomorKunjungan: '#VISIT25024-0010',
        tanggal: '05 Apr 2026, 14:20',
        durasi: '12 Menit',
        metode: 'Video Call',
        dokter: 'dr. Budi Santoso',
        spesialisasi: 'Dokter Umum',
        terakhirDiperbarui: '05 Apr 2026, 14:32',
      },
    },
    {
      id: '#VISIT25024-0009',
      day: '15',
      monthYear: 'Mar 2026',
      time: '11:05',
      faskes: 'Klinik Sehat',
      faskesKota: 'Jakarta Pusat',
      dokter: 'dr. Siti Aminah',
      dokterSpesialis: 'Dokter Umum',
      dokterAvatar: 'assets/images/avatar/female.png',
      keluhan: 'Pusing, Tegang, Sulit Tidur',
      diagnosa: 'Stres ringan',
      tindakan: ['Konsultasi', 'Resep 1 Obat'],
      resep: [
        {
          nama: 'Vitamin B Kompleks',
          aturanPakai: '1 x sehari 1 tablet (Pagi)',
          harga: 'Rp. 10.000',
        },
      ],
      catatanTambahan:
        'Kurangi waktu melihat gawai sebelum tidur dan lakukan olahraga ringan.',
      pemeriksaanFisik: {
        suhu: '36.6°C',
        tensi: '125/82 mmHg',
        nadi: '76 bpm',
        respirasi: '16 x/menit',
        beratBadan: '70kg',
        tinggiBadan: '170cm',
        imt: '24.2 (Normal)',
      },
      informasiKunjungan: {
        nomorKunjungan: '#VISIT25024-0009',
        tanggal: '15 Mar 2026, 11:05',
        durasi: '20 Menit',
        metode: 'Video Call',
        dokter: 'dr. Siti Aminah',
        spesialisasi: 'Dokter Umum',
        terakhirDiperbarui: '15 Mar 2026, 11:25',
      },
    },
  ];

  // Tab 2: Pesanan Data
  readonly pesananList: PesananItem[] = [
    {
      id: '#INV-25024-0018',
      trxId: 'TRX8934572',
      tanggal: '24 Mei 2026 10:30',
      tipe: 'Obat Resep',
      resepInfo: {
        nomor: '#RX25024-0012',
        dokter: 'dr. Andi Wijaya',
        tanggal: '24 Mei 2026',
      },
      status: 'Selesai',
      statusWaktu: '24 Mei 2026 15:45',
      totalItem: '4 Obat',
      totalPembayaran: 'Rp. 185.000',
      metodePembayaran: 'Transfer Bank BCA******1234',
    },
    {
      id: '#INV-25024-0018',
      trxId: 'TRX8934572',
      tanggal: '24 Mei 2026 10:30',
      tipe: 'Obat Resep',
      resepInfo: {
        nomor: '#RX25024-0012',
        dokter: 'dr. Andi Wijaya',
        tanggal: '24 Mei 2026',
      },
      status: 'Selesai',
      statusWaktu: '24 Mei 2026 15:45',
      totalItem: '4 Obat',
      totalPembayaran: 'Rp. 185.000',
      metodePembayaran: 'Transfer Bank BCA******1234',
    },
    {
      id: '#INV-25024-0018',
      trxId: 'TRX8934572',
      tanggal: '24 Mei 2026 10:30',
      tipe: 'Obat Non-Resep',
      status: 'Selesai',
      statusWaktu: '24 Mei 2026 15:45',
      totalItem: '4 Obat',
      totalPembayaran: 'Rp. 185.000',
      metodePembayaran: 'Transfer Bank BCA******1234',
    },
    {
      id: '#INV-25024-0018',
      trxId: 'TRX8934572',
      tanggal: '24 Mei 2026 10:30',
      tipe: 'Obat Resep',
      resepInfo: {
        nomor: '#RX25024-0012',
        dokter: 'dr. Andi Wijaya',
        tanggal: '24 Mei 2026',
      },
      status: 'Selesai',
      statusWaktu: '24 Mei 2026 15:45',
      totalItem: '4 Obat',
      totalPembayaran: 'Rp. 185.000',
      metodePembayaran: 'Transfer Bank BCA******1234',
    },
    {
      id: '#INV-25024-0018',
      trxId: 'TRX8934572',
      tanggal: '24 Mei 2026 10:30',
      tipe: 'Obat Non-Resep',
      status: 'Selesai',
      statusWaktu: '24 Mei 2026 15:45',
      totalItem: '4 Obat',
      totalPembayaran: 'Rp. 185.000',
      metodePembayaran: 'Transfer Bank BCA******1234',
    },
  ];

  // Tab 2 Detail View Data
  readonly selectedPesananDetail = {
    nomor: '#INV-25024-0018',
    statusPengiriman: 'Dikirim',
    produk: [
      {
        no: 1,
        nama: 'Paracetamol 500mg',
        kategori: 'Tablet | Obat Bebas',
        nomorResep: '#RX25024-0012',
        dokter: 'dr.Andi Wijaya',
        harga: 5000,
        qty: 10,
        jumlah: 50000,
      },
      {
        no: 2,
        nama: 'Vitamin C 500mg',
        kategori: 'Tablet | Obat Bebas',
        nomorResep: '#RX25024-0012',
        dokter: 'dr.Andi Wijaya',
        harga: 7000,
        qty: 10,
        jumlah: 70000,
      },
      {
        no: 3,
        nama: 'Amoxicilin 500mg',
        kategori: 'Tablet | Obat Keras',
        nomorResep: '#RX25024-0012',
        dokter: 'dr.Andi Wijaya',
        harga: 12000,
        qty: 15,
        jumlah: 180000,
      },
      {
        no: 4,
        nama: 'Omeprazol 20mg',
        kategori: 'Kapsul | Obat Bebas',
        nomorResep: '#RX25024-0012',
        dokter: 'dr.Andi Wijaya',
        harga: 15000,
        qty: 10,
        jumlah: 150000,
      },
      {
        no: 5,
        nama: 'Sanmol 500mg',
        kategori: 'Tablet | Obat Bebas',
        nomorResep: '#RX25024-0012',
        dokter: 'dr.Andi Wijaya',
        harga: 14000,
        qty: 10,
        jumlah: 140000,
      },
    ] as PesananProduct[],
    subtotal: 590000,
    diskon: 35000,
    ongkir: 15000,
    voucher: 0,
    total: 570000,
    metodePembayaran: 'Transfer Bank (BCA)',
    waktuPembayaran: '24 Mei 2026 10:36',
    apoteker: {
      nama: 'apt. Rina Meilani, S.Farm., M.Farm-Klin',
      jabatan: 'Apoteker Penanggung Jawab',
      waktuVerifikasi: '24 Mei 2026 10:36',
    },
    catatanApotek: 'Tidak ada catatan',
    catatanPesanan: 'Tidak ada catatan',
    pengiriman: {
      penerima: 'Andi Putra',
      telepon: '0812-3456-7890',
      alamat: 'Jalan Merdeka No.1 , Jakarta Pusat, DKI Jakarta 10110',
      kurir: 'JNE Express',
      noResi: 'JNE11223344556677889900',
      estimasi: '24 Mei 2026',
      catatan: '-',
    },
    timeline: [
      { judul: 'Pesanan Dibuat', waktu: '24 Mei 2026 10:35' },
      { judul: 'Verifikasi Resep', waktu: '24 Mei 2026 10:36' },
      { judul: 'Pesanan Diproses', waktu: '24 Mei 2026 10:50' },
      { judul: 'Pesanan Dikirim', waktu: '24 Mei 2026 11:30' },
    ],
  };

  // Tab 3: Resep Data
  readonly resepList: ResepItem[] = [
    {
      nomorResep: '#RX25024-0012',
      tanggalResep: '24 Mei 2026 10:30',
      faskes: 'Klinik Sehat',
      lokasiFaskes: 'Jakarta Pusat',
      dokter: 'dr. Andi Wijaya',
      spesialisasi: 'Dokter Umum',
      status: 'Diproses',
      totalObat: '4 Obat',
    },
    {
      nomorResep: '#RX25024-0012',
      tanggalResep: '24 Mei 2026 10:30',
      faskes: 'Klinik Sehat',
      lokasiFaskes: 'Jakarta Pusat',
      dokter: 'dr. Andi Wijaya',
      spesialisasi: 'Dokter Umum',
      status: 'Selesai',
      totalObat: '4 Obat',
    },
    {
      nomorResep: '#RX25024-0012',
      tanggalResep: '24 Mei 2026 10:30',
      faskes: 'Klinik Sehat',
      lokasiFaskes: 'Jakarta Pusat',
      dokter: 'dr. Andi Wijaya',
      spesialisasi: 'Dokter Umum',
      status: 'Dibatalkan',
      totalObat: '4 Obat',
    },
    {
      nomorResep: '#RX25024-0012',
      tanggalResep: '24 Mei 2026 10:30',
      faskes: 'Klinik Sehat',
      lokasiFaskes: 'Jakarta Pusat',
      dokter: 'dr. Andi Wijaya',
      spesialisasi: 'Dokter Umum',
      status: 'Selesai',
      totalObat: '4 Obat',
    },
    {
      nomorResep: '#RX25024-0012',
      tanggalResep: '24 Mei 2026 10:30',
      faskes: 'Klinik Sehat',
      lokasiFaskes: 'Jakarta Pusat',
      dokter: 'dr. Andi Wijaya',
      spesialisasi: 'Dokter Umum',
      status: 'Selesai',
      totalObat: '4 Obat',
    },
    {
      nomorResep: '#RX25024-0012',
      tanggalResep: '24 Mei 2026 10:30',
      faskes: 'Klinik Sehat',
      lokasiFaskes: 'Jakarta Pusat',
      dokter: 'dr. Andi Wijaya',
      spesialisasi: 'Dokter Umum',
      status: 'Selesai',
      totalObat: '4 Obat',
    },
    {
      nomorResep: '#RX25024-0012',
      tanggalResep: '24 Mei 2026 10:30',
      faskes: 'Klinik Sehat',
      lokasiFaskes: 'Jakarta Pusat',
      dokter: 'dr. Andi Wijaya',
      spesialisasi: 'Dokter Umum',
      status: 'Selesai',
      totalObat: '4 Obat',
    },
  ];

  readonly selectedResep = signal<{
    faskes: string;
    lokasi: string;
    status: string;
    nomor: string;
    tanggal: string;
    dokter: string;
    spesialisasi: string;
    diagnosa: string;
    daftarObat: ResepObatDetail[];
    catatan: string;
  }>({
    faskes: 'Klinik Sehat',
    lokasi: 'Jakarta Pusat',
    status: 'Selesai',
    nomor: '#RX25024-0012',
    tanggal: '24 Mei 2026 10:36',
    dokter: 'dr. Andi Wijaya',
    spesialisasi: 'Dokter Umum',
    diagnosa: 'ISPA (Infeksi Saluran Pernapasan Akut)',
    daftarObat: [
      {
        nama: 'Paracetamol 500mg',
        dosis: '500mg',
        aturanPakai: '3x Sehari, sesudah makan',
        jumlah: '10 Tablet',
      },
      {
        nama: 'Vitamin C 500mg',
        dosis: '500mg',
        aturanPakai: '3x Sehari, sesudah makan',
        jumlah: '10 Tablet',
      },
      {
        nama: 'Amoxicilin 500mg',
        dosis: '500mg',
        aturanPakai: '3x Sehari, sesudah makan',
        jumlah: '15 Tablet',
      },
      {
        nama: 'Omeprazol 20mg',
        dosis: '20mg',
        aturanPakai: '3x Sehari, sesudah makan',
        jumlah: '10 Tablet',
      },
      {
        nama: 'Sanmol 500mg',
        dosis: '500mg',
        aturanPakai: '3x Sehari, sesudah makan',
        jumlah: '10 Tablet',
      },
    ],
    catatan:
      'Istirahat cukup, perbanyak minum air putih dan kontrol kembali jika keluhan tidak membaik dalam 3 hari',
  });

  // Tab 4: Pembayaran Data
  readonly pembayaranList: PembayaranItem[] = [
    {
      noTransaksi: '#PAY25024-0012',
      tanggal: '24 Mei 2026 10:30',
      sumberTipe: 'Pesanan',
      sumberNomor: '#INV24025-0012',
      metodeKode: 'bca',
      metodeNama: 'BCA',
      metodeDetail: 'BCA******1234',
      dokter: 'dr. Andi Wijaya',
      status: 'Selesai',
      totalPembayaran: 'Rp. 185.000',
      nominal: 185000,
    },
    {
      noTransaksi: '#PAY25024-0013',
      tanggal: '24 Mei 2026 10:30',
      sumberTipe: 'Resep',
      sumberNomor: '#INV24025-0013',
      metodeKode: 'ovo',
      metodeNama: 'OVO',
      metodeDetail: '081*******245',
      dokter: 'dr. Andi Wijaya',
      status: 'Selesai',
      totalPembayaran: 'Rp. 126.000',
      nominal: 126000,
    },
    {
      noTransaksi: '#PAY25024-0014',
      tanggal: '24 Mei 2026 10:30',
      sumberTipe: 'Pesanan',
      sumberNomor: '#INV24025-0014',
      metodeKode: 'gopay',
      metodeNama: 'GoPay',
      metodeDetail: '081*******245',
      dokter: 'dr. Andi Wijaya',
      status: 'Selesai',
      totalPembayaran: 'Rp. 78.500',
      nominal: 78500,
    },
    {
      noTransaksi: '#PAY25024-0015',
      tanggal: '24 Mei 2026 10:30',
      sumberTipe: 'Pesanan',
      sumberNomor: '#INV24025-0015',
      metodeKode: 'dana',
      metodeNama: 'DANA',
      metodeDetail: '081*******245',
      dokter: 'dr. Andi Wijaya',
      status: 'Selesai',
      totalPembayaran: 'Rp. 210.000',
      nominal: 210000,
    },
    {
      noTransaksi: '#PAY25024-0016',
      tanggal: '24 Mei 2026 10:30',
      sumberTipe: 'Resep',
      sumberNomor: '#INV24025-0016',
      metodeKode: 'bri',
      metodeNama: 'BRI',
      metodeDetail: 'BRI*****1234',
      dokter: 'dr. Andi Wijaya',
      status: 'Selesai',
      totalPembayaran: 'Rp. 32.500',
      nominal: 32500,
    },
    {
      noTransaksi: '#PAY25024-0017',
      tanggal: '24 Mei 2026 10:30',
      sumberTipe: 'Pesanan',
      sumberNomor: '#INV24025-0017',
      metodeKode: 'bni',
      metodeNama: 'BNI',
      metodeDetail: 'BNI*****1234',
      dokter: 'dr. Andi Wijaya',
      status: 'Selesai',
      totalPembayaran: 'Rp. 95.000',
      nominal: 95000,
    },
    {
      noTransaksi: '#PAY25024-0018',
      tanggal: '24 Mei 2026 10:30',
      sumberTipe: 'Resep',
      sumberNomor: '#INV24025-0018',
      metodeKode: 'qris',
      metodeNama: 'QRIS',
      metodeDetail: 'QRIS',
      dokter: 'dr. Andi Wijaya',
      status: 'Selesai',
      totalPembayaran: 'Rp. 142.000',
      nominal: 142000,
    },
    {
      noTransaksi: '#PAY25024-0019',
      tanggal: '24 Mei 2026 10:30',
      sumberTipe: 'Pesanan',
      sumberNomor: '#INV24025-0019',
      metodeKode: 'qris',
      metodeNama: 'QRIS',
      metodeDetail: 'QRIS',
      dokter: 'dr. Andi Wijaya',
      status: 'Selesai',
      totalPembayaran: 'Rp. 570.000',
      nominal: 570000,
    },
    {
      noTransaksi: '#PAY25024-0012',
      tanggal: '24 Mei 2026 10:30',
      sumberTipe: 'Resep',
      sumberNomor: '#INV24025-0012',
      metodeKode: 'qris',
      metodeNama: 'QRIS',
      metodeDetail: 'QRIS',
      dokter: 'dr. Andi Wijaya',
      status: 'Gagal',
      totalPembayaran: 'Rp. 192.000',
      nominal: 192000,
    },
    {
      noTransaksi: '#PAY25024-0020',
      tanggal: '24 Mei 2026 10:30',
      sumberTipe: 'Resep',
      sumberNomor: '#INV24025-0020',
      metodeKode: 'qris',
      metodeNama: 'QRIS',
      metodeDetail: 'QRIS',
      dokter: 'dr. Andi Wijaya',
      status: 'Selesai',
      totalPembayaran: 'Rp. 52.000',
      nominal: 52000,
    },
  ];

  readonly pembayaranSummary = {
    total: 'Rp. 631.500',
    transaksiCount: 4,
    rataRata: 'Rp. 157.875',
    tertinggi: 'Rp. 210.000',
    breakdown: [
      { nama: 'Transfer Bank', persen: 45, nominal: 'Rp. 284.500', warna: '#0d9488' },
      { nama: 'E-Wallet', persen: 30, nominal: 'Rp. 189.500', warna: '#0284c7' },
      { nama: 'COD', persen: 15, nominal: 'Rp. 94.000', warna: '#f97316' },
      { nama: 'Kartu Kredit', persen: 10, nominal: 'Rp. 63.500', warna: '#334155' },
    ],
  };

  // Tab 5: Telemedicine Data
  readonly telemedicineList: TelemedicineItem[] = [
    {
      id: '#CNS25024-0012',
      invId: '#INV25024-0012',
      tanggal: '24 Mei 2026 10:30',
      dokter: 'dr. Andi Wijaya',
      spesialisasi: 'Dokter Umum',
      keluhan: 'Demam, Batuk Pilek',
      status: 'Berlangsung',
      durasi: '18 menit',
    },
    {
      id: '#CNS25024-0012',
      invId: '#INV25024-0012',
      tanggal: '24 Mei 2026 10:30',
      dokter: 'dr. Andi Wijaya',
      spesialisasi: 'Dokter Umum',
      keluhan: 'Sakit Kepala, Mual',
      status: 'Selesai',
      durasi: '18 menit',
    },
    {
      id: '#CNS25024-0012',
      invId: '#INV25024-0012',
      tanggal: '24 Mei 2026 10:30',
      dokter: 'dr. Andi Wijaya',
      spesialisasi: 'Dokter Umum',
      keluhan: 'Nyeri Lambung',
      status: 'Dibatalkan',
      durasi: '18 menit',
    },
    {
      id: '#CNS25024-0012',
      invId: '#INV25024-0012',
      tanggal: '24 Mei 2026 10:30',
      dokter: 'dr. Andi Wijaya',
      spesialisasi: 'Dokter Umum',
      keluhan: 'Flu, Batuk, Pilek',
      status: 'Selesai',
      durasi: '18 menit',
    },
    {
      id: '#CNS25024-0012',
      invId: '#INV25024-0012',
      tanggal: '24 Mei 2026 10:30',
      dokter: 'dr. Andi Wijaya',
      spesialisasi: 'Dokter Umum',
      keluhan: 'Flu, Pilek, Bersin',
      status: 'Selesai',
      durasi: '18 menit',
    },
    {
      id: '#CNS25024-0012',
      invId: '#INV25024-0012',
      tanggal: '24 Mei 2026 10:30',
      dokter: 'dr. Andi Wijaya',
      spesialisasi: 'Dokter Umum',
      keluhan: 'Vertigo, Pusing',
      status: 'Selesai',
      durasi: '18 menit',
    },
    {
      id: '#CNS25024-0012',
      invId: '#INV25024-0012',
      tanggal: '24 Mei 2026 10:30',
      dokter: 'dr. Andi Wijaya',
      spesialisasi: 'Dokter Umum',
      keluhan: 'Sakit Tenggorokan',
      status: 'Selesai',
      durasi: '18 menit',
    },
    {
      id: '#CNS25024-0012',
      invId: '#INV25024-0012',
      tanggal: '24 Mei 2026 10:30',
      dokter: 'dr. Andi Wijaya',
      spesialisasi: 'Dokter Umum',
      keluhan: 'Demam Tinggi',
      status: 'Selesai',
      durasi: '18 menit',
    },
    {
      id: '#CNS25024-0012',
      invId: '#INV25024-0012',
      tanggal: '24 Mei 2026 10:30',
      dokter: 'dr. Andi Wijaya',
      spesialisasi: 'Dokter Umum',
      keluhan: 'Demam, Batuk Pilek',
      status: 'Selesai',
      durasi: '18 menit',
    },
    {
      id: '#CNS25024-0012',
      invId: '#INV25024-0012',
      tanggal: '24 Mei 2026 10:30',
      dokter: 'dr. Andi Wijaya',
      spesialisasi: 'Dokter Umum',
      keluhan: 'Demam, Batuk Pilek',
      status: 'Selesai',
      durasi: '18 menit',
    },
  ];

  readonly selectedTelemedicine = signal({
    nomor: '#CNS25024-0012',
    tanggal: '24 Mei 2026 10:30',
    dokter: 'dr. Andi Wijaya',
    spesialisasi: 'Dokter Umum',
    keluhan: 'Demam, Flu, Batuk Berdahak',
    catatan:
      'Pasien mengalami gejala ISPA ringan. Disarankan istirahat cukup, konsumsi obat sesuai resep dan perbanyak minum air putih',
    durasi: '18 menit',
    metode: 'Video Call',
    statusPembayaran: 'Lunas',
    dibuatOleh: 'Pasien',
    dibuatPada: '24 Mei 2026 10:30',
  });

  // Tab 6: Telefarmasi Data
  readonly telefarmasiList: TelefarmasiItem[] = [
    {
      nomorResep: '#CNS25024-0012',
      invId: '#INV25024-0012',
      tanggalResep: '24 Mei 2026 10:30',
      apoteker: 'apt. Andi Wijaya, S.Farm.',
      sip: '123456890',
      keluhan: 'Demam, Batuk Pilek',
      status: 'Berlangsung',
      durasi: '18 menit',
    },
    {
      nomorResep: '#CNS25024-0012',
      invId: '#INV25024-0012',
      tanggalResep: '24 Mei 2026 10:30',
      apoteker: 'apt. Andi Wijaya, S.Farm.',
      sip: '123456890',
      keluhan: 'Sakit Kepala, Mual',
      status: 'Selesai',
      durasi: '18 menit',
    },
    {
      nomorResep: '#CNS25024-0012',
      invId: '#INV25024-0012',
      tanggalResep: '24 Mei 2026 10:30',
      apoteker: 'apt. Andi Wijaya, S.Farm.',
      sip: '123456890',
      keluhan: 'Nyeri Lambung',
      status: 'Dibatalkan',
      durasi: '18 menit',
    },
    {
      nomorResep: '#CNS25024-0012',
      invId: '#INV25024-0012',
      tanggalResep: '24 Mei 2026 10:30',
      apoteker: 'apt. Andi Wijaya, S.Farm.',
      sip: '123456890',
      keluhan: 'Flu, Batuk, Pilek',
      status: 'Selesai',
      durasi: '18 menit',
    },
    {
      nomorResep: '#CNS25024-0012',
      invId: '#INV25024-0012',
      tanggalResep: '24 Mei 2026 10:30',
      apoteker: 'apt. Andi Wijaya, S.Farm.',
      sip: '123456890',
      keluhan: 'Flu, Pilek, Bersin',
      status: 'Selesai',
      durasi: '18 menit',
    },
    {
      nomorResep: '#CNS25024-0012',
      invId: '#INV25024-0012',
      tanggalResep: '24 Mei 2026 10:30',
      apoteker: 'apt. Andi Wijaya, S.Farm.',
      sip: '123456890',
      keluhan: 'Vertigo, Pusing',
      status: 'Selesai',
      durasi: '18 menit',
    },
    {
      nomorResep: '#CNS25024-0012',
      invId: '#INV25024-0012',
      tanggalResep: '24 Mei 2026 10:30',
      apoteker: 'apt. Andi Wijaya, S.Farm.',
      sip: '123456890',
      keluhan: 'Sakit Tenggorokan',
      status: 'Selesai',
      durasi: '18 menit',
    },
    {
      nomorResep: '#CNS25024-0012',
      invId: '#INV25024-0012',
      tanggalResep: '24 Mei 2026 10:30',
      apoteker: 'apt. Andi Wijaya, S.Farm.',
      sip: '123456890',
      keluhan: 'Demam Tinggi',
      status: 'Selesai',
      durasi: '18 menit',
    },
    {
      nomorResep: '#CNS25024-0012',
      invId: '#INV25024-0012',
      tanggalResep: '24 Mei 2026 10:30',
      apoteker: 'apt. Andi Wijaya, S.Farm.',
      sip: '123456890',
      keluhan: 'Demam, Batuk Pilek',
      status: 'Selesai',
      durasi: '18 menit',
    },
    {
      nomorResep: '#CNS25024-0012',
      invId: '#INV25024-0012',
      tanggalResep: '24 Mei 2026 10:30',
      apoteker: 'apt. Andi Wijaya, S.Farm.',
      sip: '123456890',
      keluhan: 'Demam, Batuk Pilek',
      status: 'Selesai',
      durasi: '18 menit',
    },
  ];

  readonly selectedTelefarmasi = signal({
    nomor: '#CNS25024-0012',
    tanggal: '24 Mei 2026 10:30',
    apoteker: 'apt. Andi Wijaya, S.Farm.',
    sip: '123456890',
    keluhan: 'Demam, Flu, Batuk Berdahak',
    catatan:
      'Pasien mengalami gejala ISPA ringan. Disarankan istirahat cukup, konsumsi obat sesuai resep dan perbanyak minum air putih',
    durasi: '18 menit',
    metode: 'Video Call',
    statusPembayaran: 'Lunas',
    dibuatOleh: 'Pasien',
    dibuatPada: '24 Mei 2026 10:30',
  });

  // Tab 7: Rekam Medis Data
  readonly rekamMedisTimeline: RekamMedisTimelineItem[] = [
    {
      id: 'RM-01',
      tanggal: '24 Mei 2026 10:30',
      tipe: 'konsultasi',
      judul: 'Konsultasi',
      dokter: 'dr. Andi Wijaya',
      status: 'Selesai',
      keluhan: 'Demam, Flu, Batuk Berdahak',
      tindakan: 'Pemeriksaan Fisik, Edukasi Resep Obat',
      diagnosa: 'ISPA (Infeksi saluran Pernapasan Akut) J06.9',
    },
    {
      id: 'RM-02',
      tanggal: '23 Mei 2026 10:30',
      tipe: 'lab',
      judul: 'Hasil Laboratorium',
      dokter: 'dr. Andi Wijaya',
      status: 'Selesai',
      jenisPemeriksaan: 'Darah lengkap',
      catatan: 'Tidak ada kelainan berarti',
    },
    {
      id: 'RM-03',
      tanggal: '20 Mei 2026 10:30',
      tipe: 'resep',
      judul: 'Resep Obat',
      dokter: 'dr. Andi Wijaya',
      status: 'Selesai',
      tindakan: 'Pemeriksaan Fisik, Edukasi Resep Obat',
      obatList: [
        'Paracetamol 500mg',
        'Vitamin C 500mg',
        'Amoxicilin 500mg',
        'Omeprazol 20mg',
        'Sanmol 500mg',
      ],
    },
    {
      id: 'RM-04',
      tanggal: '18 Mei 2026 10:30',
      tipe: 'konsultasi',
      judul: 'Konsultasi',
      dokter: 'dr. Andi Wijaya',
      status: 'Selesai',
      keluhan: 'Demam, Flu, Batuk Berdahak',
      tindakan: 'Pemeriksaan Fisik, Edukasi Resep Obat',
      diagnosa: 'ISPA (Infeksi Saluran Pernapasan Akut) J06.9',
    },
  ];

  readonly rekamMedisLabResults: LabResultGroup[] = [
    {
      judul: 'Hemogram Lengkap',
      tanggal: '24 Mei 2026, 09:15',
      status: 'Normal',
      items: [
        { pemeriksaan: 'Hemoglobin', hasil: '14.2', satuan: 'g/dL', nilaiRujukan: '13.0 - 17.0', status: 'Normal' },
        { pemeriksaan: 'Leukosit', hasil: '7.200', satuan: '/uL', nilaiRujukan: '4.000 - 10.000', status: 'Normal' },
        { pemeriksaan: 'Trombosit', hasil: '245.000', satuan: '/uL', nilaiRujukan: '150.000 - 400.000', status: 'Normal' },
        { pemeriksaan: 'Hematokrit', hasil: '42.1', satuan: '%', nilaiRujukan: '40 - 50', status: 'Normal' },
      ],
    },
    {
      judul: 'Gula Darah Sewaktu',
      tanggal: '20 Mei 2026, 08:45',
      status: 'Normal',
      items: [
        { pemeriksaan: 'Glukosa', hasil: '112', satuan: 'mg/dL', nilaiRujukan: '< 140', status: 'Normal' },
      ],
    },
    {
      judul: 'Fungsi Hati (SGOT/SGPT)',
      tanggal: '24 Mei 2026, 09:15',
      status: 'Normal',
      items: [
        { pemeriksaan: 'SGOT (AST)', hasil: '24', satuan: 'U/L', nilaiRujukan: '< 40', status: 'Normal' },
        { pemeriksaan: 'SGPT (ALT)', hasil: '28', satuan: 'U/L', nilaiRujukan: '< 41', status: 'Normal' },
      ],
    },
  ];

  readonly rekamMedisAuditLogs: RekamMedisAuditLog[] = [
    {
      tanggal: '24 Mei 2026 10:30',
      petugas: 'dr. Andi Wijaya',
      peran: 'Dokter Umum',
      modul: 'Catatan medis',
      perubahan: 'Catatan Konsultasi',
      status: 'Diperbarui',
      keterangan: 'Menambahkan Catatan keluhan dan tindak lanjut',
    },
    {
      tanggal: '24 Mei 2026 10:30',
      petugas: 'dr. Andi Wijaya',
      peran: 'Dokter Umum',
      modul: 'Resep',
      perubahan: 'Catatan Konsultasi',
      status: 'Ditambahkan',
      keterangan: 'Menambahkan Catatan keluhan dan tindak lanjut',
    },
    {
      tanggal: '24 Mei 2026 10:30',
      petugas: 'dr. Andi Wijaya',
      peran: 'Dokter Umum',
      modul: 'Hasil Lab',
      perubahan: 'Catatan Konsultasi',
      status: 'Dihapus',
      keterangan: 'Menambahkan Catatan keluhan dan tindak lanjut',
    },
    {
      tanggal: '24 Mei 2026 10:30',
      petugas: 'dr. Andi Wijaya',
      peran: 'Dokter Umum',
      modul: 'Imunisasi',
      perubahan: 'Catatan Konsultasi',
      status: 'Diperbarui',
      keterangan: 'Menambahkan Catatan keluhan dan tindak lanjut',
    },
    {
      tanggal: '24 Mei 2026 10:30',
      petugas: 'dr. Andi Wijaya',
      peran: 'Dokter Umum',
      modul: 'Catatan medis',
      perubahan: 'Catatan Konsultasi',
      status: 'Diperbarui',
      keterangan: 'Menambahkan Catatan keluhan dan tindak lanjut',
    },
    {
      tanggal: '24 Mei 2026 10:30',
      petugas: 'dr. Andi Wijaya',
      peran: 'Dokter Umum',
      modul: 'Catatan medis',
      perubahan: 'Catatan Konsultasi',
      status: 'Diperbarui',
      keterangan: 'Menambahkan Catatan keluhan dan tindak lanjut',
    },
    {
      tanggal: '24 Mei 2026 10:30',
      petugas: 'dr. Andi Wijaya',
      peran: 'Dokter Umum',
      modul: 'Catatan medis',
      perubahan: 'Catatan Konsultasi',
      status: 'Diperbarui',
      keterangan: 'Menambahkan Catatan keluhan dan tindak lanjut',
    },
    {
      tanggal: '24 Mei 2026 10:30',
      petugas: 'dr. Andi Wijaya',
      peran: 'Dokter Umum',
      modul: 'Catatan medis',
      perubahan: 'Catatan Konsultasi',
      status: 'Diperbarui',
      keterangan: 'Menambahkan Catatan keluhan dan tindak lanjut',
    },
    {
      tanggal: '24 Mei 2026 10:30',
      petugas: 'dr. Andi Wijaya',
      peran: 'Dokter Umum',
      modul: 'Catatan medis',
      perubahan: 'Catatan Konsultasi',
      status: 'Diperbarui',
      keterangan: 'Menambahkan Catatan keluhan dan tindak lanjut',
    },
    {
      tanggal: '24 Mei 2026 10:30',
      petugas: 'dr. Andi Wijaya',
      peran: 'Dokter Umum',
      modul: 'Catatan medis',
      perubahan: 'Catatan Konsultasi',
      status: 'Diperbarui',
      keterangan: 'Menambahkan Catatan keluhan dan tindak lanjut',
    },
  ];

  // Rekam Medis Ringkasan timeline items
  readonly konsultasiProgress = [
    { jam: '10:30', icon: 'ri-chat-1-line', judul: 'Pasien melakukan konsultasi', sub: 'Keluhan : Demam, Pilek, Batuk Berdahak' },
    { jam: '10:35', icon: 'ri-stethoscope-line', judul: 'Pemeriksaan oleh Dokter', sub: 'Keluhan : Demam, Pilek, Batuk Berdahak' },
    { jam: '10:40', icon: 'ri-survey-line', judul: 'Diagnosa & Rencana Tindakan', sub: 'Pemeriksaan fisik dan tanya jawab' },
    { jam: '10:45', icon: 'ri-file-list-3-line', judul: 'Resep diberikan', sub: 'Obat diberikan sesuai kondisi pasien' },
    { jam: '10:50', icon: 'ri-checkbox-circle-line', judul: 'Konsultasi Selesai', sub: 'Pasien mendapatkan edukasi dan saran' },
  ];

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.patientId.set(id);
      this.patient.id = id;
    }
  }

  selectTab(tab: PrimaryTab): void {
    this.activeTab.set(tab);
  }

  setPesananViewMode(mode: 'list' | 'detail'): void {
    this.pesananViewMode.set(mode);
  }

  setRekamMedisSubTab(subTab: RekamMedisSubTab): void {
    this.rekamMedisSubTab.set(subTab);
  }

  selectResep(item: ResepItem): void {
    this.selectedResep.set({
      faskes: item.faskes,
      lokasi: item.lokasiFaskes,
      status: item.status,
      nomor: item.nomorResep,
      tanggal: item.tanggalResep,
      dokter: item.dokter,
      spesialisasi: item.spesialisasi,
      diagnosa: 'ISPA (Infeksi Saluran Pernapasan Akut)',
      daftarObat: [
        { nama: 'Paracetamol 500mg', dosis: '500mg', aturanPakai: '3x Sehari, sesudah makan', jumlah: '10 Tablet' },
        { nama: 'Vitamin C 500mg', dosis: '500mg', aturanPakai: '3x Sehari, sesudah makan', jumlah: '10 Tablet' },
        { nama: 'Amoxicilin 500mg', dosis: '500mg', aturanPakai: '3x Sehari, sesudah makan', jumlah: '15 Tablet' },
        { nama: 'Omeprazol 20mg', dosis: '20mg', aturanPakai: '3x Sehari, sesudah makan', jumlah: '10 Tablet' },
        { nama: 'Sanmol 500mg', dosis: '500mg', aturanPakai: '3x Sehari, sesudah makan', jumlah: '10 Tablet' },
      ],
      catatan: 'Istirahat cukup, perbanyak minum air putih dan kontrol kembali jika keluhan tidak membaik dalam 3 hari',
    });
  }

  selectTelemedicine(item: TelemedicineItem): void {
    this.selectedTelemedicine.set({
      nomor: item.id,
      tanggal: item.tanggal,
      dokter: item.dokter,
      spesialisasi: item.spesialisasi,
      keluhan: item.keluhan,
      catatan: 'Pasien mengalami gejala ISPA ringan. Disarankan istirahat cukup, konsumsi obat sesuai resep dan perbanyak minum air putih',
      durasi: item.durasi,
      metode: 'Video Call',
      statusPembayaran: 'Lunas',
      dibuatOleh: 'Pasien',
      dibuatPada: item.tanggal,
    });
  }

  selectTelefarmasi(item: TelefarmasiItem): void {
    this.selectedTelefarmasi.set({
      nomor: item.nomorResep,
      tanggal: item.tanggalResep,
      apoteker: item.apoteker,
      sip: item.sip,
      keluhan: item.keluhan,
      catatan: 'Pasien mengalami gejala ISPA ringan. Disarankan istirahat cukup, konsumsi obat sesuai resep dan perbanyak minum air putih',
      durasi: item.durasi,
      metode: 'Video Call',
      statusPembayaran: 'Lunas',
      dibuatOleh: 'Pasien',
      dibuatPada: item.tanggalResep,
    });
  }

  setRiwayatKesehatanViewMode(mode: 'list' | 'detail'): void {
    this.riwayatKesehatanViewMode.set(mode);
  }

  viewRiwayatDetail(item: RiwayatKesehatanItem): void {
    if (item.keluhan) {
      this.riwayatKesehatan.keluhanUtama = item.keluhan;
    }
    if (item.diagnosa) {
      this.riwayatKesehatan.diagnosa = item.diagnosa;
    }
    if (item.tindakan) {
      this.riwayatKesehatan.tindakan = [...item.tindakan];
    }
    if (item.resep) {
      this.riwayatKesehatan.resep = [...item.resep];
    }
    if (item.catatanTambahan) {
      this.riwayatKesehatan.catatanTambahan = item.catatanTambahan;
    }
    if (item.pemeriksaanFisik) {
      this.riwayatKesehatan.pemeriksaanFisik = { ...item.pemeriksaanFisik };
    }
    if (item.informasiKunjungan) {
      this.riwayatKesehatan.informasiKunjungan = { ...item.informasiKunjungan };
    }
    this.riwayatKesehatanViewMode.set('detail');
  }

  backToRiwayatList(): void {
    this.riwayatKesehatanViewMode.set('list');
  }

  goBack(): void {
    void this.router.navigate(['/admin/pasien']);
  }

  goToEdit(): void {
    void this.router.navigate(['/admin/pasien/edit-pasien', this.patient.id]);
  }

  printCard(): void {
    window.print();
  }
}
