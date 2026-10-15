import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFasilitas } from './add-fasilitas';

describe('AddFasilitas', () => {
  let component: AddFasilitas;
  let fixture: ComponentFixture<AddFasilitas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFasilitas],
    }).compileComponents();

    fixture = TestBed.createComponent(AddFasilitas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
