export type GolonganObatSipnap =
  | 'Narkotika'
  | 'Psikotropika'
  | 'Prekursor'
  | 'Obat-Obat Tertentu (OOT)';

export type StatusLaporanSipnap =
  | 'Terverifikasi Kemenkes'
  | 'Menunggu Validasi APJ'
  | 'Draft Rekonsiliasi'
  | 'Perlu Perbaikan'
  | 'Terlambat';

export type PeranSipnap = 'apoteker' | 'fasilitas';

export interface HakAksesSipnap {
  canCreate: boolean;
  canEdit: boolean;
  canValidate: boolean;
  canSubmit: boolean;
  canExport: boolean;
  canPrint: boolean;
  isReadOnly: boolean;
  labelPeran: string;
  badgePeran: string;
  deskripsiPeran: string;
}

export interface DetailPemasukanPbf {
  noFaktur: string;
  tanggalFaktur: string;
  namaPbf: string;
  jumlah: number;
  noBatch: string;
  expiredDate: string;
}

export interface DetailPengeluaranResep {
  noResep: string;
  tanggalResep: string;
  namaPasien: string;
  nikPasien: string;
  alamatPasien: string;
  namaDokter: string;
  sipDokter: string;
  faskesDokter: string;
  jumlah: number;
  aturanPakai: string;
}

export interface ItemMutasiSipnap {
  id: string;
  kodeObat: string;
  namaObat: string;
  komposisi: string;
  golongan: GolonganObatSipnap;
  bentukSediaan: string;
  satuan: string;
  saldoAwal: number;
  pemasukan: number;
  pengeluaran: number;
  saldoAkhir: number;
  stokFisik: number;
  selisih: number;
  noBatch: string;
  expiredDate: string;
  statusKesesuaian: 'Sesuai' | 'Selisih' | 'Perlu Opname';
  detailPemasukan: DetailPemasukanPbf[];
  detailPengeluaran: DetailPengeluaranResep[];
}

export interface LaporanSipnapPeriodik {
  id: string;
  periodeBulan: string;
  bulan: number;
  tahun: number;
  tanggalBatasLapor: string;
  tanggalKirim?: string;
  tanggalGenerate: string;
  status: StatusLaporanSipnap;
  nomorTandaTerima?: string;
  kodeTokenKemenkes?: string;
  totalSediaan: number;
  totalNarkotika: number;
  totalPsikotropika: number;
  totalPrekursor: number;
  totalOot: number;
  totalPengeluaranResep: number;
  tingkatKesesuaian: number; // in percentage e.g. 100
  apotekerPengkaji: {
    nama: string;
    sipa: string;
    stra: string;
    jabatan: string;
    waktuVerifikasi?: string;
  };
  fasilitas: {
    nama: string;
    sia: string;
    noRegistrasiSipnap: string;
    alamat: string;
    kabupatenKota: string;
    provinsi: string;
  };
  catatanApj: string;
  catatanKemenkes?: string;
  items: ItemMutasiSipnap[];
}

export interface KpiSipnap {
  title: string;
  value: string;
  subtext: string;
  badge?: string;
  badgeClass?: string;
  icon: string;
  colorClass: 'emerald' | 'blue' | 'purple' | 'amber';
}
