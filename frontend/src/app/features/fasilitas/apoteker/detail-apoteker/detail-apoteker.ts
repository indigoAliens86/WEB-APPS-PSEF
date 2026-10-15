import { Component, signal, inject, OnInit } from '@angular/core';
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
  selector: 'app-detail-apoteker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './detail-apoteker.html',
  styleUrl: './detail-apoteker.css',
})
export class DetailApoteker implements OnInit {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly activeTab = signal<DetailTab>('informasi');
  readonly selectedModeration = signal<ModerationChoice>('setujui');
  readonly moderationNote = signal('');
  readonly internalModerationNote = signal('');
  readonly selectedPreviewDoc = signal<VerificationDoc | null>(null);
  readonly previewCertificateModal = signal(false);

  pharmacist = {
    id: 'APT-001',
    name: 'apt. Andi Pratama, S.Farm',
    roleTag: 'Apoteker',
    statusTag: 'Pendaftar Baru',
    verificationStatus: 'Menunggu Verifikasi',
    facility: 'Apotek Kimia Sehat PSEF',
    specialty: 'Farmasi Komunitas',
    avatar: '/assets/images/avatar/male.png',
    email: 'andi.pratama@healora.id',
    phone: '0812-4556-7890',
    address:
      'Jalan Cempernik Indah Blok B-27 No 1A, Kelurahan Cempernik Indah Kecamatan Cempernik Kota Cempernik Provinsi Jawa Barat 43123',
    sipa: '35.79/25/1235',
    sipaExpiry: '10 Mei 2028',
    stra: '317129/25/1002',
    straExpiry: 'Seumur Hidup',
    nik: '3275011205900002',
    birthPlaceDate: 'Bandung, 15 Juli 1992',
    ktpAddress:
      'Jalan Cempernik Indah Blok B-27 No 1A, Kelurahan Cempernik Indah Kecamatan Cempernik Kota Cempernik Provinsi Jawa Barat 43123',
    lastEducation: 'Profesi Apoteker',
    diplomaNumber: '105/STIFARM/Apt/VI/2024',
    graduationYear: '2024',
    npsn: 'andi.pratama@healora.id',
    educationInstitution: 'Sekolah Tinggi Ilmu Farmasi Padang',
    about:
      'Apoteker dengan pengalaman di bidang farmasi komunitas dan pelayanan resep rawat jalan selama lebih dari 4 tahun. Berkomitmen memberikan pelayanan kefarmasian terbaik dan edukasi kepatuhan minum obat kepada pasien.',
  };

  readonly educationList: EducationItem[] = [
    { degree: 'Profesi Apoteker', institution: 'Sekolah Tinggi Ilmu Farmasi Padang', year: '2024' },
    { degree: 'Strata 1 Farmasi', institution: 'Sekolah Tinggi Ilmu Farmasi Padang', year: '2023' },
    { degree: 'Strata 1 Farmasi', institution: 'Sekolah Tinggi Ilmu Farmasi Padang', year: '2023' },
    { degree: 'Strata 1 Farmasi', institution: 'Sekolah Tinggi Ilmu Farmasi Padang', year: '2023' },
  ];

  readonly skills: SkillItem[] = [
    { name: 'Pelayanan Informasi Obat (PIO)', percentage: 15, level: 'Basic' },
    { name: 'Skrining dan Verifikasi Resep', percentage: 35, level: 'Beginner' },
    { name: 'Konseling Pasien Kronis', percentage: 55, level: 'Intermediate' },
    { name: 'Manajemen Logistik & Inventori Obat', percentage: 80, level: 'Advance' },
    { name: 'Farmasi Komunitas & Klinis', percentage: 100, level: 'Expert' },
  ];

