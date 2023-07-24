import { Component, OnInit } from '@angular/core';
import { ModalController, IonNav, Platform } from '@ionic/angular';
import { AddActivityComponent } from '../add-activity/add-activity.component';
import { AddMoodComponent } from '../add-mood/add-mood.component';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {
  level = 0;
  activityPage = AddActivityComponent;
  moodPage = AddMoodComponent;

  constructor(private modalController: ModalController, private nav: IonNav, private platform: Platform) {
    this.platform.backButton.subscribeWithPriority(101, async () => {
      let canGoBack = await this.nav.canGoBack();
      if (canGoBack) {
        this.nav.pop();
      } else {
        await this.modalController.dismiss();
      }
      return;
    });
  }

  ngOnInit() {}

  goForward() {

  }

  goToActivity(){
    this.nav.push(this.activityPage, { level: this.level + 1 });
  }

  goToMood(){
    this.nav.push(this.moodPage, { level: this.level + 1 });
  }

  goRoot() {
    this.nav.popToRoot();
  }

  close() {
    this.modalController.dismiss();
  }
}
