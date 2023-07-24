import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { firstValueFrom } from 'rxjs';
import { IDiaryEntry } from 'src/app/models/diaryEntry.model';
import { IRating } from 'src/app/models/rating.model';
import { DiaryService } from 'src/app/services/diary.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-add-mood',
  templateUrl: './add-mood.component.html',
  styleUrls: ['./add-mood.component.css']
})
export class AddMoodComponent implements OnInit{

  moodValue:number = 3;
  moodPeriod:string = ''
  diaryEntryData!:IDiaryEntry

  constructor(private modalController: ModalController, private storageService: StorageService, private diaryService:DiaryService){}

ngOnInit(): void {
this.getEntryData()
  
}


async getEntryData(){
  try{
    let results:IDiaryEntry[] = await firstValueFrom(this.diaryService.getEntryByDate(moment()));

    this.diaryEntryData = results[0];
  } catch(err){
    console.log('error',err);
  }
}

handlePeriod(e:any){

  this.moodPeriod = e.target.value;
  console.log('period',this.moodPeriod)
}

  async onSaveSelected(){
    let data:IRating = {
      period:this.moodPeriod,
      rating:this.moodValue
    }

    this.diaryEntryData.mood?.push(data);

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

  close() {
    this.modalController.dismiss();
  }
}
