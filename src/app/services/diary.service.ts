import { Injectable } from '@angular/core';
import { DummyData } from '../data/dummydata';
import { Storage } from '@ionic/storage-angular';
import { Observable, Subject, from, map } from 'rxjs';
import { IDiaryEntry } from '../models/diaryEntry.model';

import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DiaryService {

  refreshDiary:Subject<boolean> = new Subject<boolean>();
  refreshDiary$ = this.refreshDiary.asObservable();

  constructor(private storage: Storage) { }

  fetchDummyEntry(){
    let data = DummyData;

    return data;
  }

  getEntries(): Observable<IDiaryEntry[]> {
    return from(this.storage.get('entries')).pipe(
      map(entries => entries || [])
    );
  }

  getEntryByDate(date:any): Observable<IDiaryEntry[]> {
    return this.getEntries().pipe(
      map(entries => entries.filter((entry:IDiaryEntry) => {
        const entryDate = moment(entry.date);
        return moment(date).isSame(entryDate, 'day');
      }))
    );
  }

  getEntriesByWeek(date:any): Observable<IDiaryEntry[]>{
    return this.getEntries().pipe(
      map(entries => entries.filter((entry:IDiaryEntry) => {
        const entryDate = moment(entry.date);
        return moment(date).isSame(entryDate, 'isoWeek');
      }))
    );
  }

  getEntriesByPeriod(startDate:any,endDate:any): Observable<IDiaryEntry[]>{
    return this.getEntries().pipe(
      map(entries => entries.filter((entry:IDiaryEntry) => {
        return moment(entry.date).isBetween(moment(startDate), moment(endDate));
      }))
    );
  }

  addEntry(entry: IDiaryEntry): Observable<boolean> {
    return from(this.getEntries()).pipe(
      map(entries => {
        entries.push(entry);
        this.storage.set('entries', entries);
        return true;
      })
    );
  }

  updateEntry(entry: IDiaryEntry): Observable<boolean> {
    return from(this.getEntries()).pipe(
      map(entries => {
        const index = entries.findIndex(e =>
          moment(e.date).isSame(moment(entry.date), 'day')
        );
        if (index === -1) {
          console.warn('Entry not found:', entry);
          return false;
        }
        entries[index] = entry;
        this.storage.set('entries', entries);
        return true;
      })
    );
  }
}
