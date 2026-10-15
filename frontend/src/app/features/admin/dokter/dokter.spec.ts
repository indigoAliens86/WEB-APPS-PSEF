import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Dokter } from './dokter';

describe('Dokter', () => {
  let component: Dokter;
  let fixture: ComponentFixture<Dokter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dokter],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Dokter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders the doctor directory actions, filters, and sample rows', () => {
    expect(fixture.nativeElement.textContent).toContain('Daftar Dokter');
    expect(fixture.nativeElement.textContent).toContain('Tambah Dokter');
    expect(fixture.nativeElement.textContent).toContain('apt. Andi Pratama');
    expect(fixture.nativeElement.textContent).toContain('Total Dokter');
    expect(fixture.nativeElement.textContent).toContain('SIP/STRA');
    expect(fixture.nativeElement.querySelector('[aria-label="Filter Spesialisasi"]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('[aria-label="Filter Verifikasi"]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('[aria-label="Halaman berikutnya"]')).toBeTruthy();
    expect(fixture.nativeElement.querySelectorAll('.directory-table tbody tr')).toHaveLength(10);
  });
});
