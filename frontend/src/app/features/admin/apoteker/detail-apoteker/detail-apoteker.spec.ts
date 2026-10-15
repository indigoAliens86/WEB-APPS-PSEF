import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { DetailApoteker } from './detail-apoteker';

describe('DetailApoteker', () => {
  let component: DetailApoteker;
  let fixture: ComponentFixture<DetailApoteker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailApoteker],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailApoteker);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders pharmacist details and tabs', () => {
    expect(fixture.nativeElement.textContent).toContain('apt. Andi Pratama, S.Farm');
    expect(fixture.nativeElement.textContent).toContain('Informasi Pribadi');
    expect(fixture.nativeElement.textContent).toContain('Verifikasi & Perizinan');
    expect(fixture.nativeElement.textContent).toContain('Praktik');
  });
});

