import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPromo } from './detail-promo';

describe('DetailPromo', () => {
  let component: DetailPromo;
  let fixture: ComponentFixture<DetailPromo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailPromo],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailPromo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
