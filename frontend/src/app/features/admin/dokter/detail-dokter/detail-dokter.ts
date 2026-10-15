import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

export type DetailTab = 'informasi' | 'verifikasi' | 'praktik';
export type ModerationChoice = 'setujui' | 'tolak' | 'perbaikan';

export interface EducationItem {
  degree: string;
  institution: string;
  year: string;
}

export interface SkillItem {
  name: string;
  percentage: number;
  level: string;
}

export interface JobExperience {
  position: string;
  facility: string;
  period: string;
  description: string;
}

export interface TeachingExperience {
  role: string;
  activityType: string;
  organizer: string;
  topic: string;
}

export interface VerificationDoc {
  id: string;
  title: string;
  filename: string;
  uploadedAt: string;
  status: 'Terverifikasi' | 'Menunggu Verifikasi' | 'Tidak Sesuai';
  note: string;
  icon: string;
}

@Component({
  selector: 'app-detail-dokter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './detail-dokter.html',
  styleUrl: './detail-dokter.css',
})
export class DetailDokter {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly activeTab = signal<DetailTab>('informasi');
  readonly selectedModeration = signal<ModerationChoice>('setujui');
  readonly moderationNote = signal('');
  readonly internalModerationNote = signal('');
  readonly selectedPreviewDoc = signal<VerificationDoc | null>(null);
  readonly previewCertificateModal = signal(false);

  readonly doctor = {
    id: 'DOK-001',
    name: 'dr. Sarah Aulia, Sp.OG',
    roleTag: 'Dokter',
    statusTag: 'Pendaftar Baru',
    verificationStatus: 'Menunggu Verifikasi',
    facility: 'RSIA Bunda Bandung',
    specialty: 'Obstetri & Ginekologi',
    avatar: '/assets/images/avatar/female.png',
    email: 'rina.meilani@healora.id',
    phone: '0822-3344-5566',
    address:
      'Jalan Cempernik Indah Blok B-27 No 1A, Kelurahan Cempernik Indah Kecamatan Cempernik Kota Cempernik Provinsi Jawa Barat 43123',
    sipa: 'NR62712412009799',
    sipaExpiry: '12 Mei 2028',
    stra: 'JC00001828429426',
    straExpiry: 'Seumur Hidup',
    nik: '3275011205900001',
    birthPlaceDate: 'Bandung, 01 Januari 1990',
    ktpAddress:
      'Jalan Cempernik Indah Blok B-27 No 1A, Kelurahan Cempernik Indah Kecamatan Cempernik Kota Cempernik Provinsi Jawa Barat 43123',
    lastEducation: 'Spesialis Obstetri & Ginekologi',
    diplomaNumber: '104/STIFARM/Ijazah/IV/2025',
    graduationYear: '2024',
    npsn: 'rina.meilani@healora.id',
    educationInstitution: 'Sekolah Tinggi Ilmu Farmasi Padang',
    about:
      'Apoteker dengan pengalaman di bidang farmasi klinis dan komunitas selama lebih dari 5 tahun. Berkomitmen memberikan pelayanan kesehatan terbaik kepada pasien.',
  };

  readonly educationList: EducationItem[] = [
    { degree: 'Strata 1 Farmasi', institution: 'Sekolah Tinggi Ilmu Farmasi Padang', year: '2024' },
    { degree: 'Strata 1 Farmasi', institution: 'Sekolah Tinggi Ilmu Farmasi Padang', year: '2024' },
    { degree: 'Strata 1 Farmasi', institution: 'Sekolah Tinggi Ilmu Farmasi Padang', year: '2024' },
    { degree: 'Strata 1 Farmasi', institution: 'Sekolah Tinggi Ilmu Farmasi Padang', year: '2024' },
  ];

  readonly skills: SkillItem[] = [
    { name: 'Development of monoclonal antibody tracer', percentage: 10, level: 'Basic' },
    { name: 'Radiopharmaceutical', percentage: 25, level: 'Beginner' },
    { name: 'Photoimmunotherapy', percentage: 52, level: 'Intermediate' },
    { name: 'Molecular PET imaging', percentage: 80, level: 'Advance' },
    { name: 'Development of peptide tracers', percentage: 100, level: 'Expert' },
  ];

  readonly jobExperiences: JobExperience[] = [
    {
      position: 'Apoteker Penanggung Jawab',
      facility: 'Apotek Sehat Bandung',
      period: 'Jan 2022 - Sekarang',
      description:
        'Bertanggung jawab terhadap pelayanan kefarmasian, pengelolaan obat, serta supervisi tenaga teknis kefarmasian.',
    },
    {
      position: 'Apoteker Klinis',
      facility: 'RS Mitra Husada',
      period: 'Mar 2019 - Des 2021',
      description:
        'Melakukan monitoring terapi obat pasien rawat inap dan memberikan konsultasi penggunaan obat kepada dokter dan pasien.',
    },
    {
      position: 'Apoteker Komunitas',
      facility: 'Apotek Keluarga Medika',
      period: 'Jul 2017 - Feb 2019',
      description:
        'Memberikan edukasi obat kepada pasien dan memastikan ketepatan dispensing resep harian.',
    },
  ];

