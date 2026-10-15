import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-apoteker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-apoteker.html',
  styleUrl: './edit-apoteker.css',
})
export class EditApoteker implements OnInit {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly isSubmitting = signal(false);
  readonly saveSuccess = signal(false);
  readonly errorMessage = signal('');
  readonly pharmacistId = signal('APT-001');

  readonly specialties: string[] = [
    'Farmasi Komunitas',
    'Farmasi Klinis',
    'Farmasi Rumah Sakit',
    'Farmasi Industri',
    'Farmasi Distribusi (PBF)',
    'Farmasi Bahan Alam & Kosmetik',
  ];

  readonly facilityTypes: string[] = [
    'Apotek',
    'Instalasi Farmasi Rumah Sakit',
    'Klinik Pratama / Utama',
    'Pedagang Besar Farmasi (PBF)',
    'Industri Farmasi',
  ];

  formData = {
    name: 'apt. Andi Pratama, S.Farm',
    nik: '3275011205900002',
    gender: 'male' as 'female' | 'male',
    birthPlace: 'Bandung',
    birthDate: '1992-07-15',
    email: 'andi.pratama@healora.id',
    phone: '0812-4556-7890',
    address:
      'Jalan Cempernik Indah Blok B-27 No 1A, Kelurahan Cempernik Indah Kecamatan Cempernik Kota Cempernik Provinsi Jawa Barat 43123',
    about:
      'Apoteker dengan pengalaman di bidang farmasi komunitas dan pelayanan resep rawat jalan selama lebih dari 4 tahun. Berkomitmen memberikan pelayanan kefarmasian terbaik dan edukasi kepatuhan minum obat kepada pasien.',
    specialty: 'Farmasi Komunitas',
    lastEducation: 'Profesi Apoteker',
    educationInstitution: 'Sekolah Tinggi Ilmu Farmasi Padang',
    diplomaNumber: '105/STIFARM/Apt/VI/2024',
    graduationYear: '2024',
    sipa: '35.79/25/1235',
    sipaExpiry: '10 Mei 2028',
    sipaIssuer: 'Dinas Kesehatan Kota Bandung',
    stra: '317129/25/1002',
    straExpiry: 'Seumur Hidup',
    facility: 'Apotek Keluarga Medika',
    facilityType: 'Apotek',
    position: 'Apoteker Pengelola Apotek (APA)',
    practiceSchedule: 'Senin - Sabtu (08.00 - 16.00)',
    status: 'Aktif' as 'Aktif' | 'Non-Aktif' | 'Suspended',
    verification: 'Terverifikasi' as 'Terverifikasi' | 'Menunggu Verifikasi' | 'Ditolak',
    notes: 'Dokumen SIPA dan STRA terverifikasi resmi melalui SISK Kemenkes.',
  };

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pharmacistId.set(id);
    }
  }

  goBack(): void {
    void this.router.navigate(['/admin/apoteker']);
  }

  save(): void {
    this.errorMessage.set('');

    if (!this.formData.name.trim()) {
      this.errorMessage.set('Nama apoteker wajib diisi.');
      return;
    }
    if (!this.formData.email.trim()) {
      this.errorMessage.set('Email apoteker wajib diisi.');
      return;
    }
    if (!this.formData.facility.trim()) {
      this.errorMessage.set('Fasilitas kefarmasian wajib diisi.');
      return;
    }
    if (!this.formData.sipa.trim()) {
      this.errorMessage.set('Nomor SIPA wajib diisi.');
      return;
    }

    this.isSubmitting.set(true);
    setTimeout(() => {
      this.isSubmitting.set(false);
      this.saveSuccess.set(true);
      setTimeout(() => {
        void this.router.navigate(['/admin/apoteker']);
      }, 900);
    }, 600);
  }
}
