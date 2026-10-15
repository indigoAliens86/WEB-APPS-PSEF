import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditArtikel } from './edit-artikel';

describe('EditArtikel', () => {
  let component: EditArtikel;
  let fixture: ComponentFixture<EditArtikel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditArtikel],
    }).compileComponents();

    fixture = TestBed.createComponent(EditArtikel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
