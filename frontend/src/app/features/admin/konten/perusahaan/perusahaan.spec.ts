import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Perusahaan } from './perusahaan';

describe('Perusahaan', () => {
  let component: Perusahaan;
  let fixture: ComponentFixture<Perusahaan>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Perusahaan],
    }).compileComponents();

    fixture = TestBed.createComponent(Perusahaan);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
