import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';

import { DetailPoint } from './detail-point';

describe('DetailPoint', () => {
  let component: DetailPoint;
  let fixture: ComponentFixture<DetailPoint>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailPoint],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailPoint);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('initializes with default prescription redemption point details', () => {
    const data = component.detail();
    expect(data.id).toBe('#PTS-2026-0012');
    expect(data.tipe).toBe('Earned');
    expect(data.sumber).toBe('Penebusan Obat Resep');
    expect(data.jumlahPoint).toBe(285);
    expect(data.pasien.nama).toBe('Andi Putra');
    expect(data.saldoPasien.saldoSaatIni).toBe(3450);
    expect(data.auditTrail.length).toBe(4);
    expect(data.riwayatTerkaitPasien.length).toBeGreaterThan(0);
  });

  it('switches simulation preview to Telemedisin Dokter', () => {
    component.switchSourcePreview('Telemedisin');
    const data = component.detail();
    expect(data.sumber).toBe('Konsultasi Telemedisin');
    expect(data.id).toBe('#PTS-2026-0013');
    expect(data.jumlahPoint).toBe(150);
    expect(data.tenagaMedis?.nama).toContain('dr. Siti Nurhaliza');
    expect(data.saldoPasien.tierMultiplier).toContain('1.5x');
  });

  it('switches simulation preview to Penukaran Voucher', () => {
    component.switchSourcePreview('Penukaran');
    const data = component.detail();
    expect(data.sumber).toBe('Penukaran Voucher');
    expect(data.tipe).toBe('Redeemed');
    expect(data.jumlahPoint).toBe(-500);
    expect(data.nilaiRupiahKonversi).toBe('-Rp 5.000');
  });

  it('switches simulation preview to Misi Kesehatan', () => {
    component.switchSourcePreview('Misi');
    const data = component.detail();
    expect(data.sumber).toBe('Misi Kesehatan');
    expect(data.jumlahPoint).toBe(100);
    expect(data.layananTerkait).toContain('Kepatuhan Minum Obat');
  });

  it('navigates back to /admin/point when goBack is called', () => {
    const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    component.goBack();
    expect(navigateSpy).toHaveBeenCalledWith(['/admin/point']);
  });
});
