import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import {
  ApotekerProfileService,
  PharmacistProfile,
  ScheduleDayPattern,
  SchedulePatternItem,
} from '../apoteker-profile.service';

export interface DayOption {
  key: keyof ScheduleDayPattern;
  label: string;
}

export interface CalendarDayCol {
  key: keyof ScheduleDayPattern;
  label: string;
  subLabel: string;
}

export interface TimetableHour {
  value: number;
  label: string;
  formattedTime: string;
}

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './edit-profile.html',
  styleUrl: './edit-profile.css',
})
export class EditProfile implements OnInit {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  readonly profileService = inject(ApotekerProfileService);

  readonly isSubmitting = signal(false);
  readonly saveSuccess = signal(false);
  readonly errorMessage = signal('');
  readonly avatarPreview = signal('');
  readonly activeCategory = signal<'all' | 'pribadi' | 'legalitas' | 'fasilitas_jadwal' | 'status'>('all');
  readonly isDirty = signal(false);
  readonly copiedField = signal<string | null>(null);
  readonly showFacilityHelpModal = signal(false);
  readonly scheduleViewMode = signal<'timeline' | 'matrix'>('timeline');

  // Timeline Scale Hours (07:00 to 23:00)
  readonly timelineScaleHours = [
    { hour: 7, label: '07:00' },
    { hour: 8, label: '08:00' },
    { hour: 9, label: '09:00' },
    { hour: 10, label: '10:00' },
    { hour: 11, label: '11:00' },
    { hour: 12, label: '12:00' },
    { hour: 13, label: '13:00' },
    { hour: 14, label: '14:00' },
    { hour: 15, label: '15:00' },
    { hour: 16, label: '16:00' },
    { hour: 17, label: '17:00' },
    { hour: 18, label: '18:00' },
    { hour: 19, label: '19:00' },
    { hour: 20, label: '20:00' },
    { hour: 21, label: '21:00' },
    { hour: 22, label: '22:00' },
    { hour: 23, label: '23:00' },
  ];

  get profileCompleteness(): {
    percentage: number;
    completedCount: number;
    totalCount: number;
    checklist: { key: string; label: string; valid: boolean; sectionId: string }[];
  } {
    const items = [
      { key: 'name', label: 'Nama Lengkap & Gelar', valid: !!this.formData.name?.trim(), sectionId: 'section-personal' },
      { key: 'nik', label: 'NIK 16 Digit KTP', valid: (this.formData.nik?.length || 0) === 16, sectionId: 'section-personal' },
      { key: 'email', label: 'Email Resmi', valid: !!this.formData.email?.includes('@'), sectionId: 'section-personal' },
      { key: 'phone', label: 'Nomor WhatsApp / Telp', valid: !!this.formData.phone?.trim(), sectionId: 'section-personal' },
      { key: 'education', label: 'Pendidikan & Ijazah', valid: !!this.formData.diplomaNumber?.trim(), sectionId: 'section-education' },
      { key: 'sipa', label: 'Nomor Izin SIPA', valid: !!this.formData.sipa?.trim(), sectionId: 'section-legal' },
      { key: 'stra', label: 'Nomor Registrasi STRA', valid: !!this.formData.stra?.trim(), sectionId: 'section-legal' },
      { key: 'schedule', label: 'Jadwal Praktik Aktif', valid: this.getTotalPracticeHours() > 0, sectionId: 'section-pr-schedule' },
      { key: 'avatar', label: 'Foto Profil Resmi', valid: !!this.avatarPreview() || !!this.formData.avatar, sectionId: 'section-personal' },
    ];
    const completed = items.filter((i) => i.valid).length;
    const percentage = Math.round((completed / items.length) * 100);
    return { percentage, completedCount: completed, totalCount: items.length, checklist: items };
  }

