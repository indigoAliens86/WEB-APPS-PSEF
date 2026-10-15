import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';

export interface TelefarmasiItem {
  id: string;
  cleanId: string;
  tipe: 'Video Call Consultation' | 'Chat Konsultasi';
  pasien: {
    nama: string;
    gender: 'Laki-laki' | 'Perempuan';
    avatar: string;
  };
  apoteker: {
    nama: string;
    sip: string;
    avatar: string;
  };
  spesialisasi: string;
  tanggal: string;
  waktu: string;
  durasi: string;
  status: 'Selesai' | 'Menunggu' | 'Berlangsung' | 'Dibatalkan';
}

export interface KpiCard {
  title: string;
  value: string;
  percentage: string;
  period: string;
  icon: string;
  colorClass: 'purple' | 'teal' | 'blue' | 'red' | 'amber';
}

@Component({
  selector: 'app-telefarmasi',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet],
  templateUrl: './telefarmasi.html',
  styleUrl: './telefarmasi.css',
})
export class Telefarmasi implements OnInit {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly showingDetails = signal<boolean>(false);

  // 5 KPI Cards matching UI mockup
  readonly kpiCards: KpiCard[] = [
    {
      title: 'Total Konsultasi',
      value: '3.245',
      percentage: '12.5%',
      period: 'dari minggu lalu',
      icon: 'ri-video-chat-line',
      colorClass: 'purple',
    },
    {
      title: 'Konsultasi Selesai',
      value: '2.345',
      percentage: '12.5%',
      period: 'dari minggu lalu',
      icon: 'ri-chat-check-line',
      colorClass: 'teal',
    },
    {
      title: 'Berlangsung',
      value: '128',
      percentage: '12.5%',
      period: 'dari minggu lalu',
      icon: 'ri-chat-voice-line',
      colorClass: 'blue',
    },
    {
      title: 'Dibatalkan',
      value: '316',
      percentage: '12.5%',
      period: 'dari minggu lalu',
      icon: 'ri-video-off-line',
      colorClass: 'red',
    },
    {
      title: 'Menunggu Antrian',
      value: '456',
      percentage: '12.5%',
      period: 'dari minggu lalu',
      icon: 'ri-time-line',
      colorClass: 'amber',
    },
  ];

  // Active Category Tab
  readonly activeCategory = signal<string>('Semua Fasilitas');
  readonly categoryTabs = [
    'Semua Fasilitas',
    'Menunggu Antrian',
    'Sedang Berlangsung',
    'Selesai',
    'Dibatalkan',
  ];

  // Search & Filter
  readonly searchQuery = signal<string>('');
  readonly filterStatus = signal<string>('Pilih Status');

  // Pagination
  readonly page = signal<number>(1);
  readonly pageSize = signal<number>(10);
  readonly totalItems = signal<number>(12458);

