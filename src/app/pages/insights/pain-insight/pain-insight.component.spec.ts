import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PainInsightComponent } from './pain-insight.component';

describe('PainInsightComponent', () => {
  let component: PainInsightComponent;
  let fixture: ComponentFixture<PainInsightComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PainInsightComponent]
    });
    fixture = TestBed.createComponent(PainInsightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
