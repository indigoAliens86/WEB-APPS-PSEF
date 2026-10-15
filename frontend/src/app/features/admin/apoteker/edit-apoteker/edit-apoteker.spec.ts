import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { EditApoteker } from './edit-apoteker';

describe('EditApoteker', () => {
  let component: EditApoteker;
  let fixture: ComponentFixture<EditApoteker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditApoteker],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(EditApoteker);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders title and edit form with pharmacist name', () => {
    expect(fixture.nativeElement.textContent).toContain('Edit Data Apoteker');
    expect(fixture.nativeElement.textContent).toContain('apt. Andi Pratama, S.Farm');
    expect(fixture.nativeElement.textContent).toContain('Legalitas & Perizinan (SIPA / STRA)');
  });
});
