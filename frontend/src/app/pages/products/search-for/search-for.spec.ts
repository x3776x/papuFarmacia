import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSearchFor } from './search-for';

describe('SearchFor', () => {
  let component: PageSearchFor;
  let fixture: ComponentFixture<PageSearchFor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageSearchFor],
    }).compileComponents();

    fixture = TestBed.createComponent(PageSearchFor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
