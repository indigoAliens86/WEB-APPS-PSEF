import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';

import { DetailLaporan } from './detail-laporan';

describe('DetailLaporan', () => {
  let component: DetailLaporan;
  let fixture: ComponentFixture<DetailLaporan>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailLaporan],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailLaporan);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('initializes with default financial report details', () => {
    const data = component.detail();
    expect(data.id).toBe('#REP-2026-001');
    expect(data.kategori).toBe('Keuangan & Transaksi');
    expect(data.format).toBe('PDF');
    expect(data.ringkasanEksekutif.length).toBe(4);
    expect(data.pratinjauTabel.length).toBeGreaterThan(0);
    expect(data.digitalSignature.certifiedBy).toContain('Kementerian Kesehatan');
    expect(data.auditRiwayat.length).toBeGreaterThan(0);
  });

  it('switches simulation preview to Pelayanan Farmasi PSEF & Resep', () => {
    component.switchReportType('Farmasi');
    const data = component.detail();
    expect(data.id).toBe('#REP-2026-002');
    expect(data.kategori).toBe('Pelayanan Farmasi (PSEF)');
    expect(data.format).toBe('XLSX');
    expect(data.pic.nama).toContain('Rina Meilani');
    expect(data.ringkasanEksekutif[0].label).toContain('Resep Digital');
  });

  it('switches simulation preview to Kinerja Konsultasi Medis', () => {
    component.switchReportType('Medis');
    const data = component.detail();
    expect(data.id).toBe('#REP-2026-003');
    expect(data.kategori).toBe('Konsultasi Medis');
    expect(data.pic.nama).toContain('dr. Budi Rahardjo');
    expect(data.ringkasanEksekutif[0].label).toContain('Telekonsultasi');
  });

  it('switches simulation preview to Kepatuhan Regulasi Kemenkes', () => {
    component.switchReportType('Kemenkes');
    const data = component.detail();
    expect(data.id).toBe('#REP-2026-004');
    expect(data.kategori).toBe('Kepatuhan Regulasi Kemenkes');
    expect(data.judul).toContain('SIPNAP');
    expect(data.ringkasanEksekutif[0].value).toContain('100%');
  });

  it('navigates back to /admin/laporan when goBack is called', () => {
    const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    component.goBack();
    expect(navigateSpy).toHaveBeenCalledWith(['/admin/laporan']);
  });
});
