export type TipeProgram = 'Voucher' | 'Campaign' | 'Membership';

export type StatusProgram = 'Aktif' | 'Segera Hadir' | 'Berakhir' | 'Nonaktif';

export type TargetLayanan =
  | 'Semua Layanan'
  | 'Telemedisin Dokter'
  | 'Telefarmasi Apoteker'
  | 'Pesanan Obat Resep'
  | 'Marketplace Obat';

export interface PromoItem {
  id: string;
  cleanId: string;
  nama: string;
  tipe: TipeProgram;
  kodeVoucher?: string;
  deskripsi: string;
  diskon: {
    tipe: 'Persentase' | 'Nominal' | 'Gratis Ongkir' | 'Cashback Point';
    nilai: number;
    formatted: string;
    maxDiskon?: string;
  };
  minTransaksi: string;
  periodeMulai: string;
  periodeSelesai: string;
  kuotaTotal: number;
  kuotaTerpakai: number;
  status: StatusProgram;
  targetLayanan: TargetLayanan;
  badgeColor: 'teal' | 'purple' | 'amber' | 'blue' | 'emerald';
  bannerBg?: string;
}

export interface MembershipTierItem {
  id: string;
  cleanId: string;
  nama: 'Silver Member' | 'Gold Member' | 'Platinum Member' | 'VIP Priority';
  tierLevel: 1 | 2 | 3 | 4;
  tagline: string;
  minBelanjaTahunan: string;
  minPoin: number;
  totalAnggota: number;
  colorTheme: 'silver' | 'gold' | 'platinum' | 'vip';
  icon: string;
  cashbackPoin: string;
  diskonKonsultasi: string;
  diskonOngkir: string;
  benefits: string[];
  status: 'Aktif' | 'Draft';
}

export interface KpiPromo {
  title: string;
  value: string;
  percentage?: string;
  period: string;
  icon: string;
  colorClass: 'purple' | 'amber' | 'blue' | 'teal' | 'emerald';
}

export interface RiwayatKlaimItem {
  no: number;
  pasienNama: string;
  pasienAvatar: string;
  transaksiId: string;
  layanan: string;
  nilaiDiskon: string;
  waktu: string;
}

export interface DetailPromoData {
  id: string;
  cleanId: string;
  nama: string;
  tipe: TipeProgram;
  kodeVoucher?: string;
  deskripsi: string;
  status: StatusProgram;
  periodeMulai: string;
  periodeSelesai: string;
  sisaHari: number;
  targetLayanan: TargetLayanan;
  diskonFormatted: string;
  minTransaksiFormatted: string;
  maxDiskonFormatted: string;
  kuotaTotal: number;
  kuotaTerpakai: number;
  persentaseKuota: number;
  totalPenghematanPasien: string;
  totalOmsetTerdorong: string;
  targetTierMembership: string;
  syaratKetentuan: string[];
  riwayatKlaim: RiwayatKlaimItem[];
}
