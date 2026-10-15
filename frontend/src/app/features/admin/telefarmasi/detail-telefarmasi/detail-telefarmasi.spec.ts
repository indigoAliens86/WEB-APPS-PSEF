import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { DetailTelefarmasi } from './detail-telefarmasi';

describe('DetailTelefarmasi', () => {
  let component: DetailTelefarmasi;
  let fixture: ComponentFixture<DetailTelefarmasi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailTelefarmasi],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailTelefarmasi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders consultation summary card with ID, Pasien, and Apoteker', () => {
    const detail = component.detail();
    expect(detail.id).toBe('CNS24025-0012');
    expect(detail.pasien.nama).toBe('Dewi Lestari');
    expect(detail.apoteker.nama).toBe('apt. Rina Meliani, S.Farm');
  });

  it('loads resep obat with thumbnail and pricing', () => {
    const resep = component.detail().resepObat;
    expect(resep.length).toBe(3);
    expect(resep[0].nama).toBe('Ibuprofen 400mg');
    expect(resep[0].harga).toBe('Rp. 8.000');
    expect(resep[1].nama).toBe('Asam Mefenamat 500mg');
    expect(resep[2].nama).toBe('Vitamin B Kompleks');
  });

  it('loads payment summary and order timeline', () => {
    const pembayaran = component.detail().pembayaran;
    expect(pembayaran.status).toBe('Lunas');
    expect(pembayaran.totalPembayaran).toBe('Rp. 200.000');

    const timeline = component.detail().timeline;
    expect(timeline.length).toBe(5);
    expect(timeline[0].label).toBe('Pesanan Dibuat');
    expect(timeline[4].label).toBe('Pesanan Selesai');
  });
});
