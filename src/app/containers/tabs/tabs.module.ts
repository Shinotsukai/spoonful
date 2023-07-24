import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { SettingsMenuComponent } from './settings-menu/settings-menu.component';
import { EditDailyActivitiesComponent } from 'src/app/components/edit-daily-activities/edit-daily-activities.component';
import { ActivityEditModule } from 'src/app/components/activity-edit/activity-edit.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ActivityEditModule,
    TabsPageRoutingModule
  ],
  declarations: [TabsPage,SettingsMenuComponent,EditDailyActivitiesComponent]
})
export class TabsPageModule {}
