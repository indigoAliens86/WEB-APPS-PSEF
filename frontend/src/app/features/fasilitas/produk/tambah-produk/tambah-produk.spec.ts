import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TambahProduk } from './tambah-produk';

describe('TambahProduk', () => {
  let component: TambahProduk;
  let fixture: ComponentFixture<TambahProduk>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TambahProduk],
    }).compileComponents();

    fixture = TestBed.createComponent(TambahProduk);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
