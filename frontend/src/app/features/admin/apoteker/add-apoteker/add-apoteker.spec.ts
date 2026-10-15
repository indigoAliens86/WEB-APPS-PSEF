import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { AddApoteker } from './add-apoteker';

describe('AddApoteker', () => {
  let component: AddApoteker;
  let fixture: ComponentFixture<AddApoteker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddApoteker],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(AddApoteker);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders title and pharmacist form sections', () => {
    expect(fixture.nativeElement.textContent).toContain('Tambah Apoteker Baru');
    expect(fixture.nativeElement.textContent).toContain('Data Pribadi & Identitas');
    expect(fixture.nativeElement.textContent).toContain('Pendidikan & Bidang Kefarmasian');
    expect(fixture.nativeElement.textContent).toContain('Legalitas & Perizinan (SIPA / STRA)');
  });
});
