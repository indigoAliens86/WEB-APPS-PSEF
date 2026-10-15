import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pasien } from './pasien';

describe('Pasien', () => {
  let component: Pasien;
  let fixture: ComponentFixture<Pasien>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pasien],
    }).compileComponents();

    fixture = TestBed.createComponent(Pasien);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
