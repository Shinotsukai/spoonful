import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpoonInsightComponent } from './spoon-insight.component';

describe('SpoonInsightComponent', () => {
  let component: SpoonInsightComponent;
  let fixture: ComponentFixture<SpoonInsightComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpoonInsightComponent]
    });
    fixture = TestBed.createComponent(SpoonInsightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
