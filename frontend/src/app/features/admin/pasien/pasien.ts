import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterOutlet } from '@angular/router';

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
export class Pasien {
  private readonly router = inject(Router, { optional: true });
  private readonly route = inject(ActivatedRoute, { optional: true });
  readonly showingDetails = signal(false);

  readonly statCards: StatCard[] = [
    {
      title: 'Total Pasien',
      value: '12.458',
      percentage: '12.5%',
      period: 'dari minggu lalu',
      color: 'teal',
      icon: 'ri-user-line',
      trendIcon: 'ri-arrow-up-line',
    },
    {
      title: 'Pasien Aktif',
      value: '9.842',
      percentage: '12.5%',
      period: 'dari minggu lalu',
      color: 'slate',
      icon: 'ri-team-line',
      trendIcon: 'ri-arrow-up-line',
    },
    {
      title: 'Pasien Baru',
      value: '568',
      percentage: '12.5%',
      period: 'dari minggu lalu',
      color: 'blue',
      icon: 'ri-user-add-line',
      trendIcon: 'ri-arrow-up-line',
    },
    {
      title: 'Pasien Non-Aktif',
      value: '2.616',
      percentage: '12.5%',
      period: 'dari minggu lalu',
      color: 'red',
      icon: 'ri-user-unfollow-line',
      trendIcon: 'ri-arrow-up-line',
    },
  ];

