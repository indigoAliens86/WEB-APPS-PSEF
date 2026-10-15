import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { DetailTelemedisin } from './detail-telemedisin';

describe('DetailTelemedisin', () => {
  let component: DetailTelemedisin;
  let fixture: ComponentFixture<DetailTelemedisin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailTelemedisin],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailTelemedisin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders consultation summary card with ID, Patient, and Doctor', () => {
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('CNS24025-0012');
    expect(el.textContent).toContain('Dewi Lestari');
    expect(el.textContent).toContain('dr. Sarah Aulia, Sp.OG.');
    expect(el.textContent).toContain('Obstetri & Ginekologi');
  });

  it('renders clinical information sections', () => {
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('Keluhan Utama');
    expect(el.textContent).toContain('Nyeri saat haid');
    expect(el.textContent).toContain('Ringkasan Konsultasi');
    expect(el.textContent).toContain('Hasil Anamnesis');
    expect(el.textContent).toContain('Kesimpulan');
    expect(el.textContent).toContain('Saran Dokter');
  });

  it('renders resep and payment summary cards', () => {
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('Resep / Rekomendasi');
    expect(el.textContent).toContain('Asam Mefenamat');
    expect(el.textContent).toContain('Ringkasan Pembayaran Konsultasi');
    expect(el.textContent).toContain('Rp. 200.000');
    expect(el.textContent).toContain('Timeline Pesanan');
  });
});
