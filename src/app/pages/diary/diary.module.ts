import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiaryRoutingModule } from './diary-routing.module';
import { DiaryComponent } from './diary.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DiaryComponent
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    IonicModule,
    FormsModule,
    CommonModule,
    DiaryRoutingModule
  ],
  exports: [DiaryComponent]
})
export class DiaryModule { }
