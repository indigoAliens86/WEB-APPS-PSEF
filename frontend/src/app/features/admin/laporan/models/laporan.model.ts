export type KategoriLaporan =
  | 'Keuangan & Transaksi'
  | 'Pelayanan Farmasi (PSEF)'
  | 'Konsultasi Medis'
  | 'Pasien & Demografi'
  | 'Kepatuhan Regulasi Kemenkes';

export type FormatLaporan = 'PDF' | 'XLSX' | 'CSV';

export type StatusLaporan = 'Siap Unduh' | 'Sedang Diproses' | 'Terjadwal' | 'Kedaluwarsa';

export interface LaporanItem {
  no: number;
  id: string;
  cleanId: string;
  judul: string;
  deskripsi: string;
  kategori: KategoriLaporan;
  periode: string;
  format: FormatLaporan;
  ukuranFile: string;
  tanggalGenerate: string;
  generatorPic: string;
  totalData: number;
  status: StatusLaporan;
}

export interface KpiLaporan {
  title: string;
  value: string;
  percentage?: string;
  period: string;
  icon: string;
  colorClass: 'blue' | 'teal' | 'purple' | 'amber' | 'emerald';
}

export interface HighlightMetric {
  label: string;
  value: string;
  subtext: string;
  icon: string;
  colorClass: string;
}

export interface AuditRiwayatAkses {
  label: string;
  waktu: string;
  user: string;
  role: string;
  icon: string;
}

export interface DetailLaporanData {
  id: string;
  cleanId: string;
  judul: string;
  deskripsi: string;
  kategori: KategoriLaporan;
  format: FormatLaporan;
  ukuranFile: string;
  status: StatusLaporan;
  periode: string;
  waktuTerbit: string;
  pic: {
    nama: string;
    role: string;
    email: string;
    avatar: string;
  };
  digitalSignature: {
    hashSha256: string;
    certifiedBy: string;
    validUntil: string;
  };
  ringkasanEksekutif: HighlightMetric[];
  tabelHeaders: string[];
  pratinjauTabel: {
    no: number;
    kolom1: string;
    kolom2: string;
    kolom3: string;
    kolom4: string;
    kolom5: string;
  }[];
  auditRiwayat: AuditRiwayatAkses[];
}
