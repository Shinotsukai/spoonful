import { Component, OnInit } from '@angular/core';
import { IDiaryActivity } from 'src/app/models/diaryActivity.model';
import { IDiaryEntry } from 'src/app/models/diaryEntry.model';
import { DiaryService } from 'src/app/services/diary.service';

import * as moment from 'moment';
import {
  Subject,
  Subscription,
  firstValueFrom,
  interval,
  take,
  takeUntil,
} from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';
import {
  AlertController,
  IonRouterOutlet,
  ModalController,
} from '@ionic/angular';
import { OptionModalComponent } from 'src/app/components/option-modal/option-modal.component';
import { EntryActionsComponent } from 'src/app/components/entry-actions/entry-actions.component';
import { BaseComponent } from 'src/app/components/entry-actions/base/base.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  todaysEntry!: IDiaryEntry;

  groupedSpoons: any[] = [];

  private previousDate!: moment.Moment;
  private subscription!: Subscription;
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private diaryService: DiaryService,
    private storageService: StorageService,
    private modalCtrl: ModalController,
    private alertController: AlertController,
    private routerOutlet: IonRouterOutlet
  ) {}

  ngOnInit() {
    this.previousDate = moment();

    this.checkCurrentDay();

    this.diaryService.refreshDiary$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.createNewDay();
      });
    this.diaryService.refreshDiary.next(true);
  }

  checkCurrentDay() {
    this.subscription = interval(3600000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        const currentDate = moment();

        if (!currentDate.isSame(this.previousDate, 'day')) {
          this.createNewDay();

          this.previousDate = currentDate;
        }
      });
  }

  createNewDay() {
    this.diaryService
      .getEntryByDate(this.previousDate)
      .pipe(takeUntil(this.destroy$))
      .subscribe((entry: IDiaryEntry[]) => {
        console.log('res', entry);

        if (entry.length) {
          this.todaysEntry = entry[0];
          // this.groupSpoonActivities(this.todaysEntry.activities);
        } else {
          console.log('no entry');
          this.createNewEntry();
        }
      });
  }

  async createNewEntry(date?: any, spoons?: number) {
    let userActivities = await this.storageService.getItem('userActivities');
    let parsedActivies = JSON.parse(userActivities);

    let newEntry: IDiaryEntry = {
      date: date ? date : moment().toISOString(),
      mood: [],
      pain: [],
      activities: parsedActivies.activities,
      spoonsAvailable: spoons ? spoons : parsedActivies.totalSpoons,
      spoonsUsed: 0,
      spoonsBorrowed: 0,
      notes: [],
    };

    this.diaryService
      .addEntry(newEntry)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: boolean) => {
        console.log('resp', res);
      });

    if (!date) {
      this.todaysEntry = newEntry;
    }
    // this.groupSpoonActivities(this.todaysEntry.activities);
  }

  // groupSpoonActivities(activities: IDiaryActivity[]) {
  //   console.log('grouping',activities)
  //   activities.forEach((activity) => {
  //     const spoonCost = activity.activity.spoonCost;

  //     if (!this.groupedSpoons[spoonCost]) {
  //       this.groupedSpoons[spoonCost] = [];
  //     }
  //     const index = this.groupedSpoons[spoonCost].findIndex(
  //       (a: any) => a.activity.name === activity.activity.name
  //     );
  //     if (index !== -1) {
  //       this.groupedSpoons[spoonCost][index] = activity;
  //     } else {
  //       this.groupedSpoons[spoonCost].push(activity);
  //     }
  //   });
  // }

  async updateActivity(activity: IDiaryActivity) {
    const index = this.todaysEntry.activities.indexOf(activity);
    if (index !== -1) {
      let activitySpoonCost = activity.activity.spoonCost;
      let activityIsCompleted = activity.isCompleted;
      let spoonsAvailable = this.todaysEntry.spoonsAvailable;
      let spoonsBorrowed = this.todaysEntry.spoonsBorrowed;
      let spoonsUsed = this.todaysEntry.spoonsUsed;

      if (activityIsCompleted) {
        if (spoonsUsed + activitySpoonCost > spoonsAvailable) {
          await this.presentAlert().then((result) => {
            console.log('alert result', result);
            if (result) {
              let diff = activitySpoonCost - (spoonsAvailable - spoonsUsed);
              spoonsUsed = spoonsAvailable;
              spoonsBorrowed += diff;
              this.checkNextDayEntry(diff);
            } else {
              activityIsCompleted = false;
              activity.isCompleted = false;
            }
          });
        } else {
          spoonsUsed += activitySpoonCost;
        }
      } else {
        if (spoonsBorrowed > 0) {
          const diff = Math.min(spoonsBorrowed, activitySpoonCost);
          spoonsBorrowed -= diff;
          activitySpoonCost -= diff;
          this.checkNextDayEntry(diff,true)
        }
        if (activitySpoonCost > 0) {
          spoonsUsed = Math.max(0, spoonsUsed - activitySpoonCost);
        }
      }

      this.todaysEntry.activities[index].isCompleted = activityIsCompleted;
      this.todaysEntry.spoonsUsed = spoonsUsed;
      this.todaysEntry.spoonsBorrowed = spoonsBorrowed;

      try {
        await firstValueFrom(this.diaryService.updateEntry(this.todaysEntry));
      } catch (error) {
        console.error('An error occurred:', error);
      }
    }
  }

  presentAlert(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let alert: any = this.alertController
        .create({
          header: 'Out of spoons',
          message: `You've ran out of spoons for today, do you want to borrow from tomorrow?`,
          buttons: [
            {
              text: 'Borrow',
              handler: () => {
                this.alertController.dismiss().then(() => {
                  resolve(true);
                });
                return false;
              },
            },
            {
              text: 'Cancel',
              handler: () => {
                this.alertController.dismiss().then(() => {
                  resolve(false);
                });
                return false;
              },
            },
          ],
        })
        .then((dlg) => dlg.present());
    });
  }

  async checkNextDayEntry(spoonCost: number,spoonsReturned:boolean = false) {
    try {
      let nextDay = moment().add(1, 'day');
      let result: IDiaryEntry[] = await firstValueFrom(
        this.diaryService.getEntryByDate(nextDay)
      );
      if (result[0]) {
        let data: IDiaryEntry = result[0];

        if(spoonsReturned){
          data.spoonsAvailable += spoonCost;
        } else {
          data.spoonsAvailable -= spoonCost;
        }
        try{
          await firstValueFrom(this.diaryService.updateEntry(data));
        } catch(error){
          console.log('there was an error',error)
        }


      } else {
        let userActivities = await this.storageService.getItem(
          'userActivities'
        );
        let parsedActivies = JSON.parse(userActivities);

        let availableSpoons = parsedActivies.totalSpoons - spoonCost;

        this.createNewEntry(nextDay.toISOString(), availableSpoons);
      }
    } catch (error) {
      console.log('there was an error',error)
    }
  }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      presentingElement: this.routerOutlet.nativeEl,
      component: EntryActionsComponent,
      componentProps: {
        rootPage: BaseComponent,
      },
    });

    await modal.present();
  }

  async openActivityModal() {
    const modal = await this.modalCtrl.create({
      component: OptionModalComponent,
      componentProps: {
        items: this.groupedSpoons,
      },
    });
    await modal.present();
  }
}
