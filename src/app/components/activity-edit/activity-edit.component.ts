import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IDiaryActivity } from 'src/app/models/diaryActivity.model';

@Component({
  selector: 'app-activity-edit',
  templateUrl: './activity-edit.component.html',
  styleUrls: ['./activity-edit.component.scss']
})
export class ActivityEditComponent implements OnInit{
  @Input() item:any
  @Output() onActivtyUpdate = new EventEmitter();
  @Output() onActivityChecked = new EventEmitter();
  @Output() onActivityCostUpdate = new EventEmitter();

  nameToEdit:string = ''
  costToEdit:number = 0
    constructor(){}

    ngOnInit(): void {
      this.nameToEdit = this.item.name;
      this.costToEdit = this.item.spoonCost
    }
  
    updateActivity(){
      this.onActivtyUpdate.emit(
     this.nameToEdit
      );
    }

    updateActivityCost(){
      this.onActivityCostUpdate.emit(this.costToEdit)
    }

    activityChecked(event:any){
      console.log(event)
      this.onActivityChecked.emit(this.item.isChecked)
    }
}
