import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sop } from './sop';

describe('Sop', () => {
  let component: Sop;
  let fixture: ComponentFixture<Sop>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sop],
    }).compileComponents();

    fixture = TestBed.createComponent(Sop);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
