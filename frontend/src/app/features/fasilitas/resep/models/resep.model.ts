export type TipeResep = 'Reguler' | 'Racikan' | 'CITO / Segera';
export type KategoriResep = 'Rawat Jalan' | 'Telemedisin' | 'Kronis / Rujuk Balik';
export type StatusResep =
  | 'Menunggu Telaah'
  | 'Lolos Skrining'
  | 'Perlu Konfirmasi'
  | 'Selesai Ditebus'
  | 'Ditolak';
export type StatusSkriningItem = 'Lengkap' | 'Sesuai' | 'Tepat' | 'Perhatian' | 'Tidak Sesuai' | 'Perlu Konfirmasi';

export type StatusKajianTahap =
  | 'Memenuhi Syarat'
  | 'Lolos'
  | 'Ada Catatan Klinis'
  | 'Perlu Konfirmasi'
  | 'Tidak Memenuhi Syarat'
  | 'Dalam Proses';

export interface PasienResep {
  id: string;
  nama: string;
  noRm: string;
  usia: string;
  tanggalLahir: string;
  gender: 'Laki-laki' | 'Perempuan';
  beratBadan: string;
  tinggiBadan: string;
  alergi: string[];
  diagnosis: string;
  telepon: string;
  alamat: string;
}

export interface DokterResep {
  nama: string;
  spesialisasi: string;
  sip: string;
  faskesAsal: string;
  telepon: string;
  digitalSignature: {
    signedAt: string;
    valid: boolean;
    hash: string;
    algorithm: string;
    qrCode: string;
  };
}

export interface ItemObatResep {
  no: number;
  rCode: string; // e.g. 'R/ 1'
  namaObat: string;
  bentukSediaan: string; // 'Kapsul', 'Tablet', 'Sirup Kering', 'Salep Racikan', 'Puyer'
  kekuatan: string;
  dosis: string;
  jumlah: string;
  aturanPakai: string;
  rute: string; // 'Oral', 'Topikal', etc.
  keterangan: string;
  stokStatus: 'Tersedia' | 'Stok Menipis' | 'Perlu Pengadaan';
  hargaSatuan: number;
  totalHarga: number;
}

export interface SkriningItemRow {
  indikator: string;
  deskripsi: string;
  status: StatusSkriningItem;
  catatan: string;
}

export interface KajianAdministratifData {
  status: StatusKajianTahap;
  items: SkriningItemRow[];
  catatanKeseluruhan: string;
}

export interface KajianFarmasetisData {
  status: StatusKajianTahap;
  items: SkriningItemRow[];
  catatanKeseluruhan: string;
}

export interface KajianKlinisData {
  status: StatusKajianTahap;
  items: SkriningItemRow[];
  catatanKeseluruhan: string;
}

export interface SkriningResepData {
  statusTotal: 'Lolos Skrining' | 'Perlu Telaah' | 'Perlu Konfirmasi' | 'Ditolak';
  apotekerPengkaji: {
    nama: string;
    sipa: string;
    jabatan: string;
    waktuKajian: string;
  };
  kajianAdministratif: KajianAdministratifData;
  kajianFarmasetis: KajianFarmasetisData;
  kajianKlinis: KajianKlinisData;
}

export interface TimelineResepStep {
  tahap: string;
  waktu: string;
  petugas: string;
  keterangan: string;
  completed: boolean;
  active?: boolean;
}

export interface ResepItem {
  id: string; // e.g. 'RX-2026-9041'
  noRegistrasi: string; // e.g. 'REG/PSEF/2026/05/8821'
  tanggal: string; // e.g. '24 Mei 2026, 10:30 WIB'
  tipeResep: TipeResep;
  kategori: KategoriResep;
  status: StatusResep;
  isUrgent: boolean;
  faskesPenerima: string; // Apotek Kimia Sehat PSEF
  pasien: PasienResep;
  dokter: DokterResep;
  obatList: ItemObatResep[];
  skrining: SkriningResepData;
  totalBiayaObat: number;
  jasaPelayananResep: number;
  riwayatTimeline: TimelineResepStep[];
}

export interface KpiResep {
  title: string;
  value: string;
  percentage?: string;
  period: string;
  icon: string;
  colorClass: 'purple' | 'amber' | 'emerald' | 'blue' | 'teal';
}
