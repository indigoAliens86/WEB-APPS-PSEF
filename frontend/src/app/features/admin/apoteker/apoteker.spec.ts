import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Apoteker } from './apoteker';

describe('Apoteker', () => {
  let component: Apoteker;
  let fixture: ComponentFixture<Apoteker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Apoteker],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Apoteker);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders the pharmacist directory actions, filters, and sample rows', () => {
    expect(fixture.nativeElement.textContent).toContain('Daftar Apoteker');
    expect(fixture.nativeElement.textContent).toContain('Tambah Apoteker');
    expect(fixture.nativeElement.textContent).toContain('Total Apoteker');
    expect(fixture.nativeElement.textContent).toContain('Apoteker Aktif');
    expect(fixture.nativeElement.textContent).toContain('SIPA Kedaluwarsa');
    expect(fixture.nativeElement.textContent).toContain('Apt. Dwi Rahmawati');
    expect(fixture.nativeElement.querySelector('[aria-label="Filter Status"]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('[aria-label="Halaman berikutnya"]')).toBeTruthy();
    expect(fixture.nativeElement.querySelectorAll('.directory-table tbody tr')).toHaveLength(10);
  });
});
