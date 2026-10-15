import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFasilitas } from './edit-fasilitas';

describe('EditFasilitas', () => {
  let component: EditFasilitas;
  let fixture: ComponentFixture<EditFasilitas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditFasilitas],
    }).compileComponents();

    fixture = TestBed.createComponent(EditFasilitas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
