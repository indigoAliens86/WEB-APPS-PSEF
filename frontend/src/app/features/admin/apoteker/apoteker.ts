import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterOutlet } from '@angular/router';

export interface PharmacistRecord {
  id: string;
  name: string;
  facility: string;
  avatar: string;
  gender: 'female' | 'male';
  email: string;
  phone: string;
  specialty: string;
  sip: string;
  stra: string;
  joinedDate: string;
  joinedTime: string;
  status: 'Aktif' | 'Non-Aktif' | 'Suspended';
  verification: 'Terverifikasi' | 'Menunggu Verifikasi' | 'Ditolak';
}

export interface StatCard {
  title: string;
  value: string;
  percentage: string;
  period: string;
  color: 'slate' | 'teal' | 'blue' | 'red' | 'amber';
  icon: string;
  trendIcon?: string;
}

@Component({
  selector: 'app-apoteker',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet],
  templateUrl: './apoteker.html',
  styleUrl: './apoteker.css',
})
export class Apoteker {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly showingDetails = signal(false);

  readonly statCards: StatCard[] = [
    {
      title: 'Total Apoteker',
      value: '1.845',
      percentage: '10.2%',
      period: 'dari bulan lalu',
      color: 'slate',
      icon: 'ri-capsule-line',
      trendIcon: 'ri-arrow-up-line',
    },
    {
      title: 'Apoteker Aktif',
      value: '1.560',
      percentage: '7.1%',
      period: 'dari minggu lalu',
      color: 'teal',
      icon: 'ri-user-follow-line',
      trendIcon: 'ri-arrow-up-line',
    },
    {
      title: 'Menunggu Verifikasi',
      value: '86',
      percentage: '2.8%',
      period: 'perlu ditinjau',
      color: 'blue',
      icon: 'ri-time-line',
      trendIcon: 'ri-arrow-up-line',
    },
    {
      title: 'Verifikasi Ditolak',
      value: '19',
      percentage: '0.9%',
      period: 'berkas tidak sesuai',
      color: 'red',
      icon: 'ri-close-circle-line',
      trendIcon: 'ri-arrow-down-line',
    },
    {
      title: 'SIPA Kedaluwarsa',
      value: '24',
      percentage: '1.4%',
      period: 'perlu perpanjangan',
      color: 'amber',
      icon: 'ri-alarm-warning-line',
      trendIcon: 'ri-arrow-down-line',
    },
  ];

