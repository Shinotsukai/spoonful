import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { OptionModalModule } from 'src/app/components/option-modal/option-modal.module';
import { ActivitiesModule } from 'src/app/components/activities/activities.module';
import { EntryActionsModule } from 'src/app/components/entry-actions/entry-actions.module';



@NgModule({
  declarations: [DashboardComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    IonicModule,
    FormsModule,
    OptionModalModule,
    ActivitiesModule,
    EntryActionsModule,
    CommonModule,
    DashboardRoutingModule
  ],
  exports: [DashboardComponent]
})
export class DashboardModule { }