  readonly jobExperiences: JobExperience[] = [
    {
      position: 'Apoteker Penanggung Jawab',
      facility: 'Apotek Keluarga Medika',
      period: 'Jan 2022 - Sekarang',
      description:
        'Bertanggung jawab terhadap pelayanan kefarmasian, pengelolaan obat, serta supervisi tenaga teknis kefarmasian.',
    },
    {
      position: 'Apoteker Pendamping',
      facility: 'Apotek Harmoni',
      period: 'Mar 2020 - Des 2021',
      description:
        'Melakukan skrining resep harian, dispensing obat, dan konseling penggunaan obat kepada pasien.',
    },
    {
      position: 'Tenaga Teknis Kefarmasian',
      facility: 'RS Mitra Husada',
      period: 'Jul 2018 - Feb 2020',
      description:
        'Membantu pengelolaan stok obat dan perbekalan farmasi rumah sakit serta dispensing resep rawat jalan.',
    },
  ];

  readonly teachingExperiences: TeachingExperience[] = [
    {
      role: 'Narasumber',
      activityType: 'Workshop',
      organizer: 'Ikatan Apoteker Indonesia',
      topic: 'Optimalisasi Pelayanan Kefarmasian dan Konseling Pasien di Apotek Modern',
    },
  ];

  readonly verificationDocs: VerificationDoc[] = [
    {
      id: 'ktp',
      title: 'KTP',
      filename: 'KTP_Andi_Pratama.jpg',
      uploadedAt: '18 Mei 2026 14:32',
      status: 'Terverifikasi',
      note: 'Dokumen Sesuai',
      icon: 'ri-file-text-line',
    },
    {
      id: 'sipa',
      title: 'SIPA (Surat Izin Praktik Apoteker)',
      filename: 'SIPA_Andi_Pratama.jpg',
      uploadedAt: '18 Mei 2026 14:32',
      status: 'Menunggu Verifikasi',
      note: 'Belum Diverifikasi',
      icon: 'ri-file-shield-line',
    },
    {
      id: 'stra',
      title: 'STRA (Surat Tanda Registrasi Apoteker)',
      filename: 'STRA_Andi_Pratama.jpg',
      uploadedAt: '18 Mei 2026 14:32',
      status: 'Tidak Sesuai',
      note: 'Dokumen Buram tidak Jelas',
      icon: 'ri-file-warning-line',
    },
    {
      id: 'ijazah',
      title: 'Ijazah Apoteker',
      filename: 'Ijazah_Andi_Pratama.jpg',
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
    sipNumber: '35.79/25/1235',
    issuer: 'Dinas Kesehatan Kota Bandung',
    workField: 'Pelayanan Kefarmasian',
    facilityName: 'Apotek Kimia Sehat PSEF',
    issueDate: '01 Januari 2023',
    facilityType: 'Apotek',
    position: 'Apoteker Pengelola Apotek (APA)',
    expiryDate: '10 Mei 2028',
    division: 'Pelayanan Resep & Konseling',
    facilityPhone: '0812-4556-7890',
    facilityEmail: 'apotekkeluarga@healora.id',
    facilityWeb: 'www.apotekkeluargamedika.com',
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

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pharmacist.id = id;
    }
  }

  selectTab(tab: DetailTab): void {
    this.activeTab.set(tab);
  }

  setModeration(choice: ModerationChoice): void {
    this.selectedModeration.set(choice);
  }

  goBack(): void {
    void this.router.navigate(['/fasilitas/apoteker']);
  }

  goToEdit(): void {
    void this.router.navigate(['/fasilitas/apoteker/edit-apoteker', this.pharmacist.id]);
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
    img.src = '/assets/images/avatar/male.png';
  }

  getFileExt(filename: string): string {
    if (!filename) return 'DOC';
    const parts = filename.split('.');
    return parts.length > 1 ? parts[parts.length - 1].toUpperCase() : 'DOC';
  }

  getDocTypeLabel(id: string): string {
    switch (id) {
      case 'ktp':
        return 'Identitas Kependudukan';
      case 'sipa':
        return 'Izin Praktik';
      case 'stra':
        return 'Registrasi Nasional';
      case 'ijazah':
        return 'Profesi Apoteker';
      default:
        return 'Dokumen Resmi';
    }
  }
}
