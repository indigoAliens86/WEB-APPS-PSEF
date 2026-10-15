import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MitraApotek } from './mitra-apotek';

describe('MitraApotek', () => {
  let component: MitraApotek;
  let fixture: ComponentFixture<MitraApotek>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MitraApotek],
    }).compileComponents();

    fixture = TestBed.createComponent(MitraApotek);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
