import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTransaksi } from './detail-transaksi';

describe('DetailTransaksi', () => {
  let component: DetailTransaksi;
  let fixture: ComponentFixture<DetailTransaksi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailTransaksi],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailTransaksi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
