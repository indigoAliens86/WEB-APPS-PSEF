import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ResepService } from './resep.service';
import { ResepItem, TipeResep, KategoriResep, StatusResep } from './models/resep.model';

export type TabResep =
  | 'Semua Resep'
  | 'Perlu Telaah APJ'
  | 'Lolos Skrining'
  | 'Resep Racikan'
  | 'Selesai Ditebus';

@Component({
  selector: 'app-resep',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet],
  templateUrl: './resep.html',
  styleUrl: './resep.css',
})
export class Resep implements OnInit {
  readonly resepService = inject(ResepService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly showingDetails = signal<boolean>(false);

  // Tabs & Filters
  readonly mainTabs: TabResep[] = [
    'Semua Resep',
    'Perlu Telaah APJ',
    'Lolos Skrining',
    'Resep Racikan',
    'Selesai Ditebus',
  ];
  readonly activeMainTab = signal<TabResep>('Semua Resep');
  readonly searchQuery = signal<string>('');
  readonly selectedTipe = signal<string>('Semua');
  readonly selectedKategori = signal<string>('Semua');

  // Computed tab counters
  readonly perluTelaahCount = computed(() => {
    return this.resepService
      .resepList()
      .filter((r) => r.status === 'Menunggu Telaah' || r.status === 'Perlu Konfirmasi').length;
  });

  readonly lolosCount = computed(() => {
    return this.resepService.resepList().filter((r) => r.status === 'Lolos Skrining').length;
  });

  readonly racikanCount = computed(() => {
    return this.resepService.resepList().filter((r) => r.tipeResep === 'Racikan').length;
  });

  readonly selesaiCount = computed(() => {
    return this.resepService.resepList().filter((r) => r.status === 'Selesai Ditebus').length;
  });

  // Filtered prescription list
  readonly filteredResepList = computed<ResepItem[]>(() => {
    let list = this.resepService.resepList();
    const query = this.searchQuery().trim().toLowerCase();
    const tab = this.activeMainTab();
    const tipe = this.selectedTipe();
    const kategori = this.selectedKategori();

    // 1. Filter by Active Tab
    if (tab === 'Perlu Telaah APJ') {
      list = list.filter((r) => r.status === 'Menunggu Telaah' || r.status === 'Perlu Konfirmasi');
    } else if (tab === 'Lolos Skrining') {
      list = list.filter((r) => r.status === 'Lolos Skrining');
    } else if (tab === 'Resep Racikan') {
      list = list.filter((r) => r.tipeResep === 'Racikan');
    } else if (tab === 'Selesai Ditebus') {
      list = list.filter((r) => r.status === 'Selesai Ditebus');
    }

    // 2. Filter by Tipe Resep
    if (tipe !== 'Semua') {
      list = list.filter((r) => r.tipeResep === tipe);
    }

    // 3. Filter by Kategori
    if (kategori !== 'Semua') {
      list = list.filter((r) => r.kategori === (kategori as KategoriResep));
    }

    // 4. Filter by Search Query
    if (query) {
      list = list.filter((r) => {
        const matchId = r.id.toLowerCase().includes(query);
        const matchReg = r.noRegistrasi.toLowerCase().includes(query);
        const matchPasien = r.pasien.nama.toLowerCase().includes(query);
        const matchDokter = r.dokter.nama.toLowerCase().includes(query);
        const matchDiagnosis = r.pasien.diagnosis.toLowerCase().includes(query);
        const matchObat = r.obatList.some(
          (o) =>
            o.namaObat.toLowerCase().includes(query) ||
            o.bentukSediaan.toLowerCase().includes(query)
        );
        return matchId || matchReg || matchPasien || matchDokter || matchDiagnosis || matchObat;
      });
    }

    return list;
  });

  ngOnInit(): void {
    this.updateShowingDetailsFromUrl();

    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateShowingDetailsFromUrl();
      });
  }

  private updateShowingDetailsFromUrl(): void {
    const url = this.router.url;
    const hasChildRoute =
      url.includes('/fasilitas/resep/detail-resep') ||
      url.includes('/fasilitas/resep/RX-');
    this.showingDetails.set(hasChildRoute);
  }

  setMainTab(tab: TabResep): void {
    this.activeMainTab.set(tab);
  }

  resetFilters(): void {
    this.searchQuery.set('');
    this.selectedTipe.set('Semua');
    this.selectedKategori.set('Semua');
    this.activeMainTab.set('Semua Resep');
  }

  viewDetail(item: ResepItem): void {
    this.showingDetails.set(true);
    this.router.navigate(['detail-resep', item.id], { relativeTo: this.route });
  }

  exportData(): void {
    this.resepService.exportResepCsv(this.filteredResepList());
  }

  formatRupiah(value: number): string {
    return 'Rp ' + value.toLocaleString('id-ID');
  }
}