  setCategory(cat: 'all' | 'pribadi' | 'legalitas' | 'fasilitas_jadwal' | 'status'): void {
    this.activeCategory.set(cat);
    // Smooth scroll cleanly to the top of the master form content
    requestAnimationFrame(() => {
      const formEl = document.querySelector('.master-form-layout');
      if (formEl) {
        formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  markDirty(): void {
    this.isDirty.set(true);
  }

  copyToClipboard(text: string, fieldName: string): void {
    if (navigator.clipboard && text) {
      void navigator.clipboard.writeText(text);
      this.copiedField.set(fieldName);
      setTimeout(() => this.copiedField.set(null), 2000);
    }
  }

  scrollToSection(sectionId: string): void {
    // If user is currently filtering to a different tab, ensure 'all' is active so target section exists
    if (this.activeCategory() !== 'all') {
      this.activeCategory.set('all');
    }
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);
  }

  resetToInitial(): void {
    const current = this.profileService.pharmacist();
    this.formData = { ...current };
    this.avatarPreview.set(current.avatar);
    this.operationalPatterns = JSON.parse(
      JSON.stringify(this.profileService.operationalPatterns())
    );
    this.practicePatterns = JSON.parse(
      JSON.stringify(this.profileService.practicePatterns())
    );
    this.isDirty.set(false);
  }

  toggleFacilityHelpModal(): void {
    this.showFacilityHelpModal.update((v) => !v);
  }

  readonly specialties: string[] = [
    'Farmasi Komunitas & Klinis',
    'Farmasi Komunitas',
    'Farmasi Klinis',
    'Farmasi Rumah Sakit',
    'Farmasi Bahan Alam & Kosmetik',
    'Farmasi Regulasi & Kebijakan Kesehatan',
  ];

  readonly facilityTypes: string[] = [
    'Apotek Penyelenggara PSEF',
    'Apotek',
    'Instalasi Farmasi Rumah Sakit',
    'Klinik Pratama / Utama',
  ];

  readonly positions: string[] = [
    'Apoteker Penanggung Jawab (APJ)',
    'Apoteker Pendamping',
    'Kepala Instalasi Farmasi',
    'Apoteker Konsultan Telefarmasi',
  ];

  // Pattern Day Options (sen, sel, rab, kam, jum, sab, min)
  readonly dayOptions: DayOption[] = [
    { key: 'sen', label: 'sen' },
    { key: 'sel', label: 'sel' },
    { key: 'rab', label: 'rab' },
    { key: 'kam', label: 'kam' },
    { key: 'jum', label: 'jum' },
    { key: 'sab', label: 'sab' },
    { key: 'min', label: 'min' },
  ];

  // Calendar Day Columns (Sen, Sel, Rab, Kam, Jum, Sab, Min)
  readonly calendarDays: CalendarDayCol[] = [
    { key: 'sen', label: 'Sen', subLabel: 'Senin' },
    { key: 'sel', label: 'Sel', subLabel: 'Selasa' },
    { key: 'rab', label: 'Rab', subLabel: 'Rabu' },
    { key: 'kam', label: 'Kam', subLabel: 'Kamis' },
    { key: 'jum', label: 'Jum', subLabel: 'Jumat' },
    { key: 'sab', label: 'Sab', subLabel: 'Sabtu' },
    { key: 'min', label: 'Min', subLabel: 'Minggu' },
  ];

  // Timetable Hour Rows (6am to 10pm)
  readonly timetableHours: TimetableHour[] = [
    { value: 6, label: '6am', formattedTime: '06:00' },
    { value: 7, label: '7am', formattedTime: '07:00' },
    { value: 8, label: '8am', formattedTime: '08:00' },
    { value: 9, label: '9am', formattedTime: '09:00' },
    { value: 10, label: '10am', formattedTime: '10:00' },
    { value: 11, label: '11am', formattedTime: '11:00' },
    { value: 12, label: '12pm', formattedTime: '12:00' },
    { value: 13, label: '1pm', formattedTime: '13:00' },
    { value: 14, label: '2pm', formattedTime: '14:00' },
    { value: 15, label: '3pm', formattedTime: '15:00' },
    { value: 16, label: '4pm', formattedTime: '16:00' },
    { value: 17, label: '5pm', formattedTime: '17:00' },
    { value: 18, label: '6pm', formattedTime: '18:00' },
    { value: 19, label: '7pm', formattedTime: '19:00' },
    { value: 20, label: '8pm', formattedTime: '20:00' },
    { value: 21, label: '9pm', formattedTime: '21:00' },
    { value: 22, label: '10pm', formattedTime: '22:00' },
  ];

  // Operational & Practice Patterns
  operationalPatterns: SchedulePatternItem[] = [];
  practicePatterns: SchedulePatternItem[] = [];

  // Standby highlights (e.g. rab-6, rab-7 in screenshot)
  highlightedSlots = new Set<string>(['rab-6', 'rab-7']);

  // Manual slot overrides
  customActiveSlots = new Set<string>();
  customInactiveSlots = new Set<string>();

  formData: PharmacistProfile = {
    id: '',
    name: '',
    nik: '',
    gender: 'male',
    birthPlace: '',
    birthDate: '',
    birthPlaceDate: '',
    roleTag: '',
    statusTag: '',
    verificationStatus: '',
    facility: '',
    specialty: '',
    avatar: '',
    email: '',
    phone: '',
    address: '',
    ktpAddress: '',
    sipa: '',
    sipaExpiry: '',
    sipaIssuer: '',
    stra: '',
    straExpiry: '',
    lastEducation: '',
    diplomaNumber: '',
    graduationYear: '',
    npsn: '',
    educationInstitution: '',
    about: '',
    practiceSchedule: '',
    status: 'Aktif',
    verification: 'Terverifikasi',
    notes: '',
    facilityType: 'Apotek Penyelenggara PSEF',
    position: 'Apoteker Penanggung Jawab (APJ)',
  };

  ngOnInit(): void {
    const current = this.profileService.pharmacist();
    this.formData = { ...current };
    this.avatarPreview.set(current.avatar);

    // Deep copy patterns
    this.operationalPatterns = JSON.parse(
      JSON.stringify(this.profileService.operationalPatterns())
    );
    this.practicePatterns = JSON.parse(
      JSON.stringify(this.profileService.practicePatterns())
    );
  }

  goBack(): void {
    const target = this.router.url.includes('/profil')
      ? '/apoteker/profil'
      : '/apoteker/profile';
    void this.router.navigate([target]);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        this.avatarPreview.set(result);
        this.formData.avatar = result;
      };
      reader.readAsDataURL(file);
    }
  }

  // -------------------------------------------------------------
  // OPERATIONAL PATTERNS
  // -------------------------------------------------------------
  addOperationalPattern(): void {
    this.operationalPatterns.push({
      id: 'op-' + Date.now(),
      openTime: '08:00:00',
      closeTime: '22:00:00',
      days: { sen: true, sel: true, rab: true, kam: true, jum: true, sab: false, min: false },
    });
  }

  removeOperationalPattern(index: number): void {
    this.operationalPatterns.splice(index, 1);
  }

  toggleOperationalDay(pat: SchedulePatternItem, dayKey: keyof ScheduleDayPattern): void {
    pat.days[dayKey] = !pat.days[dayKey];
  }

  // -------------------------------------------------------------
  // PRACTICE PATTERNS
  // -------------------------------------------------------------
  addPracticePattern(): void {
    this.practicePatterns.push({
      id: 'pr-' + Date.now(),
      openTime: '08:00:00',
      closeTime: '17:00:00',
      days: { sen: true, sel: true, rab: true, kam: true, jum: true, sab: true, min: false },
    });
    this.updateScheduleSummary();
  }

  removePracticePattern(index: number): void {
    this.practicePatterns.splice(index, 1);
    this.updateScheduleSummary();
  }

  togglePracticeDay(pat: SchedulePatternItem, dayKey: keyof ScheduleDayPattern): void {
    pat.days[dayKey] = !pat.days[dayKey];
    this.updateScheduleSummary();
  }

  onPracticePatternChange(): void {
    this.updateScheduleSummary();
  }

  private updateScheduleSummary(): void {
    const activeDays: string[] = [];
    const dayNames: Record<keyof ScheduleDayPattern, string> = {
      sen: 'Senin',
      sel: 'Selasa',
      rab: 'Rabu',
      kam: 'Kamis',
      jum: 'Jumat',
      sab: 'Sabtu',
      min: 'Minggu',
    };

    const keys: (keyof ScheduleDayPattern)[] = ['sen', 'sel', 'rab', 'kam', 'jum', 'sab', 'min'];
    keys.forEach((k) => {
      if (this.practicePatterns.some((p) => p.days[k])) {
        activeDays.push(dayNames[k]);
      }
    });

    if (activeDays.length > 0) {
      const first = activeDays[0];
      const last = activeDays[activeDays.length - 1];
      const sample = this.practicePatterns[0];
      const start = sample?.openTime ? sample.openTime.slice(0, 5).replace(':', '.') : '08.00';
      const end = sample?.closeTime ? sample.closeTime.slice(0, 5).replace(':', '.') : '17.00';
      this.formData.practiceSchedule = `${first} - ${last} (${start} - ${end} WIB)`;
    }
  }

  // -------------------------------------------------------------
  // TIMETABLE GRID LOGIC (Operational = Red, Practice = Green Layered On Top)
  // -------------------------------------------------------------
  isOperationalSlot(dayKey: keyof ScheduleDayPattern, hour: number): boolean {
    for (const pat of this.operationalPatterns) {
      if (pat.days[dayKey]) {
        const startHour = this.parseHour(pat.openTime, 8);
        const endHour = this.parseHour(pat.closeTime, 22);
        if (hour >= startHour && hour < endHour) {
          return true;
        }
      }
    }
    return false;
  }

  isPracticeSlot(dayKey: keyof ScheduleDayPattern, hour: number): boolean {
    const slotKey = `${dayKey}-${hour}`;
    if (this.customInactiveSlots.has(slotKey)) return false;
    if (this.customActiveSlots.has(slotKey)) return true;

    // Check practice patterns
    for (const pat of this.practicePatterns) {
      if (pat.days[dayKey]) {
        const startHour = this.parseHour(pat.openTime, 8);
        const endHour = this.parseHour(pat.closeTime, 17);
        if (hour >= startHour && hour < endHour) {
          return true;
        }
      }
    }
    return false;
  }

  isSlotActive(dayKey: keyof ScheduleDayPattern, hour: number): boolean {
    return this.isPracticeSlot(dayKey, hour);
  }

  isSlotHighlighted(dayKey: keyof ScheduleDayPattern, hour: number): boolean {
    return this.highlightedSlots.has(`${dayKey}-${hour}`);
  }

  toggleSlotCell(dayKey: keyof ScheduleDayPattern, hour: number): void {
    const slotKey = `${dayKey}-${hour}`;
    if (this.isPracticeSlot(dayKey, hour)) {
      this.customActiveSlots.delete(slotKey);
      this.customInactiveSlots.add(slotKey);
    } else {
      this.customInactiveSlots.delete(slotKey);
      this.customActiveSlots.add(slotKey);
    }
  }

  getSlotTooltip(dayKey: keyof ScheduleDayPattern, hour: number): string {
    const dayObj = this.calendarDays.find((d) => d.key === dayKey);
    const dayName = dayObj ? dayObj.label : dayKey;
    const isOp = this.isOperationalSlot(dayKey, hour);
    const isPr = this.isPracticeSlot(dayKey, hour);

    if (isOp && isPr) {
      return `${dayName} ${hour}:00 - Jadwal Praktik Apoteker (Operasional Fasilitas Aktif)`;
    } else if (isOp) {
      return `${dayName} ${hour}:00 - Operasional Fasilitas (Klik untuk jadwalkan praktik)`;
    } else if (isPr) {
      return `${dayName} ${hour}:00 - Jadwal Praktik Apoteker (Di luar operasional umum)`;
    } else {
      return `${dayName} ${hour}:00 - Libur / Tidak ada jadwal`;
    }
  }

  getDayPracticeHours(dayKey: keyof ScheduleDayPattern): number {
    let count = 0;
    for (const h of this.timetableHours) {
      if (this.isPracticeSlot(dayKey, h.value)) {
        count++;
      }
    }
    return count;
  }

  getTotalPracticeHours(): number {
    let total = 0;
    for (const d of this.calendarDays) {
      total += this.getDayPracticeHours(d.key);
    }
    return total;
  }

  getActiveDaysCount(): number {
    let days = 0;
    for (const d of this.calendarDays) {
      if (this.getDayPracticeHours(d.key) > 0) {
        days++;
      }
    }
    return days;
  }

  setScheduleViewMode(mode: 'timeline' | 'matrix'): void {
    this.scheduleViewMode.set(mode);
  }

  getDayOperationalDetails(dayKey: keyof ScheduleDayPattern): {
    isOpen: boolean;
    openTime: string;
    closeTime: string;
    startHour: number;
    endHour: number;
    duration: number;
    topPct: number;
    heightPct: number;
  } {
    for (const pat of this.operationalPatterns) {
      if (pat.days[dayKey]) {
        const start = this.parseHour(pat.openTime, 8);
        const end = this.parseHour(pat.closeTime, 22);
        // Timeline runs from 07:00 to 23:00 (16 hours total span)
        const topPct = Math.max(0, Math.min(100, ((start - 7) / 16) * 100));
        const heightPct = Math.max(6, Math.min(100 - topPct, ((end - start) / 16) * 100));
        return {
          isOpen: true,
          openTime: pat.openTime,
          closeTime: pat.closeTime,
          startHour: start,
          endHour: end,
          duration: Math.max(1, end - start),
          topPct,
          heightPct,
        };
      }
    }
    return { isOpen: false, openTime: '', closeTime: '', startHour: 0, endHour: 0, duration: 0, topPct: 0, heightPct: 0 };
  }

  getDayPracticeDetails(dayKey: keyof ScheduleDayPattern): {
    hasPractice: boolean;
    openTime: string;
    closeTime: string;
    startHour: number;
    endHour: number;
    duration: number;
    topPct: number;
    heightPct: number;
  } {
    for (const pat of this.practicePatterns) {
      if (pat.days[dayKey]) {
        const start = this.parseHour(pat.openTime, 8);
        const end = this.parseHour(pat.closeTime, 17);
        // Timeline runs from 07:00 to 23:00 (16 hours total span)
        const topPct = Math.max(0, Math.min(100, ((start - 7) / 16) * 100));
        const heightPct = Math.max(6, Math.min(100 - topPct, ((end - start) / 16) * 100));
        return {
          hasPractice: true,
          openTime: pat.openTime,
          closeTime: pat.closeTime,
          startHour: start,
          endHour: end,
          duration: Math.max(1, end - start),
          topPct,
          heightPct,
        };
      }
    }
    return { hasPractice: false, openTime: '', closeTime: '', startHour: 0, endHour: 0, duration: 0, topPct: 0, heightPct: 0 };
  }

  getSupervisionCoverageRatio(): number {
    let totalOp = 0;
    for (const d of this.calendarDays) {
      const op = this.getDayOperationalDetails(d.key);
      if (op.isOpen) totalOp += op.duration;
    }
    if (totalOp === 0) return 0;
    return Math.min(100, Math.round((this.getTotalPracticeHours() / totalOp) * 100));
  }

  getTotalOperationalHoursWeekly(): number {
    let totalOp = 0;
    for (const d of this.calendarDays) {
      const op = this.getDayOperationalDetails(d.key);
      if (op.isOpen) totalOp += op.duration;
    }
    return totalOp;
  }

  get calendarScheduleView() {
    return this.calendarDays.map((d) => ({
      key: d.key,
      label: d.label,
      subLabel: d.subLabel,
      practiceHours: this.getDayPracticeHours(d.key),
      op: this.getDayOperationalDetails(d.key),
      pr: this.getDayPracticeDetails(d.key),
    }));
  }

  applyOpPreset(preset: 'standard' | '24h' | 'extended'): void {
    if (preset === 'standard') {
      this.operationalPatterns = [
        { id: 'op-std', openTime: '08:00:00', closeTime: '22:00:00', days: { sen: true, sel: true, rab: true, kam: true, jum: true, sab: true, min: true } },
      ];
    } else if (preset === '24h') {
      this.operationalPatterns = [
        { id: 'op-24', openTime: '00:00:00', closeTime: '23:45:00', days: { sen: true, sel: true, rab: true, kam: true, jum: true, sab: true, min: true } },
      ];
    } else if (preset === 'extended') {
      this.operationalPatterns = [
        { id: 'op-ext', openTime: '07:00:00', closeTime: '23:00:00', days: { sen: true, sel: true, rab: true, kam: true, jum: true, sab: true, min: false } },
      ];
    }
    this.markDirty();
  }

  applyPreset(preset: 'normal' | 'full' | 'morning' | 'evening' | 'clear'): void {
    this.customActiveSlots.clear();
    this.customInactiveSlots.clear();

    if (preset === 'normal') {
      // Sen - Jum 08:00 - 17:00, Sab 08:00 - 13:00
      this.practicePatterns = [
        {
          id: 'pr-preset-normal-1',
          openTime: '08:00:00',
          closeTime: '17:00:00',
          days: { sen: true, sel: true, rab: true, kam: true, jum: true, sab: false, min: false },
        },
        {
          id: 'pr-preset-normal-2',
          openTime: '08:00:00',
          closeTime: '13:00:00',
          days: { sen: false, sel: false, rab: false, kam: false, jum: false, sab: true, min: false },
        },
      ];
    } else if (preset === 'full') {
      // Sen - Sab 08:00 - 17:00
      this.practicePatterns = [
        {
          id: 'pr-preset-full',
          openTime: '08:00:00',
          closeTime: '17:00:00',
          days: { sen: true, sel: true, rab: true, kam: true, jum: true, sab: true, min: false },
        },
      ];
    } else if (preset === 'morning') {
      // Shift Pagi: Sen - Sab 08:00 - 16:00
      this.practicePatterns = [
        {
          id: 'pr-preset-morning',
          openTime: '08:00:00',
          closeTime: '16:00:00',
          days: { sen: true, sel: true, rab: true, kam: true, jum: true, sab: true, min: false },
        },
      ];
    } else if (preset === 'evening') {
      // Shift Sore: Sen - Sab 13:00 - 21:00
      this.practicePatterns = [
        {
          id: 'pr-preset-evening',
          openTime: '13:00:00',
          closeTime: '21:00:00',
          days: { sen: true, sel: true, rab: true, kam: true, jum: true, sab: true, min: false },
        },
      ];
    } else if (preset === 'clear') {
      this.practicePatterns = [];
    }
    this.updateScheduleSummary();
    this.markDirty();
  }

  private parseHour(timeStr: string, fallback: number): number {
    if (!timeStr) return fallback;
    const parts = timeStr.split(':');
    const h = parseInt(parts[0], 10);
    return isNaN(h) ? fallback : h;
  }

  // -------------------------------------------------------------
  // SAVE FORM
  // -------------------------------------------------------------
  save(): void {
    this.errorMessage.set('');

    if (!this.formData.name.trim()) {
      this.errorMessage.set('Nama lengkap dan gelar wajib diisi.');
      return;
    }
    if (!this.formData.nik.trim() || this.formData.nik.length < 16) {
      this.errorMessage.set('Nomor Induk Kependudukan (NIK) minimal 16 digit.');
      return;
    }
    if (!this.formData.email.trim()) {
      this.errorMessage.set('Email resmi apoteker wajib diisi.');
      return;
    }
    if (!this.formData.phone.trim()) {
      this.errorMessage.set('Nomor telepon / WhatsApp wajib diisi.');
      return;
    }
    if (!this.formData.sipa.trim()) {
      this.errorMessage.set('Nomor SIPA wajib diisi.');
      return;
    }
    if (!this.formData.stra.trim()) {
      this.errorMessage.set('Nomor STRA wajib diisi.');
      return;
    }

    this.isSubmitting.set(true);

    setTimeout(() => {
      // Save profile
      this.profileService.saveProfile(this.formData);

      // Save patterns
      this.profileService.saveOperationalPatterns(this.operationalPatterns);
      this.profileService.savePracticePatterns(this.practicePatterns);

      this.isSubmitting.set(false);
      this.saveSuccess.set(true);

      setTimeout(() => {
        this.goBack();
      }, 700);
    }, 400);
  }
}
