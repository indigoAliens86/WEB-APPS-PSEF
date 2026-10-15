import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailBanner } from './detail-banner';

describe('DetailBanner', () => {
  let component: DetailBanner;
  let fixture: ComponentFixture<DetailBanner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailBanner],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailBanner);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
