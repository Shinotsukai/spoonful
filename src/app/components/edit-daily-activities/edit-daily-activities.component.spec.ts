import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDailyActivitiesComponent } from './edit-daily-activities.component';

describe('EditDailyActivitiesComponent', () => {
  let component: EditDailyActivitiesComponent;
  let fixture: ComponentFixture<EditDailyActivitiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditDailyActivitiesComponent]
    });
    fixture = TestBed.createComponent(EditDailyActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
