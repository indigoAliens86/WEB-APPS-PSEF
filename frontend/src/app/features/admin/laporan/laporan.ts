import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import {
  LaporanItem,
  KpiLaporan,
  KategoriLaporan,
  FormatLaporan,
  StatusLaporan,
} from './models/laporan.model';

export type { LaporanItem, KpiLaporan, KategoriLaporan, FormatLaporan, StatusLaporan };

@Component({
  selector: 'app-laporan',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet],
  templateUrl: './laporan.html',
  styleUrl: './laporan.css',
})
export class Laporan implements OnInit {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly showingDetails = signal<boolean>(false);
  readonly showGenerateModal = signal<boolean>(false);

  // 4 Top KPIs for Reporting & Analytics
  readonly kpiCards: KpiLaporan[] = [
    {
      title: 'Total Laporan Diterbitkan',
      value: '128 Dokumen',
      percentage: '+12 baru',
      period: 'bulan ini',
      icon: 'ri-file-chart-line',
      colorClass: 'blue',
    },
    {
      title: 'Total Transaksi Terekap',
      value: 'Rp 1.480.500.000',
      percentage: '+15.4%',
      period: 'tahun berjalan 2026',
      icon: 'ri-wallet-3-line',
      colorClass: 'emerald',
    },
    {
      title: 'Pelayanan Resep Farmasi',
      value: '14.850 Resep',
      percentage: '99.4%',
      period: 'kepatuhan PSEF',
      icon: 'ri-capsule-line',
      colorClass: 'purple',
    },
    {
      title: 'Kepatuhan Regulasi Kemenkes',
      value: '100% Terverifikasi',
      percentage: 'SIPNAP & BPOM',
      period: 'audit kepatuhan resmi',
      icon: 'ri-shield-check-line',
      colorClass: 'teal',
    },
  ];

  // Primary Navigation Category Tabs
  readonly activeCategoryTab = signal<string>('Semua Laporan');
  readonly categoryTabs: string[] = [
    'Semua Laporan',
    'Keuangan & Transaksi',
    'Pelayanan Farmasi (PSEF)',
    'Konsultasi Medis',
    'Pasien & Demografi',
    'Kepatuhan Regulasi Kemenkes',
  ];

  // Filters
  readonly searchQuery = signal<string>('');
  readonly filterFormat = signal<string>('Semua Format');
  readonly filterStatus = signal<string>('Semua Status');
  readonly filterPeriode = signal<string>('Semua Periode');

  readonly formatOptions: string[] = ['Semua Format', 'PDF', 'XLSX', 'CSV'];
  readonly statusOptions: string[] = [
    'Semua Status',
    'Siap Unduh',
    'Sedang Diproses',
    'Terjadwal',
  ];
  readonly periodeOptions: string[] = [
    'Semua Periode',
    'Mei 2026',
    'April 2026',
    'Triwulan I 2026',
    'Tahun 2026',
  ];

