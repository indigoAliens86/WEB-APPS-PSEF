import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Perizinan } from './perizinan';

describe('Perizinan', () => {
  let component: Perizinan;
  let fixture: ComponentFixture<Perizinan>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Perizinan],
    }).compileComponents();

    fixture = TestBed.createComponent(Perizinan);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
