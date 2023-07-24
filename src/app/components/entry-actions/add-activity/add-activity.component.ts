import { Component, OnDestroy, OnInit } from '@angular/core';
import { IActivity } from 'src/app/models/activity.model';
import { IDiaryActivity } from 'src/app/models/diaryActivity.model';
import { DiaryService } from 'src/app/services/diary.service';
import { StorageService } from 'src/app/services/storage.service';

import * as moment from 'moment';
import { firstValueFrom } from 'rxjs';
import { IDiaryEntry } from 'src/app/models/diaryEntry.model';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.css']
})
export class AddActivityComponent implements OnInit, OnDestroy{
  
  activityData!:IDiaryActivity[];

  diaryEntryData!:IDiaryEntry

  userSelected:IActivity[]=[]

  currentDate = moment();

  constructor(private storageService: StorageService, private diaryService:DiaryService,private modalController: ModalController){}

  ngOnInit(): void {

    this.getCurrentActivities();
  }

  ngOnDestroy(): void {
    
  }

 
  async getCurrentActivities(){
    let baseActivities = this.storageService.getActivities();

    try{
    let results:IDiaryEntry[] = await firstValueFrom(this.diaryService.getEntryByDate(this.currentDate));

    this.diaryEntryData = results[0];


    const filteredArray = baseActivities.filter((item) => {

      return !results[0].activities.some((secondItem:any) => secondItem.activity.name === item.name && secondItem.activity.spoonCost === item.spoonCost);
    });

    let mappedData:IDiaryActivity[] = filteredArray.map((activity:IActivity) =>{
      return {
        activity: activity,
        isCompleted: false, 
      };
     });

     this.activityData = mappedData;
    
    }

    catch (error){
      console.log('error',error);
    }


  }

  updateUserActivity(activities:IDiaryActivity){

    let activity = activities.activity


    const index = this.userSelected.indexOf(activity);


    if (index === -1) {
      this.userSelected.push(activity);
    } else {
      this.userSelected.splice(index,1)
    }

    console.log('userSelected',this.userSelected)

  }

 async onSaveSelected(){
    if(this.userSelected.length > 0){
      let mappedData:IDiaryActivity[] = this.userSelected.map((activity:IActivity) =>{
        return {
          activity: activity,
          isCompleted: false, 
        };
       });

       this.diaryEntryData.activities = this.diaryEntryData.activities.concat(mappedData);

       console.log('diaryEntryData',this.diaryEntryData)

       try {
        let result = await firstValueFrom(
          
      this.diaryService.updateEntry(this.diaryEntryData));
      if(result){
        this.diaryService.refreshDiary.next(true);
        this.close();

      }
        
      } catch (error) {
        console.error('An error occurred:', error);
      }
    }

    




  }

  close() {
    this.modalController.dismiss();
  }

}