  // Table Data matching UI mockup (Apoteker Column)
  readonly consultationList: TelefarmasiItem[] = [
    {
      id: '#TRX24025-0012',
      cleanId: 'CNS24025-0012',
      tipe: 'Video Call Consultation',
      pasien: {
        nama: 'Ahmad Fauzi',
        gender: 'Laki-laki',
        avatar: 'assets/images/avatar/male.png',
      },
      apoteker: {
        nama: 'apt. Rina Meliani, S.Farm',
        sip: 'SIP: 503/SIP-DOK/JS/2024',
        avatar: 'assets/images/avatar/female.png',
      },
      spesialisasi: 'Farmasi Klinis',
      tanggal: '24 Mei 2026',
      waktu: '10:30 WIB',
      durasi: '30 menit',
      status: 'Selesai',
    },
    {
      id: '#TRX24025-0012',
      cleanId: 'CNS24025-0013',
      tipe: 'Video Call Consultation',
      pasien: {
        nama: 'Dewi Lestari',
        gender: 'Perempuan',
        avatar: 'assets/images/avatar/female.png',
      },
      apoteker: {
        nama: 'apt. Rina Meliani, S.Farm',
        sip: 'SIP: 503/SIP-DOK/JS/2024',
        avatar: 'assets/images/avatar/female.png',
      },
      spesialisasi: 'Farmasi Klinis',
      tanggal: '24 Mei 2026',
      waktu: '10:30 WIB',
      durasi: '30 menit',
      status: 'Menunggu',
    },
    {
      id: '#TRX24025-0012',
      cleanId: 'CNS24025-0014',
      tipe: 'Chat Konsultasi',
      pasien: {
        nama: 'Rina Amelia',
        gender: 'Perempuan',
        avatar: 'assets/images/avatar/female.png',
      },
      apoteker: {
        nama: 'apt. Rina Meliani, S.Farm',
        sip: 'SIP: 503/SIP-DOK/JS/2024',
        avatar: 'assets/images/avatar/female.png',
      },
      spesialisasi: 'Farmasi Klinis',
      tanggal: '24 Mei 2026',
      waktu: '10:30 WIB',
      durasi: '30 menit',
      status: 'Dibatalkan',
    },
    {
      id: '#TRX24025-0012',
      cleanId: 'CNS24025-0015',
      tipe: 'Video Call Consultation',
      pasien: {
        nama: 'Budi Santoso',
        gender: 'Laki-laki',
        avatar: 'assets/images/avatar/male.png',
      },
      apoteker: {
        nama: 'apt. Rina Meliani, S.Farm',
        sip: 'SIP: 503/SIP-DOK/JS/2024',
        avatar: 'assets/images/avatar/female.png',
      },
      spesialisasi: 'Farmasi Klinis',
      tanggal: '24 Mei 2026',
      waktu: '10:30 WIB',
      durasi: '30 menit',
      status: 'Selesai',
    },
    {
      id: '#TRX24025-0012',
      cleanId: 'CNS24025-0016',
      tipe: 'Chat Konsultasi',
      pasien: {
        nama: 'Siti Rahma',
        gender: 'Perempuan',
        avatar: 'assets/images/avatar/female.png',
      },
      apoteker: {
        nama: 'apt. Rina Meliani, S.Farm',
        sip: 'SIP: 503/SIP-DOK/JS/2024',
        avatar: 'assets/images/avatar/female.png',
      },
      spesialisasi: 'Farmasi Klinis',
      tanggal: '24 Mei 2026',
      waktu: '10:30 WIB',
      durasi: '30 menit',
      status: 'Selesai',
    },
    {
      id: '#TRX24025-0012',
      cleanId: 'CNS24025-0017',
      tipe: 'Video Call Consultation',
      pasien: {
        nama: 'Andi Wijaya',
        gender: 'Laki-laki',
        avatar: 'assets/images/avatar/male.png',
      },
      apoteker: {
        nama: 'apt. Rina Meliani, S.Farm',
        sip: 'SIP: 503/SIP-DOK/JS/2024',
        avatar: 'assets/images/avatar/female.png',
      },
      spesialisasi: 'Farmasi Klinis',
      tanggal: '24 Mei 2026',
      waktu: '10:30 WIB',
      durasi: '30 menit',
      status: 'Selesai',
    },
    {
      id: '#TRX24025-0012',
      cleanId: 'CNS24025-0018',
      tipe: 'Chat Konsultasi',
      pasien: {
        nama: 'Maya Sari',
        gender: 'Perempuan',
        avatar: 'assets/images/avatar/female.png',
      },
      apoteker: {
        nama: 'apt. Rina Meliani, S.Farm',
        sip: 'SIP: 503/SIP-DOK/JS/2024',
        avatar: 'assets/images/avatar/female.png',
      },
      spesialisasi: 'Farmasi Klinis',
      tanggal: '24 Mei 2026',
      waktu: '10:30 WIB',
      durasi: '30 menit',
      status: 'Selesai',
    },
    {
      id: '#TRX24025-0012',
      cleanId: 'CNS24025-0019',
      tipe: 'Chat Konsultasi',
      pasien: {
        nama: 'Fajar Hidayat',
        gender: 'Laki-laki',
        avatar: 'assets/images/avatar/male.png',
      },
      apoteker: {
        nama: 'apt. Rina Meliani, S.Farm',
        sip: 'SIP: 503/SIP-DOK/JS/2024',
        avatar: 'assets/images/avatar/female.png',
      },
      spesialisasi: 'Farmasi Klinis',
      tanggal: '24 Mei 2026',
      waktu: '10:30 WIB',
      durasi: '30 menit',
      status: 'Selesai',
    },
    {
      id: '#TRX24025-0012',
      cleanId: 'CNS24025-0020',
      tipe: 'Video Call Consultation',
      pasien: {
        nama: 'Nur Aisyah',
        gender: 'Perempuan',
        avatar: 'assets/images/avatar/female.png',
      },
      apoteker: {
        nama: 'apt. Rina Meliani, S.Farm',
        sip: 'SIP: 503/SIP-DOK/JS/2024',
        avatar: 'assets/images/avatar/female.png',
      },
      spesialisasi: 'Farmasi Klinis',
      tanggal: '24 Mei 2026',
      waktu: '10:30 WIB',
      durasi: '30 menit',
      status: 'Selesai',
    },
    {
      id: '#TRX24025-0012',
      cleanId: 'CNS24025-0021',
      tipe: 'Chat Konsultasi',
      pasien: {
        nama: 'Rizky Pratama',
        gender: 'Laki-laki',
        avatar: 'assets/images/avatar/male.png',
      },
      apoteker: {
        nama: 'apt. Rina Meliani, S.Farm',
        sip: 'SIP: 503/SIP-DOK/JS/2024',
        avatar: 'assets/images/avatar/female.png',
      },
      spesialisasi: 'Farmasi Klinis',
      tanggal: '24 Mei 2026',
      waktu: '10:30 WIB',
      durasi: '30 menit',
      status: 'Selesai',
    },
  ];

