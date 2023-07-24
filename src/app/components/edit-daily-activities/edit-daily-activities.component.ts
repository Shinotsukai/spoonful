import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IActivity } from 'src/app/models/activity.model';
import { IDiaryActivity } from 'src/app/models/diaryActivity.model';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-edit-daily-activities',
  templateUrl: './edit-daily-activities.component.html',
  styleUrls: ['./edit-daily-activities.component.css'],
})
export class EditDailyActivitiesComponent implements OnInit {
  activityData!: any[];
  userSelected: IActivity[] = [];

  constructor(
    private modalCtrl: ModalController,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.getActivities();
  }

  async getActivities() {
    let modifiedActivities = await this.storageService.getItem('activityList');
    if(modifiedActivities) {
      let parsedActivies = JSON.parse(modifiedActivities);
      this.activityData = parsedActivies;
    }
    else {
      this.activityData = this.storageService.getActivities();
    }

    let userActivities = await this.storageService.getItem('userActivities');
    let parsedActivies = JSON.parse(userActivities);
    parsedActivies.activities.forEach((item: IDiaryActivity) => {
      this.userSelected.push(item.activity);
    });

    this.activityData.forEach((activity: any) => {
      activity.isChecked = this.userSelected.some(
        (item: any) => item.name === activity.name
      );
    });

    console.log(this.activityData);
  }

  updateActivity(newLabel: any, item: any) {
    const selectedIndex = this.userSelected.findIndex(
      (i) => i.name === item.name
    );
    const activityIndex = this.activityData.findIndex(
      (i) => i.name === item.name
    );

    if (selectedIndex !== -1) {
      this.userSelected[selectedIndex].name = newLabel;
    }

    if (activityIndex !== -1) {
      this.activityData[activityIndex].name = newLabel;
    }
  }

  updateSpoonCost(newValue: number, item: any) {
    const selectedIndex = this.userSelected.findIndex(
      (i) => i.name === item.name
    );
    const activityIndex = this.activityData.findIndex(
      (i) => i.name === item.name
    );

    if (selectedIndex !== -1) {
      this.userSelected[selectedIndex].spoonCost = newValue;
    }

    if (activityIndex !== -1) {
      this.activityData[activityIndex].spoonCost = newValue;
    }
  }

  isSelected(checked: boolean, item: any) {
    let activity: IActivity = {
      name: item.name,
      spoonCost: item.spoonCost,
    };

    const selectedIndex = this.userSelected.findIndex(
      (i) => i.name === item.name
    );
    const activityIndex = this.activityData.findIndex(
      (i) => i.name === item.name
    );

    if (selectedIndex === -1) {
      this.userSelected.push(activity);
    } else {
      this.userSelected.splice(selectedIndex, 1);
    }

    if (activityIndex !== -1) {
      this.activityData[activityIndex].isChecked =
        !this.activityData[activityIndex].isChecked;
    }
  }

  getTotalSpoons(): number {
    let spoons = 0;
    for (const activity of this.userSelected) {
      spoons += activity.spoonCost;
    }
    return spoons;
  }



  cancel() {
    return this.modalCtrl.dismiss();
  }

  saveUpdatedSelected(){
    if(this.userSelected.length > 0){

      let mappedData:IDiaryActivity[] = this.userSelected.map((activity:IActivity) =>{
       return {
         activity: activity,
         isCompleted: false, 
       };
      });
 
       let data = {
         activities:mappedData,
         totalSpoons:this.getTotalSpoons()
       };
       this.storageService.set('userActivities',JSON.stringify(data));
     }
  }

  saveActivityList(){
    let mappedData:IActivity[] = this.activityData.map((activity:any) =>{
      return {
        name: activity.name,
        spoonCost: activity.spoonCost
      }
    })

    this.storageService.set('activityList',JSON.stringify(mappedData));
  }

  confirm() {



    return this.modalCtrl.dismiss();
  }
}
