import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailResep } from './detail-resep';

describe('DetailResep', () => {
  let component: DetailResep;
  let fixture: ComponentFixture<DetailResep>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailResep],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailResep);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
