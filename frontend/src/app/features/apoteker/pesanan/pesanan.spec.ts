import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pesanan } from './pesanan';

describe('Pesanan', () => {
  let component: Pesanan;
  let fixture: ComponentFixture<Pesanan>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pesanan],
    }).compileComponents();

    fixture = TestBed.createComponent(Pesanan);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
