import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EditDailyActivitiesComponent } from 'src/app/components/edit-daily-activities/edit-daily-activities.component';

@Component({
  selector: 'app-settings-menu',
  templateUrl: './settings-menu.component.html',
  styleUrls: ['./settings-menu.component.scss']
})
export class SettingsMenuComponent {

  constructor(private modalCtrl:ModalController){}

  async openEditActivitiesModal(){
    const modal = await this.modalCtrl.create({
      component: EditDailyActivitiesComponent,
    });
    modal.present();
  }

}