  readonly teachingExperiences: TeachingExperience[] = [
    {
      role: 'Narasumber',
      activityType: 'Seminar',
      organizer: 'Universitas Ngudi Waluyo',
      topic: 'Empowering communities through cancer education and innovative treatment updates',
    },
  ];

  readonly verificationDocs: VerificationDoc[] = [
    {
      id: 'ktp',
      title: 'KTP',
      filename: 'KTP_Rina_Meilani.jpg',
      uploadedAt: '18 Mei 2026 14:32',
      status: 'Terverifikasi',
      note: 'Dokumen Sesuai',
      icon: 'ri-file-text-line',
    },
    {
      id: 'sipa',
      title: 'SIPA (Surat Izin Praktik Apoteker)',
      filename: 'SIPA_Rina_Meilani.jpg',
      uploadedAt: '18 Mei 2026 14:32',
      status: 'Menunggu Verifikasi',
      note: 'Belum Diverifikasi',
      icon: 'ri-file-shield-line',
    },
    {
      id: 'stra',
      title: 'STRA (Surat Tanda Registrasi Apoteker)',
      filename: 'STRA_Rina_Meilani.jpg',
      uploadedAt: '18 Mei 2026 14:32',
      status: 'Tidak Sesuai',
      note: 'Dokumen Buram tidak Jelas',
      icon: 'ri-file-warning-line',
    },
    {
      id: 'ijazah',
      title: 'Ijazah Apoteker',
      filename: 'Ijazah_Rina_Meilani.jpg',
      uploadedAt: '18 Mei 2026 14:32',
      status: 'Terverifikasi',
      note: 'Dokumen Sesuai',
      icon: 'ri-award-line',
    },
  ];

  readonly timelineSteps = [
    { step: 4, title: 'Pendaftaran Diterima', time: '18 Mei 2026, 14:32 WIB', active: false },
    { step: 3, title: 'Verifikasi Dokumen', time: '18 Mei 2026, 14:32 WIB', active: true },
    { step: 2, title: 'Pendaftaran Diajukan', time: '18 Mei 2026, 14:32 WIB', active: true },
    { step: 1, title: 'Pendaftaran Dibuat', time: '18 Mei 2026, 14:32 WIB', active: true },
  ];

  readonly practiceInfo = {
    sipNumber: '3273/OG/2501',
    issuer: 'Dinas Kesehatan Kota Bandung',
    workField: 'Pelayanan',
    facilityName: 'RSIA Bunda Bandung',
    issueDate: '01 Januari 2023',
    facilityType: 'Rumah Sakit Ibu & Anak',
    position: 'Dokter Spesialis Obstetri & Ginekologi',
    expiryDate: '01 Januari 2028',
    division: 'Poli Obstetri & Ginekologi',
    facilityPhone: '081312241997',
    facilityEmail: 'apotekbandung@mail.com',
    facilityWeb: 'www.apotekbandung.com',
    ownership: 'Mitra',
    facilityAddress:
      'Jalan Cempernik Indah Blok B-27 No 1A, Kelurahan Cempernik Indah Kecamatan Cempernik Kota Cempernik Provinsi Jawa Barat 43123',
  };

  readonly scheduleHours = [
    '08.00', '09.00', '10.00', '11.00', '12.00',
    '13.00', '14.00', '15.00', '16.00', '17.00', '18.00'
  ];

  readonly scheduleDays = [
    { day: 'Sen', hasShift: true },
    { day: 'Sel', hasShift: true },
    { day: 'Rab', hasShift: true },
    { day: 'Kam', hasShift: true },
    { day: 'Jum', hasShift: true },
    { day: 'Sab', hasShift: false },
    { day: 'Min', hasShift: false },
  ];

  selectTab(tab: DetailTab): void {
    this.activeTab.set(tab);
  }

  setModeration(choice: ModerationChoice): void {
    this.selectedModeration.set(choice);
  }

  goBack(): void {
    void this.router.navigate(['../'], { relativeTo: this.route });
  }

  goToEdit(): void {
    void this.router.navigate(['/admin/dokter/edit-dokter', this.doctor.id]);
  }

  openDocPreview(doc: VerificationDoc): void {
    this.selectedPreviewDoc.set(doc);
  }

  closeDocPreview(): void {
    this.selectedPreviewDoc.set(null);
  }

  openCertificatePreview(): void {
    this.previewCertificateModal.set(true);
  }

  closeCertificatePreview(): void {
    this.previewCertificateModal.set(false);
  }

  saveModeration(): void {
    alert(`Moderasi berhasil disimpan dengan pilihan: ${this.selectedModeration()}`);
  }

  onAvatarError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = '/assets/images/avatar/female.png';
  }
}
