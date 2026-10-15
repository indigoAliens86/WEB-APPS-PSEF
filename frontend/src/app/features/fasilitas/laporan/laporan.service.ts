import { Injectable, signal, computed } from '@angular/core';
import {
  LaporanSipnapPeriodik,
  ItemMutasiSipnap,
  KpiSipnap,
  StatusLaporanSipnap,
  GolonganObatSipnap,
  PeranSipnap,
  HakAksesSipnap,
} from './models/laporan-sipnap.model';

@Injectable({
  providedIn: 'root',
})
export class LaporanSipnapService {
  // Access control based on user role (Apoteker Penanggung Jawab vs Fasilitas)
  getHakAkses(role: PeranSipnap): HakAksesSipnap {
    if (role === 'apoteker') {
      return {
        canCreate: true,
        canEdit: true,
        canValidate: true,
        canSubmit: true,
        canExport: true,
        canPrint: true,
        isReadOnly: false,
        labelPeran: 'Apoteker Penanggung Jawab (APJ)',
        badgePeran: 'Otorisasi Penuh APJ',
        deskripsiPeran:
          'Wewenang penuh untuk menyusun draf rekonsiliasi, validasi sediaan, dan pengiriman resmi SIPNAP ke Kemenkes RI.',
      };
    }
    return {
      canCreate: false,
      canEdit: false,
      canValidate: false,
      canSubmit: false,
      canExport: true,
      canPrint: true,
      isReadOnly: true,
      labelPeran: 'Fasilitas Pelayanan Kefarmasian',
      badgePeran: 'Mode Tinjauan (Read Only)',
      deskripsiPeran:
        'Akses pemantauan dan audit kepatuhan. Pembuatan draf dan pengiriman laporan adalah wewenang mutlak APJ.',
    };
  }
  // Facility context for SIPNAP Kemenkes
  readonly facilityProfile = {
    nama: 'Apotek Kimia Sehat PSEF',
    sia: 'SIA-32.73/2025',
    noRegistrasiSipnap: 'SIPNAP-BDG-2025-091',
    statusAkunSipnap: 'Aktif Terverifikasi Kemenkes RI',
    alamat: 'Jl. R.E. Martadinata No. 45, Citarum, Kec. Bandung Wetan, Kota Bandung',
    kabupatenKota: 'Kota Bandung',
    provinsi: 'Jawa Barat',
    apj: {
      nama: 'apt. Farhan Pratama, S.Farm',
      sipa: '19930814/SIPA-32.73/2022/2048',
      stra: '19930814/STRA-ITB/2018/142091',
      jabatan: 'Apoteker Penanggung Jawab (APJ)',
    },
  };

