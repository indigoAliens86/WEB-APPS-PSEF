import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Promo } from './promo';

describe('Promo', () => {
  let component: Promo;
  let fixture: ComponentFixture<Promo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Promo],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Promo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders 4 KPI summary cards for promo, vouchers, and membership', () => {
    expect(component.kpiCards.length).toBe(4);
    expect(component.kpiCards[0].title).toBe('Total Program Aktif');
    expect(component.kpiCards[1].title).toBe('Voucher Terklaim');
    expect(component.kpiCards[2].title).toBe('Total Diskon Pasien');
    expect(component.kpiCards[3].title).toBe('Pasien Member Aktif');
  });

  it('renders primary navigation tabs and counts', () => {
    expect(component.mainTabs).toContain('Semua Program');
    expect(component.mainTabs).toContain('Voucher Diskon');
    expect(component.mainTabs).toContain('Campaign Promo');
    expect(component.mainTabs).toContain('Tingkatan Membership');

    expect(component.voucherCount()).toBeGreaterThan(0);
    expect(component.campaignCount()).toBeGreaterThan(0);
    expect(component.membershipCount()).toBe(4);
  });

  it('filters promo items by primary tabs', () => {
    // Voucher Diskon filter
    component.setMainTab('Voucher Diskon');
    let filtered = component.filteredPromoList();
    expect(filtered.every((item) => item.tipe === 'Voucher')).toBe(true);
    expect(filtered.length).toBe(component.voucherCount());

    // Campaign Promo filter
    component.setMainTab('Campaign Promo');
    filtered = component.filteredPromoList();
    expect(filtered.every((item) => item.tipe === 'Campaign')).toBe(true);
    expect(filtered.length).toBe(component.campaignCount());

    // Reset to Semua Program
    component.setMainTab('Semua Program');
    filtered = component.filteredPromoList();
    expect(filtered.length).toBe(component.promoList().length);
  });

  it('filters items by search query', () => {
    component.searchQuery.set('DOKTERSEHAT');
    let filtered = component.filteredPromoList();
    expect(filtered.length).toBe(1);
    expect(filtered[0].kodeVoucher).toBe('DOKTERSEHAT');

    component.searchQuery.set('Vitamin');
    filtered = component.filteredPromoList();
    expect(filtered.length).toBeGreaterThan(0);
    expect(filtered.some((i) => i.nama.includes('Vitamin'))).toBe(true);
  });

  it('filters items by status dropdown', () => {
    component.filterStatus.set('Aktif');
    const filtered = component.filteredPromoList();
    expect(filtered.every((i) => i.status === 'Aktif')).toBe(true);
  });

  it('filters items by target layanan dropdown', () => {
    component.filterTargetLayanan.set('Telemedisin Dokter');
    const filtered = component.filteredPromoList();
    expect(
      filtered.every(
        (i) => i.targetLayanan === 'Telemedisin Dokter' || i.targetLayanan === 'Semua Layanan'
      )
    ).toBe(true);
  });

  it('provides 4 comprehensive membership tiers with benefits', () => {
    const tiers = component.membershipTiers();
    expect(tiers.length).toBe(4);
    expect(tiers[0].nama).toBe('Silver Member');
    expect(tiers[1].nama).toBe('Gold Member');
    expect(tiers[2].nama).toBe('Platinum Member');
    expect(tiers[3].nama).toBe('VIP Priority');

    expect(tiers[0].benefits.length).toBeGreaterThan(0);
    expect(tiers[2].cashbackPoin).toBe('5% Poin Reward');
    expect(tiers[3].totalAnggota).toBeGreaterThan(0);
  });

  it('toggles program active/inactive status', () => {
    const item = component.promoList()[0];
    const initialStatus = item.status;

    component.toggleProgramStatus(item);
    let updated = component.promoList().find((i) => i.id === item.id);
    expect(updated?.status).not.toBe(initialStatus);

    // Toggle back
    component.toggleProgramStatus(updated!);
    updated = component.promoList().find((i) => i.id === item.id);
    expect(updated?.status).toBe(initialStatus);
  });

  it('opens and closes create program modal', () => {
    expect(component.showCreateModal()).toBe(false);

    component.openCreateModal();
    expect(component.showCreateModal()).toBe(true);

    component.closeCreateModal();
    expect(component.showCreateModal()).toBe(false);
  });

  it('creates and saves a new program item', () => {
    const initialCount = component.promoList().length;
    component.newProgram.nama = 'Promo Vaksinasi Flu PSEF';
    component.newProgram.tipe = 'Voucher';
    component.newProgram.kodeVoucher = 'VAKSINFLU';
    component.newProgram.nilaiDiskon = 25;
    component.newProgram.diskonTipe = 'Persentase';

    component.saveNewProgram();

    expect(component.promoList().length).toBe(initialCount + 1);
    expect(component.promoList()[0].nama).toBe('Promo Vaksinasi Flu PSEF');
    expect(component.promoList()[0].kodeVoucher).toBe('VAKSINFLU');
  });

  it('copies voucher code and updates copiedCode signal', () => {
    expect(component.copiedCode()).toBeNull();
    component.copyVoucherCode('SEHATHEMAT');
    expect(component.copiedCode()).toBe('SEHATHEMAT');
  });
});
