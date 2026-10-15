import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-apoteker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-apoteker.html',
  styleUrl: './add-apoteker.css',
})
export class AddApoteker {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly isSubmitting = signal(false);
  readonly saveSuccess = signal(false);
  readonly errorMessage = signal('');

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
    name: '',
    nik: '',
    gender: 'male' as 'female' | 'male',
    birthPlace: '',
    birthDate: '',
    email: '',
    phone: '',
    address: '',
    about: '',
    specialty: 'Farmasi Komunitas',
    lastEducation: 'Profesi Apoteker',
    educationInstitution: '',
    diplomaNumber: '',
    graduationYear: '2024',
    sipa: '',
    sipaExpiry: '',
    sipaIssuer: 'Dinas Kesehatan Kota Bandung',
    stra: '',
    straExpiry: 'Seumur Hidup',
    facility: '',
    facilityType: 'Apotek',
    position: 'Apoteker Pengelola Apotek (APA)',
    practiceSchedule: 'Senin - Sabtu (08.00 - 16.00)',
    status: 'Aktif' as 'Aktif' | 'Non-Aktif' | 'Suspended',
    verification: 'Menunggu Verifikasi' as 'Terverifikasi' | 'Menunggu Verifikasi' | 'Ditolak',
    notes: '',
  };

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
