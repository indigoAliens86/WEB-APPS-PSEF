import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';

export interface PasienRecord {
  id: string;
  nik: string;
  name: string;
  gender: 'Laki-laki' | 'Perempuan';
  birthDate: string;
  phone: string;
  email: string;
  joinedDate: string;
  tipe: string;
  status: 'Aktif' | 'Non-Aktif';
  address?: string;
  bloodType?: string;
  fasilitasId?: string;
  totalKonsultasiFasilitas?: number;
  totalResepFasilitas?: number;
}

export interface StatCard {
  title: string;
  value: string;
  percentage: string;
  period: string;
  color: 'teal' | 'slate' | 'blue' | 'red';
  icon: string;
  trendIcon?: string;
}

@Component({
  selector: 'app-pasien',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet],
  templateUrl: './pasien.html',
  styleUrl: './pasien.css',
})
export class Pasien implements OnInit {
  private readonly router = inject(Router, { optional: true });
  private readonly route = inject(ActivatedRoute, { optional: true });

  readonly showingDetails = signal<boolean>(false);
  readonly currentFasilitasId = signal<string>('FAS-001');
  readonly currentFasilitasName = signal<string>('Apotek Kimia Sehat PSEF');

  // Stat Cards Scoped to Facility
  readonly statCards: StatCard[] = [
    {
      title: 'Total Pasien Terlayani',
      value: '3.428',
      percentage: '12.5%',
      period: 'dari minggu lalu',
      color: 'teal',
      icon: 'ri-user-line',
      trendIcon: 'ri-arrow-up-line',
    },
    {
      title: 'Pasien Aktif',
      value: '2.842',
      percentage: '12.5%',
      period: 'dari minggu lalu',
      color: 'slate',
      icon: 'ri-team-line',
      trendIcon: 'ri-arrow-up-line',
    },
    {
      title: 'Pasien Baru',
      value: '246',
      percentage: '12.5%',
      period: 'dari minggu lalu',
      color: 'blue',
      icon: 'ri-user-add-line',
      trendIcon: 'ri-arrow-up-line',
    },
    {
      title: 'Pasien Non-Aktif',
      value: '340',
      percentage: '12.5%',
      period: 'dari minggu lalu',
      color: 'red',
      icon: 'ri-user-unfollow-line',
      trendIcon: 'ri-arrow-up-line',
    },
  ];

