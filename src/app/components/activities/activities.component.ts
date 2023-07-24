import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IDiaryActivity } from 'src/app/models/diaryActivity.model';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivitiesComponent {
@Input() item:any
@Output() onActivtyUpdate = new EventEmitter();
  constructor(){}

  updateActivity(activity: IDiaryActivity){
    this.onActivtyUpdate.emit(activity);
  }

}
