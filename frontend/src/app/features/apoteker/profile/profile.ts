import { Component, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import {
  ApotekerProfileService,
  ScheduleDayPattern,
  VerificationDoc,
} from './apoteker-profile.service';

export type DetailTab = 'informasi' | 'verifikasi' | 'praktik';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  readonly profileService = inject(ApotekerProfileService);

  readonly activeTab = signal<DetailTab>('informasi');
  readonly selectedPreviewDoc = signal<VerificationDoc | null>(null);
  readonly previewCertificateModal = signal(false);

  readonly pharmacist = computed(() => this.profileService.pharmacist());
  readonly practiceInfo = computed(() => this.profileService.practiceInfo());
  readonly educationList = computed(() => this.profileService.educationList());
  readonly skills = computed(() => this.profileService.skills());
  readonly jobExperiences = computed(() => this.profileService.jobExperiences());
  readonly teachingExperiences = computed(() => this.profileService.teachingExperiences());
  readonly verificationDocs = computed(() => this.profileService.verificationDocs());
  readonly timelineSteps = computed(() => this.profileService.timelineSteps());
  readonly scheduleHours = this.profileService.scheduleHours;
  readonly scheduleDays = computed(() => this.profileService.scheduleDays());

  readonly scheduleViewMode = signal<'timeline' | 'matrix'>('timeline');

  readonly operationalPatterns = computed(() => this.profileService.operationalPatterns());
  readonly practicePatterns = computed(() => this.profileService.practicePatterns());

  readonly calendarDays: { key: keyof ScheduleDayPattern; label: string; subLabel: string }[] = [
    { key: 'sen', label: 'Sen', subLabel: 'Senin' },
    { key: 'sel', label: 'Sel', subLabel: 'Selasa' },
    { key: 'rab', label: 'Rab', subLabel: 'Rabu' },
    { key: 'kam', label: 'Kam', subLabel: 'Kamis' },
    { key: 'jum', label: 'Jum', subLabel: 'Jumat' },
    { key: 'sab', label: 'Sab', subLabel: 'Sabtu' },
    { key: 'min', label: 'Min', subLabel: 'Minggu' },
  ];

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

  readonly matrixHours = Array.from({ length: 24 }, (_, i) => i);

  setScheduleViewMode(mode: 'timeline' | 'matrix'): void {
    this.scheduleViewMode.set(mode);
  }

  formatHourLabel(hour: number): string {
    return `${hour.toString().padStart(2, '0')}:00`;
  }

  getDayPracticeHours(dayKey: keyof ScheduleDayPattern): number {
    const pr = this.getDayPracticeDetails(dayKey);
    return pr.hasPractice ? pr.duration : 0;
  }

  getTotalPracticeHours(): number {
    let sum = 0;
    for (const d of this.calendarDays) {
      sum += this.getDayPracticeHours(d.key);
    }
    return sum;
  }

  getActiveDaysCount(): number {
    return this.calendarDays.filter((d) => this.getDayPracticeDetails(d.key).hasPractice).length;
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
    const patterns = this.operationalPatterns();
    for (const pat of patterns) {
      if (pat.days[dayKey]) {
        const start = this.parseHour(pat.openTime, 8);
        const end = this.parseHour(pat.closeTime, 22);
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
    const patterns = this.practicePatterns();
    for (const pat of patterns) {
      if (pat.days[dayKey]) {
        const start = this.parseHour(pat.openTime, 8);
        const end = this.parseHour(pat.closeTime, 17);
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

  isOperationalSlot(dayKey: keyof ScheduleDayPattern, hour: number): boolean {
    const op = this.getDayOperationalDetails(dayKey);
    return op.isOpen && hour >= op.startHour && hour < op.endHour;
  }

  isPracticeSlot(dayKey: keyof ScheduleDayPattern, hour: number): boolean {
    const pr = this.getDayPracticeDetails(dayKey);
    return pr.hasPractice && hour >= pr.startHour && hour < pr.endHour;
  }

  private parseHour(timeStr: string, fallback: number): number {
    if (!timeStr) return fallback;
    const parts = timeStr.split(':');
    const h = parseInt(parts[0], 10);
    return isNaN(h) ? fallback : h;
  }

  goBack(): void {
    void this.router.navigate(['/apoteker/dashboard']);
  }

  selectTab(tab: DetailTab): void {
    this.activeTab.set(tab);
  }

  goToEdit(): void {
    const target = this.router.url.includes('/profil')
      ? '/apoteker/profil/edit-profile'
      : '/apoteker/profile/edit-profile';
    void this.router.navigate([target]);
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

  onAvatarError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = '/assets/images/avatar/male.png';
  }

  downloadSipa(): void {
    window.print();
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
