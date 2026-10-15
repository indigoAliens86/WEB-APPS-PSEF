import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Apoteker } from './apoteker';

describe('Apoteker', () => {
  let component: Apoteker;
  let fixture: ComponentFixture<Apoteker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Apoteker],
    }).compileComponents();

    fixture = TestBed.createComponent(Apoteker);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
