import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Pasien } from './pasien';

describe('Pasien', () => {
  let component: Pasien;
  let fixture: ComponentFixture<Pasien>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pasien],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Pasien);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders the patient directory actions, filters, and sample rows', () => {
    expect(fixture.nativeElement.textContent).toContain('Daftar Pasien');
    expect(fixture.nativeElement.textContent).toContain('Tambah Pasien');
    expect(fixture.nativeElement.textContent).toContain('Andi Putra');
    expect(fixture.nativeElement.textContent).toContain('3275010101010001');
    expect(fixture.nativeElement.textContent).toContain('Total Pasien');
    expect(fixture.nativeElement.querySelector('[aria-label="Filter Jenis Kelamin"]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('[aria-label="Filter Status"]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('[aria-label="Halaman berikutnya"]')).toBeTruthy();
    expect(fixture.nativeElement.querySelectorAll('.pasien-table tbody tr')).toHaveLength(10);
  });
});
