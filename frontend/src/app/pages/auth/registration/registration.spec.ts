import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageRegistration } from './registration';

describe('Registration', () => {
  let component: PageRegistration;
  let fixture: ComponentFixture<PageRegistration>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageRegistration],
    }).compileComponents();

    fixture = TestBed.createComponent(PageRegistration);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
