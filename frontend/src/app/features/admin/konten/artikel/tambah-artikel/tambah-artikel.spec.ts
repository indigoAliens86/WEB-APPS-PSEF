import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TambahArtikel } from './tambah-artikel';

describe('TambahArtikel', () => {
  let component: TambahArtikel;
  let fixture: ComponentFixture<TambahArtikel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TambahArtikel],
    }).compileComponents();

    fixture = TestBed.createComponent(TambahArtikel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
