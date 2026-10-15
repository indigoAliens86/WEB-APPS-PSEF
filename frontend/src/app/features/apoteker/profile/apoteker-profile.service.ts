import { Injectable, signal } from '@angular/core';

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

export interface TimelineStep {
  step: number;
  title: string;
  time: string;
  active: boolean;
}

export interface PracticeInfo {
  sipNumber: string;
  issuer: string;
  workField: string;
  facilityName: string;
  issueDate: string;
  facilityType: string;
  position: string;
  expiryDate: string;
  division: string;
  facilityPhone: string;
  facilityEmail: string;
  facilityWeb: string;
  ownership: string;
  facilityAddress: string;
}

export interface ScheduleDay {
  day: string;
  fullName: string;
  hasShift: boolean;
  timeRange: string;
}

export interface ScheduleDayPattern {
  sen: boolean;
  sel: boolean;
  rab: boolean;
  kam: boolean;
  jum: boolean;
  sab: boolean;
  min: boolean;
}

export interface SchedulePatternItem {
  id: string;
  openTime: string;
  closeTime: string;
  days: ScheduleDayPattern;
}

export interface PharmacistProfile {
  id: string;
  name: string;
  nik: string;
  gender: 'male' | 'female';
  birthPlace: string;
  birthDate: string;
  birthPlaceDate: string;
  roleTag: string;
  statusTag: string;
  verificationStatus: string;
  facility: string;
  specialty: string;
  avatar: string;
  email: string;
  phone: string;
  address: string;
  ktpAddress: string;
  sipa: string;
  sipaExpiry: string;
  sipaIssuer: string;
  stra: string;
  straExpiry: string;
  lastEducation: string;
  diplomaNumber: string;
  graduationYear: string;
  npsn: string;
  educationInstitution: string;
  about: string;
  practiceSchedule: string;
  status: 'Aktif' | 'Non-Aktif' | 'Cuti';
  verification: 'Terverifikasi' | 'Menunggu Verifikasi' | 'Ditolak';
  notes?: string;
  facilityType?: string;
  position?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApotekerProfileService {
  private readonly STORAGE_KEY = 'psef_apoteker_profile';

  readonly pharmacist = signal<PharmacistProfile>(this.loadInitialProfile());

  readonly educationList = signal<EducationItem[]>([
    { degree: 'Profesi Apoteker', institution: 'Institut Teknologi Bandung (ITB)', year: '2020' },
    { degree: 'Sarjana Farmasi (S.Farm)', institution: 'Institut Teknologi Bandung (ITB)', year: '2019' },
    { degree: 'Sertifikasi Telefarmasi PSEF', institution: 'Kementerian Kesehatan RI & IAI', year: '2023' },
    { degree: 'Pelatihan Good Pharmacy Practice (GPP)', institution: 'Pengurus Daerah IAI Jawa Barat', year: '2022' },
  ]);

  readonly skills = signal<SkillItem[]>([
    { name: 'Skrining & Telaah Resep Digital PSEF', percentage: 95, level: 'Expert' },
    { name: 'Pelayanan Informasi Obat (PIO) & Konseling', percentage: 92, level: 'Expert' },
    { name: 'Pemantauan Terapi Obat (PTO) & Interaksi', percentage: 88, level: 'Advance' },
    { name: 'Manajemen Logistik & Rantai Dingin (Cold Chain)', percentage: 85, level: 'Advance' },
    { name: 'Pelaporan Regulasi SIPNAP Kemenkes', percentage: 90, level: 'Expert' },
  ]);

  readonly jobExperiences = signal<JobExperience[]>([
    {
      position: 'Apoteker Penanggung Jawab (APJ)',
      facility: 'Apotek Kimia Sehat PSEF',
      period: 'Jan 2022 - Sekarang',
      description:
        'Bertanggung jawab penuh atas legalitas operasional kefarmasian, skrining resep telefarmasi, dispensing sediaan farmasi, dan kepatuhan SIPNAP Kemenkes.',
    },
    {
      position: 'Apoteker Pendamping',
      facility: 'Apotek Harmoni Medika',
      period: 'Feb 2020 - Des 2021',
      description:
        'Melakukan telaah resep rawat jalan, konseling penggunaan obat kronis pada pasien lansia, dan pengelolaan kartu stok obat.',
    },
    {
      position: 'Apoteker Residen Farmasi Klinis',
      facility: 'RSUP Dr. Hasan Sadikin',
      period: 'Jul 2019 - Jan 2020',
      description:
        'Rotasi klinis bangsal penyakit dalam dan ICU, rekonsiliasi obat, serta analisis evaluasi penggunaan antibiotik kuantitatif (DDD).',
    },
  ]);

  readonly teachingExperiences = signal<TeachingExperience[]>([
    {
      role: 'Narasumber Webinar',
      activityType: 'Seminar Nasional IAI',
      organizer: 'Pengurus Pusat Ikatan Apoteker Indonesia',
      topic: 'Optimalisasi Standar Pelayanan Farmasi Klinis Melalui Platform Telefarmasi PSEF',
    },
    {
      role: 'Fasilitator Workshop',
      activityType: 'Pelatihan Kompetensi Apoteker',
      organizer: 'Dinas Kesehatan Kota Bandung',
      topic: 'Strategi Skrining Interaksi Obat Kategori High-Alert pada Pelayanan E-Prescription',
    },
  ]);

  readonly verificationDocs = signal<VerificationDoc[]>([
    {
      id: 'ktp',
      title: 'Kartu Tanda Penduduk (KTP)',
      filename: 'KTP_Farhan_Pratama.jpg',
      uploadedAt: '12 Januari 2024, 09:15 WIB',
      status: 'Terverifikasi',
      note: 'NIK dan identitas kependudukan tervalidasi Dukcapil',
      icon: 'ri-file-text-line',
    },
    {
      id: 'sipa',
      title: 'Surat Izin Praktik Apoteker (SIPA)',
      filename: 'SIPA_Farhan_Pratama.pdf',
      uploadedAt: '15 Januari 2024, 11:30 WIB',
      status: 'Terverifikasi',
      note: 'SIPA Aktif diterbitkan Dinkes Kota Bandung berlaku s/d 2028',
      icon: 'ri-shield-check-line',
    },
    {
      id: 'stra',
      title: 'Surat Tanda Registrasi Apoteker (STRA)',
      filename: 'STRA_Farhan_Pratama.pdf',
      uploadedAt: '12 Januari 2024, 09:20 WIB',
      status: 'Terverifikasi',
      note: 'STRA Terdaftar Seumur Hidup Kemenkes RI (No: 317129/25/1002)',
      icon: 'ri-file-shield-line',
    },
    {
      id: 'ijazah',
      title: 'Ijazah Profesi Apoteker',
      filename: 'Ijazah_Farhan_Pratama.pdf',
      uploadedAt: '12 Januari 2024, 09:25 WIB',
      status: 'Terverifikasi',
      note: 'Ijazah tervalidasi PDDikti Kemenristekdikti',
      icon: 'ri-award-line',
    },
  ]);

  readonly timelineSteps = signal<TimelineStep[]>([
    { step: 4, title: 'Akun Terverifikasi & Aktif', time: '16 Jan 2024, 10:00 WIB', active: true },
    { step: 3, title: 'Verifikasi Dokumen SIPA/STRA', time: '15 Jan 2024, 14:30 WIB', active: true },
    { step: 2, title: 'Validasi Akun Faskes Pengusul', time: '13 Jan 2024, 11:15 WIB', active: true },
    { step: 1, title: 'Pendaftaran Akun Apoteker', time: '12 Jan 2024, 09:00 WIB', active: true },
  ]);

  readonly practiceInfo = signal<PracticeInfo>({
    sipNumber: '35.79/25/1235',
    issuer: 'Dinas Kesehatan Kota Bandung',
    workField: 'Pelayanan Kefarmasian & Telefarmasi',
    facilityName: 'Apotek Kimia Sehat PSEF',
    issueDate: '15 Januari 2024',
    facilityType: 'Apotek Penyelenggara PSEF',
    position: 'Apoteker Penanggung Jawab (APJ)',
    expiryDate: '14 Oktober 2028',
    division: 'Pelayanan Farmasi Klinis & Konseling',
    facilityPhone: '022-7201890',
    facilityEmail: 'layanan@kimiasehat.psef.id',
    facilityWeb: 'www.kimiasehat.psef.id',
    ownership: 'Mitra PSEF Kemenkes',
    facilityAddress:
      'Jalan Cempernik Indah Blok B-27 No 1A, Kelurahan Cempernik Indah, Kec. Cempernik, Kota Bandung, Jawa Barat 40123',
  });

  readonly scheduleHours: string[] = [
    '08.00', '09.00', '10.00', '11.00', '12.00',
    '13.00', '14.00', '15.00', '16.00', '17.00', '18.00'
  ];

  readonly scheduleDays = signal<ScheduleDay[]>([
    { day: 'Sen', fullName: 'Senin', hasShift: true, timeRange: '08.00 - 16.00 WIB' },
    { day: 'Sel', fullName: 'Selasa', hasShift: true, timeRange: '08.00 - 16.00 WIB' },
    { day: 'Rab', fullName: 'Rabu', hasShift: true, timeRange: '08.00 - 16.00 WIB' },
    { day: 'Kam', fullName: 'Kamis', hasShift: true, timeRange: '08.00 - 16.00 WIB' },
    { day: 'Jum', fullName: 'Jumat', hasShift: true, timeRange: '08.00 - 16.00 WIB' },
    { day: 'Sab', fullName: 'Sabtu', hasShift: true, timeRange: '08.00 - 13.00 WIB' },
    { day: 'Min', fullName: 'Minggu', hasShift: false, timeRange: 'Libur Praktik' },
  ]);

  private loadInitialProfile(): PharmacistProfile {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }

    return {
      id: 'APT-001',
      name: 'apt. Farhan Pratama, S.Farm',
      nik: '3275011205900002',
      gender: 'male',
      birthPlace: 'Bandung',
      birthDate: '1992-07-15',
      birthPlaceDate: 'Bandung, 15 Juli 1992',
      roleTag: 'Apoteker',
      statusTag: 'APJ Aktif',
      verificationStatus: 'Terverifikasi Kemenkes',
      facility: 'Apotek Kimia Sehat PSEF',
      specialty: 'Farmasi Komunitas & Klinis',
      avatar: '/assets/images/avatar/male.png',
      email: 'farhan.pratama@psef.kemkes.go.id',
      phone: '0812-4556-7890',
      address:
        'Jalan Cempernik Indah Blok B-27 No 1A, Kelurahan Cempernik Indah, Kec. Cempernik, Kota Bandung, Jawa Barat 40123',
      ktpAddress:
        'Jalan Cempernik Indah Blok B-27 No 1A, Kelurahan Cempernik Indah, Kec. Cempernik, Kota Bandung, Jawa Barat 40123',
      sipa: '35.79/25/1235',
      sipaExpiry: '14 Oktober 2028',
      sipaIssuer: 'Dinas Kesehatan Kota Bandung',
      stra: '317129/25/1002',
      straExpiry: 'Seumur Hidup',
      lastEducation: 'Profesi Apoteker',
      diplomaNumber: '105/STIFARM/Apt/VI/2024',
      graduationYear: '2024',
      npsn: 'farhan.pratama@psef.kemkes.go.id',
      educationInstitution: 'Institut Teknologi Bandung (ITB)',
      about:
        'Apoteker Penanggung Jawab dengan pengalaman di bidang farmasi komunitas, pelayanan resep rawat jalan, dan telefarmasi PSEF selama lebih dari 5 tahun. Berkomitmen memberikan pelayanan kefarmasian berstandar tinggi, edukasi kepatuhan terapi kronis, dan pelaporan tertib SIPNAP Kementerian Kesehatan.',
      practiceSchedule: 'Senin - Sabtu (08.00 - 16.00 WIB)',
      status: 'Aktif',
      verification: 'Terverifikasi',
      notes: 'Dokumen SIPA dan STRA terverifikasi resmi melalui SISK Kemenkes RI.',
      facilityType: 'Apotek Penyelenggara PSEF',
      position: 'Apoteker Penanggung Jawab (APJ)',
    };
  }

