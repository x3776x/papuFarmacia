import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageHome } from './home';

describe('Home', () => {
  let component: PageHome;
  let fixture: ComponentFixture<PageHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageHome],
    }).compileComponents();

    fixture = TestBed.createComponent(PageHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
