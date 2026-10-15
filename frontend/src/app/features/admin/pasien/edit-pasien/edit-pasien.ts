import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-pasien',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-pasien.html',
  styleUrl: './edit-pasien.css',
})
export class EditPasien implements OnInit {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly isSubmitting = signal(false);
  readonly saveSuccess = signal(false);
  readonly errorMessage = signal('');
  readonly patientId = signal('PSN-001');

  readonly bloodTypes: string[] = ['A', 'B', 'AB', 'O', 'Tidak Tahu'];
  readonly patientTypes: string[] = ['Umum', 'BPJS Kesehatan', 'Asuransi Swasta'];
  readonly genderOptions: { label: string; value: 'Laki-laki' | 'Perempuan' }[] = [
    { label: 'Laki-laki', value: 'Laki-laki' },
    { label: 'Perempuan', value: 'Perempuan' },
  ];

  formData = {
    name: 'Andi Putra',
    nik: '3275010101010001',
    gender: 'Laki-laki' as 'Laki-laki' | 'Perempuan',
    birthPlace: 'Bandung',
    birthDate: '01-01-1990',
    bloodType: 'O',
    religion: 'Islam',
    maritalStatus: 'Menikah',
    phone: '081234567890',
    email: 'andi.putra@gmail.com',
    address: 'Jl. Merdeka No. 12, RT 02 / RW 05, Kelurahan Braga',
    province: 'Jawa Barat',
    city: 'Bandung',
    postalCode: '40111',
    patientType: 'Umum',
    insuranceNumber: '0001889234123',
    faskesName: 'Klinik Kimia Farma Bandung',
    status: 'Aktif' as 'Aktif' | 'Non-Aktif',
    emergencyName: 'Rina Putri (Istri)',
    emergencyRelation: 'Pasangan',
    emergencyPhone: '0812-9988-7766',
    allergies: 'Alergi Penisilin, Alergi Seafood',
    chronicDiseases: 'Hipertensi Ringan (Terkontrol)',
    notes: 'Pasien rutin kontrol tekanan darah setiap 3 bulan.',
  };

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.patientId.set(id);
      if (id === 'PSN-002') {
        this.formData.name = 'Siti Aminah';
        this.formData.nik = '3275010101010002';
        this.formData.gender = 'Perempuan';
        this.formData.birthDate = '15-03-1992';
        this.formData.phone = '082123456789';
        this.formData.email = 'sitiaminah@gmail.com';
        this.formData.address = 'Jl. Cempaka No. 5, Jakarta Selatan';
        this.formData.bloodType = 'A';
      }
    }
  }

  goBack(): void {
    void this.router.navigate(['/admin/pasien']);
  }

  save(): void {
    if (!this.formData.name.trim()) {
      this.errorMessage.set('Nama lengkap wajib diisi.');
      return;
    }

    if (!this.formData.nik.trim() || this.formData.nik.trim().length < 16) {
      this.errorMessage.set('Nomor NIK harus 16 digit.');
      return;
    }

    if (!this.formData.phone.trim()) {
      this.errorMessage.set('Nomor telepon wajib diisi.');
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
