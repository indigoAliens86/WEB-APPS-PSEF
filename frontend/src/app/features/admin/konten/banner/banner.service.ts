import { Injectable, signal } from '@angular/core';

export interface BannerItem {
  id: number;
  judul: string;
  subjudul: string;
  posisi: 'Hero Slider Beranda' | 'Promo Spesial Obat' | 'Banner Telefarmasi' | 'Popup Pengumuman';
  targetUrl: string;
  urutan: number;
  tanggalMulai: string;
  tanggalSelesai: string;
  totalKlik: number;
  totalImpresi: number;
  imageUrl: string;
  gradientBg: string;
  status: 'Aktif' | 'Nonaktif';
  ctaText?: string;
}

export interface GradientOption {
  id: string;
  name: string;
  value: string;
  badgeColor: string;
}

@Injectable({
  providedIn: 'root'
})
export class BannerService {
  readonly gradientPresets: GradientOption[] = [
    {
      id: 'ocean-blue',
      name: 'Ocean Blue (Standar PSEF)',
      value: 'linear-gradient(135deg, #0284c7 0%, #1e40af 100%)',
      badgeColor: '#0284c7'
    },
    {
      id: 'forest-emerald',
      name: 'Forest Emerald (Konsultasi Dokter)',
      value: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
      badgeColor: '#059669'
    },
    {
      id: 'royal-purple',
      name: 'Royal Purple (Telefarmasi & PIO)',
      value: 'linear-gradient(135deg, #7c3aed 0%, #4338ca 100%)',
      badgeColor: '#7c3aed'
    },
    {
      id: 'sunset-orange',
      name: 'Sunset Amber (Kemenkes & Lisensi)',
      value: 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)',
      badgeColor: '#ea580c'
    },
    {
      id: 'crimson-red',
      name: 'Crimson Rose (Promo Spesial & Flash)',
      value: 'linear-gradient(135deg, #e11d48 0%, #9f1239 100%)',
      badgeColor: '#e11d48'
    },
    {
      id: 'dark-slate',
      name: 'Dark Slate (Pengumuman Resmi & Regulasi)',
      value: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
      badgeColor: '#475569'
    }
  ];

  private readonly initialBanners: BannerItem[] = [
    {
      id: 1,
      judul: 'Tebus Obat Resep Cepat & Bebas Ongkir Rantai Dingin',
      subjudul: 'Pengantaran aman sediaan farmasi dengan suhu terjaga 2-8°C se-Jabodetabek',
      posisi: 'Hero Slider Beranda',
      targetUrl: '/admin/pesanan',
      urutan: 1,
      tanggalMulai: '01 Okt 2026',
      tanggalSelesai: '31 Des 2026',
      totalKlik: 8420,
      totalImpresi: 145000,
      imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80',
      gradientBg: 'linear-gradient(135deg, #0284c7 0%, #1e40af 100%)',
      status: 'Aktif',
      ctaText: 'Tebus Resep Sekarang'
    },
    {
      id: 2,
      judul: 'Konsultasi Dokter Spesialis 24 Jam Siaga PSEF',
      subjudul: 'Dapatkan diagnosis terpercaya dan resep elektronik sah dalam hitungan menit',
      posisi: 'Hero Slider Beranda',
      targetUrl: '/admin/telemedisin',
      urutan: 2,
      tanggalMulai: '15 Sep 2026',
      tanggalSelesai: '15 Nov 2026',
      totalKlik: 5120,
      totalImpresi: 98000,
      imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
      gradientBg: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
      status: 'Aktif',
      ctaText: 'Mulai Telekonsultasi'
    },
    {
      id: 3,
      judul: 'Tanya Apoteker (Tele-PIO) Tanpa Biaya',
      subjudul: 'Konseling aturan minum obat, efek samping, dan telaah interaksi obat gratis',
      posisi: 'Banner Telefarmasi',
      targetUrl: '/admin/telefarmasi',
      urutan: 1,
      tanggalMulai: '01 Okt 2026',
      tanggalSelesai: '30 Nov 2026',
      totalKlik: 3200,
      totalImpresi: 82000,
      imageUrl: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&auto=format&fit=crop&q=80',
      gradientBg: 'linear-gradient(135deg, #7c3aed 0%, #4338ca 100%)',
      status: 'Aktif',
      ctaText: 'Chat Apoteker'
    },
    {
      id: 4,
      judul: 'Jaminan Obat Asli 100% Berlisensi Kemenkes RI',
      subjudul: 'Fasilitas apotek rekanan terstandar CDOB dengan pelaporan resmi SIPNAP',
      posisi: 'Promo Spesial Obat',
      targetUrl: '/admin/fasilitas',
      urutan: 1,
      tanggalMulai: '01 Agu 2026',
      tanggalSelesai: '31 Des 2026',
      totalKlik: 1680,
      totalImpresi: 55000,
      imageUrl: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=800&auto=format&fit=crop&q=80',
      gradientBg: 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)',
      status: 'Aktif',
      ctaText: 'Cek Legalitas Apotek'
    }
  ];

  bannerList = signal<BannerItem[]>(this.initialBanners);

  getBannerById(id: number): BannerItem | undefined {
    return this.bannerList().find(b => b.id === id);
  }

  addBanner(data: Omit<BannerItem, 'id'>): BannerItem {
    const nextId = Math.max(0, ...this.bannerList().map(b => b.id)) + 1;
    const newBanner: BannerItem = {
      ...data,
      id: nextId
    };
    this.bannerList.update(list => [newBanner, ...list]);
    return newBanner;
  }

  updateBanner(id: number, data: Partial<BannerItem>): void {
    this.bannerList.update(list =>
      list.map(b => b.id === id ? { ...b, ...data } : b)
    );
  }

  deactivateBanner(id: number): void {
    this.bannerList.update(list =>
      list.map(b => b.id === id ? { ...b, status: 'Nonaktif' } : b)
    );
  }

  deleteBanner(id: number): void {
    this.bannerList.update(list => list.filter(b => b.id !== id));
  }

  toggleStatus(id: number): void {
    this.bannerList.update(list =>
      list.map(b => {
        if (b.id === id) {
          const s = b.status === 'Aktif' ? 'Nonaktif' : 'Aktif';
          return { ...b, status: s };
        }
        return b;
      })
    );
  }
}
