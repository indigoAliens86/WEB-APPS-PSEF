import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';

import { DetailTransaksi } from './detail-transaksi';

describe('DetailTransaksi', () => {
  let component: DetailTransaksi;
  let fixture: ComponentFixture<DetailTransaksi>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailTransaksi],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailTransaksi);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('initializes with default transaction details', () => {
    const data = component.detail();
    expect(data.id).toBe('#PAY25024-0012');
    expect(data.status).toBe('Selesai');
    expect(data.pelanggan.nama).toBe('Andi Putra');
    expect(data.sumber.tipe).toBe('Pesanan Obat Resep');
    expect(data.rincianItem.length).toBeGreaterThan(0);
    expect(data.biaya.totalPembayaran).toBe('Rp 185.000');
  });

  it('switches source preview to Konsultasi Dokter', () => {
    component.switchSourcePreview('Konsultasi Dokter');
    const data = component.detail();
    expect(data.sumber.tipe).toBe('Konsultasi Dokter');
    expect(data.sumber.refId).toBe('#TLM-2026-0041');
    expect(data.sumber.tenagaKesehatan?.role).toContain('Dokter');
    expect(data.rincianItem[0].nama).toContain('Telekonsultasi');
    expect(data.biaya.totalPembayaran).toBe('Rp 126.000');
  });

  it('switches source preview to Konsultasi Apoteker', () => {
    component.switchSourcePreview('Konsultasi Apoteker');
    const data = component.detail();
    expect(data.sumber.tipe).toBe('Konsultasi Apoteker');
    expect(data.sumber.refId).toBe('#TLF-2026-0022');
    expect(data.sumber.tenagaKesehatan?.role).toContain('Apoteker');
    expect(data.rincianItem[0].nama).toContain('Konseling');
    expect(data.biaya.totalPembayaran).toBe('Rp 32.500');
  });

  it('switches source preview to Pesanan Obat Non-Resep (Marketplace)', () => {
    component.switchSourcePreview('Pesanan Obat Non-Resep');
    const data = component.detail();
    expect(data.sumber.tipe).toBe('Pesanan Obat Non-Resep');
    expect(data.sumber.refId).toBe('#INV24025-0015');
    expect(data.rincianItem[0].kategori).toBe('Obat Bebas');
    expect(data.biaya.totalPembayaran).toBe('Rp 210.000');
  });

  it('copies gateway reference ID', () => {
    expect(component.copiedRef()).toBe(false);
    component.copyRefId();
    expect(component.copiedRef()).toBe(true);
  });

  it('navigates back to /admin/transaksi when goBack is called', () => {
    const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    component.goBack();
    expect(navigateSpy).toHaveBeenCalledWith(['/admin/transaksi']);
  });
});
