import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPasien } from './detail-pasien';

describe('DetailPasien', () => {
  let component: DetailPasien;
  let fixture: ComponentFixture<DetailPasien>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailPasien],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailPasien);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
