import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Telefarmasi } from './telefarmasi';

describe('Telefarmasi', () => {
  let component: Telefarmasi;
  let fixture: ComponentFixture<Telefarmasi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Telefarmasi],
    }).compileComponents();

    fixture = TestBed.createComponent(Telefarmasi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
