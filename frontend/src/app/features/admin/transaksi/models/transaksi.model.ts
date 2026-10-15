/**
 * Domain Models for PSEF Transaksi (Financial & Payment Hub) Module
 * 
 * Transaksi berasal dari setiap pembayaran atau proses pembayaran meliputi:
 * - Pesanan Obat Resep (penebusan resep konsultasi dokter/apoteker)
 * - Pesanan Obat Non-Resep (marketplace obat bebas/OTC)
 * - Konsultasi Dokter (Telemedisin)
 * - Konsultasi Apoteker (Telefarmasi)
 * - Pemeriksaan Laboratorium & Diagnostik
 */

export type SumberTransaksi =
  | 'Pesanan Obat Resep'
  | 'Pesanan Obat Non-Resep'
  | 'Konsultasi Dokter'
  | 'Konsultasi Apoteker'
  | 'Pemeriksaan Lab';

export type StatusTransaksi =
  | 'Selesai'
  | 'Menunggu Pembayaran'
  | 'Diproses'
  | 'Gagal'
  | 'Dibatalkan'
  | 'Refund';

export type KategoriMetode =
  | 'Transfer Bank'
  | 'E-Wallet'
  | 'QRIS'
  | 'Kartu Kredit'
  | 'COD';

export interface TransaksiItem {
  no: number;
  id: string;              // e.g. '#PAY25024-0012'
  cleanId: string;         // e.g. 'PAY25024-0012'
  tanggal: string;         // e.g. '24 Mei 2026'
  waktu: string;           // e.g. '10:30'
  pelanggan: {
    nama: string;
    telepon: string;
    email?: string;
    avatar?: string;
  };
  sumber: {
    tipe: SumberTransaksi;
    refId: string;         // e.g. '#INV24025-0012', '#TLM-2026-0041'
    subLabel: string;      // e.g. 'Penebusan Resep dr. Andi Wijaya'
    dokterAtauApoteker?: string;
  };
  metode: {
    provider: string;      // e.g. 'BCA', 'BNI', 'GoPay', 'QRIS'
    logo: string;          // path to SVG logo
    accountName: string;   // e.g. 'Andi Putra'
    maskedAccount: string; // e.g. 'BCA*****1234'
    kategori: KategoriMetode;
  };
  status: StatusTransaksi;
  statusWaktu: string;
  totalPembayaran: string;
  totalPembayaranNum: number;
  catatan?: string;
}

export interface KpiTransaksi {
  title: string;
  value: string;
  percentage: string;
  period: string;
  icon: string;
  colorClass: 'purple' | 'amber' | 'blue' | 'teal' | 'emerald' | 'red';
}

export interface MetodeStatItem {
  kategori: KategoriMetode;
  persentase: number;
  nominal: string;
  color: string;
}

export interface DetailTransaksiData {
  id: string;
  cleanId: string;
  status: StatusTransaksi;
  waktuTransaksi: string;
  waktuSelesai: string;
  noReferensiGateway: string;
  sumber: {
    tipe: SumberTransaksi;
    refId: string;
    deskripsi: string;
    namaLayanan: string;
    tenagaKesehatan?: {
      nama: string;
      role: string;
      sipAtauStra: string;
      avatar: string;
    };
  };
  pelanggan: {
    nama: string;
    telepon: string;
    email: string;
    nik: string;
    alamat: string;
    avatar: string;
  };
  metodePembayaran: {
    provider: string;
    logo: string;
    kategori: KategoriMetode;
    noRekening: string;
    atasNama: string;
    statusSettlement: string;
  };
  rincianItem: {
    no: number;
    nama: string;
    kategori: string;
    qty: number;
    harga: string;
    subtotal: string;
  }[];
  biaya: {
    subtotal: string;
    jasaLayanan: string;
    ongkosKirim: string;
    diskon: string;
    biayaAplikasi: string;
    totalPembayaran: string;
  };
  timeline: {
    label: string;
    waktu: string;
    completed: boolean;
    deskripsi: string;
  }[];
}