  // Mock list of monthly SIPNAP reports
  readonly laporanList = signal<LaporanSipnapPeriodik[]>([
    {
      id: 'SIPNAP-2026-05',
      periodeBulan: 'Mei 2026',
      bulan: 5,
      tahun: 2026,
      tanggalBatasLapor: '10 Juni 2026',
      tanggalGenerate: '24 Mei 2026, 09:15 WIB',
      status: 'Menunggu Validasi APJ',
      totalSediaan: 12,
      totalNarkotika: 3,
      totalPsikotropika: 4,
      totalPrekursor: 3,
      totalOot: 2,
      totalPengeluaranResep: 525,
      tingkatKesesuaian: 100,
      apotekerPengkaji: {
        nama: 'apt. Farhan Pratama, S.Farm',
        sipa: '19930814/SIPA-32.73/2022/2048',
        stra: '19930814/STRA-ITB/2018/142091',
        jabatan: 'Apoteker Penanggung Jawab (APJ)',
        waktuVerifikasi: 'Belum Divalidasi Final',
      },
      fasilitas: {
        nama: 'Apotek Kimia Sehat PSEF',
        sia: 'SIA-32.73/2025',
        noRegistrasiSipnap: 'SIPNAP-BDG-2025-091',
        alamat: 'Jl. R.E. Martadinata No. 45, Citarum, Bandung',
        kabupatenKota: 'Kota Bandung',
        provinsi: 'Jawa Barat',
      },
      catatanApj:
        'Seluruh mutasi pemasukan faktur PBF dan resep digital PSEF telah direkonsiliasi. Stok fisik 100% cocok tanpa selisih. Siap diajukan pengesahan digital & sinkronisasi Kemenkes.',
      items: [
        {
          id: 'MUT-01',
          kodeObat: 'NARK-001',
          namaObat: 'Codikaf 10mg (Kodein Fosfat)',
          komposisi: 'Codeine phosphate hemihydrate 10 mg',
          golongan: 'Narkotika',
          bentukSediaan: 'Tablet',
          satuan: 'Tablet',
          saldoAwal: 200,
          pemasukan: 100,
          pengeluaran: 40,
          saldoAkhir: 260,
          stokFisik: 260,
          selisih: 0,
          noBatch: 'CDK-26019',
          expiredDate: '12/2028',
          statusKesesuaian: 'Sesuai',
          detailPemasukan: [
            {
              noFaktur: 'FAK-KF-2026-9901',
              tanggalFaktur: '05 Mei 2026',
              namaPbf: 'PT Kimia Farma Trading & Distribution',
              jumlah: 100,
              noBatch: 'CDK-26019',
              expiredDate: '12/2028',
            },
          ],
          detailPengeluaran: [
            {
              noResep: 'RX-2026-8812',
              tanggalResep: '08 Mei 2026',
              namaPasien: 'Tn. Hendra Saputra',
              nikPasien: '3273011405880002',
              alamatPasien: 'Jl. Dago No. 12, Bandung',
              namaDokter: 'dr. Budi Setiawan, Sp.P',
              sipDokter: '503/SIP-DOK/BDG/2024',
              faskesDokter: 'RS Paru Dr. H.A. Rotinsulu',
              jumlah: 20,
              aturanPakai: '3 x 1 tablet p.c. bila batuk kering berat',
            },
            {
              noResep: 'RX-2026-9014',
              tanggalResep: '19 Mei 2026',
              namaPasien: 'Ny. Dewi Kartika',
              nikPasien: '3273045610830005',
              alamatPasien: 'Jl. Cihampelas No. 88, Bandung',
              namaDokter: 'dr. Ratna Juwita, Sp.A',
              sipDokter: '503/SIP-DOK/BDG/2023',
              faskesDokter: 'Klinik PSEF Pediatri',
              jumlah: 20,
              aturanPakai: '2 x 1 tablet p.c.',
            },
          ],
        },
        {
          id: 'MUT-02',
          kodeObat: 'NARK-002',
          namaObat: 'Codipront Expectorant Kapsul',
          komposisi: 'Codeine 30 mg, Phenyltoloxamine 10 mg',
          golongan: 'Narkotika',
          bentukSediaan: 'Kapsul',
          satuan: 'Kapsul',
          saldoAwal: 150,
          pemasukan: 0,
          pengeluaran: 30,
          saldoAkhir: 120,
          stokFisik: 120,
          selisih: 0,
          noBatch: 'CDP-25110',
          expiredDate: '09/2027',
          statusKesesuaian: 'Sesuai',
          detailPemasukan: [],
          detailPengeluaran: [
            {
              noResep: 'RX-2026-8940',
              tanggalResep: '14 Mei 2026',
              namaPasien: 'Ny. Ratna Galih',
              nikPasien: '3273024803910001',
              alamatPasien: 'Jl. Buah Batu No. 54, Bandung',
              namaDokter: 'dr. Andi Wijaya, Sp.PD',
              sipDokter: '503/SIP-DOK/JS/2024',
              faskesDokter: 'RS Hermina Pasteur',
              jumlah: 30,
              aturanPakai: '2 x 1 kapsul',
            },
          ],
        },
        {
          id: 'MUT-03',
          kodeObat: 'NARK-003',
          namaObat: 'MST Continus 10mg (Morfin Sulfat)',
          komposisi: 'Morphine sulfate 10 mg modified release',
          golongan: 'Narkotika',
          bentukSediaan: 'Tablet Lepas Lambat',
          satuan: 'Tablet',
          saldoAwal: 50,
          pemasukan: 0,
          pengeluaran: 10,
          saldoAkhir: 40,
          stokFisik: 40,
          selisih: 0,
          noBatch: 'MST-25089',
          expiredDate: '11/2027',
          statusKesesuaian: 'Sesuai',
          detailPemasukan: [],
          detailPengeluaran: [
            {
              noResep: 'RX-2026-9022',
              tanggalResep: '20 Mei 2026',
              namaPasien: 'Tn. Sugeng Riyadi',
              nikPasien: '3273091102600003',
              alamatPasien: 'Jl. Setiabudi No. 102, Bandung',
              namaDokter: 'dr. Farida Rahma, Sp.Onk',
              sipDokter: '503/SIP-DOK/BDG/2022',
              faskesDokter: 'RSUP Dr. Hasan Sadikin Bandung',
              jumlah: 10,
              aturanPakai: '2 x 1 tablet tiap 12 jam',
            },
          ],
        },
        {
          id: 'MUT-04',
          kodeObat: 'PSIK-001',
          namaObat: 'Alprazolam 0.5mg Tab',
          komposisi: 'Alprazolam 0.5 mg',
          golongan: 'Psikotropika',
          bentukSediaan: 'Tablet',
          satuan: 'Tablet',
          saldoAwal: 300,
          pemasukan: 200,
          pengeluaran: 85,
          saldoAkhir: 415,
          stokFisik: 415,
          selisih: 0,
          noBatch: 'ALP-26041',
          expiredDate: '06/2029',
          statusKesesuaian: 'Sesuai',
          detailPemasukan: [
            {
              noFaktur: 'FAK-MBS-2026-4412',
              tanggalFaktur: '04 Mei 2026',
              namaPbf: 'PT Mensa Binasukses',
              jumlah: 200,
              noBatch: 'ALP-26041',
              expiredDate: '06/2029',
            },
          ],
          detailPengeluaran: [
            {
              noResep: 'RX-2026-8802',
              tanggalResep: '07 Mei 2026',
              namaPasien: 'Ny. Maria Veronica',
              nikPasien: '3273055509780004',
              alamatPasien: 'Jl. Pasirkaliki No. 70, Bandung',
              namaDokter: 'dr. Iwan Kurniawan, Sp.KJ',
              sipDokter: '503/SIP-DOK/BDG/2023',
              faskesDokter: 'Klinik Jiwa Harmoni PSEF',
              jumlah: 30,
              aturanPakai: '1 x 0.5 tablet malam hari',
            },
            {
              noResep: 'RX-2026-8990',
              tanggalResep: '18 Mei 2026',
              namaPasien: 'Tn. Asep Mulyana',
              nikPasien: '3273010101750008',
              alamatPasien: 'Jl. Riau No. 110, Bandung',
              namaDokter: 'dr. Iwan Kurniawan, Sp.KJ',
              sipDokter: '503/SIP-DOK/BDG/2023',
              faskesDokter: 'Klinik Jiwa Harmoni PSEF',
              jumlah: 55,
              aturanPakai: '1 x 1 tablet malam hari',
            },
          ],
        },
        {
          id: 'MUT-05',
          kodeObat: 'PSIK-002',
          namaObat: 'Diazepam 2mg Tab (Valisanbe)',
          komposisi: 'Diazepam 2 mg',
          golongan: 'Psikotropika',
          bentukSediaan: 'Tablet',
          satuan: 'Tablet',
          saldoAwal: 250,
          pemasukan: 100,
          pengeluaran: 45,
          saldoAkhir: 305,
          stokFisik: 305,
          selisih: 0,
          noBatch: 'DZP-26022',
          expiredDate: '03/2028',
          statusKesesuaian: 'Sesuai',
          detailPemasukan: [
            {
              noFaktur: 'FAK-SANBE-2026-118',
              tanggalFaktur: '10 Mei 2026',
              namaPbf: 'PT Bina San Prima',
              jumlah: 100,
              noBatch: 'DZP-26022',
              expiredDate: '03/2028',
            },
          ],
          detailPengeluaran: [
            {
              noResep: 'RX-2026-8860',
              tanggalResep: '11 Mei 2026',
              namaPasien: 'Ny. Laksmi Puspita',
              nikPasien: '3273086208850002',
              alamatPasien: 'Jl. Supratman No. 34, Bandung',
              namaDokter: 'dr. Andi Wijaya, Sp.PD',
              sipDokter: '503/SIP-DOK/JS/2024',
              faskesDokter: 'RS Hermina Pasteur',
              jumlah: 45,
              aturanPakai: '1 x 1 tablet malam hari',
            },
          ],
        },
        {
          id: 'MUT-06',
          kodeObat: 'PSIK-003',
          namaObat: 'Clobazam 10mg Tab (Frisium)',
          komposisi: 'Clobazam 10 mg',
          golongan: 'Psikotropika',
          bentukSediaan: 'Tablet',
          satuan: 'Tablet',
          saldoAwal: 180,
          pemasukan: 0,
          pengeluaran: 30,
          saldoAkhir: 150,
          stokFisik: 150,
          selisih: 0,
          noBatch: 'CLB-25091',
          expiredDate: '10/2027',
          statusKesesuaian: 'Sesuai',
          detailPemasukan: [],
          detailPengeluaran: [
            {
              noResep: 'RX-2026-8910',
              tanggalResep: '13 Mei 2026',
              namaPasien: 'An. Kevin Pratama',
              nikPasien: '3273071204180001',
              alamatPasien: 'Jl. Sukajadi No. 129, Bandung',
              namaDokter: 'dr. Ratna Juwita, Sp.A',
              sipDokter: '503/SIP-DOK/BDG/2023',
              faskesDokter: 'Klinik Anak Sejahtera PSEF',
              jumlah: 30,
              aturanPakai: '2 x 1/2 tablet',
            },
          ],
        },
        {
          id: 'MUT-07',
          kodeObat: 'PSIK-004',
          namaObat: 'Braxidin Tab (Klordiazepoksid/Klinidium)',
          komposisi: 'Chlordiazepoxide 5 mg, Clidinium Br 2.5 mg',
          golongan: 'Psikotropika',
          bentukSediaan: 'Tablet Salut Selaput',
          satuan: 'Tablet',
          saldoAwal: 220,
          pemasukan: 100,
          pengeluaran: 60,
          saldoAkhir: 260,
          stokFisik: 260,
          selisih: 0,
          noBatch: 'BRX-26011',
          expiredDate: '01/2028',
          statusKesesuaian: 'Sesuai',
          detailPemasukan: [
            {
              noFaktur: 'FAK-SANBE-2026-202',
              tanggalFaktur: '12 Mei 2026',
              namaPbf: 'PT Bina San Prima',
              jumlah: 100,
              noBatch: 'BRX-26011',
              expiredDate: '01/2028',
            },
          ],
          detailPengeluaran: [
            {
              noResep: 'RX-2026-9011',
              tanggalResep: '19 Mei 2026',
              namaPasien: 'Tn. Bambang Sutrisno',
              nikPasien: '3273031006700004',
              alamatPasien: 'Jl. Gatot Subroto No. 44, Bandung',
              namaDokter: 'dr. Andi Wijaya, Sp.PD',
              sipDokter: '503/SIP-DOK/JS/2024',
              faskesDokter: 'Telemedisin PSEF',
              jumlah: 60,
              aturanPakai: '3 x 1 tablet a.c. 30 menit sebelum makan',
            },
          ],
        },
        {
          id: 'MUT-08',
          kodeObat: 'PREK-001',
          namaObat: 'Pseudoephedrine HCl 30mg Tab',
          komposisi: 'Pseudoephedrine hydrochloride 30 mg',
          golongan: 'Prekursor',
          bentukSediaan: 'Tablet',
          satuan: 'Tablet',
          saldoAwal: 500,
          pemasukan: 300,
          pengeluaran: 140,
          saldoAkhir: 660,
          stokFisik: 660,
          selisih: 0,
          noBatch: 'PSE-26055',
          expiredDate: '08/2028',
          statusKesesuaian: 'Sesuai',
          detailPemasukan: [
            {
              noFaktur: 'FAK-ENS-2026-904',
              tanggalFaktur: '06 Mei 2026',
              namaPbf: 'PT Enseval Putera Megatrading',
              jumlah: 300,
              noBatch: 'PSE-26055',
              expiredDate: '08/2028',
            },
          ],
          detailPengeluaran: [
            {
              noResep: 'RX-2026-8850',
              tanggalResep: '10 Mei 2026',
              namaPasien: 'Ny. Siti Rahmawati',
              nikPasien: '3273014101840001',
              alamatPasien: 'Jl. Trunojoyo No. 22, Bandung',
              namaDokter: 'dr. Andi Wijaya, Sp.PD',
              sipDokter: '503/SIP-DOK/JS/2024',
              faskesDokter: 'RS Hermina Pasteur',
              jumlah: 60,
              aturanPakai: '3 x 1 tablet p.c.',
            },
            {
              noResep: 'RX-2026-9031',
              tanggalResep: '21 Mei 2026',
              namaPasien: 'Tn. Dadan Ramdani',
              nikPasien: '3273091907860002',
              alamatPasien: 'Jl. Dipatiukur No. 65, Bandung',
              namaDokter: 'dr. Farida Rahma, Sp.Onk',
              sipDokter: '503/SIP-DOK/BDG/2022',
              faskesDokter: 'Klinik PSEF Sehat',
              jumlah: 80,
              aturanPakai: '3 x 1 tablet p.c.',
            },
          ],
        },
        {
          id: 'MUT-09',
          kodeObat: 'PREK-002',
          namaObat: 'Efedrin HCl 25mg Tab',
          komposisi: 'Ephedrine hydrochloride 25 mg',
          golongan: 'Prekursor',
          bentukSediaan: 'Tablet',
          satuan: 'Tablet',
          saldoAwal: 150,
          pemasukan: 0,
          pengeluaran: 20,
          saldoAkhir: 130,
          stokFisik: 130,
          selisih: 0,
          noBatch: 'EFD-25102',
          expiredDate: '04/2027',
          statusKesesuaian: 'Sesuai',
          detailPemasukan: [],
          detailPengeluaran: [
            {
              noResep: 'RX-2026-8980',
              tanggalResep: '17 Mei 2026',
              namaPasien: 'Tn. Yudi Pratama',
              nikPasien: '3273021908810006',
              alamatPasien: 'Jl. Aceh No. 19, Bandung',
              namaDokter: 'dr. Budi Setiawan, Sp.P',
              sipDokter: '503/SIP-DOK/BDG/2024',
              faskesDokter: 'RS Paru Dr. H.A. Rotinsulu',
              jumlah: 20,
              aturanPakai: '2 x 1 tablet',
            },
          ],
        },
        {
          id: 'MUT-10',
          kodeObat: 'PREK-003',
          namaObat: 'Tremenza Tab (Pseudoephedrine / Triprolidine)',
          komposisi: 'Pseudoephedrine HCl 60 mg, Triprolidine HCl 2.5 mg',
          golongan: 'Prekursor',
          bentukSediaan: 'Tablet',
          satuan: 'Tablet',
          saldoAwal: 400,
          pemasukan: 200,
          pengeluaran: 110,
          saldoAkhir: 490,
          stokFisik: 490,
          selisih: 0,
          noBatch: 'TRM-26019',
          expiredDate: '10/2028',
          statusKesesuaian: 'Sesuai',
          detailPemasukan: [
            {
              noFaktur: 'FAK-SANBE-2026-309',
              tanggalFaktur: '15 Mei 2026',
              namaPbf: 'PT Bina San Prima',
              jumlah: 200,
              noBatch: 'TRM-26019',
              expiredDate: '10/2028',
            },
          ],
          detailPengeluaran: [
            {
              noResep: 'RX-2026-8995',
              tanggalResep: '18 Mei 2026',
              namaPasien: 'Ny. Cindy Claudia',
              nikPasien: '3273066405950003',
              alamatPasien: 'Jl. Merdeka No. 42, Bandung',
              namaDokter: 'dr. Ratna Juwita, Sp.A',
              sipDokter: '503/SIP-DOK/BDG/2023',
              faskesDokter: 'Telemedisin PSEF',
              jumlah: 110,
              aturanPakai: '3 x 1 tablet p.c.',
            },
          ],
        },
        {
          id: 'MUT-11',
          kodeObat: 'OOT-001',
          namaObat: 'Tramadol HCl 50mg Kapsul',
          komposisi: 'Tramadol hydrochloride 50 mg',
          golongan: 'Obat-Obat Tertentu (OOT)',
          bentukSediaan: 'Kapsul',
          satuan: 'Kapsul',
          saldoAwal: 250,
          pemasukan: 100,
          pengeluaran: 50,
          saldoAkhir: 300,
          stokFisik: 300,
          selisih: 0,
          noBatch: 'TRD-26012',
          expiredDate: '07/2028',
          statusKesesuaian: 'Sesuai',
          detailPemasukan: [
            {
              noFaktur: 'FAK-KF-2026-9988',
              tanggalFaktur: '08 Mei 2026',
              namaPbf: 'PT Kimia Farma Trading',
              jumlah: 100,
              noBatch: 'TRD-26012',
              expiredDate: '07/2028',
            },
          ],
          detailPengeluaran: [
            {
              noResep: 'RX-2026-9040',
              tanggalResep: '23 Mei 2026',
              namaPasien: 'Ny. Siti Rahmawati',
              nikPasien: '3273014101840001',
              alamatPasien: 'Jl. Trunojoyo No. 22, Bandung',
              namaDokter: 'dr. Andi Wijaya, Sp.PD',
              sipDokter: '503/SIP-DOK/JS/2024',
              faskesDokter: 'RS Hermina Pasteur',
              jumlah: 50,
              aturanPakai: '2 x 1 kapsul p.r.n nyeri akut',
            },
          ],
        },
        {
          id: 'MUT-12',
          kodeObat: 'OOT-002',
          namaObat: 'Trihexyphenidyl 2mg Tab',
          komposisi: 'Trihexyphenidyl hydrochloride 2 mg',
          golongan: 'Obat-Obat Tertentu (OOT)',
          bentukSediaan: 'Tablet',
          satuan: 'Tablet',
          saldoAwal: 200,
          pemasukan: 0,
          pengeluaran: 35,
          saldoAkhir: 165,
          stokFisik: 165,
          selisih: 0,
          noBatch: 'THP-25088',
          expiredDate: '05/2027',
          statusKesesuaian: 'Sesuai',
          detailPemasukan: [],
          detailPengeluaran: [
            {
              noResep: 'RX-2026-9029',
              tanggalResep: '22 Mei 2026',
              namaPasien: 'Tn. Ahmad Fauzi',
              nikPasien: '3273081203650001',
              alamatPasien: 'Jl. Jakarta No. 18, Bandung',
              namaDokter: 'dr. Iwan Kurniawan, Sp.KJ',
              sipDokter: '503/SIP-DOK/BDG/2023',
              faskesDokter: 'Klinik Jiwa Harmoni PSEF',
              jumlah: 35,
              aturanPakai: '2 x 1 tablet',
            },
          ],
        },
      ],
    },
    {
      id: 'SIPNAP-2026-04',
      periodeBulan: 'April 2026',
      bulan: 4,
      tahun: 2026,
      tanggalBatasLapor: '10 Mei 2026',
      tanggalKirim: '08 Mei 2026, 11:20 WIB',
      tanggalGenerate: '28 April 2026, 17:00 WIB',
      status: 'Terverifikasi Kemenkes',
      nomorTandaTerima: 'BPO-SIPNAP-3273-20260508-00192',
      kodeTokenKemenkes: 'KMK-SIPNAP-99A1-2026-OK',
      totalSediaan: 12,
      totalNarkotika: 3,
      totalPsikotropika: 4,
      totalPrekursor: 3,
      totalOot: 2,
      totalPengeluaranResep: 480,
      tingkatKesesuaian: 100,
      apotekerPengkaji: {
        nama: 'apt. Farhan Pratama, S.Farm',
        sipa: '19930814/SIPA-32.73/2022/2048',
        stra: '19930814/STRA-ITB/2018/142091',
        jabatan: 'Apoteker Penanggung Jawab (APJ)',
        waktuVerifikasi: '08 Mei 2026, 10:45 WIB',
      },
      fasilitas: {
        nama: 'Apotek Kimia Sehat PSEF',
        sia: 'SIA-32.73/2025',
        noRegistrasiSipnap: 'SIPNAP-BDG-2025-091',
        alamat: 'Jl. R.E. Martadinata No. 45, Citarum, Bandung',
        kabupatenKota: 'Kota Bandung',
        provinsi: 'Jawa Barat',
      },
      catatanApj:
        'Pelaporan bulanan telah ditandatangani secara digital oleh APJ dan sukses diunggah ke server SIPNAP Kemenkes RI dengan BPO terbit.',
      catatanKemenkes:
        'Laporan telah diterima dan tervalidasi otomatis oleh Sistem SIPNAP Kemenkes RI pada 08 Mei 2026. Data mutasi lengkap dan konsisten.',
      items: [],
    },
    {
      id: 'SIPNAP-2026-03',
      periodeBulan: 'Maret 2026',
      bulan: 3,
      tahun: 2026,
      tanggalBatasLapor: '10 April 2026',
      tanggalKirim: '09 April 2026, 14:10 WIB',
      tanggalGenerate: '29 Maret 2026, 16:30 WIB',
      status: 'Terverifikasi Kemenkes',
      nomorTandaTerima: 'BPO-SIPNAP-3273-20260409-00114',
      kodeTokenKemenkes: 'KMK-SIPNAP-88B2-2026-OK',
      totalSediaan: 12,
      totalNarkotika: 3,
      totalPsikotropika: 4,
      totalPrekursor: 3,
      totalOot: 2,
      totalPengeluaranResep: 510,
      tingkatKesesuaian: 100,
      apotekerPengkaji: {
        nama: 'apt. Farhan Pratama, S.Farm',
        sipa: '19930814/SIPA-32.73/2022/2048',
        stra: '19930814/STRA-ITB/2018/142091',
        jabatan: 'Apoteker Penanggung Jawab (APJ)',
        waktuVerifikasi: '09 April 2026, 13:30 WIB',
      },
      fasilitas: {
        nama: 'Apotek Kimia Sehat PSEF',
        sia: 'SIA-32.73/2025',
        noRegistrasiSipnap: 'SIPNAP-BDG-2025-091',
        alamat: 'Jl. R.E. Martadinata No. 45, Citarum, Bandung',
        kabupatenKota: 'Kota Bandung',
        provinsi: 'Jawa Barat',
      },
      catatanApj: 'Laporan sukses diverifikasi Kemenkes tepat waktu.',
      catatanKemenkes: 'Laporan SIPNAP Maret 2026 terverifikasi Kemenkes RI.',
      items: [],
    },
    {
      id: 'SIPNAP-2026-02',
      periodeBulan: 'Februari 2026',
      bulan: 2,
      tahun: 2026,
      tanggalBatasLapor: '10 Maret 2026',
      tanggalKirim: '07 Maret 2026, 15:00 WIB',
      tanggalGenerate: '26 Februari 2026, 14:00 WIB',
      status: 'Terverifikasi Kemenkes',
      nomorTandaTerima: 'BPO-SIPNAP-3273-20260307-00088',
      kodeTokenKemenkes: 'KMK-SIPNAP-77C3-2026-OK',
      totalSediaan: 12,
      totalNarkotika: 3,
      totalPsikotropika: 4,
      totalPrekursor: 3,
      totalOot: 2,
      totalPengeluaranResep: 460,
      tingkatKesesuaian: 100,
      apotekerPengkaji: {
        nama: 'apt. Farhan Pratama, S.Farm',
        sipa: '19930814/SIPA-32.73/2022/2048',
        stra: '19930814/STRA-ITB/2018/142091',
        jabatan: 'Apoteker Penanggung Jawab (APJ)',
        waktuVerifikasi: '07 Maret 2026, 14:15 WIB',
      },
      fasilitas: {
        nama: 'Apotek Kimia Sehat PSEF',
        sia: 'SIA-32.73/2025',
        noRegistrasiSipnap: 'SIPNAP-BDG-2025-091',
        alamat: 'Jl. R.E. Martadinata No. 45, Citarum, Bandung',
        kabupatenKota: 'Kota Bandung',
        provinsi: 'Jawa Barat',
      },
      catatanApj: 'Laporan sukses terverifikasi.',
      items: [],
    },
    {
      id: 'SIPNAP-2026-01',
      periodeBulan: 'Januari 2026',
      bulan: 1,
      tahun: 2026,
      tanggalBatasLapor: '10 Februari 2026',
      tanggalKirim: '08 Februari 2026, 10:30 WIB',
      tanggalGenerate: '29 Januari 2026, 11:00 WIB',
      status: 'Terverifikasi Kemenkes',
      nomorTandaTerima: 'BPO-SIPNAP-3273-20260208-00045',
      kodeTokenKemenkes: 'KMK-SIPNAP-66D4-2026-OK',
      totalSediaan: 12,
      totalNarkotika: 3,
      totalPsikotropika: 4,
      totalPrekursor: 3,
      totalOot: 2,
      totalPengeluaranResep: 440,
      tingkatKesesuaian: 100,
      apotekerPengkaji: {
        nama: 'apt. Farhan Pratama, S.Farm',
        sipa: '19930814/SIPA-32.73/2022/2048',
        stra: '19930814/STRA-ITB/2018/142091',
        jabatan: 'Apoteker Penanggung Jawab (APJ)',
        waktuVerifikasi: '08 Februari 2026, 09:50 WIB',
      },
      fasilitas: {
        nama: 'Apotek Kimia Sehat PSEF',
        sia: 'SIA-32.73/2025',
        noRegistrasiSipnap: 'SIPNAP-BDG-2025-091',
        alamat: 'Jl. R.E. Martadinata No. 45, Citarum, Bandung',
        kabupatenKota: 'Kota Bandung',
        provinsi: 'Jawa Barat',
      },
      catatanApj: 'Laporan awal tahun 2026 lengkap.',
      items: [],
    },
    {
      id: 'SIPNAP-2025-12',
      periodeBulan: 'Desember 2025',
      bulan: 12,
      tahun: 2025,
      tanggalBatasLapor: '10 Januari 2026',
      tanggalKirim: '09 Januari 2026, 16:40 WIB',
      tanggalGenerate: '30 Desember 2025, 15:00 WIB',
      status: 'Terverifikasi Kemenkes',
      nomorTandaTerima: 'BPO-SIPNAP-3273-20260109-00561',
      kodeTokenKemenkes: 'KMK-SIPNAP-55E5-2025-OK',
      totalSediaan: 12,
      totalNarkotika: 3,
      totalPsikotropika: 4,
      totalPrekursor: 3,
      totalOot: 2,
      totalPengeluaranResep: 495,
      tingkatKesesuaian: 100,
      apotekerPengkaji: {
        nama: 'apt. Farhan Pratama, S.Farm',
        sipa: '19930814/SIPA-32.73/2022/2048',
        stra: '19930814/STRA-ITB/2018/142091',
        jabatan: 'Apoteker Penanggung Jawab (APJ)',
        waktuVerifikasi: '09 Januari 2026, 16:00 WIB',
      },
      fasilitas: {
        nama: 'Apotek Kimia Sehat PSEF',
        sia: 'SIA-32.73/2025',
        noRegistrasiSipnap: 'SIPNAP-BDG-2025-091',
        alamat: 'Jl. R.E. Martadinata No. 45, Citarum, Bandung',
        kabupatenKota: 'Kota Bandung',
        provinsi: 'Jawa Barat',
      },
      catatanApj: 'Laporan tutup tahun 2025 terverifikasi.',
      items: [],
    },
  ]);

