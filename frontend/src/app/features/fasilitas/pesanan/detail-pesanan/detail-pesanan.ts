import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
  TipePesanan,
  SumberPesanan,
  LayananKonsultasiRef,
  MarketplaceObatInfo,
} from '../models/pesanan.model';

export interface OrderProductItem {
  no: number;
  nama: string;
  bentuk: string;
  golongan: string;
  thumbnail: string;
  resepId: string;
  dokter: string;
  harga: string;
  qwt: number;
  jumlah: string;
}

export interface OrderTimelineStep {
  label: string;
  waktu: string;
  completed: boolean;
}

@Component({
  selector: 'app-detail-pesanan',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail-pesanan.html',
  styleUrl: './detail-pesanan.css',
})
export class DetailPesanan implements OnInit {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly orderId = signal<string>('INV24025-0012');

  // Order Details Data Model with Tipe & Sumber Foundation
  readonly detail = signal<{
    id: string;
    status: string;
    tipePesanan: TipePesanan;
    sumberPesanan: SumberPesanan;
    layananKonsultasi?: LayananKonsultasiRef;
    marketplaceInfo?: MarketplaceObatInfo;
    pasien: {
      nama: string;
      gender: string;
      usia: string;
      nik: string;
      tipe: string;
      statusAktif: string;
      avatar: string;
      poinDitarik: string;
      poinTrend: string;
      telepon: string;
      email: string;
      tanggalLahir: string;
      alamat: string;
      totalPesananCount: string;
      totalResepCount: string;
      totalPembayaranSum: string;
    };
    produkList: OrderProductItem[];
    biaya: {
      subtotal: string;
      diskonProduk: string;
      ongkosKirim: string;
      voucher: string;
      totalPembayaran: string;
      metodePembayaran: string;
      waktuPembayaran: string;
      statusBayar: string;
    };
    verifikasiApoteker: {
      statusText: string;
      apotekerNama: string;
      apotekerRole: string;
      apotekerAvatar: string;
    };
    catatanApotek: string;
    catatanPesanan: string;
    pengiriman: {
      status: string;
      kurirLogo: string;
      penerima: string;
      telepon: string;
      alamat: string;
      kurir: string;
      noResi: string;
      estimasiTiba: string;
      catatanPengiriman: string;
    };
    timeline: OrderTimelineStep[];
  }>({
    id: 'INV-24025-0012',
    status: 'Dikirim',
    tipePesanan: 'Obat Resep',
    sumberPesanan: 'Konsultasi Dokter',
    layananKonsultasi: {
      idKonsultasi: 'TLM-2026-0041',
      jenisLayanan: 'Telemedisin',
      tenagaKesehatan: {
        nama: 'dr. Andi Wijaya',
        role: 'Dokter Spesialis',
        sipAtauStra: 'SIP: 3273/DU/2022/451',
      },
      klinikAtauApotek: 'Klinik PSEF Health Center',
      tanggalKonsultasi: '24 Mei 2026',
      statusPenebusan: 'Ditebus Pasien',
    },

    pasien: {
      nama: 'Andi Putra',
      gender: 'Laki-laki',
      usia: '34 Tahun',
      nik: '3275010101010001',
      tipe: 'Pasien Umum / Pasien BPJS',
      statusAktif: 'Aktif',
      avatar: 'assets/images/avatar/male.png',
      poinDitarik: '12.458',
      poinTrend: '↑ 12.5% dari minggu lalu',
      telepon: '0812-3456-7890',
      email: 'andi.putra@gmail.com',
      tanggalLahir: '01-01-1990',
      alamat: 'Jalan Merdeka No.1 , Jakarta Pusat, DKI Jakarta 10110',
      totalPesananCount: '18 Pesanan',
      totalResepCount: '7 Resep',
      totalPembayaranSum: 'Rp. 2.450.000',
    },

    produkList: [
      {
        no: 1,
        nama: 'Paracetamol 500mg',
        bentuk: 'Tablet',
        golongan: 'Obat Bebas',
        thumbnail: 'assets/images/thumbnail/paracetamol.svg',
        resepId: '#RX25024-0012',
        dokter: 'dr. Andi Wijaya',
        harga: 'Rp5.000',
        qwt: 10,
        jumlah: 'Rp50.000',
      },
      {
        no: 2,
        nama: 'Vitamin C 500mg',
        bentuk: 'Tablet',
        golongan: 'Obat Bebas',
        thumbnail: 'assets/images/thumbnail/vitamin-c.svg',
        resepId: '#RX25024-0012',
        dokter: 'dr. Andi Wijaya',
        harga: 'Rp7.000',
        qwt: 10,
        jumlah: 'Rp70.000',
      },
      {
        no: 3,
        nama: 'Amoxicillin 500mg',
        bentuk: 'Tablet',
        golongan: 'Obat Keras',
        thumbnail: 'assets/images/thumbnail/amoxicillin.svg',
        resepId: '#RX25024-0012',
        dokter: 'dr. Andi Wijaya',
        harga: 'Rp12.000',
        qwt: 15,
        jumlah: 'Rp180.000',
      },
      {
        no: 4,
        nama: 'Omeprazol 20mg',
        bentuk: 'Kapsul',
        golongan: 'Obat Keras',
        thumbnail: 'assets/images/thumbnail/omeprazol.svg',
        resepId: '#RX25024-0012',
        dokter: 'dr. Andi Wijaya',
        harga: 'Rp15.000',
        qwt: 10,
        jumlah: 'Rp150.000',
      },
      {
        no: 5,
        nama: 'Sanmol 500mg',
        bentuk: 'Tablet',
        golongan: 'Obat Bebas',
        thumbnail: 'assets/images/thumbnail/sanmol.svg',
        resepId: '#RX25024-0012',
        dokter: 'dr. Andi Wijaya',
        harga: 'Rp14.000',
        qwt: 10,
        jumlah: 'Rp140.000',
      },
    ] as OrderProductItem[],

    biaya: {
      subtotal: 'Rp590.000',
      diskonProduk: '-Rp. 35.000',
      ongkosKirim: 'Rp15.000',
      voucher: '-',
      totalPembayaran: 'Rp 570.000',
      metodePembayaran: 'Transfer Bank (BCA)',
      waktuPembayaran: '24 Mei 2026 10:36',
      statusBayar: 'Lunas',
    },

    verifikasiApoteker: {
      statusText: 'Resep Dokter telah diverifikasi oleh Apoteker Fasilitas.',
      apotekerNama: 'apt. Rina Meilani, S.Farm., M.Farm-Klin',
      apotekerRole: 'Apoteker Penanggung Jawab | 24 Mei 2026 10:36',
      apotekerAvatar: 'assets/images/avatar/female.png',
    },

    catatanApotek: 'Tidak ada catatan khusus penyiapan.',
    catatanPesanan: 'Harap dikemas rapi dengan bubble wrap.',

    pengiriman: {
      status: 'Dikirim',
      kurirLogo: 'assets/images/thumbnail/jne.svg',
      penerima: 'Andi Putra',
      telepon: '0812-3456-7890',
      alamat: 'Jalan Merdeka No.1 , Jakarta Pusat, DKI Jakarta 10110',
      kurir: 'JNE Express',
      noResi: 'JNE11223344556677889900',
      estimasiTiba: '24 Mei 2026',
      catatanPengiriman: '-',
    },

    timeline: [
      { label: 'Pesanan Dibuat', waktu: '24 Mei 2026 10:35', completed: true },
      { label: 'Verifikasi Resep', waktu: '24 Mei 2026 10:36', completed: true },
      { label: 'Pesanan Diproses', waktu: '24 Mei 2026 10:50', completed: true },
      { label: 'Pesanan Dikirim', waktu: '24 Mei 2026 11:30', completed: true },
    ] as OrderTimelineStep[],
  });

