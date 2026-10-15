import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Laporan } from './laporan';

describe('Laporan', () => {
  let component: Laporan;
  let fixture: ComponentFixture<Laporan>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Laporan],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Laporan);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders 4 KPI summary cards for PSEF reports & analytics', () => {
    expect(component.kpiCards.length).toBe(4);
    expect(component.kpiCards[0].title).toBe('Total Laporan Diterbitkan');
    expect(component.kpiCards[1].title).toBe('Total Transaksi Terekap');
    expect(component.kpiCards[2].title).toBe('Pelayanan Resep Farmasi');
    expect(component.kpiCards[3].title).toBe('Kepatuhan Regulasi Kemenkes');
  });

  it('renders category tabs navigation', () => {
    expect(component.categoryTabs).toContain('Semua Laporan');
    expect(component.categoryTabs).toContain('Keuangan & Transaksi');
    expect(component.categoryTabs).toContain('Pelayanan Farmasi (PSEF)');
    expect(component.categoryTabs).toContain('Konsultasi Medis');
    expect(component.categoryTabs).toContain('Pasien & Demografi');
    expect(component.categoryTabs).toContain('Kepatuhan Regulasi Kemenkes');
  });

  it('filters reports by category tabs', () => {
    // Filter Keuangan & Transaksi
    component.setCategoryTab('Keuangan & Transaksi');
    let filtered = component.filteredReports();
    expect(filtered.every((r) => r.kategori === 'Keuangan & Transaksi')).toBe(true);
    expect(filtered.length).toBeGreaterThan(0);

    // Filter Pelayanan Farmasi (PSEF)
    component.setCategoryTab('Pelayanan Farmasi (PSEF)');
    filtered = component.filteredReports();
    expect(filtered.every((r) => r.kategori === 'Pelayanan Farmasi (PSEF)')).toBe(true);

    // Filter Kepatuhan Regulasi Kemenkes
    component.setCategoryTab('Kepatuhan Regulasi Kemenkes');
    filtered = component.filteredReports();
    expect(filtered.every((r) => r.kategori === 'Kepatuhan Regulasi Kemenkes')).toBe(true);

    // Reset to Semua Laporan
    component.setCategoryTab('Semua Laporan');
    filtered = component.filteredReports();
    expect(filtered.length).toBe(component.reportList().length);
  });

  it('filters reports by file format dropdown', () => {
    component.filterFormat.set('PDF');
    let filtered = component.filteredReports();
    expect(filtered.every((r) => r.format === 'PDF')).toBe(true);

    component.filterFormat.set('XLSX');
    filtered = component.filteredReports();
    expect(filtered.every((r) => r.format === 'XLSX')).toBe(true);
  });

  it('filters reports by status dropdown', () => {
    component.filterStatus.set('Siap Unduh');
    const filtered = component.filteredReports();
    expect(filtered.every((r) => r.status === 'Siap Unduh')).toBe(true);
  });

  it('filters reports by search query', () => {
    component.searchQuery.set('SIPNAP');
    let filtered = component.filteredReports();
    expect(filtered.length).toBeGreaterThan(0);
    expect(filtered[0].judul).toContain('SIPNAP');

    component.searchQuery.set('REP-2026-001');
    filtered = component.filteredReports();
    expect(filtered.length).toBe(1);
    expect(filtered[0].id).toBe('#REP-2026-001');
  });

  it('opens and closes generate report modal', () => {
    expect(component.showGenerateModal()).toBe(false);

    component.openGenerateModal();
    expect(component.showGenerateModal()).toBe(true);

    component.closeGenerateModal();
    expect(component.showGenerateModal()).toBe(false);
  });

  it('creates and saves a new report item', () => {
    const initialCount = component.reportList().length;
    component.newReportForm.judul = 'Laporan Audit Efisiensi Kurir Obat PSEF';
    component.newReportForm.kategori = 'Pelayanan Farmasi (PSEF)';
    component.newReportForm.periode = 'Mei 2026';
    component.newReportForm.format = 'PDF';

    component.saveGenerateReport();

    expect(component.reportList().length).toBe(initialCount + 1);
    expect(component.reportList()[0].judul).toBe('Laporan Audit Efisiensi Kurir Obat PSEF');
    expect(component.reportList()[0].status).toBe('Siap Unduh');
  });
});
