import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { AddDokter } from './add-dokter';

describe('AddDokter', () => {
  let component: AddDokter;
  let fixture: ComponentFixture<AddDokter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDokter],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(AddDokter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders title and doctor form sections', () => {
    expect(fixture.nativeElement.textContent).toContain('Tambah Dokter Baru');
    expect(fixture.nativeElement.textContent).toContain('Data Pribadi & Identitas');
    expect(fixture.nativeElement.textContent).toContain('Pendidikan & Spesialisasi');
    expect(fixture.nativeElement.textContent).toContain('Legalitas & Perizinan (SIP / STR)');
  });
});
