import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMoodComponent } from './add-mood.component';

describe('AddMoodComponent', () => {
  let component: AddMoodComponent;
  let fixture: ComponentFixture<AddMoodComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddMoodComponent]
    });
    fixture = TestBed.createComponent(AddMoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
