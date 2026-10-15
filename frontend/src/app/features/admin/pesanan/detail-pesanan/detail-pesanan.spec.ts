import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { DetailPesanan } from './detail-pesanan';

describe('DetailPesanan', () => {
  let component: DetailPesanan;
  let fixture: ComponentFixture<DetailPesanan>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailPesanan],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailPesanan);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders patient profile summary with stats', () => {
    const pasien = component.detail().pasien;
    expect(pasien.nama).toBe('Andi Putra');
    expect(pasien.gender).toBe('Laki-laki');
    expect(pasien.poinDitarik).toBe('12.458');
    expect(pasien.totalPesananCount).toBe('18 Pesanan');
  });

  it('loads product items with resep and pricing', () => {
    const items = component.detail().produkList;
    expect(items.length).toBe(5);
    expect(items[0].nama).toBe('Paracetamol 500mg');
    expect(items[0].harga).toBe('Rp5.000');
    expect(items[0].jumlah).toBe('Rp50.000');
    expect(items[1].nama).toBe('Vitamin C 500mg');
  });

  it('loads payment summary, courier details, and timeline', () => {
    const biaya = component.detail().biaya;
    expect(biaya.statusBayar).toBe('Lunas');
    expect(biaya.totalPembayaran).toBe('Rp 570.000');

    const pengiriman = component.detail().pengiriman;
    expect(pengiriman.kurir).toBe('JNE Express');
    expect(pengiriman.status).toBe('Dikirim');

    const timeline = component.detail().timeline;
    expect(timeline.length).toBe(4);
    expect(timeline[0].label).toBe('Pesanan Dibuat');
  });

  it('opens and closes tracking modal and copies resi', () => {
    expect(component.showTrackingModal()).toBe(false);

    component.lacakPengiriman();
    expect(component.showTrackingModal()).toBe(true);
    expect(component.trackingEvents().length).toBe(5);
    expect(component.trackingEvents()[0].isLatest).toBe(true);

    component.closeTrackingModal();
    expect(component.showTrackingModal()).toBe(false);
  });

  it('opens and closes modal output resep in detail view', () => {
    expect(component.showResepModal()).toBe(false);

    component.openResepModal();
    expect(component.showResepModal()).toBe(true);

    component.closeResepModal();
    expect(component.showResepModal()).toBe(false);
  });

  it('switches between Obat Resep (Konsultasi) and Obat Non-Resep (Marketplace)', () => {
    // Initial state is Obat Resep from Konsultasi
    expect(component.detail().tipePesanan).toBe('Obat Resep');
    expect(component.detail().sumberPesanan).toBe('Konsultasi Dokter');
    expect(component.detail().layananKonsultasi).toBeDefined();
    expect(component.detail().layananKonsultasi?.jenisLayanan).toBe('Telemedisin');
    expect(component.detail().produkList[0].resepId).toBe('#RX25024-0012');

    // Switch to Obat Non-Resep (Marketplace)
    component.switchTypePreview('Obat Non-Resep');
    expect(component.detail().tipePesanan).toBe('Obat Non-Resep');
    expect(component.detail().sumberPesanan).toBe('Marketplace Obat');
    expect(component.detail().marketplaceInfo).toBeDefined();
    expect(component.detail().marketplaceInfo?.isTersedia).toBe(false);
    expect(component.detail().produkList[0].resepId).toBe('-');
    expect(component.detail().produkList[0].dokter).toBe('Tanpa Resep (OTC)');

    // Switch back to Obat Resep
    component.switchTypePreview('Obat Resep');
    expect(component.detail().tipePesanan).toBe('Obat Resep');
    expect(component.detail().sumberPesanan).toBe('Konsultasi Dokter');
  });
});