  // KPIs
  readonly kpiCompliance = computed<KpiSipnap[]>(() => {
    const list = this.laporanList();
    const verified = list.filter((l) => l.status === 'Terverifikasi Kemenkes').length;
    const total = list.length;
    const rate = Math.round((verified / total) * 100);

    return [
      {
        title: 'Kepatuhan Pelaporan SIPNAP',
        value: '100% Tepat Waktu',
        subtext: 'Berdasarkan Permenkes No. 3/2015',
        badge: 'Kemenkes Terakreditasi',
        badgeClass: 'badge-success',
        icon: 'ri-shield-check-fill',
        colorClass: 'emerald',
      },
      {
        title: 'Sediaan Khusus Aktif (N/P/P/OOT)',
        value: '12 Item Sediaan',
        subtext: '3 Narkotika • 4 Psikotropika • 5 Prekursor/OOT',
        badge: 'Stok Terpantau',
        badgeClass: 'badge-info',
        icon: 'ri-capsule-line',
        colorClass: 'blue',
      },
      {
        title: 'Resep Narkotika & Psikotropika',
        value: '525 Transaksi',
        subtext: 'Bulan berjalan (Mei 2026)',
        badge: 'Digital Verified',
        badgeClass: 'badge-purple',
        icon: 'ri-file-list-3-line',
        colorClass: 'purple',
      },
      {
        title: 'Jatuh Tempo Lapor Berikutnya',
        value: '10 Juni 2026',
        subtext: 'Batas akhir tgl 10 bulan berikutnya',
        badge: 'Status Aman',
        badgeClass: 'badge-amber',
        icon: 'ri-calendar-check-line',
        colorClass: 'amber',
      },
    ];
  });

