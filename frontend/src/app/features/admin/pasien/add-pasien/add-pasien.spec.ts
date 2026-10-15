import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { AddPasien } from './add-pasien';

describe('AddPasien', () => {
  let component: AddPasien;
  let fixture: ComponentFixture<AddPasien>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPasien],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(AddPasien);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders title, form sections, and save button', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('Tambah Pasien Baru');
    expect(el.textContent).toContain('Data Pribadi & Identitas');
    expect(el.textContent).toContain('Layanan Medis & Asuransi');
    expect(el.querySelector('#patient-name')).toBeTruthy();
    expect(el.querySelector('#patient-nik')).toBeTruthy();
    expect(el.querySelector('.btn-primary')).toBeTruthy();
  });

  it('shows error message if required fields are missing', () => {
    component.formData.name = '';
    component.save();
    expect(component.errorMessage()).toBe('Nama lengkap wajib diisi.');
  });
});
