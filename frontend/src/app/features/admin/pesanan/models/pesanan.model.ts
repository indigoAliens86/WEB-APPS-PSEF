/**
 * Domain Models & Architecture Foundation for PSEF Order Module
 * 
 * Klasifikasi Tipe Pesanan:
 * 1. Pesanan Obat Resep: Berasal dari layanan Konsultasi Dokter (Telemedisin) atau Apoteker (Telefarmasi) yang ditebus oleh pasien.
 * 2. Pesanan Obat Non-Resep: Berasal dari pembelian obat dari Marketplace Obat OTC (saat ini belum tersedia).
 */

export type TipePesanan = 'Obat Resep' | 'Obat Non-Resep';

export type SumberPesanan = 
  | 'Konsultasi Dokter'    // Berasal dari Telemedisin
  | 'Konsultasi Apoteker'  // Berasal dari Telefarmasi
  | 'Marketplace Obat';    // Berasal dari Marketplace Obat (Belum Tersedia)

export interface TenagaKesehatanRef {
  nama: string;
  role: string;
  sipAtauStra: string;
  avatar?: string;
}

export interface LayananKonsultasiRef {
  idKonsultasi: string;
  jenisLayanan: 'Telemedisin' | 'Telefarmasi';
  tenagaKesehatan: TenagaKesehatanRef;
  klinikAtauApotek: string;
  tanggalKonsultasi: string;
  statusPenebusan: 'Ditebus Pasien' | 'Menunggu Penebusan' | 'Kadaluarsa';
}

export interface MarketplaceObatInfo {
  isTersedia: boolean;          // false -> fitur marketplace belum tersedia
  channelName: string;         // 'Marketplace Obat Bebas PSEF'
  statusKetersediaan: 'Belum Tersedia' | 'Segera Hadir' | 'Fase Pengujian';
  catatanIntegrasi: string;    // Penjelasan bahwa modul marketplace masih dalam pengembangan
}

export interface ResepDetailRef {
  noResep: string;
  dokterAtauApoteker: string;
  sipAtauStra: string;
  klinikAtauInstansi: string;
  tanggalResep: string;
  statusVerifikasi: 'Terverifikasi Apoteker' | 'Menunggu Verifikasi' | 'Ditolak';
  apotekerVerifikator?: string;
  catatanResep?: string;
}

export interface PesananPelanggan {
  nama: string;
  telepon: string;
  email?: string;
  alamat?: string;
  usia?: string;
  gender?: string;
  nik?: string;
  tipePasien?: string;
}

export interface PesananItem {
  no: number;
  id: string;
  cleanId: string;
  pelanggan: PesananPelanggan;
  tanggal: string;
  tipePesanan: TipePesanan;
  sumberPesanan: SumberPesanan;
  layananKonsultasi?: LayananKonsultasiRef;
  marketplaceInfo?: MarketplaceObatInfo;
  resep?: {
    dokter: string;
    tanggal: string;
    noResep?: string;
  };
  status: 'Selesai' | 'Menunggu Pembayaran' | 'Diproses' | 'Dikirim' | 'Dibatalkan';
  statusWaktu: string;
  totalItem: string;
  totalPembayaran: string;
  metodePembayaran: {
    nama: string;
    detail: string;
  };
}

export interface KpiPesanan {
  title: string;
  value: string;
  percentage: string;
  period: string;
  icon: string;
  colorClass: 'purple' | 'amber' | 'blue' | 'teal' | 'emerald' | 'red';
}
