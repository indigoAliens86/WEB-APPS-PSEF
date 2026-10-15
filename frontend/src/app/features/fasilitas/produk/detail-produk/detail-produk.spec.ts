import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailProduk } from './detail-produk';

describe('DetailProduk', () => {
  let component: DetailProduk;
  let fixture: ComponentFixture<DetailProduk>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailProduk],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailProduk);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
