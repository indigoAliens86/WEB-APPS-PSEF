import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cs } from './cs';

describe('Cs', () => {
  let component: Cs;
  let fixture: ComponentFixture<Cs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cs],
    }).compileComponents();

    fixture = TestBed.createComponent(Cs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
