import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-dokter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-dokter.html',
  styleUrl: './edit-dokter.css',
})
export class EditDokter implements OnInit {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly isSubmitting = signal(false);
  readonly saveSuccess = signal(false);
  readonly errorMessage = signal('');
  readonly doctorId = signal('DOK-001');

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
    name: 'dr. Sarah Aulia, Sp.OG',
    nik: '3273011205900001',
    gender: 'female' as 'female' | 'male',
    birthPlace: 'Bandung',
    birthDate: '1990-05-12',
    email: 'rina.meilani@healora.id',
    phone: '0822-3344-5566',
    address:
      'Jalan Cempernik Indah Blok B-27 No 1A, Kelurahan Cempernik Indah Kecamatan Cempernik Kota Cempernik Provinsi Jawa Barat 43123',
    about:
      'Dokter spesialis obstetri dan ginekologi dengan pengalaman lebih dari 8 tahun dalam menangani kehamilan risiko tinggi, USG fetomaternal, dan konsultasi kesehatan reproduksi wanita.',
    specialty: 'Obstetri & Ginekologi',
    lastEducation: 'Spesialis Obstetri dan Ginekologi',
    educationInstitution: 'Universitas Padjadjaran',
    diplomaNumber: '104/UNPAD/Sp.OG/V/2020',
    graduationYear: '2020',
    sip: 'NR62712412009799',
    sipExpiry: '10 Mei 2028',
    sipIssuer: 'Dinas Kesehatan Kota Bandung',
    stra: 'JC00001828429426',
    straExpiry: 'Seumur Hidup',
    facility: 'RSIA Bunda Bandung',
    facilityType: 'RSIA (Ibu dan Anak)',
    position: 'Dokter Penanggung Jawab Pelayanan (DPJP)',
    practiceSchedule: 'Senin - Jumat (08.00 - 16.00)',
    status: 'Aktif' as 'Aktif' | 'Non-Aktif' | 'Suspended',
    verification: 'Terverifikasi' as 'Terverifikasi' | 'Menunggu Verifikasi' | 'Ditolak',
    notes: 'Dokumen STR dan SIP telah divalidasi dengan KKI dan Dinkes Kota Bandung.',
  };

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.doctorId.set(id);
    }
  }

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
