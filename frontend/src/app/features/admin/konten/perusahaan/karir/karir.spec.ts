import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Karir } from './karir';

describe('Karir', () => {
  let component: Karir;
  let fixture: ComponentFixture<Karir>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Karir],
    }).compileComponents();

    fixture = TestBed.createComponent(Karir);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