  readonly records = signal<PharmacistRecord[]>([
    {
      id: 'APT-001',
      name: 'apt. Andi Pratama, S.Farm',
      facility: 'Apotek Keluarga Medika',
      avatar: '/assets/images/avatar/male.png',
      gender: 'male',
      email: 'andi.pratama@healora.id',
      phone: '0812-4556-7890',
      specialty: 'Farmasi Komunitas',
      sip: '35.79/25/1235',
      stra: '317129/25/1002',
      joinedDate: '10 Mei 2025',
      joinedTime: '10:30',
      status: 'Non-Aktif',
      verification: 'Terverifikasi',
    },
    {
      id: 'APT-002',
      name: 'apt. Siti Aisyah, S.Farm',
      facility: 'Kimia Farma Sukajadi',
      avatar: '/assets/images/avatar/female.png',
      gender: 'female',
      email: 'siti.aisyah@healora.id',
      phone: '0813-6677-8899',
      specialty: 'Farmasi Industri',
      sip: '35.79/25/3456',
      stra: '317129/25/1003',
      joinedDate: '5 Mei 2025',
      joinedTime: '10:30',
      status: 'Suspended',
      verification: 'Terverifikasi',
    },
    {
      id: 'APT-003',
      name: 'apt. Dimas Nugraha, M.Farm',
      facility: 'RS Sejahtera Bandung',
      avatar: '/assets/images/avatar/male.png',
      gender: 'male',
      email: 'dimas.nugraha@healora.id',
      phone: '0812-8877-2233',
      specialty: 'Farmasi Rumah Sakit',
      sip: '35.79/25/4567',
      stra: '317129/25/1004',
      joinedDate: '7 Mei 2025',
      joinedTime: '10:30',
      status: 'Aktif',
      verification: 'Terverifikasi',
    },
    {
      id: 'APT-004',
      name: 'apt. Intan Permata, S.Farm',
      facility: 'Apotek Harmoni',
      avatar: '/assets/images/avatar/female.png',
      gender: 'female',
      email: 'intan.permata@healora.id',
      phone: '0813-1122-3344',
      specialty: 'Farmasi Klinis',
      sip: '35.79/25/5678',
      stra: '317129/25/1005',
      joinedDate: '1 Mei 2025',
      joinedTime: '10:30',
      status: 'Aktif',
      verification: 'Terverifikasi',
    },
    {
      id: 'APT-005',
      name: 'apt. Rahmat Hidayat, Apt',
      facility: 'RS Bunda Medika',
      avatar: '/assets/images/avatar/male.png',
      gender: 'male',
      email: 'rahmat.hidayat@healora.id',
      phone: '0812-9988-7766',
      specialty: 'Farmasi Rumah Sakit',
      sip: '35.79/25/6789',
      stra: '317129/25/1006',
      joinedDate: '29-Apr-25',
      joinedTime: '10:30',
      status: 'Aktif',
      verification: 'Terverifikasi',
    },
    {
      id: 'APT-006',
      name: 'apt. Maya Kartika, S.Farm',
      facility: 'Apotek Mitra Farma',
      avatar: '/assets/images/avatar/female.png',
      gender: 'female',
      email: 'maya.kartika@healora.id',
      phone: '0813-4455-6677',
      specialty: 'Farmasi Komunitas',
      sip: '35.79/25/7890',
      stra: '317129/25/1007',
      joinedDate: '26-Apr-25',
      joinedTime: '10:30',
      status: 'Aktif',
      verification: 'Terverifikasi',
    },
    {
      id: 'APT-007',
      name: 'apt. Fajar Ramadhan, S.Farm',
      facility: 'Apotek Prima Sehat',
      avatar: '/assets/images/avatar/male.png',
      gender: 'male',
      email: 'fajar.ramadhan@healora.id',
      phone: '0812-6677-5544',
      specialty: 'Farmasi Industri',
      sip: '35.79/25/8901',
      stra: '317129/25/1008',
      joinedDate: '20-Apr-25',
      joinedTime: '10:30',
      status: 'Aktif',
      verification: 'Terverifikasi',
    },
    {
      id: 'APT-008',
      name: 'apt. Nabila Putri, M.Farm',
      facility: 'Klinik Medika Utama',
      avatar: '/assets/images/avatar/female.png',
      gender: 'female',
      email: 'nabila.putri@healora.id',
      phone: '0813-7788-9900',
      specialty: 'Farmasi Klinis',
      sip: '35.79/25/9012',
      stra: '317129/25/1009',
      joinedDate: '18-Apr-25',
      joinedTime: '10:30',
      status: 'Aktif',
      verification: 'Terverifikasi',
    },
    {
      id: 'APT-009',
      name: 'apt. Yusuf Maulana, S.Farm',
      facility: 'RS Mitra Husada',
      avatar: '/assets/images/avatar/male.png',
      gender: 'male',
      email: 'yusuf.maulana@healora.id',
      phone: '0812-3344-9988',
      specialty: 'Farmasi Rumah Sakit',
      sip: '35.79/25/1122',
      stra: '317129/25/1010',
      joinedDate: '15-Apr-25',
      joinedTime: '10:30',
      status: 'Aktif',
      verification: 'Terverifikasi',
    },
    {
      id: 'APT-010',
      name: 'Apt. Dwi Rahmawati, S.Farm',
      facility: 'Apotek Harmoni',
      avatar: '/assets/images/avatar/female.png',
      gender: 'female',
      email: 'dwi.rahmawati@healora.id',
      phone: '0813-0000-0101',
      specialty: 'Farmasi Komunitas',
      sip: '35.79/25/1133',
      stra: '317129/25/1011',
      joinedDate: '12-Apr-25',
      joinedTime: '10:30',
      status: 'Aktif',
      verification: 'Terverifikasi',
    },
  ]);

  readonly search = signal('');
  readonly specialtyFilter = signal('');
  readonly verificationFilter = signal('');
  readonly statusFilter = signal('');
  readonly page = signal(1);
  readonly pageSize = signal(10);

  readonly modal = signal<'closed' | 'add'>('closed');
  readonly selectedPharmacist = signal<PharmacistRecord | null>(null);

  // Form draft for add apoteker
  draftPharmacist: Partial<PharmacistRecord> = {
    name: '',
    facility: '',
    specialty: 'Farmasi Komunitas',
    email: '',
    phone: '',
    sip: '',
    stra: '',
    status: 'Aktif',
    verification: 'Terverifikasi',
    gender: 'female',
  };
  formError = signal('');

  readonly specialties = [
    'Farmasi Komunitas',
    'Farmasi Klinis',
    'Farmasi Industri',
    'Farmasi Rumah Sakit',
    'Bahan Alam',
    'Umum',
  ];

