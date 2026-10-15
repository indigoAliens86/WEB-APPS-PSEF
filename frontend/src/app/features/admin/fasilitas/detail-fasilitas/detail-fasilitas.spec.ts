import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { Fasilitas } from '../fasilitas';
import { DetailFasilitas } from './detail-fasilitas';

describe('DetailFasilitas', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideRouter([{
          path: 'fasilitas',
          component: Fasilitas,
          children: [{ path: ':id', component: DetailFasilitas }],
        }]),
      ],
    }).compileComponents();
  });

  it('loads facility details from the facility child route', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/fasilitas/FAS-001');

    expect(harness.routeNativeElement?.textContent).toContain('Informasi PIC');
    expect(harness.routeNativeElement?.textContent).toContain('Total Tenaga Medis');
    expect(harness.routeNativeElement?.textContent).toContain('Latitude');
    expect(harness.routeNativeElement?.textContent).toContain('-6.2607');
    expect(harness.routeNativeElement?.querySelector('iframe.facility-open-map')?.getAttribute('src')).toContain('openstreetmap.org/export/embed.html');
    expect(harness.routeNativeElement?.querySelector('.facility-map-link')?.textContent).toContain('OpenStreetMap');
  });

  it('navigates to the facility detail route when the eye action is clicked', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/fasilitas');
    const detailButton = harness.routeNativeElement?.querySelector<HTMLButtonElement>(
      'button[aria-label="Detail RS Medika Utama"]',
    );

    expect(detailButton).toBeTruthy();
    detailButton?.click();
    await harness.fixture.whenStable();
    harness.detectChanges();

    expect(TestBed.inject(Router).url).toBe('/fasilitas/FAS-001');
    expect(harness.routeNativeElement?.textContent).toContain('Informasi PIC');
    expect(harness.routeNativeElement?.querySelector('#facility-list-title')).toBeNull();
  });

  it('shows a not-found state for an unknown facility id', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/fasilitas/UNKNOWN');

    expect(harness.routeNativeElement?.textContent).toContain('Data fasilitas tidak ditemukan');
  });
});
