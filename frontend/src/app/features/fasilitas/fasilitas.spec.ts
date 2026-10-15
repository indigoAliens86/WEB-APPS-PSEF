import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fasilitas } from './fasilitas';

describe('Fasilitas', () => {
  let component: Fasilitas;
  let fixture: ComponentFixture<Fasilitas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Fasilitas],
    }).compileComponents();

    fixture = TestBed.createComponent(Fasilitas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
