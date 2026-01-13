import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageRegisterProduct } from './register-product';

describe('PageRegisterProduct', () => {
  let component: PageRegisterProduct;
  let fixture: ComponentFixture<PageRegisterProduct>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageRegisterProduct],
    }).compileComponents();

    fixture = TestBed.createComponent(PageRegisterProduct);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should PageRegisterProduct', () => {
    expect(component).toBeTruthy();
  });
});
