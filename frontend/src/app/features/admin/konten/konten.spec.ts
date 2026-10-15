import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Konten } from './konten';

describe('Konten', () => {
  let component: Konten;
  let fixture: ComponentFixture<Konten>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Konten],
    }).compileComponents();

    fixture = TestBed.createComponent(Konten);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