  // Tracking Modal State
  readonly showTrackingModal = signal<boolean>(false);
  readonly copiedResi = signal<boolean>(false);

  // Detailed Tracking Steps
  readonly trackingEvents = signal([
    {
      tanggal: '24 Mei 2026',
      waktu: '14:15 WIB',
      status: 'Paket Sedang Dibawa Kurir Menuju Alamat Tujuan',
      lokasi: 'Jakarta Pusat',
      deskripsi: 'Kurir Budi Hartono (0812-9988-7766) sedang mengantar paket ke Jl. Merdeka No.1.',
      icon: 'ri-truck-fill',
      isLatest: true,
    },
    {
      tanggal: '24 Mei 2026',
      waktu: '11:30 WIB',
      status: 'Paket Telah Diberangkatkan Dari Sorting Hub',
      lokasi: 'Sorting Hub JNE Express Jakarta Pusat',
      deskripsi: 'Paket telah selesai disortir dan siap untuk proses pengiriman terakhir.',
      icon: 'ri-archive-line',
      isLatest: false,
    },
    {
      tanggal: '24 Mei 2026',
      waktu: '10:50 WIB',
      status: 'Paket Telah Diserahkan ke Kurir Logistik JNE',
      lokasi: 'Apotek PSEF Mitra Farma 01',
      deskripsi: 'Petugas kurir JNE Express telah mengambil paket pesanan dari apotek fasilitas.',
      icon: 'ri-hand-coin-line',
      isLatest: false,
    },
    {
      tanggal: '24 Mei 2026',
      waktu: '10:36 WIB',
      status: 'Pesanan Selesai Diverifikasi & Dikemas Rapi',
      lokasi: 'Apotek PSEF Mitra Farma 01',
      deskripsi: 'Resep telah divalidasi oleh apt. Rina Meilani, S.Farm. Paket obat telah disegel rapi.',
      icon: 'ri-shield-check-line',
      isLatest: false,
    },
    {
      tanggal: '24 Mei 2026',
      waktu: '10:35 WIB',
      status: 'Pesanan Berhasil Dibuat & Pembayaran Dikonfirmasi',
      lokasi: 'Sistem PSEF Online',
      deskripsi: 'Pembayaran transfer bank BCA telah terverifikasi lunas.',
      icon: 'ri-checkbox-circle-line',
      isLatest: false,
    },
  ]);

