import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Resep } from './resep';

describe('Resep', () => {
  let component: Resep;
  let fixture: ComponentFixture<Resep>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Resep],
    }).compileComponents();

    fixture = TestBed.createComponent(Resep);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
