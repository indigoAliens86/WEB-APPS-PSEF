import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KebijakanPrivasi } from './kebijakan-privasi';

describe('KebijakanPrivasi', () => {
  let component: KebijakanPrivasi;
  let fixture: ComponentFixture<KebijakanPrivasi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KebijakanPrivasi],
    }).compileComponents();

    fixture = TestBed.createComponent(KebijakanPrivasi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
