import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityInsightComponent } from './activity-insight.component';

describe('ActivityInsightComponent', () => {
  let component: ActivityInsightComponent;
  let fixture: ComponentFixture<ActivityInsightComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivityInsightComponent]
    });
    fixture = TestBed.createComponent(ActivityInsightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
