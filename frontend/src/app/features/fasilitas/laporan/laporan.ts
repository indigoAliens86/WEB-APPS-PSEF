import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { LaporanSipnapService } from './laporan.service';
import {
  LaporanSipnapPeriodik,
  StatusLaporanSipnap,
  PeranSipnap,
  HakAksesSipnap,
} from './models/laporan-sipnap.model';

export type TabLaporanSipnap =
  | 'Semua Periode'
  | 'Terverifikasi Kemenkes'
  | 'Menunggu Validasi APJ'
  | 'Draft Rekonsiliasi';

@Component({
  selector: 'app-laporan',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet],
  templateUrl: './laporan.html',
  styleUrl: './laporan.css',
})
export class Laporan implements OnInit {
  readonly sipnapService = inject(LaporanSipnapService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly showingDetails = signal<boolean>(false);
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

  // Tabs & Filters
  readonly mainTabs: TabLaporanSipnap[] = [
    'Semua Periode',
    'Terverifikasi Kemenkes',
    'Menunggu Validasi APJ',
    'Draft Rekonsiliasi',
  ];
  readonly activeTab = signal<TabLaporanSipnap>('Semua Periode');
  readonly searchQuery = signal<string>('');
  readonly selectedTahun = signal<string>('2026');

  // Modal Signals
  readonly showNewReportModal = signal<boolean>(false);
  readonly showSyncModal = signal<boolean>(false);
  readonly showKirimModal = signal<boolean>(false);
  readonly selectedLaporanToKirim = signal<LaporanSipnapPeriodik | null>(null);

  readonly isSubmitting = signal<boolean>(false);
  readonly isSyncing = signal<boolean>(false);
  readonly toastMessage = signal<{ text: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Form for new report
  readonly newReportBulan = signal<number>(6);
  readonly newReportTahun = signal<number>(2026);

  readonly monthOptions = [
    { value: 1, label: 'Januari' },
    { value: 2, label: 'Februari' },
    { value: 3, label: 'Maret' },
    { value: 4, label: 'April' },
    { value: 5, label: 'Mei' },
    { value: 6, label: 'Juni' },
    { value: 7, label: 'Juli' },
    { value: 8, label: 'Agustus' },
    { value: 9, label: 'September' },
    { value: 10, label: 'Oktober' },
    { value: 11, label: 'November' },
    { value: 12, label: 'Desember' },
  ];

  // Tab counters
  readonly countVerified = computed(() => {
    return this.sipnapService.laporanList().filter((l) => l.status === 'Terverifikasi Kemenkes').length;
  });

  readonly countWaitingValidation = computed(() => {
    return this.sipnapService.laporanList().filter((l) => l.status === 'Menunggu Validasi APJ').length;
  });

  readonly countDraft = computed(() => {
    return this.sipnapService.laporanList().filter((l) => l.status === 'Draft Rekonsiliasi').length;
  });

  // Filtered List
  readonly filteredLaporan = computed<LaporanSipnapPeriodik[]>(() => {
    let list = this.sipnapService.laporanList();
    const tab = this.activeTab();
    const query = this.searchQuery().trim().toLowerCase();
    const tahun = this.selectedTahun();

    // 1. Filter by Tab
    if (tab === 'Terverifikasi Kemenkes') {
      list = list.filter((l) => l.status === 'Terverifikasi Kemenkes');
    } else if (tab === 'Menunggu Validasi APJ') {
      list = list.filter((l) => l.status === 'Menunggu Validasi APJ');
    } else if (tab === 'Draft Rekonsiliasi') {
      list = list.filter((l) => l.status === 'Draft Rekonsiliasi');
    }

    // 2. Filter by Year
    if (tahun !== 'Semua') {
      list = list.filter((l) => l.tahun === parseInt(tahun, 10));
    }

    // 3. Filter by Search Query
    if (query) {
      list = list.filter(
        (l) =>
          l.id.toLowerCase().includes(query) ||
          l.periodeBulan.toLowerCase().includes(query) ||
          (l.nomorTandaTerima && l.nomorTandaTerima.toLowerCase().includes(query)) ||
          l.status.toLowerCase().includes(query)
      );
    }

    return list;
  });

  ngOnInit(): void {
    this.updateShowingDetails();
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateShowingDetails();
      });
  }

