import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pengaturan } from './pengaturan';

describe('Pengaturan', () => {
  let component: Pengaturan;
  let fixture: ComponentFixture<Pengaturan>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pengaturan],
    }).compileComponents();

    fixture = TestBed.createComponent(Pengaturan);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
