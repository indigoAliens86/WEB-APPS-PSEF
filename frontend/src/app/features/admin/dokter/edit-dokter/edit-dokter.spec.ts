import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { EditDokter } from './edit-dokter';

describe('EditDokter', () => {
  let component: EditDokter;
  let fixture: ComponentFixture<EditDokter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditDokter],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(EditDokter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders title and edit form with doctor name', () => {
    expect(fixture.nativeElement.textContent).toContain('Edit Data Dokter');
    expect(fixture.nativeElement.textContent).toContain('dr. Sarah Aulia, Sp.OG');
    expect(fixture.nativeElement.textContent).toContain('Legalitas & Perizinan (SIP / STR)');
  });
});
