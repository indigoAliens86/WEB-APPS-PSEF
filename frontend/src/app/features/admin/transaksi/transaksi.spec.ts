import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Transaksi } from './transaksi';

describe('Transaksi', () => {
  let component: Transaksi;
  let fixture: ComponentFixture<Transaksi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Transaksi],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Transaksi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders 4 financial KPI summary cards', () => {
    expect(component.kpiCards.length).toBe(4);
    expect(component.kpiCards[0].title).toBe('Total Volume Transaksi');
    expect(component.kpiCards[1].title).toBe('Transaksi Berhasil');
    expect(component.kpiCards[2].title).toBe('Menunggu Pembayaran');
    expect(component.kpiCards[3].title).toBe('Gagal & Dibatalkan');
  });

  it('provides 5 source filter tabs covering orders and consultations', () => {
    expect(component.sumberTabs.length).toBe(5);
    expect(component.sumberTabs).toContain('Semua Sumber');
    expect(component.sumberTabs).toContain('Pesanan Obat Resep');
    expect(component.sumberTabs).toContain('Pesanan Obat Non-Resep');
    expect(component.sumberTabs).toContain('Konsultasi Dokter');
    expect(component.sumberTabs).toContain('Konsultasi Apoteker');
  });

  it('filters transaction list by source tabs', () => {
    // Check total count
    expect(component.transactionList.length).toBe(10);

    // Filter Pesanan Obat Resep
    component.setSumberFilter('Pesanan Obat Resep');
    let filtered = component.filteredTransactions();
    expect(filtered.every((t) => t.sumber.tipe === 'Pesanan Obat Resep')).toBe(true);
    expect(filtered.length).toBeGreaterThan(0);

    // Filter Konsultasi Dokter
    component.setSumberFilter('Konsultasi Dokter');
    filtered = component.filteredTransactions();
    expect(filtered.every((t) => t.sumber.tipe === 'Konsultasi Dokter')).toBe(true);
    expect(filtered.length).toBeGreaterThan(0);

    // Filter Konsultasi Apoteker
    component.setSumberFilter('Konsultasi Apoteker');
    filtered = component.filteredTransactions();
    expect(filtered.every((t) => t.sumber.tipe === 'Konsultasi Apoteker')).toBe(true);
    expect(filtered.length).toBeGreaterThan(0);

    // Reset to Semua Sumber
    component.setSumberFilter('Semua Sumber');
    filtered = component.filteredTransactions();
    expect(filtered.length).toBe(10);
  });

  it('filters transaction list by search query', () => {
    component.searchQuery.set('dr. Andi Wijaya');
    let filtered = component.filteredTransactions();
    expect(filtered.length).toBeGreaterThan(0);

    component.searchQuery.set('PAY25024-0012');
    filtered = component.filteredTransactions();
    expect(filtered.length).toBe(1);
    expect(filtered[0].id).toBe('#PAY25024-0012');
  });

  it('filters transaction list by status dropdown', () => {
    component.filterStatus.set('Selesai');
    const filtered = component.filteredTransactions();
    expect(filtered.every((t) => t.status === 'Selesai')).toBe(true);
  });

  it('filters transaction list by payment method category', () => {
    component.filterMetode.set('QRIS');
    const filtered = component.filteredTransactions();
    expect(filtered.every((t) => t.metode.kategori === 'QRIS')).toBe(true);
  });

  it('calculates payment method donut stats accurately', () => {
    const stats = component.metodeStats;
    expect(stats.length).toBe(4);
    const totalPercentage = stats.reduce((sum, item) => sum + item.persentase, 0);
    expect(totalPercentage).toBeCloseTo(100, 0);
  });

  it('calculates filtered total volume correctly', () => {
    expect(component.totalVolumeFiltered()).toContain('Rp');
    expect(component.countFiltered()).toBe(10);
  });
});
