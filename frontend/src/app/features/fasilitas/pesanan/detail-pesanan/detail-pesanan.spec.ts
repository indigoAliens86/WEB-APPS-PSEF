import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPesanan } from './detail-pesanan';

describe('DetailPesanan', () => {
  let component: DetailPesanan;
  let fixture: ComponentFixture<DetailPesanan>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailPesanan],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailPesanan);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
