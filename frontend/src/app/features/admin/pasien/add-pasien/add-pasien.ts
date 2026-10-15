import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-pasien',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-pasien.html',
  styleUrl: './add-pasien.css',
})
export class AddPasien {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly isSubmitting = signal(false);
  readonly saveSuccess = signal(false);
  readonly errorMessage = signal('');

  readonly bloodTypes: string[] = ['A', 'B', 'AB', 'O', 'Tidak Tahu'];
  readonly patientTypes: string[] = ['Umum', 'BPJS Kesehatan', 'Asuransi Swasta'];
  readonly genderOptions: { label: string; value: 'Laki-laki' | 'Perempuan' }[] = [
    { label: 'Laki-laki', value: 'Laki-laki' },
    { label: 'Perempuan', value: 'Perempuan' },
  ];

  formData = {
    name: '',
    nik: '',
    gender: 'Laki-laki' as 'Laki-laki' | 'Perempuan',
    birthPlace: '',
    birthDate: '',
    bloodType: 'O',
    religion: 'Islam',
    maritalStatus: 'Belum Menikah',
    phone: '',
    email: '',
    address: '',
    province: 'Jawa Barat',
    city: 'Bandung',
    postalCode: '40115',
    patientType: 'Umum',
    insuranceNumber: '',
    faskesName: 'Klinik Kimia Farma Bandung',
    status: 'Aktif' as 'Aktif' | 'Non-Aktif',
    emergencyName: '',
    emergencyRelation: 'Keluarga',
    emergencyPhone: '',
    allergies: '',
    chronicDiseases: '',
    notes: '',
  };

  goBack(): void {
    void this.router.navigate(['../'], { relativeTo: this.route });
  }

  save(): void {
    if (!this.formData.name.trim()) {
      this.errorMessage.set('Nama lengkap wajib diisi.');
      return;
    }

    if (!this.formData.nik.trim()) {
      this.errorMessage.set('Nomor NIK wajib diisi.');
      return;
    }

    if (this.formData.nik.trim().length < 16) {
      this.errorMessage.set('Nomor NIK harus berjumlah 16 digit.');
      return;
    }

    if (!this.formData.phone.trim()) {
      this.errorMessage.set('Nomor telepon / WhatsApp wajib diisi.');
      return;
    }

    this.errorMessage.set('');
    this.isSubmitting.set(true);

    setTimeout(() => {
      this.isSubmitting.set(false);
      this.saveSuccess.set(true);
      setTimeout(() => {
        void this.router.navigate(['/admin/pasien']);
      }, 1200);
    }, 700);
  }
}
