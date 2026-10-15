export type TipeTransaksiPoint = 'Earned' | 'Redeemed' | 'Expired' | 'Adjustment';

export type SumberPoint =
  | 'Konsultasi Telemedisin'
  | 'Penebusan Obat Resep'
  | 'Telefarmasi Apoteker'
  | 'Marketplace Obat'
  | 'Misi Kesehatan'
  | 'Bonus Loyalitas'
  | 'Penukaran Voucher'
  | 'Penyesuaian Manual';

export type StatusPoint = 'Berhasil' | 'Menunggu Verifikasi' | 'Kedaluwarsa' | 'Dibatalkan';

export type TierPasien = 'Silver' | 'Gold' | 'Platinum' | 'VIP';

export interface PasienInfo {
  id: string;
  nama: string;
  avatar: string;
  email: string;
  telepon: string;
  tier: TierPasien;
  tierBadgeColor: 'silver' | 'gold' | 'platinum' | 'vip';
}

export interface PointItem {
  no: number;
  id: string;
  cleanId: string;
  pasien: PasienInfo;
  tipe: TipeTransaksiPoint;
  sumber: SumberPoint;
  deskripsi: string;
  jumlahPoint: number; // positive for earned, negative for redeemed
  nilaiRupiah: string;
  saldoSebelum: number;
  saldoSetelah: number;
  tanggal: string;
  waktu: string;
  status: StatusPoint;
  refId: string;
  tenagaMedis?: string;
}

export interface KatalogHadiahItem {
  id: string;
  nama: string;
  kategori: 'Voucher Konsultasi' | 'Diskon Obat' | 'Gratis Ongkir' | 'Merchandise Sehat' | 'Skrining Lab';
  poinDibutuhkan: number;
  nilaiRupiah: string;
  stokTersedia: number;
  totalDitukar: number;
  icon: string;
  colorClass: 'teal' | 'purple' | 'amber' | 'blue' | 'emerald';
}

export interface MisiKesehatanItem {
  id: string;
  judul: string;
  kategori: 'Kepatuhan Obat' | 'Skrining Rutin' | 'Telemedisin' | 'Pola Hidup Sehat';
  rewardPoin: number;
  pesertaAktif: number;
  tingkatSelesai: string;
  icon: string;
  status: 'Aktif' | 'Selesai';
}

export interface TopEarnerItem {
  peringkat: number;
  pasien: PasienInfo;
  totalPoinBulanIni: number;
  lifetimePoin: number;
  totalAktivitas: number;
}

export interface KpiPoint {
  title: string;
  value: string;
  percentage?: string;
  period: string;
  icon: string;
  colorClass: 'gold' | 'teal' | 'purple' | 'red' | 'blue';
}

export interface AuditTrailStep {
  label: string;
  waktu: string;
  deskripsi: string;
  completed: boolean;
}

export interface DetailPointData {
  id: string;
  cleanId: string;
  tipe: TipeTransaksiPoint;
  sumber: SumberPoint;
  status: StatusPoint;
  jumlahPoint: number;
  nilaiRupiahKonversi: string;
  waktuTransaksi: string;
  refTransaksiId: string;
  layananTerkait: string;
  tenagaMedis?: {
    nama: string;
    role: string;
    sipAtauStra: string;
    avatar: string;
  };
  pasien: PasienInfo;
  saldoPasien: {
    saldoSaatIni: number;
    saldoSebelumTransaksi: number;
    saldoSetelahTransaksi: number;
    totalEarnedLifetime: number;
    totalRedeemedLifetime: number;
    tierMultiplier: string;
  };
  rincianPoin: {
    poinDasar: number;
    poinMultiplierTier: number;
    poinBonusAktivitas: number;
    totalPerolehan: number;
    keteranganKalkulasi: string;
  };
  auditTrail: AuditTrailStep[];
  riwayatTerkaitPasien: {
    no: number;
    id: string;
    sumber: string;
    poin: number;
    tipe: TipeTransaksiPoint;
    tanggal: string;
  }[];
}
