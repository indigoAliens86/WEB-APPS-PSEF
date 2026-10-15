import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TambahBanner } from './tambah-banner';

describe('TambahBanner', () => {
  let component: TambahBanner;
  let fixture: ComponentFixture<TambahBanner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TambahBanner],
    }).compileComponents();

    fixture = TestBed.createComponent(TambahBanner);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
