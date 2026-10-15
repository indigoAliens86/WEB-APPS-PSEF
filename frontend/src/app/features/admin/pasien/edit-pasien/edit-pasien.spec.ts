import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { EditPasien } from './edit-pasien';

describe('EditPasien', () => {
  let component: EditPasien;
  let fixture: ComponentFixture<EditPasien>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPasien],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(EditPasien);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders prefilled form data, sections, and save button', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('Edit Data Pasien');
    expect(el.textContent).toContain('Data Pribadi & Identitas');
    expect(el.textContent).toContain('Layanan Medis & Asuransi');
    expect(el.querySelector('#edit-name')).toBeTruthy();
    expect(el.querySelector('#edit-nik')).toBeTruthy();
    expect(component.formData.name).toBe('Andi Putra');
  });

  it('validates required fields on save', () => {
    component.formData.name = '';
    component.save();
    expect(component.errorMessage()).toBe('Nama lengkap wajib diisi.');
  });
});
