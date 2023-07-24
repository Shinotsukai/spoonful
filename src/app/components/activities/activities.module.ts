import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivitiesComponent } from './activities.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ActivitiesComponent
  ],
  imports: [
    IonicModule,
    FormsModule,
    CommonModule
  ],
  exports: [ActivitiesComponent]
})
export class ActivitiesModule { }