  saveProfile(updated: Partial<PharmacistProfile>): void {
    const current = this.pharmacist();
    const merged: PharmacistProfile = {
      ...current,
      ...updated,
      birthPlaceDate:
        updated.birthPlace && updated.birthDate
          ? `${updated.birthPlace}, ${updated.birthDate}`
          : current.birthPlaceDate,
    };

    this.pharmacist.set(merged);

    // Also sync practiceInfo
    this.practiceInfo.update((p) => ({
      ...p,
      sipNumber: updated.sipa || p.sipNumber,
      facilityName: updated.facility || p.facilityName,
      expiryDate: updated.sipaExpiry || p.expiryDate,
      issuer: updated.sipaIssuer || p.issuer,
      facilityType: updated.facilityType || p.facilityType,
      position: updated.position || updated.roleTag || p.position,
    }));

    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(merged));
    } catch {
      // Storage error ignored
    }
  }

  updateAvatar(newAvatarUrl: string): void {
    this.pharmacist.update((p) => {
      const next = { ...p, avatar: newAvatarUrl };
      try {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }

  // -------------------------------------------------------------
  // PATTERNS: JADWAL OPERASIONAL & PRAKTIK
  // -------------------------------------------------------------
  private readonly OP_STORAGE_KEY = 'psef_operational_patterns';
  private readonly PR_STORAGE_KEY = 'psef_practice_patterns';

  readonly operationalPatterns = signal<SchedulePatternItem[]>(this.loadOperationalPatterns());
  readonly practicePatterns = signal<SchedulePatternItem[]>(this.loadPracticePatterns());

  private loadOperationalPatterns(): SchedulePatternItem[] {
    try {
      const saved = localStorage.getItem(this.OP_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {}
    return [
      {
        id: 'op-1',
        openTime: '08:00:00',
        closeTime: '22:00:00',
        days: { sen: true, sel: true, rab: true, kam: true, jum: true, sab: true, min: false },
      },
    ];
  }

  private loadPracticePatterns(): SchedulePatternItem[] {
    try {
      const saved = localStorage.getItem(this.PR_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {}
    return [
      {
        id: 'pr-1',
        openTime: '08:00:00',
        closeTime: '17:00:00',
        days: { sen: true, sel: true, rab: true, kam: true, jum: true, sab: true, min: false },
      },
    ];
  }

  saveOperationalPatterns(patterns: SchedulePatternItem[]): void {
    this.operationalPatterns.set(patterns);
    try {
      localStorage.setItem(this.OP_STORAGE_KEY, JSON.stringify(patterns));
    } catch {}
  }

  savePracticePatterns(patterns: SchedulePatternItem[]): void {
    this.practicePatterns.set(patterns);
    try {
      localStorage.setItem(this.PR_STORAGE_KEY, JSON.stringify(patterns));
    } catch {}
    this.syncScheduleFromPracticePatterns(patterns);
  }

  syncScheduleFromPracticePatterns(patterns: SchedulePatternItem[]): void {
    const daysMap: { key: keyof ScheduleDayPattern; code: string; full: string }[] = [
      { key: 'sen', code: 'Sen', full: 'Senin' },
      { key: 'sel', code: 'Sel', full: 'Selasa' },
      { key: 'rab', code: 'Rab', full: 'Rabu' },
      { key: 'kam', code: 'Kam', full: 'Kamis' },
      { key: 'jum', code: 'Jum', full: 'Jumat' },
      { key: 'sab', code: 'Sab', full: 'Sabtu' },
      { key: 'min', code: 'Min', full: 'Minggu' },
    ];

    const newDays: ScheduleDay[] = daysMap.map((d) => {
      const match = patterns.find((p) => p.days[d.key]);
      if (match) {
        const start = match.openTime ? match.openTime.slice(0, 5).replace(':', '.') : '08.00';
        const end = match.closeTime ? match.closeTime.slice(0, 5).replace(':', '.') : '17.00';
        return {
          day: d.code,
          fullName: d.full,
          hasShift: true,
          timeRange: `${start} - ${end} WIB`,
        };
      } else {
        return {
          day: d.code,
          fullName: d.full,
          hasShift: false,
          timeRange: 'Libur Praktik',
        };
      }
    });

    this.scheduleDays.set(newDays);

    const activeDays = newDays.filter((d) => d.hasShift);
    let schedStr = 'Sesuai Jadwal';
    if (activeDays.length > 0) {
      const first = activeDays[0];
      const last = activeDays[activeDays.length - 1];
      schedStr = `${first.fullName} - ${last.fullName} (${first.timeRange})`;
    }
    this.pharmacist.update((p) => ({ ...p, practiceSchedule: schedStr }));
  }
}