  readonly filteredConsultations = computed(() => {
    let list = this.consultationList;

    // Filter by active category tab
    const cat = this.activeCategory();
    if (cat === 'Menunggu Antrian') {
      list = list.filter((i) => i.status === 'Menunggu');
    } else if (cat === 'Sedang Berlangsung') {
      list = list.filter((i) => i.status === 'Berlangsung');
    } else if (cat === 'Selesai') {
      list = list.filter((i) => i.status === 'Selesai');
    } else if (cat === 'Dibatalkan') {
      list = list.filter((i) => i.status === 'Dibatalkan');
    }

    // Filter by search query
    const query = this.searchQuery().toLowerCase().trim();
    if (query) {
      list = list.filter(
        (i) =>
          i.pasien.nama.toLowerCase().includes(query) ||
          i.apoteker.nama.toLowerCase().includes(query) ||
          i.id.toLowerCase().includes(query) ||
          i.spesialisasi.toLowerCase().includes(query)
      );
    }

    // Filter by status dropdown
    const status = this.filterStatus();
    if (status && status !== 'Pilih Status') {
      list = list.filter((i) => i.status === status);
    }

    return list;
  });

  ngOnInit(): void {
    this.updateShowingDetails();
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateShowingDetails();
      });
  }

  private updateShowingDetails(): void {
    const url = this.router.url;
    const isChild =
      url.includes('/admin/telefarmasi/detail-telefarmasi') ||
      url.includes('/admin/telefarmasi/CNS') ||
      (this.route.children.length > 0 &&
        this.route.snapshot.firstChild !== null);
    this.showingDetails.set(isChild);
  }

  setCategory(tab: string): void {
    this.activeCategory.set(tab);
  }

  viewDetail(item: TelefarmasiItem): void {
    this.showingDetails.set(true);
    this.router.navigate(['/admin/telefarmasi/detail-telefarmasi', item.cleanId]);
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Selesai':
        return 'badge-selesai';
      case 'Menunggu':
        return 'badge-menunggu';
      case 'Dibatalkan':
        return 'badge-dibatalkan';
      case 'Berlangsung':
        return 'badge-berlangsung';
      default:
        return '';
    }
  }
}
