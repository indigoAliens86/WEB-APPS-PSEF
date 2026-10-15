import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Telefarmasi } from './telefarmasi';

describe('Telefarmasi', () => {
  let component: Telefarmasi;
  let fixture: ComponentFixture<Telefarmasi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Telefarmasi],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Telefarmasi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders 5 KPI summary cards', () => {
    expect(component.kpiCards.length).toBe(5);
    expect(component.kpiCards[0].title).toBe('Total Konsultasi');
    expect(component.kpiCards[1].title).toBe('Konsultasi Selesai');
    expect(component.kpiCards[2].title).toBe('Berlangsung');
    expect(component.kpiCards[3].title).toBe('Dibatalkan');
    expect(component.kpiCards[4].title).toBe('Menunggu Antrian');
  });

  it('renders category tabs and filters data properly', () => {
    expect(component.categoryTabs).toContain('Semua Fasilitas');
    expect(component.categoryTabs).toContain('Menunggu Antrian');
    expect(component.categoryTabs).toContain('Selesai');

    component.setCategory('Selesai');
    const filtered = component.filteredConsultations();
    expect(filtered.every((item) => item.status === 'Selesai')).toBe(true);
  });

  it('filters data by search query', () => {
    component.searchQuery.set('Dewi Lestari');
    const filtered = component.filteredConsultations();
    expect(filtered.length).toBeGreaterThan(0);
    expect(filtered[0].pasien.nama).toContain('Dewi Lestari');
  });

  it('filters data by status dropdown', () => {
    component.filterStatus.set('Menunggu');
    const filtered = component.filteredConsultations();
    expect(filtered.every((item) => item.status === 'Menunggu')).toBe(true);
  });
});
