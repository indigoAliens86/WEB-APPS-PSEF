import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';

import { DetailPromo } from './detail-promo';

describe('DetailPromo', () => {
  let component: DetailPromo;
  let fixture: ComponentFixture<DetailPromo>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailPromo],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailPromo);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('initializes with default voucher program details', () => {
    const data = component.detail();
    expect(data.id).toBe('#VCH-2026-001');
    expect(data.tipe).toBe('Voucher');
    expect(data.kodeVoucher).toBe('DOKTERSEHAT');
    expect(data.status).toBe('Aktif');
    expect(data.diskonFormatted).toBe('Diskon 50%');
    expect(data.syaratKetentuan.length).toBeGreaterThan(0);
    expect(data.riwayatKlaim.length).toBeGreaterThan(0);
  });

  it('switches simulation preview to Campaign Flash Sale', () => {
    component.switchPreviewType('Campaign');
    const data = component.detail();
    expect(data.tipe).toBe('Campaign');
    expect(data.id).toBe('#PRM-2026-003');
    expect(data.nama).toContain('Flash Sale');
    expect(data.kodeVoucher).toBeUndefined();
    expect(data.targetLayanan).toBe('Marketplace Obat');
  });

  it('switches simulation preview to Membership Tier', () => {
    component.switchPreviewType('Membership');
    const data = component.detail();
    expect(data.tipe).toBe('Membership');
    expect(data.id).toBe('#MBR-TIER-003');
    expect(data.nama).toContain('Platinum Member');
    expect(data.targetTierMembership).toContain('Platinum');
    expect(data.diskonFormatted).toContain('Diskon 20%');
  });

  it('copies voucher code and updates copiedCode signal', () => {
    expect(component.copiedCode()).toBe(false);
    component.copyCode();
    expect(component.copiedCode()).toBe(true);
  });

  it('navigates back to /admin/promo when goBack is called', () => {
    const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    component.goBack();
    expect(navigateSpy).toHaveBeenCalledWith(['/admin/promo']);
  });
});
