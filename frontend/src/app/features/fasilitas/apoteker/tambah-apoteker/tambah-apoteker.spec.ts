import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TambahApoteker } from './tambah-apoteker';

describe('TambahApoteker', () => {
  let component: TambahApoteker;
  let fixture: ComponentFixture<TambahApoteker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TambahApoteker],
    }).compileComponents();

    fixture = TestBed.createComponent(TambahApoteker);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
