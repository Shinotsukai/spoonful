import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityEditComponent } from './activity-edit.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ActivityEditComponent
  ],
  imports: [
    IonicModule,
    FormsModule,
    CommonModule
  ],
  exports: [ActivityEditComponent]
})
export class ActivityEditModule { }