  private updateShowingDetails(): void {
    const url = this.router.url;
    this.currentUrl.set(url);
    // Check if child route is active across either fasilitas or apoteker path
    const isChild =
      url.includes('/fasilitas/laporan/detail-laporan') ||
      url.includes('/fasilitas/laporan/SIPNAP-') ||
      url.includes('/apoteker/laporan/detail-laporan') ||
      url.includes('/apoteker/laporan/SIPNAP-');
    this.showingDetails.set(isChild);
  }

  setTab(tab: TabLaporanSipnap): void {
    this.activeTab.set(tab);
  }

  viewDetail(id: string): void {
    const basePath = this.isApoteker() ? '/apoteker/laporan' : '/fasilitas/laporan';
    this.router.navigate([`${basePath}/detail-laporan`, id]);
  }

  openKirimModal(laporan: LaporanSipnapPeriodik): void {
    if (this.isReadOnly()) {
      this.showToast(
        'Akses Dibatasi: Pengiriman laporan resmi SIPNAP ke Kemenkes RI hanya dapat dilakukan oleh Apoteker Penanggung Jawab (APJ).',
        'error'
      );
      return;
    }
    this.selectedLaporanToKirim.set(laporan);
    this.showKirimModal.set(true);
  }

  closeKirimModal(): void {
    this.showKirimModal.set(false);
    this.selectedLaporanToKirim.set(null);
  }

  confirmKirimSipnap(): void {
    if (this.isReadOnly()) {
      this.showToast('Pengiriman ditolak: Wewenang eksklusif APJ.', 'error');
      return;
    }

    const target = this.selectedLaporanToKirim();
    if (!target) return;

    this.isSubmitting.set(true);
    this.sipnapService.kirimKeKemenkes(target.id).then((res) => {
      this.isSubmitting.set(false);
      this.closeKirimModal();
      this.showToast(`Laporan ${target.periodeBulan} berhasil diverifikasi Kemenkes RI! No. BPO: ${res.bpo}`, 'success');
    });
  }

  openNewReportModal(): void {
    if (this.isReadOnly()) {
      this.showToast(
        'Akses Dibatasi: Pembuatan draf laporan SIPNAP baru hanya dapat dilakukan oleh Apoteker Penanggung Jawab (APJ).',
        'error'
      );
      return;
    }
    this.showNewReportModal.set(true);
  }

  closeNewReportModal(): void {
    this.showNewReportModal.set(false);
  }

  submitNewReport(): void {
    if (this.isReadOnly()) {
      this.showToast('Operasi gagal: Fasilitas hanya memiliki hak akses Read Only.', 'error');
      return;
    }

    const bln = this.newReportBulan();
    const thn = this.newReportTahun();
    const namaBulan = this.monthOptions.find((m) => m.value === bln)?.label || 'Bulan';

    // Check if already exists
    const exists = this.sipnapService.laporanList().some((l) => l.bulan === bln && l.tahun === thn);
    if (exists) {
      this.showToast(`Laporan untuk periode ${namaBulan} ${thn} sudah ada.`, 'error');
      return;
    }

    const created = this.sipnapService.tambahDraftLaporan(bln, thn, namaBulan);
    this.closeNewReportModal();
    this.showToast(`Draft Laporan SIPNAP ${created.periodeBulan} berhasil dibuat!`, 'success');
    this.viewDetail(created.id);
  }

  exportCsv(laporan: LaporanSipnapPeriodik, event: Event): void {
    event.stopPropagation();
    this.sipnapService.exportSipnapCsv(laporan);
    this.showToast(`Data SIPNAP ${laporan.periodeBulan} berhasil diunduh.`, 'info');
  }

  syncDatabase(): void {
    this.isSyncing.set(true);
    setTimeout(() => {
      this.isSyncing.set(false);
      this.showToast('Sinkronisasi data stok N/P/P/OOT dan resep farmasi PSEF sukses!', 'success');
    }, 1200);
  }

  showToast(text: string, type: 'success' | 'info' | 'error'): void {
    this.toastMessage.set({ text, type });
    setTimeout(() => {
      this.toastMessage.set(null);
    }, 4000);
  }
}