  readonly verifications = ['Terverifikasi', 'Menunggu Verifikasi', 'Ditolak'];
  readonly statuses = ['Aktif', 'Non-Aktif', 'Suspended'];

  readonly filteredRecords = computed(() => {
    const q = this.search().trim().toLowerCase();
    const spec = this.specialtyFilter();
    const verif = this.verificationFilter();
    const stat = this.statusFilter();

    return this.records().filter((record) => {
      const matchSearch =
        !q ||
        record.name.toLowerCase().includes(q) ||
        record.facility.toLowerCase().includes(q) ||
        record.email.toLowerCase().includes(q) ||
        record.phone.toLowerCase().includes(q) ||
        record.specialty.toLowerCase().includes(q) ||
        record.sip.toLowerCase().includes(q) ||
        record.stra.toLowerCase().includes(q);

      const matchSpec = !spec || record.specialty === spec;
      const matchVerif = !verif || record.verification === verif;
      const matchStat = !stat || record.status === stat;

      return matchSearch && matchSpec && matchVerif && matchStat;
    });
  });

  readonly paginatedRecords = computed(() => {
    const start = (this.page() - 1) * this.pageSize();
    return this.filteredRecords().slice(start, start + this.pageSize());
  });

  get totalCount(): number {
    return this.filteredRecords().length;
  }

  get pageCount(): number {
    return Math.max(1, Math.ceil(this.totalCount / this.pageSize()));
  }

  onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.search.set(target.value);
    this.page.set(1);
  }

  onFilterChange(): void {
    this.page.set(1);
  }

  resetFilters(): void {
    this.search.set('');
    this.specialtyFilter.set('');
    this.verificationFilter.set('');
    this.statusFilter.set('');
    this.page.set(1);
  }

  setPage(p: number): void {
    this.page.set(Math.min(Math.max(1, p), this.pageCount));
  }

  openDetail(pharmacist: PharmacistRecord): void {
    this.selectedPharmacist.set(pharmacist);
    void this.router.navigate([pharmacist.id], { relativeTo: this.route });
  }

  openAdd(): void {
    void this.router.navigate(['tambah-apoteker'], { relativeTo: this.route });
  }

  openEdit(pharmacist: PharmacistRecord): void {
    void this.router.navigate(['edit-apoteker', pharmacist.id], { relativeTo: this.route });
  }

  closeModal(): void {
    this.modal.set('closed');
    this.formError.set('');
  }

  savePharmacist(): void {
    if (!this.draftPharmacist.name || !this.draftPharmacist.facility) {
      this.formError.set('Nama dan Fasilitas wajib diisi.');
      return;
    }

    const newRecord: PharmacistRecord = {
      id: `APT-${String(this.records().length + 1).padStart(3, '0')}`,
      name: this.draftPharmacist.name!,
      facility: this.draftPharmacist.facility!,
      avatar:
        this.draftPharmacist.gender === 'female'
          ? '/assets/images/avatar/female.png'
          : '/assets/images/avatar/male.png',
      gender: this.draftPharmacist.gender ?? 'female',
      email: this.draftPharmacist.email || 'apoteker@healora.id',
      phone: this.draftPharmacist.phone || '0812-3456-7890',
      specialty: this.draftPharmacist.specialty || 'Farmasi Komunitas',
      sip: this.draftPharmacist.sip || 'SIP/2025/APT-001',
      stra: this.draftPharmacist.stra || 'STR/2025/APT-001',
      joinedDate: '12 Okt 2026',
      joinedTime: '10:30',
      status: (this.draftPharmacist.status as any) || 'Aktif',
      verification: (this.draftPharmacist.verification as any) || 'Terverifikasi',
    };

    this.records.update((prev) => [newRecord, ...prev]);
    this.closeModal();
  }

  exportData(): void {
    const csvHeader = 'No,Nama,Fasilitas,Kontak,Spesialisasi,SIP,STRA,Bergabung,Status,Verifikasi\n';
    const csvRows = this.filteredRecords().map((r, i) =>
      `"${i + 1}","${r.name}","${r.facility}","${r.email} / ${r.phone}","${r.specialty}","${r.sip}","${r.stra}","${r.joinedDate} ${r.joinedTime}","${r.status}","${r.verification}"`
    ).join('\n');

    const blob = new Blob([`\uFEFF${csvHeader}${csvRows}`], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'daftar-apoteker.csv';
    link.click();
    URL.revokeObjectURL(link.href);
  }

  onAvatarError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = '/assets/images/avatar/female.png';
  }
}
