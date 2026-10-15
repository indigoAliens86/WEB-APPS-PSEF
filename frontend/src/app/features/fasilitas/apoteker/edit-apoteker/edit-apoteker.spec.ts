import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditApoteker } from './edit-apoteker';

describe('EditApoteker', () => {
  let component: EditApoteker;
  let fixture: ComponentFixture<EditApoteker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditApoteker],
    }).compileComponents();

    fixture = TestBed.createComponent(EditApoteker);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
