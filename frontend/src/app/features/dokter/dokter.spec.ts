import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dokter } from './dokter';

describe('Dokter', () => {
  let component: Dokter;
  let fixture: ComponentFixture<Dokter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dokter],
    }).compileComponents();

    fixture = TestBed.createComponent(Dokter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
