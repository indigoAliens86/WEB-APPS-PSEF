import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SyaratKetentuan } from './syarat-ketentuan';

describe('SyaratKetentuan', () => {
  let component: SyaratKetentuan;
  let fixture: ComponentFixture<SyaratKetentuan>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SyaratKetentuan],
    }).compileComponents();

    fixture = TestBed.createComponent(SyaratKetentuan);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
