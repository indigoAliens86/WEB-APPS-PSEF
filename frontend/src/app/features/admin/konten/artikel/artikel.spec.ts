import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Artikel } from './artikel';

describe('Artikel', () => {
  let component: Artikel;
  let fixture: ComponentFixture<Artikel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Artikel],
    }).compileComponents();

    fixture = TestBed.createComponent(Artikel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
