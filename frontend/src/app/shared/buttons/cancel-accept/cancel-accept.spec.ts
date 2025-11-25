import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelAccept } from './cancel-accept';

describe('CancelAccept', () => {
  let component: CancelAccept;
  let fixture: ComponentFixture<CancelAccept>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CancelAccept]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancelAccept);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