  // Resep Modal State
  readonly showResepModal = signal<boolean>(false);

  openResepModal(): void {
    this.showResepModal.set(true);
  }

  closeResepModal(): void {
    this.showResepModal.set(false);
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.orderId.set(idParam);
      const isCleanParam = idParam.replace(/[^0-9]/g, '');
      const lastDigit = parseInt(isCleanParam.slice(-1) || '0', 10);

      // Check if odd numbered mock order represents Marketplace Non-Resep
      const isMarketplace = lastDigit % 2 === 1;

      if (isMarketplace) {
        this.switchTypePreview('Obat Non-Resep');
      } else {
        this.switchTypePreview('Obat Resep');
      }

      this.detail.update((cur) => ({
        ...cur,
        id: idParam.startsWith('INV') ? `#${idParam}` : `#INV-${idParam}`,
      }));
    }
  }

  /**
   * Switch between Pesanan Obat Resep and Pesanan Obat Non-Resep foundations
   */
  switchTypePreview(tipe: TipePesanan): void {
    if (tipe === 'Obat Non-Resep') {
      this.detail.update((cur) => ({
        ...cur,
        tipePesanan: 'Obat Non-Resep',
        sumberPesanan: 'Marketplace Obat',
        layananKonsultasi: undefined,
        marketplaceInfo: {
          isTersedia: false,
          channelName: 'Marketplace Obat Bebas PSEF',
          statusKetersediaan: 'Belum Tersedia',
          catatanIntegrasi: 'Layanan Pembelian Obat Marketplace saat ini belum tersedia secara publik.',
        },
        produkList: cur.produkList.map((p) => ({
          ...p,
          golongan: 'Obat Bebas',
          resepId: '-',
          dokter: 'Tanpa Resep (OTC)',
        })),
        verifikasiApoteker: {
          statusText: 'Verifikasi Mutu & Kemasan Obat Bebas Apotek PSEF (Tanpa Resep Dokter).',
          apotekerNama: 'apt. Rina Meilani, S.Farm., M.Farm-Klin',
          apotekerRole: 'Pemeriksaan Mutu & Keaslian Produk | 24 Mei 2026 10:36',
          apotekerAvatar: 'assets/images/avatar/female.png',
        },
      }));
    } else {
      this.detail.update((cur) => ({
        ...cur,
        tipePesanan: 'Obat Resep',
        sumberPesanan: 'Konsultasi Dokter',
        marketplaceInfo: undefined,
        layananKonsultasi: {
          idKonsultasi: 'TLM-2026-0041',
          jenisLayanan: 'Telemedisin',
          tenagaKesehatan: {
            nama: 'dr. Andi Wijaya',
            role: 'Dokter Spesialis',
            sipAtauStra: 'SIP: 3273/DU/2022/451',
          },
          klinikAtauApotek: 'Klinik PSEF Health Center',
          tanggalKonsultasi: '24 Mei 2026',
          statusPenebusan: 'Ditebus Pasien',
        },
        produkList: [
          {
            no: 1,
            nama: 'Paracetamol 500mg',
            bentuk: 'Tablet',
            golongan: 'Obat Bebas',
            thumbnail: 'assets/images/thumbnail/paracetamol.svg',
            resepId: '#RX25024-0012',
            dokter: 'dr. Andi Wijaya',
            harga: 'Rp5.000',
            qwt: 10,
            jumlah: 'Rp50.000',
          },
          {
            no: 2,
            nama: 'Vitamin C 500mg',
            bentuk: 'Tablet',
            golongan: 'Obat Bebas',
            thumbnail: 'assets/images/thumbnail/vitamin-c.svg',
            resepId: '#RX25024-0012',
            dokter: 'dr. Andi Wijaya',
            harga: 'Rp7.000',
            qwt: 10,
            jumlah: 'Rp70.000',
          },
          {
            no: 3,
            nama: 'Amoxicillin 500mg',
            bentuk: 'Tablet',
            golongan: 'Obat Keras',
            thumbnail: 'assets/images/thumbnail/amoxicillin.svg',
            resepId: '#RX25024-0012',
            dokter: 'dr. Andi Wijaya',
            harga: 'Rp12.000',
            qwt: 15,
            jumlah: 'Rp180.000',
          },
          {
            no: 4,
            nama: 'Omeprazol 20mg',
            bentuk: 'Kapsul',
            golongan: 'Obat Keras',
            thumbnail: 'assets/images/thumbnail/omeprazol.svg',
            resepId: '#RX25024-0012',
            dokter: 'dr. Andi Wijaya',
            harga: 'Rp15.000',
            qwt: 10,
            jumlah: 'Rp150.000',
          },
          {
            no: 5,
            nama: 'Sanmol 500mg',
            bentuk: 'Tablet',
            golongan: 'Obat Bebas',
            thumbnail: 'assets/images/thumbnail/sanmol.svg',
            resepId: '#RX25024-0012',
            dokter: 'dr. Andi Wijaya',
            harga: 'Rp14.000',
            qwt: 10,
            jumlah: 'Rp140.000',
          },
        ],
        verifikasiApoteker: {
          statusText: 'Resep Dokter telah diverifikasi oleh Apoteker Fasilitas.',
          apotekerNama: 'apt. Rina Meilani, S.Farm., M.Farm-Klin',
          apotekerRole: 'Apoteker Penanggung Jawab | 24 Mei 2026 10:36',
          apotekerAvatar: 'assets/images/avatar/female.png',
        },
      }));
    }
  }

  goBack(): void {
    void this.router.navigate(['/fasilitas/pesanan']);
  }

  lacakPengiriman(): void {
    this.showTrackingModal.set(true);
  }

  closeTrackingModal(): void {
    this.showTrackingModal.set(false);
  }

  copyResi(): void {
    const noResi = this.detail().pengiriman.noResi;
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      void navigator.clipboard.writeText(noResi);
      this.copiedResi.set(true);
      setTimeout(() => this.copiedResi.set(false), 2000);
    }
  }

  printResep(): void {
    window.print();
  }
}
