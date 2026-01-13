import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentInputField } from './input-field';

describe('InputField', () => {
  let component: ComponentInputField;
  let fixture: ComponentFixture<ComponentInputField>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentInputField],
    }).compileComponents();

    fixture = TestBed.createComponent(ComponentInputField);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
