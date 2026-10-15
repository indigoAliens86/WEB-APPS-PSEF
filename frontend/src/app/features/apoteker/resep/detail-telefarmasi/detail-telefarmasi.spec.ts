import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTelefarmasi } from './detail-telefarmasi';

describe('DetailTelefarmasi', () => {
  let component: DetailTelefarmasi;
  let fixture: ComponentFixture<DetailTelefarmasi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailTelefarmasi],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailTelefarmasi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
