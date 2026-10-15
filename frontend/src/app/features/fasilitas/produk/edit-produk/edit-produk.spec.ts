import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProduk } from './edit-produk';

describe('EditProduk', () => {
  let component: EditProduk;
  let fixture: ComponentFixture<EditProduk>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditProduk],
    }).compileComponents();

    fixture = TestBed.createComponent(EditProduk);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
