import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Pesanan } from './pesanan';

describe('Pesanan', () => {
  let component: Pesanan;
  let fixture: ComponentFixture<Pesanan>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pesanan],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Pesanan);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders 6 KPI summary cards', () => {
    expect(component.kpiCards.length).toBe(6);
    expect(component.kpiCards[0].title).toBe('Total Pesanan');
    expect(component.kpiCards[1].title).toBe('Menunggu Pembayaran');
    expect(component.kpiCards[2].title).toBe('Diproses');
    expect(component.kpiCards[3].title).toBe('Dikirim');
    expect(component.kpiCards[4].title).toBe('Selesai');
    expect(component.kpiCards[5].title).toBe('Dibatalkan');
  });

  it('renders category tabs and filters data properly', () => {
    expect(component.categoryTabs).toContain('Semua Fasilitas');
    expect(component.categoryTabs).toContain('Menunggu Pembayaran');
    expect(component.categoryTabs).toContain('Selesai');

    component.setCategory('Selesai');
    const filtered = component.filteredOrders();
    expect(filtered.every((item) => item.status === 'Selesai')).toBe(true);
  });

  it('filters data by search query', () => {
    component.searchQuery.set('Dewi Lestari');
    const filtered = component.filteredOrders();
    expect(filtered.length).toBeGreaterThan(0);
    expect(filtered[0].pelanggan.nama).toContain('Dewi Lestari');
  });

  it('filters data by status dropdown', () => {
    component.filterStatus.set('Selesai');
    const filtered = component.filteredOrders();
    expect(filtered.every((item) => item.status === 'Selesai')).toBe(true);
  });

  it('opens and closes modal output resep', () => {
    expect(component.showResepModal()).toBe(false);
    expect(component.activeResep()).toBeNull();

    const orderWithResep = component.orderList[0];
    component.openResepModal(orderWithResep);

    expect(component.showResepModal()).toBe(true);
    expect(component.activeResep()).toBeTruthy();
    expect(component.activeResep()?.noResep).toBe('#RX25024-0012');
    expect(component.activeResep()?.items.length).toBeGreaterThan(0);

    component.closeResepModal();
    expect(component.showResepModal()).toBe(false);
    expect(component.activeResep()).toBeNull();
  });

  it('filters orders by Tipe Pesanan switcher (Obat Resep vs Obat Non-Resep)', () => {
    expect(component.totalOrdersCount()).toBe(10);
    expect(component.resepOrdersCount()).toBe(5);
    expect(component.nonResepOrdersCount()).toBe(5);

    // Filter Obat Resep
    component.setTipeFilter('Obat Resep');
    let filtered = component.filteredOrders();
    expect(filtered.length).toBe(5);
    expect(filtered.every((i) => i.tipePesanan === 'Obat Resep')).toBe(true);
    expect(
      filtered.every(
        (i) => i.sumberPesanan === 'Konsultasi Dokter' || i.sumberPesanan === 'Konsultasi Apoteker'
      )
    ).toBe(true);

    // Filter Obat Non-Resep (Marketplace)
    component.setTipeFilter('Obat Non-Resep');
    filtered = component.filteredOrders();
    expect(filtered.length).toBe(5);
    expect(filtered.every((i) => i.tipePesanan === 'Obat Non-Resep')).toBe(true);
    expect(filtered.every((i) => i.sumberPesanan === 'Marketplace Obat')).toBe(true);
    expect(filtered.every((i) => i.marketplaceInfo?.isTersedia === false)).toBe(true);

    // Reset to Semua
    component.setTipeFilter('Semua');
    filtered = component.filteredOrders();
    expect(filtered.length).toBe(10);
  });
});
