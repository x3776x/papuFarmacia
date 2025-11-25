import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageDetailsProduct } from './details-product';

describe('Details', () => {
  let component: PageDetailsProduct;
  let fixture: ComponentFixture<PageDetailsProduct>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageDetailsProduct],
    }).compileComponents();

    fixture = TestBed.createComponent(PageDetailsProduct);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