  // Reports Repository Table Data
  readonly reportList = signal<LaporanItem[]>([
    {
      no: 1,
      id: '#REP-2026-001',
      cleanId: 'REP-2026-001',
      judul: 'Laporan Rekapitulasi Pendapatan & Settlement Gateway',
      deskripsi: 'Rekap seluruh transaksi pembayaran pesanan obat, telemedisin, dan settlement bank gateway',
      kategori: 'Keuangan & Transaksi',
      periode: 'Mei 2026',
      format: 'PDF',
      ukuranFile: '3.4 MB',
      tanggalGenerate: '24 Mei 2026 11:00',
      generatorPic: 'Ahmad Fauzi, SE (Finance Admin)',
      totalData: 1285,
      status: 'Siap Unduh',
    },
    {
      no: 2,
      id: '#REP-2026-002',
      cleanId: 'REP-2026-002',
      judul: 'Laporan Pelayanan Resep Elektronik & Distribusi Obat PSEF',
      deskripsi: 'Laporan kepatuhan penyerahan obat resep dokter, telaah resep apoteker, dan pelacakan pengiriman',
      kategori: 'Pelayanan Farmasi (PSEF)',
      periode: 'Mei 2026',
      format: 'XLSX',
      ukuranFile: '5.2 MB',
      tanggalGenerate: '24 Mei 2026 09:30',
      generatorPic: 'apt. Rina Meilani, S.Farm. (Apoteker PJ)',
      totalData: 2450,
      status: 'Siap Unduh',
    },
    {
      no: 3,
      id: '#REP-2026-003',
      cleanId: 'REP-2026-003',
      judul: 'Laporan Kinerja Layanan Telemedisin & Beban Kerja Dokter',
      deskripsi: 'Statistik sesi konsultasi dokter spesialis & umum, durasi konsultasi, dan indeks kepuasan pasien',
      kategori: 'Konsultasi Medis',
      periode: 'Mei 2026',
      format: 'PDF',
      ukuranFile: '2.8 MB',
      tanggalGenerate: '23 Mei 2026 16:45',
      generatorPic: 'dr. Budi Rahardjo, Sp.A (Ketua Komite Medis)',
      totalData: 890,
      status: 'Siap Unduh',
    },
    {
      no: 4,
      id: '#REP-2026-004',
      cleanId: 'REP-2026-004',
      judul: 'Laporan Kepatuhan SIPNAP & Monitoring Narkotika/Psikotropika',
      deskripsi: 'Dokumen audit kepatuhan regulasi Kementerian Kesehatan & BPOM penyerahan obat terbatas',
      kategori: 'Kepatuhan Regulasi Kemenkes',
      periode: 'Mei 2026',
      format: 'PDF',
      ukuranFile: '1.9 MB',
      tanggalGenerate: '23 Mei 2026 14:15',
      generatorPic: 'apt. Rina Meilani, S.Farm. (Apoteker PJ)',
      totalData: 140,
      status: 'Siap Unduh',
    },
    {
      no: 5,
      id: '#REP-2026-005',
      cleanId: 'REP-2026-005',
      judul: 'Laporan Demografi Pasien & Tren Diagnosa Penyakit',
      deskripsi: 'Analisis kelompok usia, sebaran geografis pasien, dan 10 besar diagnosa keluhan penyakit terbanyak',
      kategori: 'Pasien & Demografi',
      periode: 'Triwulan I 2026',
      format: 'XLSX',
      ukuranFile: '4.7 MB',
      tanggalGenerate: '22 Mei 2026 10:20',
      generatorPic: 'Siti Nurhaliza, S.Kom (Data Analyst)',
      totalData: 8420,
      status: 'Siap Unduh',
    },
    {
      no: 6,
      id: '#REP-2026-006',
      cleanId: 'REP-2026-006',
      judul: 'Laporan Efektivitas Kupon Promo & Loyalitas Point Health',
      deskripsi: 'Evaluasi ROI voucher diskon, klaim kupon, perolehan poin kesehatan, dan burn rate loyalitas',
      kategori: 'Keuangan & Transaksi',
      periode: 'April 2026',
      format: 'CSV',
      ukuranFile: '1.2 MB',
      tanggalGenerate: '01 Mei 2026 08:00',
      generatorPic: 'Dewi Lestari (Marketing Lead)',
      totalData: 4892,
      status: 'Siap Unduh',
    },
    {
      no: 7,
      id: '#REP-2026-007',
      cleanId: 'REP-2026-007',
      judul: 'Laporan Audit Kualitas Pelayanan Farmasi Telekonseling',
      deskripsi: 'Evaluasi waktu tanggap telaah resep apoteker, kepatuhan KIE (Komunikasi, Informasi, Edukasi)',
      kategori: 'Pelayanan Farmasi (PSEF)',
      periode: 'April 2026',
      format: 'PDF',
      ukuranFile: '3.1 MB',
      tanggalGenerate: '28 Apr 2026 15:30',
      generatorPic: 'apt. Rina Meilani, S.Farm. (Apoteker PJ)',
      totalData: 1820,
      status: 'Siap Unduh',
    },
    {
      no: 8,
      id: '#REP-2026-008',
      cleanId: 'REP-2026-008',
      judul: 'Laporan Tahunan Kepatuhan Standar Penyelenggaraan PSEF 2026',
      deskripsi: 'Kompilasi audit kepatuhan menyeluruh PSEF sesuai PMK No. 14 Tahun 2021 dan standar keamanan data',
      kategori: 'Kepatuhan Regulasi Kemenkes',
      periode: 'Tahun 2026',
      format: 'PDF',
      ukuranFile: '12.5 MB',
      tanggalGenerate: '20 Mei 2026 17:00',
      generatorPic: 'Ir. Hendra Wijaya (Compliance Officer)',
      totalData: 15400,
      status: 'Sedang Diproses',
    },
  ]);

