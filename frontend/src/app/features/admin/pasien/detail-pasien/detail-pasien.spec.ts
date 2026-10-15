import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { DetailPasien } from './detail-pasien';

describe('DetailPasien', () => {
  let component: DetailPasien;
  let fixture: ComponentFixture<DetailPasien>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailPasien],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailPasien);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders patient profile header and 7 primary tabs', () => {
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('Andi Putra');
    expect(el.textContent).toContain('3275010101010001');
    expect(el.textContent).toContain('Point Health yang ditarik');
    expect(el.textContent).toContain('12.458');
    expect(el.textContent).toContain('Riwayat Kesehatan');
    expect(el.textContent).toContain('Pesanan');
    expect(el.textContent).toContain('Resep');
    expect(el.textContent).toContain('Pembayaran');
    expect(el.textContent).toContain('Telemedicine');
    expect(el.textContent).toContain('Telefarmasi');
    expect(el.textContent).toContain('Rekam Medis');
  });

  it('switches between primary tabs properly', () => {
    component.selectTab('pesanan');
    fixture.detectChanges();
    expect(component.activeTab()).toBe('pesanan');
    expect(fixture.nativeElement.textContent).toContain('Data Pesanan Pasien');

    component.selectTab('pembayaran');
    fixture.detectChanges();
    expect(component.activeTab()).toBe('pembayaran');
    expect(fixture.nativeElement.textContent).toContain('Riwayat Transaksi & Pembayaran');
    expect(fixture.nativeElement.textContent).toContain('Metode Pembayaran Terbanyak');

    component.selectTab('telemedicine');
    fixture.detectChanges();
    expect(component.activeTab()).toBe('telemedicine');
    expect(fixture.nativeElement.textContent).toContain('Data Sesi Telemedicine');

    component.selectTab('telefarmasi');
    fixture.detectChanges();
    expect(component.activeTab()).toBe('telefarmasi');
    expect(fixture.nativeElement.textContent).toContain('Data Konseling Telefarmasi');

    component.selectTab('rekam-medis');
    fixture.detectChanges();
    expect(component.activeTab()).toBe('rekam-medis');
    expect(fixture.nativeElement.textContent).toContain('Timeline');
    expect(fixture.nativeElement.textContent).toContain('Ringkasan');
  });

  it('toggles pesanan list and detail view modes', () => {
    component.selectTab('pesanan');
    component.setPesananViewMode('detail');
    fixture.detectChanges();
    expect(component.pesananViewMode()).toBe('detail');
    expect(fixture.nativeElement.textContent).toContain('Daftar Produk yang Dipesan');
    expect(fixture.nativeElement.textContent).toContain('Verifikasi Apoteker');

    component.setPesananViewMode('list');
    fixture.detectChanges();
    expect(component.pesananViewMode()).toBe('list');
  });

  it('switches rekam medis sub tabs', () => {
    component.selectTab('rekam-medis');

    component.setRekamMedisSubTab('hasil-lab');
    fixture.detectChanges();
    expect(component.rekamMedisSubTab()).toBe('hasil-lab');
    expect(fixture.nativeElement.textContent).toContain('Hemogram Lengkap');

    component.setRekamMedisSubTab('perubahan');
    fixture.detectChanges();
    expect(component.rekamMedisSubTab()).toBe('perubahan');
    expect(fixture.nativeElement.textContent).toContain('Audit Trail Riwayat Perubahan Rekam Medis');
  });

  it('toggles riwayat kesehatan timeline list and detail view modes', () => {
    component.selectTab('riwayat-kesehatan');
    fixture.detectChanges();
    expect(component.riwayatKesehatanViewMode()).toBe('list');
    expect(fixture.nativeElement.textContent).toContain('Tanggal Periksa');
    expect(fixture.nativeElement.textContent).toContain('Klinik Sehat');
    expect(fixture.nativeElement.textContent).toContain('dr. Andi Wijaya');
    expect(fixture.nativeElement.textContent).toContain('Lihat Detail');

    // Switch to detail view
    component.setRiwayatKesehatanViewMode('detail');
    fixture.detectChanges();
    expect(component.riwayatKesehatanViewMode()).toBe('detail');
    expect(fixture.nativeElement.textContent).toContain('Ringkasan Riwayat Kesehatan');
    expect(fixture.nativeElement.textContent).toContain('Pemeriksaan Fisik');
    expect(fixture.nativeElement.textContent).toContain('Kembali');

    // Back to list
    component.backToRiwayatList();
    fixture.detectChanges();
    expect(component.riwayatKesehatanViewMode()).toBe('list');
  });
});
