import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterOutlet } from '@angular/router';

export interface DoctorRecord {
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
  selector: 'app-dokter',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet],
  templateUrl: './dokter.html',
  styleUrl: './dokter.css',
})
export class Dokter {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  readonly showingDetails = signal(false);
  readonly statCards: StatCard[] = [
    {
      title: 'Total Dokter',
      value: '2.845',
      percentage: '12.5%',
      period: 'dari bulan lalu',
      color: 'slate',
      icon: 'ri-stethoscope-line',
      trendIcon: 'ri-arrow-up-line',
    },
    {
      title: 'Dokter Aktif',
      value: '2.418',
      percentage: '8.4%',
      period: 'dari minggu lalu',
      color: 'teal',
      icon: 'ri-user-follow-line',
      trendIcon: 'ri-arrow-up-line',
    },
    {
      title: 'Menunggu Verifikasi',
      value: '142',
      percentage: '3.2%',
      period: 'perlu ditinjau',
      color: 'blue',
      icon: 'ri-time-line',
      trendIcon: 'ri-arrow-up-line',
    },
    {
      title: 'Verifikasi Ditolak',
      value: '28',
      percentage: '1.1%',
      period: 'berkas tidak sesuai',
      color: 'red',
      icon: 'ri-close-circle-line',
      trendIcon: 'ri-arrow-down-line',
    },
    {
      title: 'SIP Kedaluwarsa',
      value: '35',
      percentage: '2.0%',
      period: 'perlu perpanjangan',
      color: 'amber',
      icon: 'ri-alarm-warning-line',
      trendIcon: 'ri-arrow-down-line',
    },
  ];

  readonly records = signal<DoctorRecord[]>([
    {
      id: 'DOK-001',
      name: 'dr. Sarah Aulia, Sp.OG',
      facility: 'RSIA Bunda Bandung',
      avatar: '/assets/images/avatar/female.png',
      gender: 'female',
      email: 'rina.meilani@healora.id',
      phone: '0822-3344-5566',
      specialty: 'Obstetri & Ginekologi',
      sip: 'NR62712412009799',
      stra: 'JC00001828429426',
      joinedDate: '12 Mei 2025',
      joinedTime: '10:30',
      status: 'Aktif',
      verification: 'Terverifikasi',
    },
    {
      id: 'DOK-002',
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
      id: 'DOK-003',
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
      id: 'DOK-004',
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
      id: 'DOK-005',
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
      id: 'DOK-006',
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
      id: 'DOK-007',
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
      id: 'DOK-008',
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
      id: 'DOK-009',
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
      id: 'DOK-010',
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
  ]);

  readonly search = signal('');
  readonly specialtyFilter = signal('');
  readonly verificationFilter = signal('');
  readonly statusFilter = signal('');
  readonly page = signal(1);
  readonly pageSize = signal(10);

  readonly modal = signal<'closed' | 'detail' | 'add'>('closed');
  readonly selectedDoctor = signal<DoctorRecord | null>(null);

  // Form draft for add doctor
  draftDoctor: Partial<DoctorRecord> = {
    name: '',
    facility: '',
    specialty: '',
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
    'Obstetri & Ginekologi',
    'Farmasi Komunitas',
    'Farmasi Industri',
    'Farmasi Rumah Sakit',
    'Farmasi Klinis',
    'Umum',
    'Anak',
    'Penyakit Dalam',
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

  openDetail(doctor: DoctorRecord): void {
    this.selectedDoctor.set(doctor);
    void this.router.navigate([doctor.id], { relativeTo: this.route });
  }

  openAdd(): void {
    void this.router.navigate(['tambah-dokter'], { relativeTo: this.route });
  }

  openEdit(doctor: DoctorRecord): void {
    void this.router.navigate(['edit-dokter', doctor.id], { relativeTo: this.route });
  }

  closeModal(): void {
    this.modal.set('closed');
    this.selectedDoctor.set(null);
    this.formError.set('');
  }

  saveDoctor(): void {
    if (!this.draftDoctor.name || !this.draftDoctor.facility) {
      this.formError.set('Nama dan Fasilitas wajib diisi.');
      return;
    }

    const newRecord: DoctorRecord = {
      id: `DOK-${String(this.records().length + 1).padStart(3, '0')}`,
      name: this.draftDoctor.name!,
      facility: this.draftDoctor.facility!,
      avatar:
        this.draftDoctor.gender === 'female'
          ? '/assets/images/avatar/female.png'
          : '/assets/images/avatar/male.png',
      gender: this.draftDoctor.gender ?? 'female',
      email: this.draftDoctor.email || 'dokter@healora.id',
      phone: this.draftDoctor.phone || '0812-3456-7890',
      specialty: this.draftDoctor.specialty || 'Umum',
      sip: this.draftDoctor.sip || 'SIP/2025/001',
      stra: this.draftDoctor.stra || 'STR/2025/001',
      joinedDate: '12 Okt 2026',
      joinedTime: '10:30',
      status: this.draftDoctor.status as any || 'Aktif',
      verification: this.draftDoctor.verification as any || 'Terverifikasi',
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
    link.download = 'daftar-dokter.csv';
    link.click();
    URL.revokeObjectURL(link.href);
  }

  onAvatarError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = '/assets/images/avatar/female.png';
  }
}