  // Form State for Modal Generate Report
  newReportForm = {
    judul: '',
    kategori: 'Keuangan & Transaksi' as KategoriLaporan,
    periode: 'Mei 2026',
    format: 'PDF' as FormatLaporan,
    deskripsi: '',
    sertakanGrafik: true,
    sertakanTtdDigital: true,
  };

  // Filtered Reports Computed
  readonly filteredReports = computed(() => {
    let list = this.reportList();

    // 1. Primary Category Tab Filter
    const cat = this.activeCategoryTab();
    if (cat !== 'Semua Laporan') {
      list = list.filter((r) => r.kategori === cat);
    }

    // 2. Format Filter
    const fmt = this.filterFormat();
    if (fmt && fmt !== 'Semua Format') {
      list = list.filter((r) => r.format === fmt);
    }

    // 3. Status Filter
    const st = this.filterStatus();
    if (st && st !== 'Semua Status') {
      list = list.filter((r) => r.status === st);
    }

    // 4. Periode Filter
    const p = this.filterPeriode();
    if (p && p !== 'Semua Periode') {
      list = list.filter((r) => r.periode === p);
    }

    // 5. Search Query
    const q = this.searchQuery().toLowerCase().trim();
    if (q) {
      list = list.filter(
        (r) =>
          r.id.toLowerCase().includes(q) ||
          r.judul.toLowerCase().includes(q) ||
          r.deskripsi.toLowerCase().includes(q) ||
          r.generatorPic.toLowerCase().includes(q)
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
    const isChild =
      url.includes('/admin/laporan/detail-laporan') ||
      url.includes('/admin/laporan/REP') ||
      (this.route.children.length > 0 && this.route.snapshot.firstChild !== null);
    this.showingDetails.set(isChild);
  }

  setCategoryTab(tab: string): void {
    this.activeCategoryTab.set(tab);
  }

  viewDetail(item: LaporanItem): void {
    this.showingDetails.set(true);
    this.router.navigate(['/admin/laporan/detail-laporan', item.cleanId]);
  }

  downloadReport(item: LaporanItem): void {
    alert(`Mengunduh file "${item.judul}.${item.format.toLowerCase()}" (${item.ukuranFile})...`);
  }

  openGenerateModal(): void {
    this.showGenerateModal.set(true);
  }

  closeGenerateModal(): void {
    this.showGenerateModal.set(false);
  }

  saveGenerateReport(): void {
    if (!this.newReportForm.judul) {
      alert('Silakan masukkan judul dokumen laporan yang akan diterbitkan');
      return;
    }

    const newId = `#REP-2026-00${this.reportList().length + 1}`;
    const newReport: LaporanItem = {
      no: this.reportList().length + 1,
      id: newId,
      cleanId: newId.replace('#', ''),
      judul: this.newReportForm.judul,
      deskripsi: this.newReportForm.deskripsi || 'Laporan resmi terbitan sistem PSEF',
      kategori: this.newReportForm.kategori,
      periode: this.newReportForm.periode,
      format: this.newReportForm.format,
      ukuranFile: '2.1 MB',
      tanggalGenerate: '12 Okt 2026 18:15',
      generatorPic: 'Admin PSEF (System Generator)',
      totalData: 950,
      status: 'Siap Unduh',
    };

    this.reportList.update((items) => [newReport, ...items]);
    this.closeGenerateModal();
    alert(`Laporan "${newReport.judul}" berhasil diterbitkan dan siap diunduh!`);
  }

  exportAllZip(): void {
    alert('Mengompresi dan mengunduh seluruh arsip laporan PSEF dalam format ZIP...');
  }

  getFormatBadgeClass(fmt: FormatLaporan): string {
    switch (fmt) {
      case 'PDF':
        return 'badge-format-pdf';
      case 'XLSX':
        return 'badge-format-xlsx';
      case 'CSV':
        return 'badge-format-csv';
      default:
        return '';
    }
  }

  getStatusBadgeClass(status: StatusLaporan): string {
    switch (status) {
      case 'Siap Unduh':
        return 'badge-siap';
      case 'Sedang Diproses':
        return 'badge-proses';
      case 'Terjadwal':
        return 'badge-jadwal';
      default:
        return '';
    }
  }
}