  // Patients who have history in this facility
  readonly records = signal<PasienRecord[]>([
    {
      id: 'PSN-001',
      nik: '3275010101010001',
      name: 'Andi Putra',
      gender: 'Laki-laki',
      birthDate: '01-01-1990',
      phone: '0812-3456-7890',
      email: 'andi.putra@gmail.com',
      joinedDate: '01-01-2026',
      tipe: 'Umum',
      status: 'Aktif',
      address: 'Jalan Merdeka No.1 , Jakarta Pusat, DKI Jakarta 10110',
      bloodType: 'O',
      fasilitasId: 'FAS-001',
      totalKonsultasiFasilitas: 4,
      totalResepFasilitas: 7,
    },
    {
      id: 'PSN-002',
      nik: '3275010101010002',
      name: 'Siti Aminah',
      gender: 'Perempuan',
      birthDate: '15-03-1992',
      phone: '0821-2345-6789',
      email: 'sitiaminah@gmail.com',
      joinedDate: '01-01-2026',
      tipe: 'Umum',
      status: 'Aktif',
      address: 'Jl. Cempaka No. 5, Jakarta Selatan',
      bloodType: 'A',
      fasilitasId: 'FAS-001',
      totalKonsultasiFasilitas: 2,
      totalResepFasilitas: 3,
    },
    {
      id: 'PSN-003',
      nik: '3275010101010003',
      name: 'Budi Santoso',
      gender: 'Laki-laki',
      birthDate: '20-07-1988',
      phone: '0813-9876-5432',
      email: 'budisantoso@gmail.com',
      joinedDate: '01-01-2026',
      tipe: 'Umum',
      status: 'Aktif',
      address: 'Jl. Diponegoro No. 88, Surabaya',
      bloodType: 'B',
      fasilitasId: 'FAS-001',
      totalKonsultasiFasilitas: 5,
      totalResepFasilitas: 8,
    },
    {
      id: 'PSN-004',
      nik: '3275010101010004',
      name: 'Dewi Lestari',
      gender: 'Perempuan',
      birthDate: '11-11-1995',
      phone: '0822-1111-2222',
      email: 'dewilestari@gmail.com',
      joinedDate: '01-01-2026',
      tipe: 'Umum',
      status: 'Aktif',
      address: 'Jl. Gatot Subroto No. 45, Semarang',
      bloodType: 'AB',
      fasilitasId: 'FAS-001',
      totalKonsultasiFasilitas: 3,
      totalResepFasilitas: 4,
    },
    {
      id: 'PSN-005',
      nik: '3275010101010005',
      name: 'Rizky Pratama',
      gender: 'Laki-laki',
      birthDate: '05-05-1998',
      phone: '0814-3333-4444',
      email: 'rizkypratama@gmail.com',
      joinedDate: '01-01-2026',
      tipe: 'Umum',
      status: 'Aktif',
      address: 'Jl. Malioboro No. 10, Yogyakarta',
      bloodType: 'O',
      fasilitasId: 'FAS-001',
      totalKonsultasiFasilitas: 1,
      totalResepFasilitas: 2,
    },
    {
      id: 'PSN-006',
      nik: '3275010101010006',
      name: 'Nabila Putri',
      gender: 'Perempuan',
      birthDate: '23-02-1991',
      phone: '0812-3555-6666',
      email: 'nabilaputri@gmail.com',
      joinedDate: '01-01-2026',
      tipe: 'Umum',
      status: 'Aktif',
      address: 'Jl. Sudirman No. 22, Depok',
      bloodType: 'A',
      fasilitasId: 'FAS-001',
      totalKonsultasiFasilitas: 2,
      totalResepFasilitas: 5,
    },
    {
      id: 'PSN-007',
      nik: '3275010101010007',
      name: 'Fajar Rahman',
      gender: 'Laki-laki',
      birthDate: '18-09-1991',
      phone: '0815-7777-8888',
      email: 'fajarrahman@gmail.com',
      joinedDate: '01-01-2026',
      tipe: 'Umum',
      status: 'Aktif',
      address: 'Jl. Pahlawan No. 7, Malang',
      bloodType: 'B',
      fasilitasId: 'FAS-001',
      totalKonsultasiFasilitas: 4,
      totalResepFasilitas: 6,
    },
    {
      id: 'PSN-008',
      nik: '3275010101010008',
      name: 'Maya Sari',
      gender: 'Perempuan',
      birthDate: '12-12-1994',
      phone: '0826-9999-0000',
      email: 'mayasari@gmail.com',
      joinedDate: '01-01-2026',
      tipe: 'Umum',
      status: 'Aktif',
      address: 'Jl. Juanda No. 34, Bogor',
      bloodType: 'O',
      fasilitasId: 'FAS-001',
      totalKonsultasiFasilitas: 3,
      totalResepFasilitas: 3,
    },
    {
      id: 'PSN-009',
      nik: '3275010101010009',
      name: 'Hendra Gunawan',
      gender: 'Laki-laki',
      birthDate: '30-10-1987',
      phone: '0817-1212-3434',
      email: 'hendragunawan@gmail.com',
      joinedDate: '01-01-2026',
      tipe: 'Umum',
      status: 'Aktif',
      address: 'Jl. Ahmad Yani No. 19, Bekasi',
      bloodType: 'AB',
      fasilitasId: 'FAS-001',
      totalKonsultasiFasilitas: 2,
      totalResepFasilitas: 2,
    },
    {
      id: 'PSN-010',
      nik: '3275010101010010',
      name: 'Ayu Wulandari',
      gender: 'Perempuan',
      birthDate: '07-04-1998',
      phone: '0828-1313-1414',
      email: 'ayuwulandari@gmail.com',
      joinedDate: '01-01-2026',
      tipe: 'Umum',
      status: 'Aktif',
      address: 'Jl. Riau No. 101, Pekanbaru',
      bloodType: 'B',
      fasilitasId: 'FAS-001',
      totalKonsultasiFasilitas: 1,
      totalResepFasilitas: 4,
    },
  ]);

