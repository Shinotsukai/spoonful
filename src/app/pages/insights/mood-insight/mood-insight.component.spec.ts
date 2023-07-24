import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoodInsightComponent } from './mood-insight.component';

describe('MoodInsightComponent', () => {
  let component: MoodInsightComponent;
  let fixture: ComponentFixture<MoodInsightComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MoodInsightComponent]
    });
    fixture = TestBed.createComponent(MoodInsightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
