import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Point } from './point';

describe('Point', () => {
  let component: Point;
  let fixture: ComponentFixture<Point>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Point],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Point);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders 4 financial & activity Point Health KPI cards', () => {
    expect(component.kpiCards.length).toBe(4);
    expect(component.kpiCards[0].title).toBe('Total Poin Beredar');
    expect(component.kpiCards[1].title).toBe('Poin Diperoleh (Earned)');
    expect(component.kpiCards[2].title).toBe('Poin Ditukarkan (Redeemed)');
    expect(component.kpiCards[3].title).toBe('Kedaluwarsa (Expiring in 30d)');
  });

  it('renders primary navigation tabs and counts', () => {
    expect(component.mainTabs).toContain('Semua Riwayat Poin');
    expect(component.mainTabs).toContain('Perolehan (Earned)');
    expect(component.mainTabs).toContain('Penukaran (Redeemed)');
    expect(component.mainTabs).toContain('Katalog Hadiah');
    expect(component.mainTabs).toContain('Misi Kesehatan');
    expect(component.mainTabs).toContain('Leaderboard Pasien');

    expect(component.earnedCount()).toBeGreaterThan(0);
    expect(component.redeemedCount()).toBeGreaterThan(0);
  });

  it('filters point ledger by primary tabs (Earned vs Redeemed)', () => {
    // Filter Perolehan (Earned)
    component.setMainTab('Perolehan (Earned)');
    let filtered = component.filteredPointList();
    expect(filtered.every((i) => i.tipe === 'Earned')).toBe(true);
    expect(filtered.length).toBe(component.earnedCount());

    // Filter Penukaran (Redeemed)
    component.setMainTab('Penukaran (Redeemed)');
    filtered = component.filteredPointList();
    expect(filtered.every((i) => i.tipe === 'Redeemed')).toBe(true);
    expect(filtered.length).toBe(component.redeemedCount());

    // Reset to Semua Riwayat
    component.setMainTab('Semua Riwayat Poin');
    filtered = component.filteredPointList();
    expect(filtered.length).toBe(component.pointList().length);
  });

  it('filters point ledger by search query', () => {
    component.searchQuery.set('PTS-2026-0012');
    let filtered = component.filteredPointList();
    expect(filtered.length).toBe(1);
    expect(filtered[0].id).toBe('#PTS-2026-0012');

    component.searchQuery.set('Dewi Lestari');
    filtered = component.filteredPointList();
    expect(filtered.length).toBeGreaterThan(0);
    expect(filtered[0].pasien.nama).toBe('Dewi Lestari');
  });

  it('filters point ledger by status dropdown', () => {
    component.filterStatus.set('Berhasil');
    const filtered = component.filteredPointList();
    expect(filtered.every((i) => i.status === 'Berhasil')).toBe(true);
  });

  it('filters point ledger by source dropdown', () => {
    component.filterSumber.set('Penebusan Obat Resep');
    const filtered = component.filteredPointList();
    expect(filtered.every((i) => i.sumber === 'Penebusan Obat Resep')).toBe(true);
  });

  it('provides reward catalog with 5 redeemable items', () => {
    const catalog = component.rewardCatalog();
    expect(catalog.length).toBe(5);
    expect(catalog[0].kategori).toBe('Gratis Ongkir');
    expect(catalog[1].kategori).toBe('Voucher Konsultasi');
    expect(catalog[2].kategori).toBe('Diskon Obat');
  });

  it('provides gamified health missions with participants count', () => {
    const missions = component.healthMissions();
    expect(missions.length).toBe(4);
    expect(missions[0].judul).toContain('Minum Obat');
    expect(missions[0].rewardPoin).toBe(100);
    expect(missions[1].kategori).toBe('Telemedisin');
  });

  it('renders top 5 earners leaderboard with ranks', () => {
    const leaderboard = component.topEarners();
    expect(leaderboard.length).toBe(5);
    expect(leaderboard[0].peringkat).toBe(1);
    expect(leaderboard[0].pasien.tier).toBe('VIP');
    expect(leaderboard[1].peringkat).toBe(2);
  });

  it('opens and closes manual adjustment modal', () => {
    expect(component.showAdjustmentModal()).toBe(false);

    component.openAdjustmentModal();
    expect(component.showAdjustmentModal()).toBe(true);

    component.closeAdjustmentModal();
    expect(component.showAdjustmentModal()).toBe(false);
  });

  it('saves manual point adjustment and adds record to pointList', () => {
    const initialCount = component.pointList().length;
    component.adjustmentForm = {
      pasienId: 'PSN-001',
      pasienNama: 'Andi Putra',
      tipe: 'Penambahan',
      jumlahPoin: 150,
      alasan: 'Bonus event Hari Kesehatan Nasional',
    };

    component.saveAdjustment();

    expect(component.pointList().length).toBe(initialCount + 1);
    expect(component.pointList()[0].tipe).toBe('Adjustment');
    expect(component.pointList()[0].jumlahPoint).toBe(150);
  });
});