  getLaporanById(id: string): LaporanSipnapPeriodik | undefined {
    return this.laporanList().find((l) => l.id.toLowerCase() === id.toLowerCase());
  }

  // Kirim laporan ke API Kemenkes RI
  kirimKeKemenkes(id: string): Promise<{ success: boolean; bpo: string; token: string }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const now = new Date();
        const bpo = `BPO-SIPNAP-3273-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}-00${Math.floor(100 + Math.random() * 900)}`;
        const token = `KMK-SIPNAP-${Math.random().toString(36).substring(2, 6).toUpperCase()}-2026-VERIFIED`;
        const timeStr = `${now.getDate()} Mei ${now.getFullYear()}, ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} WIB`;

        this.laporanList.update((items) =>
          items.map((item) => {
            if (item.id === id) {
              return {
                ...item,
                status: 'Terverifikasi Kemenkes',
                nomorTandaTerima: bpo,
                kodeTokenKemenkes: token,
                tanggalKirim: timeStr,
                catatanKemenkes:
                  'Laporan berhasil diterima dan diverifikasi oleh Server Bridging SIPNAP Kemenkes RI. Bukti Pelaporan Obat (BPO) resmi telah diterbitkan.',
                apotekerPengkaji: {
                  ...item.apotekerPengkaji,
                  waktuVerifikasi: timeStr,
                },
              };
            }
            return item;
          })
        );

