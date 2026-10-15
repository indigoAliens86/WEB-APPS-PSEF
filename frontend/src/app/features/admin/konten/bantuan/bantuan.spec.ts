import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bantuan } from './bantuan';

describe('Bantuan', () => {
  let component: Bantuan;
  let fixture: ComponentFixture<Bantuan>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Bantuan],
    }).compileComponents();

    fixture = TestBed.createComponent(Bantuan);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
