import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { DetailDokter } from './detail-dokter';

describe('DetailDokter', () => {
  let component: DetailDokter;
  let fixture: ComponentFixture<DetailDokter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailDokter],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailDokter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders doctor details and tabs', () => {
    expect(fixture.nativeElement.textContent).toContain('dr. Sarah Aulia, Sp.OG');
    expect(fixture.nativeElement.textContent).toContain('Informasi Pribadi');
    expect(fixture.nativeElement.textContent).toContain('Verifikasi & Perizinan');
    expect(fixture.nativeElement.textContent).toContain('Praktik');
  });
});
