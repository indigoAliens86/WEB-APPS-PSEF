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
  fasilitasId: string;
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
  fasilitasId: string;
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
  fasilitasId: string;
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
  fasilitasId: string;
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
  fasilitasId: string;
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
  fasilitasId: string;
  faskes: string;
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
  fasilitasId?: string;
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
  fasilitasId?: string;
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

  // Active Facility Identity (Scopes all data to this facility)
  readonly currentFasilitasId = 'FAS-001';
  readonly currentFasilitasName = 'Apotek Kimia Sehat PSEF';

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

  // Patient Profile Data matching mockups
  readonly patient = {
    id: 'PSN-001',
    nik: '3275010101010001',
    name: 'Andi Putra',
    gender: 'Laki-laki',
    age: '34 Tahun',
    tipe: 'Pasien Umum / Pasien BPJS',
    status: 'Aktif',
    healthPoints: '12.458',
    pointsGrowth: '+12.5% dari minggu lalu',
    phone: '0812-3456-7890',
    email: 'andi.putra@gmail.com',
    birthDate: '01-01-1990',
    address: 'Jalan Merdeka No.1 , Jakarta Pusat, DKI Jakarta 10110',
    stats: {
      totalPesanan: '5 Pesanan',
      totalResep: '5 Resep',
      totalPembayaran: 'Rp. 1.250.000',
    },
  };

  // Tab 1: Riwayat Kesehatan Detail Data
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

  // Tab 1: All Riwayat Kesehatan across system
  readonly allRiwayatKesehatanList: RiwayatKesehatanItem[] = [
    {
      id: '#VISIT25024-0012',
      day: '24',
      monthYear: 'Mei 2026',
      time: '10:30',
      fasilitasId: 'FAS-001',
      faskes: 'Apotek Kimia Sehat PSEF',
      faskesKota: 'Jakarta Pusat',
      dokter: 'dr. Andi Wijaya',
      dokterSpesialis: 'Dokter Umum',
      dokterAvatar: 'assets/images/avatar/male.png',
      keluhan: 'Demam, Sakit Kepala Batuk',
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
    },
    {
      id: '#VISIT25024-0011',
      day: '10',
      monthYear: 'Mei 2026',
      time: '09:45',
      fasilitasId: 'FAS-001',
      faskes: 'Apotek Kimia Sehat PSEF',
      faskesKota: 'Jakarta Pusat',
      dokter: 'dr. Rina Meilani',
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
        dokter: 'dr. Rina Meilani',
        spesialisasi: 'Dokter Umum',
        terakhirDiperbarui: '10 Mei 2026, 10:00',
      },
    },
    {
      id: '#VISIT25024-0010',
      day: '05',
      monthYear: 'Apr 2026',
      time: '14:20',
      fasilitasId: 'FAS-002', // Fasilitas lain (Klinik Lain B)
      faskes: 'Klinik Mitra Sejahtera',
      faskesKota: 'Bandung',
      dokter: 'dr. Budi Santoso',
      dokterSpesialis: 'Dokter Umum',
      dokterAvatar: 'assets/images/avatar/male.png',
      keluhan: 'Flu, Pilek, Bersin',
      diagnosa: 'Common Cold',
      tindakan: ['Konsultasi', 'Resep 2 Obat'],
    },
    {
      id: '#VISIT25024-0009',
      day: '15',
      monthYear: 'Mar 2026',
      time: '11:05',
      fasilitasId: 'FAS-001',
      faskes: 'Apotek Kimia Sehat PSEF',
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

  // Scoped to current facility
  get riwayatKesehatanList(): RiwayatKesehatanItem[] {
    return this.allRiwayatKesehatanList.filter(
      (item) => item.fasilitasId === this.currentFasilitasId
    );
  }

  // Tab 2: Pesanan Data (Scoped to current facility)
  readonly allPesananList: PesananItem[] = [
    {
      id: '#INV-25024-0018',
      trxId: 'TRX8934572',
      tanggal: '24 Mei 2026 10:30',
      fasilitasId: 'FAS-001',
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
      id: '#INV-25024-0019',
      trxId: 'TRX8934573',
      tanggal: '22 Mei 2026 14:10',
      fasilitasId: 'FAS-002', // Pesanan di Apotek Lain B
      tipe: 'Obat Resep',
      status: 'Selesai',
      statusWaktu: '22 Mei 2026 17:00',
      totalItem: '2 Obat',
      totalPembayaran: 'Rp. 95.000',
      metodePembayaran: 'OVO',
    },
    {
      id: '#INV-25024-0020',
      trxId: 'TRX8934574',
      tanggal: '18 Mei 2026 11:20',
      fasilitasId: 'FAS-001',
      tipe: 'Obat Non-Resep',
      status: 'Selesai',
      statusWaktu: '18 Mei 2026 16:00',
      totalItem: '3 Obat',
      totalPembayaran: 'Rp. 125.000',
      metodePembayaran: 'Transfer Bank BCA******1234',
    },
    {
      id: '#INV-25024-0021',
      trxId: 'TRX8934575',
      tanggal: '10 Mei 2026 09:15',
      fasilitasId: 'FAS-001',
      tipe: 'Obat Resep',
      resepInfo: {
        nomor: '#RX25024-0010',
        dokter: 'dr. Rina Meilani',
        tanggal: '10 Mei 2026',
      },
      status: 'Selesai',
      statusWaktu: '10 Mei 2026 14:30',
      totalItem: '2 Obat',
      totalPembayaran: 'Rp. 78.500',
      metodePembayaran: 'GoPay',
    },
    {
      id: '#INV-25024-0022',
      trxId: 'TRX8934576',
      tanggal: '02 Mei 2026 13:40',
      fasilitasId: 'FAS-001',
      tipe: 'Obat Non-Resep',
      status: 'Selesai',
      statusWaktu: '02 Mei 2026 15:15',
      totalItem: '4 Obat',
      totalPembayaran: 'Rp. 210.000',
      metodePembayaran: 'DANA',
    },
  ];

  get pesananList(): PesananItem[] {
    return this.allPesananList.filter(
      (item) => item.fasilitasId === this.currentFasilitasId
    );
  }

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
        dokter: 'dr. Andi Wijaya',
        harga: 5000,
        qty: 10,
        jumlah: 50000,
      },
      {
        no: 2,
        nama: 'Vitamin C 500mg',
        kategori: 'Tablet | Obat Bebas',
        nomorResep: '#RX25024-0012',
        dokter: 'dr. Andi Wijaya',
        harga: 7000,
        qty: 10,
        jumlah: 70000,
      },
      {
        no: 3,
        nama: 'Amoxicilin 500mg',
        kategori: 'Tablet | Obat Keras',
        nomorResep: '#RX25024-0012',
        dokter: 'dr. Andi Wijaya',
        harga: 12000,
        qty: 15,
        jumlah: 180000,
      },
      {
        no: 4,
        nama: 'Omeprazol 20mg',
        kategori: 'Kapsul | Obat Bebas',
        nomorResep: '#RX25024-0012',
        dokter: 'dr. Andi Wijaya',
        harga: 15000,
        qty: 10,
        jumlah: 150000,
      },
      {
        no: 5,
        nama: 'Sanmol 500mg',
        kategori: 'Tablet | Obat Bebas',
        nomorResep: '#RX25024-0012',
        dokter: 'dr. Andi Wijaya',
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
      nama: 'apt. Rina Meliani, S.Farm',
      jabatan: 'Apoteker Penanggung Jawab',
      waktuVerifikasi: '24 Mei 2026 10:36',
    },
    catatanApotek: 'Resep terverifikasi lengkap dan obat telah disiapkan sesuai SPO dispensing.',
    catatanPesanan: 'Antar sebelum jam 17:00 WIB.',
    pengiriman: {
      penerima: 'Andi Putra',
      telepon: '0812-3456-7890',
      alamat: 'Jalan Merdeka No.1 , Jakarta Pusat, DKI Jakarta 10110',
      kurir: 'Kurir Internal Apotek',
      noResi: 'FAS001-DLV-8823',
      estimasi: '24 Mei 2026',
      catatan: '-',
    },
    timeline: [
      { judul: 'Pesanan Dibuat', waktu: '24 Mei 2026 10:35' },
      { judul: 'Verifikasi Resep Apoteker', waktu: '24 Mei 2026 10:36' },
      { judul: 'Dispensing Obat Diproses', waktu: '24 Mei 2026 10:50' },
      { judul: 'Pesanan Dikirim', waktu: '24 Mei 2026 11:30' },
    ],
  };

  // Tab 3: Resep Data (Scoped to current facility)
  readonly allResepList: ResepItem[] = [
    {
      nomorResep: '#RX25024-0012',
      tanggalResep: '24 Mei 2026 10:30',
      fasilitasId: 'FAS-001',
      faskes: 'Apotek Kimia Sehat PSEF',
      lokasiFaskes: 'Jakarta Pusat',
      dokter: 'dr. Andi Wijaya',
      spesialisasi: 'Dokter Umum',
      status: 'Diproses',
      totalObat: '4 Obat',
    },
    {
      nomorResep: '#RX25024-0013',
      tanggalResep: '20 Mei 2026 14:00',
      fasilitasId: 'FAS-002', // Tebus di Fasilitas Lain B
      faskes: 'Apotek Sejahtera Farma',
      lokasiFaskes: 'Bandung',
      dokter: 'dr. Budi Santoso',
      spesialisasi: 'Dokter Umum',
      status: 'Selesai',
      totalObat: '2 Obat',
    },
    {
      nomorResep: '#RX25024-0014',
      tanggalResep: '15 Mei 2026 09:20',
      fasilitasId: 'FAS-001',
      faskes: 'Apotek Kimia Sehat PSEF',
      lokasiFaskes: 'Jakarta Pusat',
      dokter: 'dr. Andi Wijaya',
      spesialisasi: 'Dokter Umum',
      status: 'Selesai',
      totalObat: '3 Obat',
    },
    {
      nomorResep: '#RX25024-0015',
      tanggalResep: '10 Mei 2026 11:45',
      fasilitasId: 'FAS-001',
      faskes: 'Apotek Kimia Sehat PSEF',
      lokasiFaskes: 'Jakarta Pusat',
      dokter: 'dr. Rina Meilani',
      spesialisasi: 'Dokter Umum',
      status: 'Selesai',
      totalObat: '2 Obat',
    },
    {
      nomorResep: '#RX25024-0016',
      tanggalResep: '01 Mei 2026 16:30',
      fasilitasId: 'FAS-001',
      faskes: 'Apotek Kimia Sehat PSEF',
      lokasiFaskes: 'Jakarta Pusat',
      dokter: 'dr. Andi Wijaya',
      spesialisasi: 'Dokter Umum',
      status: 'Selesai',
      totalObat: '4 Obat',
    },
  ];

  get resepList(): ResepItem[] {
    return this.allResepList.filter(
      (item) => item.fasilitasId === this.currentFasilitasId
    );
  }

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
    faskes: 'Apotek Kimia Sehat PSEF',
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

  // Tab 4: Pembayaran Data (Scoped to current facility)
  readonly allPembayaranList: PembayaranItem[] = [
    {
      noTransaksi: '#PAY25024-0012',
      tanggal: '24 Mei 2026 10:30',
      fasilitasId: 'FAS-001',
      sumberTipe: 'Pesanan',
      sumberNomor: '#INV24025-0012',
      metodeKode: 'bca',
      metodeNama: 'BCA',
      metodeDetail: 'BCA******1234',
      dokter: 'apt. Rina Meliani, S.Farm',
      status: 'Selesai',
      totalPembayaran: 'Rp. 185.000',
      nominal: 185000,
    },
    {
      noTransaksi: '#PAY25024-0013',
      tanggal: '20 Mei 2026 14:20',
      fasilitasId: 'FAS-002', // Pembayaran di Fasilitas Lain B
      sumberTipe: 'Resep',
      sumberNomor: '#INV24025-0013',
      metodeKode: 'ovo',
      metodeNama: 'OVO',
      metodeDetail: '081*******245',
      dokter: 'apt. Budi Santoso, S.Farm',
      status: 'Selesai',
      totalPembayaran: 'Rp. 126.000',
      nominal: 126000,
    },
    {
      noTransaksi: '#PAY25024-0014',
      tanggal: '18 Mei 2026 11:25',
      fasilitasId: 'FAS-001',
      sumberTipe: 'Pesanan',
      sumberNomor: '#INV24025-0014',
      metodeKode: 'gopay',
      metodeNama: 'GoPay',
      metodeDetail: '081*******245',
      dokter: 'apt. Rina Meliani, S.Farm',
      status: 'Selesai',
      totalPembayaran: 'Rp. 125.000',
      nominal: 125000,
    },
    {
      noTransaksi: '#PAY25024-0015',
      tanggal: '10 Mei 2026 09:20',
      fasilitasId: 'FAS-001',
      sumberTipe: 'Resep',
      sumberNomor: '#INV24025-0015',
      metodeKode: 'dana',
      metodeNama: 'DANA',
      metodeDetail: '081*******245',
      dokter: 'apt. Rina Meliani, S.Farm',
      status: 'Selesai',
      totalPembayaran: 'Rp. 78.500',
      nominal: 78500,
    },
    {
      noTransaksi: '#PAY25024-0016',
      tanggal: '02 Mei 2026 13:45',
      fasilitasId: 'FAS-001',
      sumberTipe: 'Pesanan',
      sumberNomor: '#INV24025-0016',
      metodeKode: 'bri',
      metodeNama: 'BRI',
      metodeDetail: 'BRI*****1234',
      dokter: 'apt. Rina Meliani, S.Farm',
      status: 'Selesai',
      totalPembayaran: 'Rp. 210.000',
      nominal: 210000,
    },
  ];

  get pembayaranList(): PembayaranItem[] {
    return this.allPembayaranList.filter(
      (item) => item.fasilitasId === this.currentFasilitasId
    );
  }

  readonly pembayaranSummary = {
    total: 'Rp. 598.500',
    transaksiCount: 4,
    rataRata: 'Rp. 149.625',
    tertinggi: 'Rp. 210.000',
    breakdown: [
      { nama: 'Transfer Bank', persen: 55, nominal: 'Rp. 395.000', warna: '#0d9488' },
      { nama: 'E-Wallet', persen: 30, nominal: 'Rp. 203.500', warna: '#0284c7' },
      { nama: 'COD', persen: 15, nominal: 'Rp. 0', warna: '#f97316' },
      { nama: 'Lainnya', persen: 0, nominal: 'Rp. 0', warna: '#334155' },
    ],
  };

  // Tab 5: Telemedicine Data
  readonly telemedicineList: TelemedicineItem[] = [
    {
      id: '#CNS25024-0012',
      invId: '#INV25024-0012',
      tanggal: '24 Mei 2026 10:30',
      fasilitasId: 'FAS-001',
      dokter: 'dr. Andi Wijaya',
      spesialisasi: 'Dokter Umum',
      keluhan: 'Demam, Batuk Pilek (Rujukan Tebus Apotek Ini)',
      status: 'Berlangsung',
      durasi: '18 menit',
    },
    {
      id: '#CNS25024-0011',
      invId: '#INV25024-0011',
      tanggal: '10 Mei 2026 09:45',
      fasilitasId: 'FAS-001',
      dokter: 'dr. Rina Meilani',
      spesialisasi: 'Dokter Umum',
      keluhan: 'Nyeri Lambung, Mual',
      status: 'Selesai',
      durasi: '15 menit',
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

  // Tab 6: Telefarmasi Data (CRITICAL: Scoped by Facility ID!)
  // Skenario pembatasan:
  // Pasien memiliki riwayat konsultasi dengan apoteker di fasilitas A (Apotek Kimia Sehat PSEF)
  // dan apoteker di fasilitas B (Apotek Sejahtera Farma) dan C (Apotek Medika Prima).
  // Fasilitas A HANYA DAPAT MELIHAT RIWAYAT DI FASILITAS A!
  readonly allTelefarmasiList: TelefarmasiItem[] = [
    {
      nomorResep: '#CNS25024-0012',
      invId: '#INV25024-0012',
      tanggalResep: '24 Mei 2026 10:30',
      fasilitasId: 'FAS-001', // Fasilitas A (Apotek Ini)
      faskes: 'Apotek Kimia Sehat PSEF',
      apoteker: 'apt. Rina Meliani, S.Farm',
      sip: 'SIP: 503/SIP-DOK/JS/2024',
      keluhan: 'Konseling Dismenore & Aturan Minum Obat Nyeri',
      status: 'Berlangsung',
      durasi: '18 menit',
    },
    {
      nomorResep: '#CNS25024-0013',
      invId: '#INV25024-0013',
      tanggalResep: '20 Mei 2026 14:15',
      fasilitasId: 'FAS-002', // Fasilitas B (Apotek Lain - Tidak Boleh Muncul!)
      faskes: 'Apotek Sejahtera Farma',
      apoteker: 'apt. Budi Santoso, S.Farm',
      sip: 'SIP: 503/SIP-DOK/JB/2023',
      keluhan: 'Konsultasi Interaksi Obat Antihipertensi & Lambung',
      status: 'Selesai',
      durasi: '25 menit',
    },
    {
      nomorResep: '#CNS25024-0014',
      invId: '#INV25024-0014',
      tanggalResep: '15 Mei 2026 09:30',
      fasilitasId: 'FAS-001', // Fasilitas A (Apotek Ini)
      faskes: 'Apotek Kimia Sehat PSEF',
      apoteker: 'apt. Rina Meliani, S.Farm',
      sip: 'SIP: 503/SIP-DOK/JS/2024',
      keluhan: 'Edukasi Penggunaan Sirup Obat Batuk dan Antibiotik',
      status: 'Selesai',
      durasi: '15 menit',
    },
    {
      nomorResep: '#CNS25024-0015',
      invId: '#INV25024-0015',
      tanggalResep: '08 Mei 2026 16:20',
      fasilitasId: 'FAS-003', // Fasilitas C (Apotek Lain - Tidak Boleh Muncul!)
      faskes: 'Apotek Medika Prima',
      apoteker: 'apt. Dewi Lestari, S.Farm',
      sip: 'SIP: 503/SIP-DOK/JT/2025',
      keluhan: 'Konsultasi Suplemen Multivitamin & Penambah Daya Tahan',
      status: 'Selesai',
      durasi: '20 menit',
    },
    {
      nomorResep: '#CNS25024-0016',
      invId: '#INV25024-0016',
      tanggalResep: '01 Mei 2026 11:00',
      fasilitasId: 'FAS-001', // Fasilitas A (Apotek Ini)
      faskes: 'Apotek Kimia Sehat PSEF',
      apoteker: 'apt. Rina Meliani, S.Farm',
      sip: 'SIP: 503/SIP-DOK/JS/2024',
      keluhan: 'Konsultasi Antihistamin dan Penanganan Alergi Cuaca',
      status: 'Selesai',
      durasi: '20 menit',
    },
    {
      nomorResep: '#CNS25024-0017',
      invId: '#INV25024-0017',
      tanggalResep: '20 Apr 2026 10:45',
      fasilitasId: 'FAS-001', // Fasilitas A (Apotek Ini)
      faskes: 'Apotek Kimia Sehat PSEF',
      apoteker: 'apt. Rina Meliani, S.Farm',
      sip: 'SIP: 503/SIP-DOK/JS/2024',
      keluhan: 'Konseling Penggunaan Inhaler Asma dan Teknik Penghisapan',
      status: 'Selesai',
      durasi: '30 menit',
    },
  ];

  // Scoped to current facility (FAS-001 only)
  get telefarmasiList(): TelefarmasiItem[] {
    return this.allTelefarmasiList.filter(
      (item) => item.fasilitasId === this.currentFasilitasId
    );
  }

  readonly selectedTelefarmasi = signal({
    nomor: '#CNS25024-0012',
    tanggal: '24 Mei 2026 10:30',
    apoteker: 'apt. Rina Meliani, S.Farm',
    sip: 'SIP: 503/SIP-DOK/JS/2024',
    keluhan: 'Konseling Dismenore & Aturan Minum Obat Nyeri',
    catatan:
      'Pasien mengeluhkan dismenore primer. Telah diedukasi aturan minum ibuprofen dan asam mefenamat sesudah makan serta hidrasi hangat.',
    durasi: '18 menit',
    metode: 'Video Call Consultation',
    statusPembayaran: 'Lunas',
    dibuatOleh: 'apt. Rina Meliani, S.Farm',
    dibuatPada: '24 Mei 2026 10:30',
  });

  // Tab 7: Rekam Medis Data (Scoped to current facility)
  readonly allRekamMedisTimeline: RekamMedisTimelineItem[] = [
    {
      id: 'RM-01',
      tanggal: '24 Mei 2026 10:30',
      tipe: 'konsultasi',
      judul: 'Konseling Telefarmasi (PIO)',
      dokter: 'apt. Rina Meliani, S.Farm',
      status: 'Selesai',
      fasilitasId: 'FAS-001',
      keluhan: 'Konseling Dismenore & Aturan Minum Obat Nyeri',
      tindakan: 'Edukasi Farmasi Klinis, Rekomendasi Pemakaian Obat',
      diagnosa: 'Dismenore Primer',
    },
    {
      id: 'RM-02',
      tanggal: '24 Mei 2026 10:35',
      tipe: 'resep',
      judul: 'Dispensing Resep Obat',
      dokter: 'dr. Andi Wijaya',
      status: 'Selesai',
      fasilitasId: 'FAS-001',
      obatList: [
        'Paracetamol 500mg',
        'Vitamin C 500mg',
        'Amoxicilin 500mg',
        'Omeprazol 20mg',
        'Sanmol 500mg',
      ],
    },
    {
      id: 'RM-03',
      tanggal: '20 Mei 2026 14:15',
      tipe: 'konsultasi',
      judul: 'Konseling di Apotek Lain',
      dokter: 'apt. Budi Santoso, S.Farm',
      status: 'Selesai',
      fasilitasId: 'FAS-002', // Fasilitas lain
    },
    {
      id: 'RM-04',
      tanggal: '15 Mei 2026 09:30',
      tipe: 'konsultasi',
      judul: 'Konseling Telefarmasi (PIO)',
      dokter: 'apt. Rina Meliani, S.Farm',
      status: 'Selesai',
      fasilitasId: 'FAS-001',
      keluhan: 'Edukasi Penggunaan Sirup Obat Batuk dan Antibiotik',
      tindakan: 'Telaah Resep, Penjelasan Jadwal Minum Obat',
    },
  ];

  get rekamMedisTimeline(): RekamMedisTimelineItem[] {
    return this.allRekamMedisTimeline.filter(
      (item) => !item.fasilitasId || item.fasilitasId === this.currentFasilitasId
    );
  }

  readonly rekamMedisLabResults: LabResultGroup[] = [
    {
      judul: 'Pemeriksaan Rutin Apotek (GDS & Kolesterol)',
      tanggal: '24 Mei 2026, 09:15',
      status: 'Normal',
      items: [
        {
          pemeriksaan: 'Gula Darah Sewaktu (GDS)',
          hasil: '112',
          satuan: 'mg/dL',
          nilaiRujukan: '< 140',
          status: 'Normal',
        },
        {
          pemeriksaan: 'Asam Urat',
          hasil: '5.2',
          satuan: 'mg/dL',
          nilaiRujukan: '3.5 - 7.2',
          status: 'Normal',
        },
        {
          pemeriksaan: 'Kolesterol Total',
          hasil: '185',
          satuan: 'mg/dL',
          nilaiRujukan: '< 200',
          status: 'Normal',
        },
      ],
    },
  ];

  readonly allRekamMedisAuditLogs: RekamMedisAuditLog[] = [
    {
      tanggal: '24 Mei 2026 10:30',
      petugas: 'apt. Rina Meliani, S.Farm',
      peran: 'Apoteker Penanggung Jawab',
      modul: 'Catatan medis',
      perubahan: 'Catatan Konseling Telefarmasi',
      status: 'Diperbarui',
      keterangan: 'Menambahkan Catatan keluhan dan tindak lanjut konseling',
      fasilitasId: 'FAS-001',
    },
    {
      tanggal: '24 Mei 2026 10:36',
      petugas: 'apt. Rina Meliani, S.Farm',
      peran: 'Apoteker Penanggung Jawab',
      modul: 'Resep',
      perubahan: 'Verifikasi & Dispensing Resep',
      status: 'Ditambahkan',
      keterangan: 'Verifikasi telaah administratif, farmasetik, dan klinis',
      fasilitasId: 'FAS-001',
    },
    {
      tanggal: '15 Mei 2026 09:30',
      petugas: 'apt. Rina Meliani, S.Farm',
      peran: 'Apoteker Penanggung Jawab',
      modul: 'Catatan medis',
      perubahan: 'Catatan Edukasi Pasien',
      status: 'Diperbarui',
      keterangan: 'Edukasi cara penyimpanan antibiotik cair',
      fasilitasId: 'FAS-001',
    },
    {
      tanggal: '20 Mei 2026 14:15',
      petugas: 'apt. Budi Santoso, S.Farm',
      peran: 'Apoteker Fasilitas Lain',
      modul: 'Catatan medis',
      perubahan: 'Konsultasi Eksternal',
      status: 'Ditambahkan',
      keterangan: 'Tidak ditampilkan pada akun Apotek Kimia Sehat',
      fasilitasId: 'FAS-002',
    },
  ];

  get rekamMedisAuditLogs(): RekamMedisAuditLog[] {
    return this.allRekamMedisAuditLogs.filter(
      (item) => !item.fasilitasId || item.fasilitasId === this.currentFasilitasId
    );
  }

  // Rekam Medis Ringkasan timeline items
  readonly konsultasiProgress = [
    {
      jam: '10:30',
      icon: 'ri-chat-1-line',
      judul: 'Pasien memulai sesi konseling telefarmasi',
      sub: 'Keluhan : Dismenore & Aturan Minum Obat Nyeri',
    },
    {
      jam: '10:35',
      icon: 'ri-capsule-line',
      judul: 'Telaah Obat oleh Apoteker',
      sub: 'Pemeriksaan interaksi obat & telaah resep',
    },
    {
      jam: '10:40',
      icon: 'ri-survey-line',
      judul: 'Pemberian Edukasi & Saran Penggunaan',
      sub: 'Pemberian instruksi frekuensi dan jeda makan',
    },
    {
      jam: '10:45',
      icon: 'ri-file-list-3-line',
      judul: 'Resep Disetujui untuk Dispensing',
      sub: 'Obat disiapkan di instalasi farmasi apotek',
    },
    {
      jam: '10:48',
      icon: 'ri-checkbox-circle-line',
      judul: 'Konsultasi Selesai',
      sub: 'Pasien memahami aturan pakai dan jadwal minum obat',
    },
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
  }

  selectTelemedicine(item: TelemedicineItem): void {
    this.selectedTelemedicine.set({
      nomor: item.id,
      tanggal: item.tanggal,
      dokter: item.dokter,
      spesialisasi: item.spesialisasi,
      keluhan: item.keluhan,
      catatan:
        'Pasien mengalami gejala ISPA ringan. Disarankan istirahat cukup, konsumsi obat sesuai resep dan perbanyak minum air putih',
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
      catatan:
        'Pasien telah diberikan konseling komprehensif mengenai aturan minum obat dan kepatuhan terapi di fasilitas farmasi kami.',
      durasi: item.durasi,
      metode: 'Video Call Consultation',
      statusPembayaran: 'Lunas',
      dibuatOleh: item.apoteker,
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
    void this.router.navigate(['/fasilitas/pasien']);
  }

  goToEdit(): void {
    alert(
      'Perubahan data identitas induk pasien (KTP/NIK/Nama) harus divalidasi melalui sistem PSEF Pusat sesuai ketentuan PDP.'
    );
  }

  printCard(): void {
    window.print();
  }
}
