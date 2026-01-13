import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentCardStudyTopics } from './card-study-topics';

describe('CardStudyTopics', () => {
  let component: ComponentCardStudyTopics;
  let fixture: ComponentFixture<ComponentCardStudyTopics>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentCardStudyTopics],
    }).compileComponents();

    fixture = TestBed.createComponent(ComponentCardStudyTopics);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
