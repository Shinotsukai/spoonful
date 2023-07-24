import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import * as moment from 'moment';
import { BehaviorSubject, Subject, switchMap, takeUntil } from 'rxjs';
import { IDiaryEntry } from 'src/app/models/diaryEntry.model';
import { DiaryService } from 'src/app/services/diary.service';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.scss']
})
export class DiaryComponent implements OnInit, OnDestroy{
  selectedDate: string;
  diaryDate:BehaviorSubject<any> = new BehaviorSubject<any>(null)
  diaryEntry:BehaviorSubject<IDiaryEntry | null> = new BehaviorSubject<IDiaryEntry | null>(null);
  destroy$:Subject<boolean> = new Subject<boolean>();



  constructor(private navCtrl: NavController,private diaryService: DiaryService) {
    this.selectedDate = moment().format('YYYY-MM-DD');

  }

  ngOnInit(){

    this.getDiaryEntry();

    this.diaryDate.next(this.selectedDate);

  }

  previousDay() {
    this.selectedDate= moment(this.selectedDate).subtract(1, 'days').format('YYYY-MM-DD');
    this.diaryDate.next(this.selectedDate);
   
  }

  nextDay() {
    this.selectedDate = moment(this.selectedDate).add(1, 'days').format('YYYY-MM-DD');
    this.diaryDate.next(this.selectedDate);

  }

  dateChanged() {
    console.log('date changed')
  }

  getDiaryEntry() {

    this.diaryDate.pipe(takeUntil(this.destroy$),switchMap((resp:any)=> this.diaryService.getEntryByDate(resp))).subscribe((entries:IDiaryEntry[]) =>{
      if (entries.length) {
        this.diaryEntry.next(entries[0]);
      } else {
this.diaryEntry.next(null);
      }
    })



  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }


}
