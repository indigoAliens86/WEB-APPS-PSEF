import { DOCUMENT, CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, Renderer2, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface PendingPrescription {
  id: string;
  pasien: string;
  waktu: string;
  itemObat: string;
  status: 'Perlu Skrining APJ' | 'Siap Dispensing';
  isUrgent?: boolean;
}

export interface CounselingMessage {
  id: string;
  namaPasien: string;
  pertanyaan: string;
  waktu: string;
  unread: boolean;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  @Output() readonly sidebarToggle = new EventEmitter<void>();

  private readonly document = inject(DOCUMENT);
  private readonly renderer = inject(Renderer2);

  readonly isDarkTheme = signal(
    typeof window !== 'undefined' && localStorage.getItem('theme') === 'dark'
      ? true
      : this.document.documentElement.classList.contains('dark-theme')
  );

  readonly activeDropdown = signal<'resep' | 'messages' | 'profile' | null>(null);
  readonly isDutyActive = signal<boolean>(true);

  // Mock pending prescriptions requiring APJ screening
  readonly pendingPrescriptions = signal<PendingPrescription[]>([
    {
      id: 'RX-2026-9041',
      pasien: 'Ny. Siti Rahmawati (42 th)',
      waktu: '3 menit lalu',
      itemObat: 'Cefixime 200mg & Paracetamol 500mg',
      status: 'Perlu Skrining APJ',
      isUrgent: true,
    },
    {
      id: 'RX-2026-9040',
      pasien: 'Tn. Hendra Setiawan (55 th)',
      waktu: '10 menit lalu',
      itemObat: 'Amlodipine 10mg & Atorvastatin 20mg',
      status: 'Perlu Skrining APJ',
      isUrgent: false,
    },
    {
      id: 'RX-2026-9038',
      pasien: 'An. Kevin Pratama (8 th)',
      waktu: '22 menit lalu',
      itemObat: 'Amoxicillin Sirup Kering & Paracetamol Drop',
      status: 'Siap Dispensing',
      isUrgent: false,
    },
  ]);

  // Mock incoming telepharmacy counseling requests
  readonly incomingMessages = signal<CounselingMessage[]>([
    {
      id: 'PIO-01',
      namaPasien: 'Budi Santoso',
      pertanyaan: 'Apoteker, apakah obat sirup antibiotik ini harus dihabiskan dan disimpan di kulkas?',
      waktu: '4 mnt lalu',
      unread: true,
    },
    {
      id: 'PIO-02',
      namaPasien: 'Ratna Kusuma',
      pertanyaan: 'Mau konfirmasi dosis pemakaian salep hidrokortison untuk alergi anak balita.',
      waktu: '15 mnt lalu',
      unread: true,
    },
  ]);

  constructor() {
    if (typeof window !== 'undefined' && localStorage.getItem('theme') === 'dark') {
      this.renderer.addClass(this.document.documentElement, 'dark-theme');
    }
  }

  toggleTheme(): void {
    const darkTheme = !this.isDarkTheme();
    this.isDarkTheme.set(darkTheme);
    if (darkTheme) {
      this.renderer.addClass(this.document.documentElement, 'dark-theme');
      if (typeof window !== 'undefined') localStorage.setItem('theme', 'dark');
    } else {
      this.renderer.removeClass(this.document.documentElement, 'dark-theme');
      if (typeof window !== 'undefined') localStorage.setItem('theme', 'light');
    }
  }

  toggleDutyStatus(): void {
    this.isDutyActive.update((active) => !active);
  }

  toggleDropdown(dropdown: 'resep' | 'messages' | 'profile'): void {
    this.activeDropdown.update((current) => (current === dropdown ? null : dropdown));
  }

  closeDropdown(): void {
    this.activeDropdown.set(null);
  }
}
