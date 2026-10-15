import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaraPesan } from './cara-pesan';

describe('CaraPesan', () => {
  let component: CaraPesan;
  let fixture: ComponentFixture<CaraPesan>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaraPesan],
    }).compileComponents();

    fixture = TestBed.createComponent(CaraPesan);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
