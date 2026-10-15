import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';

export interface TelemedisinItem {
  id: string;
  cleanId: string;
  tipe: 'Video Call Consultation' | 'Chat Konsultasi';
  pasien: {
    nama: string;
    gender: 'Laki-laki' | 'Perempuan';
    avatar: string;
  };
  dokter: {
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
  selector: 'app-telemedisin',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet],
  templateUrl: './telemedisin.html',
  styleUrl: './telemedisin.css',
})
export class Telemedisin implements OnInit {
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

  // Table Data matching UI mockup
  readonly consultationList: TelemedisinItem[] = [
    {
      id: '#TRX24025-0012',
      cleanId: 'CNS24025-0012',
      tipe: 'Video Call Consultation',
      pasien: {
        nama: 'Ahmad Fauzi',
        gender: 'Laki-laki',
        avatar: 'assets/images/avatar/male.png',
      },
      dokter: {
        nama: 'dr. Sarah Aulia, Sp.OG',
        sip: 'SIP.3273/OG/2501',
        avatar: 'assets/images/avatar/female.png',
      },
      spesialisasi: 'Obstetri & Ginekologi',
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
      dokter: {
        nama: 'dr. Sarah Aulia, Sp.OG',
        sip: 'SIP.3273/OG/2501',
        avatar: 'assets/images/avatar/female.png',
      },
      spesialisasi: 'Obstetri & Ginekologi',
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
      dokter: {
        nama: 'dr. Sarah Aulia, Sp.OG',
        sip: 'SIP.3273/OG/2501',
        avatar: 'assets/images/avatar/female.png',
      },
      spesialisasi: 'Obstetri & Ginekologi',
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
      dokter: {
        nama: 'dr. Sarah Aulia, Sp.OG',
        sip: 'SIP.3273/OG/2501',
        avatar: 'assets/images/avatar/female.png',
      },
      spesialisasi: 'Obstetri & Ginekologi',
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
      dokter: {
        nama: 'dr. Sarah Aulia, Sp.OG',
        sip: 'SIP.3273/OG/2501',
        avatar: 'assets/images/avatar/female.png',
      },
      spesialisasi: 'Obstetri & Ginekologi',
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
      dokter: {
        nama: 'dr. Sarah Aulia, Sp.OG',
        sip: 'SIP.3273/OG/2501',
        avatar: 'assets/images/avatar/female.png',
      },
      spesialisasi: 'Obstetri & Ginekologi',
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
      dokter: {
        nama: 'dr. Sarah Aulia, Sp.OG',
        sip: 'SIP.3273/OG/2501',
        avatar: 'assets/images/avatar/female.png',
      },
      spesialisasi: 'Obstetri & Ginekologi',
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
      dokter: {
        nama: 'dr. Sarah Aulia, Sp.OG',
        sip: 'SIP.3273/OG/2501',
        avatar: 'assets/images/avatar/female.png',
      },
      spesialisasi: 'Obstetri & Ginekologi',
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
      dokter: {
        nama: 'dr. Sarah Aulia, Sp.OG',
        sip: 'SIP.3273/OG/2501',
        avatar: 'assets/images/avatar/female.png',
      },
      spesialisasi: 'Obstetri & Ginekologi',
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
      dokter: {
        nama: 'dr. Sarah Aulia, Sp.OG',
        sip: 'SIP.3273/OG/2501',
        avatar: 'assets/images/avatar/female.png',
      },
      spesialisasi: 'Obstetri & Ginekologi',
      tanggal: '24 Mei 2026',
      waktu: '10:30 WIB',
      durasi: '30 menit',
      status: 'Selesai',
    },
  ];

  // Filtered List
  readonly filteredConsultations = computed(() => {
    let list = this.consultationList;

    // Filter by tab
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

    // Filter by dropdown status
    const statusF = this.filterStatus();
    if (statusF && statusF !== 'Pilih Status') {
      list = list.filter((i) => i.status === statusF);
    }

    // Filter by search query
    const query = this.searchQuery().trim().toLowerCase();
    if (query) {
      list = list.filter(
        (i) =>
          i.id.toLowerCase().includes(query) ||
          i.cleanId.toLowerCase().includes(query) ||
          i.pasien.nama.toLowerCase().includes(query) ||
          i.dokter.nama.toLowerCase().includes(query) ||
          i.spesialisasi.toLowerCase().includes(query)
      );
    }

    return list;
  });

  ngOnInit(): void {
    this.updateChildState();

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateChildState();
      });
  }

  private updateChildState(): void {
    const isChild =
      this.route.children.length > 0 ||
      this.router.url.includes('/detail-telemedisin');
    this.showingDetails.set(isChild);
  }

  selectCategory(cat: string): void {
    this.activeCategory.set(cat);
  }

  goToDetail(item: TelemedisinItem): void {
    this.router.navigate(['/admin/telemedisin/detail-telemedisin', item.cleanId]);
  }

  exportData(): void {
    // Demo export handler
    alert('Mengekspor data konsultasi telemedicine ke format Excel/CSV...');
  }
}