        resolve({ success: true, bpo, token });
      }, 1200);
    });
  }

  // Validasi APJ
  validasiOlehApj(id: string, catatan: string): void {
    const now = new Date();
    const timeStr = `${now.getDate()} Mei ${now.getFullYear()}, ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} WIB`;

    this.laporanList.update((items) =>
      items.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            catatanApj: catatan || item.catatanApj,
            apotekerPengkaji: {
              ...item.apotekerPengkaji,
              waktuVerifikasi: timeStr,
            },
          };
        }
        return item;
      })
    );
  }

  // Buat draft laporan periode baru
  tambahDraftLaporan(bulan: number, tahun: number, namaBulan: string): LaporanSipnapPeriodik {
    const nextMonth = bulan === 12 ? 1 : bulan + 1;
    const nextYear = bulan === 12 ? tahun + 1 : tahun;
    const namaBulanBatas = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
    ][nextMonth - 1];

    const newId = `SIPNAP-${tahun}-${String(bulan).padStart(2, '0')}`;
    const newLaporan: LaporanSipnapPeriodik = {
      id: newId,
      periodeBulan: `${namaBulan} ${tahun}`,
      bulan,
      tahun,
      tanggalBatasLapor: `10 ${namaBulanBatas} ${nextYear}`,
      tanggalGenerate: new Date().toLocaleString('id-ID'),
      status: 'Draft Rekonsiliasi',
      totalSediaan: 12,
      totalNarkotika: 3,
      totalPsikotropika: 4,
      totalPrekursor: 3,
      totalOot: 2,
      totalPengeluaranResep: 0,
      tingkatKesesuaian: 100,
      apotekerPengkaji: {
        nama: 'apt. Farhan Pratama, S.Farm',
        sipa: '19930814/SIPA-32.73/2022/2048',
        stra: '19930814/STRA-ITB/2018/142091',
        jabatan: 'Apoteker Penanggung Jawab (APJ)',
        waktuVerifikasi: 'Draft dalam penyusunan',
      },
      fasilitas: {
        nama: 'Apotek Kimia Sehat PSEF',
        sia: 'SIA-32.73/2025',
        noRegistrasiSipnap: 'SIPNAP-BDG-2025-091',
        alamat: 'Jl. R.E. Martadinata No. 45, Citarum, Bandung',
        kabupatenKota: 'Kota Bandung',
        provinsi: 'Jawa Barat',
      },
      catatanApj: 'Draft laporan otomatis dari data mutasi stok dan resep farmasi PSEF.',
      items: this.laporanList()[0]?.items || [],
    };

    this.laporanList.update((prev) => [newLaporan, ...prev]);
    return newLaporan;
  }

  // Export CSV
  exportSipnapCsv(laporan: LaporanSipnapPeriodik): void {
    const headers = [
      'No',
      'Kode Obat',
      'Nama Obat',
      'Golongan',
      'Bentuk Sediaan',
      'Satuan',
      'Saldo Awal',
      'Pemasukan PBF',
      'Pengeluaran Resep',
      'Saldo Akhir',
      'Stok Fisik',
      'Selisih',
      'No Batch',
      'Expired Date',
      'Status Kesesuaian',
    ];

    const items = laporan.items.length > 0 ? laporan.items : this.laporanList()[0].items;

    const rows = items.map((item, index) => [
      index + 1,
      `"${item.kodeObat}"`,
      `"${item.namaObat}"`,
      `"${item.golongan}"`,
      `"${item.bentukSediaan}"`,
      `"${item.satuan}"`,
      item.saldoAwal,
      item.pemasukan,
      item.pengeluaran,
      item.saldoAkhir,
      item.stokFisik,
      item.selisih,
      `"${item.noBatch}"`,
      `"${item.expiredDate}"`,
      `"${item.statusKesesuaian}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      `LAPORAN MUTASI SIPNAP KEMENKES RI - ${laporan.periodeBulan}\n` +
      `Fasilitas: ${laporan.fasilitas.nama} (${laporan.fasilitas.sia}) | No Reg SIPNAP: ${laporan.fasilitas.noRegistrasiSipnap}\n` +
      `APJ: ${laporan.apotekerPengkaji.nama} (SIPA: ${laporan.apotekerPengkaji.sipa})\n\n` +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `SIPNAP_${laporan.id}_${laporan.periodeBulan.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
