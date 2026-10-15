import { DOCUMENT, CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, Renderer2, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

export interface ResepNotification {
  id: string;
  pasien: string;
  waktu: string;
  itemObat: string;
  status: 'Perlu Telaah' | 'Siap Dispensing';
  isUrgent?: boolean;
}

export interface TelefarmasiMessage {
  id: string;
  namaPasien: string;
  pertanyaan: string;
  waktu: string;
  unread: boolean;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
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
  readonly isApotekOpen = signal<boolean>(true);

  // Mock real-time data for pharmacy operations
  readonly pendingResepList = signal<ResepNotification[]>([
    {
      id: 'RX-2026-9041',
      pasien: 'Ny. Siti Rahmawati (42 th)',
      waktu: '3 menit lalu',
      itemObat: 'Cefixime 200mg & Paracetamol 500mg',
      status: 'Perlu Telaah',
      isUrgent: true,
    },
    {
      id: 'RX-2026-9040',
      pasien: 'Tn. Hendra Setiawan (55 th)',
      waktu: '12 menit lalu',
      itemObat: 'Amlodipine 10mg & Atorvastatin 20mg',
      status: 'Perlu Telaah',
      isUrgent: false,
    },
    {
      id: 'RX-2026-9038',
      pasien: 'An. Kevin Pratama (8 th)',
      waktu: '25 menit lalu',
      itemObat: 'Amoxicillin Sirup Kering & Puyer Batuk',
      status: 'Siap Dispensing',
      isUrgent: false,
    },
  ]);

  readonly incomingMessages = signal<TelefarmasiMessage[]>([
    {
      id: 'MSG-01',
      namaPasien: 'Budi Santoso',
      pertanyaan: 'Apoteker, apakah obat sirup antibiotik ini harus disimpan di kulkas?',
      waktu: '5 mnt lalu',
      unread: true,
    },
    {
      id: 'MSG-02',
      namaPasien: 'Ratna Kusuma',
      pertanyaan: 'Mau konfirmasi dosis pemakaian salep hidrokortison untuk balita.',
      waktu: '18 mnt lalu',
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

  toggleDropdown(dropdown: 'resep' | 'messages' | 'profile'): void {
    this.activeDropdown.update((current) => (current === dropdown ? null : dropdown));
  }

  closeDropdown(): void {
    this.activeDropdown.set(null);
  }

  toggleApotekStatus(): void {
    this.isApotekOpen.update((v) => !v);
  }
}
