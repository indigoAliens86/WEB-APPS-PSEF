import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ResepService } from '../resep.service';
import { ResepItem } from '../models/resep.model';

@Component({
  selector: 'app-detail-resep',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail-resep.html',
  styleUrl: './detail-resep.css',
})
export class DetailResep implements OnInit {
  readonly resepService = inject(ResepService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly resepId = signal<string>('RX-2026-9041');
  readonly copied = signal<boolean>(false);
  readonly copiedHash = signal<boolean>(false);
  readonly showSignatureModal = signal<boolean>(false);
  readonly activeSkriningTab = signal<'semua' | 'administratif' | 'farmasetis' | 'klinis'>('semua');
  readonly activeMainTab = signal<'skrining' | 'formularium' | 'timeline' | 'semua'>('skrining');

  // Resolved prescription data
  readonly resep = computed<ResepItem>(() => {
    const id = this.resepId();
    const found = this.resepService.getResepById(id);
    if (found) {
      return found;
    }
    // Fallback to first item if not found
    return this.resepService.resepList()[0];
  });

  // Patient allergy warning flag
  readonly hasAllergyWarning = computed<boolean>(() => {
    const alergi = this.resep().pasien.alergi;
    if (!alergi || alergi.length === 0) return false;
    const first = alergi[0].toLowerCase();
    return !first.includes('tidak ada');
  });

  // Screening pass status
  readonly skriningScore = computed<{ label: string; pass: boolean; percent: number }>(() => {
    const r = this.resep().skrining;
    const isLolos = r.statusTotal === 'Lolos Skrining';
    return {
      label: isLolos ? 'Lolos 100% (Memenuhi Syarat)' : 'Perlu Telaah Lanjutan',
      pass: isLolos,
      percent: isLolos ? 100 : 85,
    };
  });

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.resepId.set(id);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/fasilitas/resep']);
  }

  setMainTab(tab: 'skrining' | 'formularium' | 'timeline' | 'semua'): void {
    this.activeMainTab.set(tab);
  }

  setSkriningTab(tab: 'semua' | 'administratif' | 'farmasetis' | 'klinis'): void {
    this.activeSkriningTab.set(tab);
  }

  copyResepNumber(): void {
    const id = this.resep().id;
    this.performCopy(id, this.copied);
  }

  copyHash(): void {
    const hash = this.resep().dokter.digitalSignature.hash;
    this.performCopy(hash, this.copiedHash);
  }

  private performCopy(text: string, signalTarget: ReturnType<typeof signal<boolean>>): void {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        signalTarget.set(true);
        setTimeout(() => signalTarget.set(false), 2000);
      });
    } else {
      signalTarget.set(true);
      setTimeout(() => signalTarget.set(false), 2000);
    }
  }

  printLembarResep(): void {
    window.print();
  }

  openSignatureModal(): void {
    this.showSignatureModal.set(true);
  }

  closeSignatureModal(): void {
    this.showSignatureModal.set(false);
  }

  formatRupiah(value: number): string {
    return 'Rp ' + value.toLocaleString('id-ID');
  }
}