  readonly records = signal<PasienRecord[]>([
    {
      id: 'PSN-001',
      nik: '3275010101010001',
      name: 'Andi Putra',
      gender: 'Laki-laki',
      birthDate: '01-01-1990',
      phone: '081234567890',
      email: 'andi.putra@gmail.com',
      joinedDate: '01-01-2026',
      tipe: 'Umum',
      status: 'Aktif',
      address: 'Jl. Merdeka No. 12, Bandung',
      bloodType: 'O',
    },
    {
      id: 'PSN-002',
      nik: '3275010101010002',
      name: 'Siti Aminah',
      gender: 'Perempuan',
      birthDate: '15-03-1992',
      phone: '082123456789',
      email: 'sitiaminah@gmail.com',
      joinedDate: '01-01-2026',
      tipe: 'Umum',
      status: 'Aktif',
      address: 'Jl. Cempaka No. 5, Jakarta Selatan',
      bloodType: 'A',
    },
    {
      id: 'PSN-003',
      nik: '3275010101010003',
      name: 'Budi Santoso',
      gender: 'Laki-laki',
      birthDate: '20-07-1988',
      phone: '081398765432',
      email: 'budisantoso@gmail.com',
      joinedDate: '01-01-2026',
      tipe: 'Umum',
      status: 'Aktif',
      address: 'Jl. Diponegoro No. 88, Surabaya',
      bloodType: 'B',
    },
    {
      id: 'PSN-004',
      nik: '3275010101010004',
      name: 'Dewi Lestari',
      gender: 'Perempuan',
      birthDate: '11-11-1995',
      phone: '082211112222',
      email: 'dewilestari@gmail.com',
      joinedDate: '01-01-2026',
      tipe: 'Umum',
      status: 'Aktif',
      address: 'Jl. Gatot Subroto No. 45, Semarang',
      bloodType: 'AB',
    },
    {
      id: 'PSN-005',
      nik: '3275010101010005',
      name: 'Rizky Pratama',
      gender: 'Laki-laki',
      birthDate: '05-05-1998',
      phone: '081433334444',
      email: 'rizkypratama@gmail.com',
      joinedDate: '01-01-2026',
      tipe: 'Umum',
      status: 'Aktif',
      address: 'Jl. Malioboro No. 10, Yogyakarta',
      bloodType: 'O',
    },
    {
      id: 'PSN-006',
      nik: '3275010101010006',
      name: 'Nabila Putri',
      gender: 'Perempuan',
      birthDate: '23-02-1991',
      phone: '081235556666',
      email: 'nabilaputri@gmail.com',
      joinedDate: '01-01-2026',
      tipe: 'Umum',
      status: 'Aktif',
      address: 'Jl. Sudirman No. 22, Depok',
      bloodType: 'A',
    },
    {
      id: 'PSN-007',
      nik: '3275010101010007',
      name: 'Fajar Rahman',
      gender: 'Laki-laki',
      birthDate: '18-09-1991',
      phone: '081577778888',
      email: 'fajarrahman@gmail.com',
      joinedDate: '01-01-2026',
      tipe: 'Umum',
      status: 'Aktif',
      address: 'Jl. Pahlawan No. 7, Malang',
      bloodType: 'B',
    },
    {
      id: 'PSN-008',
      nik: '3275010101010008',
      name: 'Maya Sari',
      gender: 'Perempuan',
      birthDate: '12-12-1994',
      phone: '082699990000',
      email: 'mayasari@gmail.com',
      joinedDate: '01-01-2026',
      tipe: 'Umum',
      status: 'Aktif',
      address: 'Jl. Juanda No. 34, Bogor',
      bloodType: 'O',
    },
    {
      id: 'PSN-009',
      nik: '3275010101010009',
      name: 'Hendra Gunawan',
      gender: 'Laki-laki',
      birthDate: '30-10-1987',
      phone: '081712123434',
      email: 'hendragunawan@gmail.com',
      joinedDate: '01-01-2026',
      tipe: 'Umum',
      status: 'Aktif',
      address: 'Jl. Ahmad Yani No. 19, Bekasi',
      bloodType: 'AB',
    },
    {
      id: 'PSN-010',
      nik: '3275010101010010',
      name: 'Ayu Wulandari',
      gender: 'Perempuan',
      birthDate: '07-04-1998',
      phone: '082813131414',
      email: 'ayuwulandari@gmail.com',
      joinedDate: '01-01-2026',
      tipe: 'Umum',
      status: 'Aktif',
      address: 'Jl. Riau No. 101, Pekanbaru',
      bloodType: 'B',
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
  readonly activeModal = signal<'detail' | 'edit' | 'add' | 'delete' | null>(null);
  readonly selectedPatient = signal<PasienRecord | null>(null);

  // Form draft for add/edit
  formData: Partial<PasienRecord> = {};

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
    if (this.router && this.route) {
      void this.router.navigate([patient.id], { relativeTo: this.route });
    }
  }

  openEdit(patient: PasienRecord): void {
    this.selectedPatient.set(patient);
    if (this.router && this.route) {
      void this.router.navigate(['edit-pasien', patient.id], { relativeTo: this.route });
    }
  }

  openAdd(): void {
    if (this.router && this.route) {
      void this.router.navigate(['tambah-pasien'], { relativeTo: this.route });
    }
  }

  openDelete(patient: PasienRecord): void {
    this.selectedPatient.set(patient);
    this.activeModal.set('delete');
  }

  closeModal(): void {
    this.activeModal.set(null);
    this.selectedPatient.set(null);
    this.formData = {};
  }

  saveEdit(): void {
    const current = this.selectedPatient();
    if (!current) return;

    this.records.update((list) =>
      list.map((item) =>
        item.id === current.id ? ({ ...item, ...this.formData } as PasienRecord) : item
      )
    );
    this.closeModal();
  }

  saveAdd(): void {
    const newId = `PSN-${String(this.records().length + 1).padStart(3, '0')}`;
    const newRecord: PasienRecord = {
      id: newId,
      nik: this.formData.nik || `327501010101${String(this.records().length + 1).padStart(4, '0')}`,
      name: this.formData.name || 'Pasien Baru',
      gender: (this.formData.gender as 'Laki-laki' | 'Perempuan') || 'Laki-laki',
      birthDate: this.formData.birthDate || '01-01-1995',
      phone: this.formData.phone || '081200000000',
      email: this.formData.email || 'pasien@gmail.com',
      joinedDate: '01-01-2026',
      tipe: this.formData.tipe || 'Umum',
      status: (this.formData.status as 'Aktif' | 'Non-Aktif') || 'Aktif',
      address: this.formData.address || '-',
      bloodType: this.formData.bloodType || 'O',
    };

    this.records.update((list) => [newRecord, ...list]);
    this.closeModal();
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
      ['No,NIK,Nama Lengkap,Jenis Kelamin,Tanggal Lahir,Kontak,Email,Tanggal Bergabung,Tipe']
        .concat(
          this.filteredRecords().map(
            (r, i) =>
              `${i + 1},"${r.nik}","${r.name}","${r.gender}","${r.birthDate}","${r.phone}","${r.email}","${r.joinedDate}","${r.tipe}"`
          )
        )
        .join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'daftar_pasien.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
