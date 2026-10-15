import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, provideRouter } from '@angular/router';
import { vi } from 'vitest';

import { Fasilitas } from './fasilitas';

describe('Fasilitas', () => {
  let component: Fasilitas;
  let fixture: ComponentFixture<Fasilitas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Fasilitas],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Fasilitas);
    component = fixture.componentInstance;
    vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders the facility dashboard and table based on the design reference', () => {
    expect(fixture.nativeElement.textContent).toContain('Daftar Fasilitas');
    expect(fixture.nativeElement.textContent).toContain('Tambah Fasilitas');
    expect(fixture.nativeElement.textContent).toContain('RS Medika Utama');
    expect(fixture.nativeElement.textContent).toContain('Total Fasilitas');
    expect(fixture.nativeElement.textContent).toContain('Menunggu Verifikasi');
    expect(fixture.nativeElement.textContent).toContain('Nama Fasilitas');
    expect(fixture.nativeElement.textContent).toContain('PIC');
    expect(fixture.nativeElement.textContent).toContain('Verifikasi');
    expect(fixture.nativeElement.querySelector('[aria-label="Cari fasilitas"]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('[aria-label="Halaman berikutnya"]')).toBeTruthy();
    expect(fixture.nativeElement.querySelectorAll('.facility-stat-card')).toHaveLength(4);
    expect(fixture.nativeElement.querySelectorAll('small')).toHaveLength(0);
  });

  it('searches, filters by status tabs, and paginates facilities', () => {
    component.selectView('aktif');
    expect(component.filteredFacilities.length).toBe(8);
    expect(component.page()).toBe(1);

    component.selectView('semua');
    component.search.set('Apotek');
    component.onFilterChange();
    expect(component.filteredFacilities).toHaveLength(4);

    component.search.set('');
    component.statusFilter.set('Non-Aktif');
    component.onFilterChange();
    expect(component.filteredFacilities).toHaveLength(4);

    component.statusFilter.set('');
    component.onFilterChange();
    expect(component.pageCount).toBe(2);
    component.setPage(2);
    expect(component.pageStart).toBe(11);
    expect(component.paginatedFacilities).toHaveLength(2);
  });

  it('adds, edits, details, and deletes a facility', () => {
    component.openAdd();
    component.draft = {
      ...component.draft,
      name: 'Fasilitas Uji',
      registration: 'REG-UJI-001',
      city: 'Kota Uji',
      pic: 'Admin Uji',
      position: 'Pengelola',
      phone: '021-555-1234',
      email: 'uji@example.test',
      latitude: -6.2,
      longitude: 106.8,
    };
    component.submit();
    const created = component.facilities()[0];
    expect(created.id).toBe('FAS-013');
    expect(created.name).toBe('Fasilitas Uji');

    component.openDetails(created);
    expect(component.selectedFacility?.email).toBe('uji@example.test');

    component.openEdit(created);
    component.draft.name = 'Fasilitas Uji Diperbarui';
    component.submit();
    expect(component.facilities()[0].name).toBe('Fasilitas Uji Diperbarui');

    component.openDelete(created.id);
    component.deleteFacility();
    expect(component.facilities().some((facility) => facility.id === created.id)).toBe(false);
  });

  it('keeps the facility form open when required fields are missing', () => {
    component.openAdd();
    component.draft.name = '   ';
    component.submit();
    expect(component.formError()).toContain('informasi fasilitas');
    expect(component.modal()).toBe('form');
  });

  it('selects the facility and opens its detail route', () => {
    const router = TestBed.inject(Router);
    const facility = component.facilities()[0];

    component.openDetails(facility);

    expect(component.selectedFacility).toBe(facility);
    expect(component.detailTab()).toBe('umum');
    expect(router.navigate).toHaveBeenCalledWith([facility.id], { relativeTo: TestBed.inject(ActivatedRoute) });
  });

  it('keeps the detail data and tab state available to the routed view', () => {
    component.openDetails(component.facilities()[0]);
    component.detailTab.set('layanan');
    expect(component.selectedFacility?.name).toBe('RS Medika Utama');
    expect(component.detailTab()).toBe('layanan');
    expect(component.filteredServices[0].name).toBe('Poli Umum');
  });

  it('updates facility status from the detail actions', () => {
    const facility = component.facilities()[0];
    component.openDetails(facility);
    component.toggleSelectedStatus();
    expect(component.selectedFacility?.status).toBe('Non-Aktif');

    component.setVerificationStatus('Diblokir');
    expect(component.selectedFacility?.verification).toBe('Diblokir');
  });
});
