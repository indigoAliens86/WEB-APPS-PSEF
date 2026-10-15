import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TambahPromo } from './tambah-promo';

describe('TambahPromo', () => {
  let component: TambahPromo;
  let fixture: ComponentFixture<TambahPromo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TambahPromo],
    }).compileComponents();

    fixture = TestBed.createComponent(TambahPromo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