  // Filters & Search
  readonly searchQuery = signal('');
  readonly selectedDate = signal('');
  readonly selectedGender = signal('');
  readonly selectedStatus = signal('');

  // Pagination
  readonly page = signal(1);
  readonly pageSize = signal(10);

  // Filtered records
  readonly filteredRecords = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    const gender = this.selectedGender();
    const status = this.selectedStatus();
    const date = this.selectedDate();

    return this.records().filter((item) => {
      const matchQuery =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.nik.toLowerCase().includes(q) ||
        item.email.toLowerCase().includes(q) ||
        item.phone.toLowerCase().includes(q);

      const matchGender = !gender || item.gender === gender;
      const matchStatus = !status || item.status === status;
      const matchDate = !date || item.birthDate.includes(date) || item.joinedDate.includes(date);

      return matchQuery && matchGender && matchStatus && matchDate;
    });
  });

  readonly totalRecords = computed(() => this.filteredRecords().length);

  readonly paginatedRecords = computed(() => {
    const start = (this.page() - 1) * this.pageSize();
    return this.filteredRecords().slice(start, start + this.pageSize());
  });

  readonly totalPages = computed(() =>
    Math.ceil(this.totalRecords() / this.pageSize()) || 1
  );

  // Modals state
  readonly activeModal = signal<'delete' | null>(null);
  readonly selectedPatient = signal<PasienRecord | null>(null);

  ngOnInit(): void {
    this.updateShowingDetails();
    this.router?.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateShowingDetails();
      });
  }

  private updateShowingDetails(): void {
    if (!this.router) return;
    const url = this.router.url;
    const isChild =
      url.includes('/fasilitas/pasien/detail-pasien') ||
      url.includes('/fasilitas/pasien/PSN') ||
      (this.route?.children.length ? this.route.children.length > 0 : false);
    this.showingDetails.set(isChild);
  }

  setPage(p: number): void {
    if (p >= 1 && p <= this.totalPages()) {
      this.page.set(p);
    }
  }

  setPageSize(size: number): void {
    this.pageSize.set(size);
    this.page.set(1);
  }

  resetFilters(): void {
    this.searchQuery.set('');
    this.selectedDate.set('');
    this.selectedGender.set('');
    this.selectedStatus.set('');
    this.page.set(1);
  }

  openDetail(patient: PasienRecord): void {
    this.selectedPatient.set(patient);
    this.showingDetails.set(true);
    if (this.router && this.route) {
      void this.router.navigate(['/fasilitas/pasien/detail-pasien', patient.id]);
    }
  }

  openDelete(patient: PasienRecord): void {
    this.selectedPatient.set(patient);
    this.activeModal.set('delete');
  }

  closeModal(): void {
    this.activeModal.set(null);
    this.selectedPatient.set(null);
  }

  confirmDelete(): void {
    const current = this.selectedPatient();
    if (!current) return;

    this.records.update((list) => list.filter((item) => item.id !== current.id));
    this.closeModal();
  }

  exportData(): void {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['No,NIK,Nama Lengkap,Jenis Kelamin,Tanggal Lahir,Kontak,Email,Tanggal Bergabung,Tipe,Fasilitas']
        .concat(
          this.filteredRecords().map(
            (r, i) =>
              `${i + 1},"${r.nik}","${r.name}","${r.gender}","${r.birthDate}","${r.phone}","${r.email}","${r.joinedDate}","${r.tipe}","${this.currentFasilitasName()}"`
          )
        )
        .join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'daftar_pasien_fasilitas.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
