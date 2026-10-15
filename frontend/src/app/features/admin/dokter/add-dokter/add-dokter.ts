import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-dokter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-dokter.html',
  styleUrl: './add-dokter.css',
})
export class AddDokter {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly isSubmitting = signal(false);
  readonly saveSuccess = signal(false);
  readonly errorMessage = signal('');

  readonly specialties: string[] = [
    'Obstetri & Ginekologi',
    'Pediatri (Anak)',
    'Penyakit Dalam',
    'Bedah Umum',
    'Kardiologi & Vaskular',
    'Neurologi (Saraf)',
    'Dermatologi & Venereologi',
    'Psikiatri (Jiwa)',
    'Oftalmologi (Mata)',
    'THT-KL',
    'Dokter Umum',
  ];

  readonly facilityTypes: string[] = [
    'Rumah Sakit Umum',
    'RSIA (Ibu dan Anak)',
    'Klinik Pratama',
    'Klinik Utama',
    'Praktik Mandiri Dokter',
  ];

  formData = {
    name: '',
    nik: '',
    gender: 'female' as 'female' | 'male',
    birthPlace: '',
    birthDate: '',
    email: '',
    phone: '',
    address: '',
    about: '',
    specialty: 'Obstetri & Ginekologi',
    lastEducation: 'Spesialis Obstetri dan Ginekologi',
    educationInstitution: '',
    diplomaNumber: '',
    graduationYear: '2023',
    sip: '',
    sipExpiry: '',
    sipIssuer: 'Dinas Kesehatan Kota Bandung',
    stra: '',
    straExpiry: 'Seumur Hidup',
    facility: '',
    facilityType: 'RSIA (Ibu dan Anak)',
    position: 'Dokter Spesialis',
    practiceSchedule: 'Senin - Jumat (08.00 - 16.00)',
    status: 'Aktif' as 'Aktif' | 'Non-Aktif' | 'Suspended',
    verification: 'Menunggu Verifikasi' as 'Terverifikasi' | 'Menunggu Verifikasi' | 'Ditolak',
    notes: '',
  };

  goBack(): void {
    void this.router.navigate(['/admin/dokter']);
  }

  save(): void {
    this.errorMessage.set('');

    if (!this.formData.name.trim()) {
      this.errorMessage.set('Nama dokter wajib diisi.');
      return;
    }
    if (!this.formData.email.trim()) {
      this.errorMessage.set('Email dokter wajib diisi.');
      return;
    }
    if (!this.formData.facility.trim()) {
      this.errorMessage.set('Fasilitas praktik wajib diisi.');
      return;
    }
    if (!this.formData.sip.trim()) {
      this.errorMessage.set('Nomor SIP dokter wajib diisi.');
      return;
    }

    this.isSubmitting.set(true);
    setTimeout(() => {
      this.isSubmitting.set(false);
      this.saveSuccess.set(true);
      setTimeout(() => {
        void this.router.navigate(['/admin/dokter']);
      }, 900);
    }, 600);
  }
}
