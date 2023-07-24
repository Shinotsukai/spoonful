import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntryActionsComponent } from './entry-actions.component';
import { IonicModule } from '@ionic/angular';
import { BaseComponent } from './base/base.component';
import { AddActivityComponent } from './add-activity/add-activity.component';
import { ActivitiesModule } from '../activities/activities.module';
import { AddMoodComponent } from './add-mood/add-mood.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    EntryActionsComponent,
    BaseComponent,
    AddActivityComponent,
    AddMoodComponent
  ],
  imports: [
    IonicModule,
    FormsModule,
    ActivitiesModule,
    CommonModule
  ],
  exports: [EntryActionsComponent,BaseComponent]
})
export class EntryActionsModule { }
