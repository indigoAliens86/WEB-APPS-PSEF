import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Artikel } from './artikel/artikel';
import { Banner } from './banner/banner';
import { Bantuan } from './bantuan/bantuan';
import { Legal } from './legal/legal';
import { Perusahaan } from './perusahaan/perusahaan';

export type KontenTabType = 'artikel' | 'banner' | 'bantuan' | 'legal' | 'perusahaan';

export interface KontenTabItem {
  id: KontenTabType;
  label: string;
  icon: string;
  badgeCount?: number;
  description: string;
}

@Component({
  selector: 'app-konten',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterOutlet,
    Artikel,
    Banner,
    Bantuan,
    Legal,
    Perusahaan,
  ],
  templateUrl: './konten.html',
  styleUrl: './konten.css',
})
export class Konten implements OnInit {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  activeTab = signal<KontenTabType>('artikel');
  showingChildRoute = signal<boolean>(false);

  tabs: KontenTabItem[] = [
    {
      id: 'artikel',
      label: 'Artikel',
      icon: 'ri-article-line',
      badgeCount: 24,
      description: 'CMS artikel kesehatan & edukasi farmasi'
    },
    {
      id: 'banner',
      label: 'Banner',
      icon: 'ri-image-line',
      badgeCount: 4,
      description: 'Banner promosi beranda & info PSEF'
    },
    {
      id: 'bantuan',
      label: 'Bantuan',
      icon: 'ri-customer-service-2-line',
      badgeCount: 3,
      description: 'Panduan cara pesan, CS & FAQ'
    },
    {
      id: 'legal',
      label: 'Legal & Kepatuhan',
      icon: 'ri-shield-check-line',
      badgeCount: 4,
      description: 'Kebijakan privasi PDP, izin PSEF, SOP & S&K'
    },
    {
      id: 'perusahaan',
      label: 'Perusahaan',
      icon: 'ri-building-line',
      badgeCount: 3,
      description: 'Profil PSEF, karir & mitra apotek'
    }
  ];

  ngOnInit(): void {
    this.checkCurrentRoute();
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.checkCurrentRoute();
      });
  }

  private checkCurrentRoute(): void {
    const hasChild = this.route.firstChild !== null;
    this.showingChildRoute.set(hasChild);
    const url = this.router.url;
    if (url.includes('/banner')) {
      this.activeTab.set('banner');
    } else if (url.includes('/artikel')) {
      this.activeTab.set('artikel');
    }
  }

  onChildActivated(): void {
    this.showingChildRoute.set(true);
  }

  onChildDeactivated(): void {
    this.showingChildRoute.set(false);
  }

  setTab(tab: KontenTabType): void {
    this.activeTab.set(tab);
  }
}
