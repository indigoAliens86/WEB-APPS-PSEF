import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LaporanSipnapService } from '../laporan.service';
import {
  LaporanSipnapPeriodik,
  ItemMutasiSipnap,
  GolonganObatSipnap,
  PeranSipnap,
  HakAksesSipnap,
} from '../models/laporan-sipnap.model';

@Component({
  selector: 'app-detail-laporan',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './detail-laporan.html',
  styleUrl: './detail-laporan.css',
})
export class DetailLaporan implements OnInit {
  readonly sipnapService = inject(LaporanSipnapService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly currentUrl = signal<string>(this.router.url);

  // Role detection: 'apoteker' (APJ) vs 'fasilitas' (Read Only)
  readonly userRole = computed<PeranSipnap>(() => {
    return this.currentUrl().includes('/apoteker') ? 'apoteker' : 'fasilitas';
  });
  readonly isApoteker = computed<boolean>(() => this.userRole() === 'apoteker');
  readonly isReadOnly = computed<boolean>(() => this.userRole() === 'fasilitas');
  readonly hakAkses = computed<HakAksesSipnap>(() =>
    this.sipnapService.getHakAkses(this.userRole())
  );

  readonly laporanId = signal<string>('SIPNAP-2026-05');
  readonly activeGolonganTab = signal<string>('Semua');
  readonly searchMedQuery = signal<string>('');
  readonly expandedItemId = signal<string | null>('MUT-01');

  readonly showKirimModal = signal<boolean>(false);
  readonly isSubmitting = signal<boolean>(false);
  readonly copiedBpo = signal<boolean>(false);
  readonly isSavedApjNotes = signal<boolean>(false);
  readonly apjNotes = signal<string>('');

  readonly golonganTabs: string[] = [
    'Semua',
    'Narkotika',
    'Psikotropika',
    'Prekursor',
    'Obat-Obat Tertentu (OOT)',
  ];

  // Resolved Laporan Object
  readonly laporan = computed<LaporanSipnapPeriodik>(() => {
    const id = this.laporanId();
    const found = this.sipnapService.getLaporanById(id);
    if (found) {
      return found;
    }
    // Fallback to first available report
    return this.sipnapService.laporanList()[0];
  });

  // Filtered Sediaan Items
  readonly filteredItems = computed<ItemMutasiSipnap[]>(() => {
    let items = this.laporan().items;
    if (!items || items.length === 0) {
      items = this.sipnapService.laporanList()[0]?.items || [];
    }

    const tab = this.activeGolonganTab();
    const query = this.searchMedQuery().trim().toLowerCase();

    if (tab !== 'Semua') {
      items = items.filter((item) => item.golongan === tab);
    }

    if (query) {
      items = items.filter(
        (item) =>
          item.namaObat.toLowerCase().includes(query) ||
          item.kodeObat.toLowerCase().includes(query) ||
          item.komposisi.toLowerCase().includes(query) ||
          item.noBatch.toLowerCase().includes(query)
      );
    }

    return items;
  });

  // Calculated Totals
  readonly totals = computed(() => {
    const items = this.filteredItems();
    return {
      saldoAwal: items.reduce((acc, curr) => acc + curr.saldoAwal, 0),
      pemasukan: items.reduce((acc, curr) => acc + curr.pemasukan, 0),
      pengeluaran: items.reduce((acc, curr) => acc + curr.pengeluaran, 0),
      saldoAkhir: items.reduce((acc, curr) => acc + curr.saldoAkhir, 0),
      stokFisik: items.reduce((acc, curr) => acc + curr.stokFisik, 0),
      selisih: items.reduce((acc, curr) => acc + curr.selisih, 0),
    };
  });

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.laporanId.set(id);
      }
    });

    this.apjNotes.set(this.laporan().catatanApj);
  }

  goBack(): void {
    const basePath = this.isApoteker() ? '/apoteker/laporan' : '/fasilitas/laporan';
    this.router.navigate([basePath]);
  }

  setGolonganTab(tab: string): void {
    this.activeGolonganTab.set(tab);
  }

  toggleExpandItem(itemId: string): void {
    if (this.expandedItemId() === itemId) {
      this.expandedItemId.set(null);
    } else {
      this.expandedItemId.set(itemId);
    }
  }

  openKirimModal(): void {
    if (this.isReadOnly()) return;
    this.showKirimModal.set(true);
  }

  closeKirimModal(): void {
    this.showKirimModal.set(false);
  }

  confirmKirimSipnap(): void {
    if (this.isReadOnly()) return;
    this.isSubmitting.set(true);
    this.sipnapService.kirimKeKemenkes(this.laporan().id).then(() => {
      this.isSubmitting.set(false);
      this.closeKirimModal();
    });
  }

  simpanValidasiApj(): void {
    if (this.isReadOnly()) return;
    this.sipnapService.validasiOlehApj(this.laporan().id, this.apjNotes());
    this.isSavedApjNotes.set(true);
    setTimeout(() => {
      this.isSavedApjNotes.set(false);
    }, 3000);
  }

  exportExcel(): void {
    this.sipnapService.exportSipnapCsv(this.laporan());
  }

  printBeritaAcara(): void {
    window.print();
  }

  copyBpo(): void {
    const bpo = this.laporan().nomorTandaTerima;
    if (bpo && navigator.clipboard) {
      navigator.clipboard.writeText(bpo).then(() => {
        this.copiedBpo.set(true);
        setTimeout(() => this.copiedBpo.set(false), 2000);
      });
    }
  }
}
