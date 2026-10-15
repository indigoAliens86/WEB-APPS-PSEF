import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailApoteker } from './detail-apoteker';

describe('DetailApoteker', () => {
  let component: DetailApoteker;
  let fixture: ComponentFixture<DetailApoteker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailApoteker],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailApoteker);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
