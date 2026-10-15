import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Telemedisin } from './telemedisin';

describe('Telemedisin', () => {
  let component: Telemedisin;
  let fixture: ComponentFixture<Telemedisin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Telemedisin],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Telemedisin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders 5 KPI summary cards', () => {
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('Total Konsultasi');
    expect(el.textContent).toContain('Konsultasi Selesai');
    expect(el.textContent).toContain('Berlangsung');
    expect(el.textContent).toContain('Dibatalkan');
    expect(el.textContent).toContain('Menunggu Antrian');
    expect(el.textContent).toContain('3.245');
    expect(el.textContent).toContain('2.345');
  });

  it('renders table columns and rows properly', () => {
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('Daftar Telemedicine');
    expect(el.textContent).toContain('ID Konsultasi');
    expect(el.textContent).toContain('Pasien');
    expect(el.textContent).toContain('Dokter');
    expect(el.textContent).toContain('Spesialisasi');
    expect(el.textContent).toContain('Ahmad Fauzi');
    expect(el.textContent).toContain('dr. Sarah Aulia, Sp.OG');
  });

  it('filters consultations by category tab', () => {
    component.selectCategory('Menunggu Antrian');
    fixture.detectChanges();
    const items = component.filteredConsultations();
    expect(items.every((i) => i.status === 'Menunggu')).toBe(true);
  });

  it('filters consultations by search query', () => {
    component.searchQuery.set('Budi Santoso');
    fixture.detectChanges();
    const items = component.filteredConsultations();
    expect(items.length).toBe(1);
    expect(items[0].pasien.nama).toBe('Budi Santoso');
  });
});
