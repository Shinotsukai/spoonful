import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsComponent } from './charts.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    ChartsComponent
  ],
  imports: [
    IonicModule,
    CommonModule
  ],
  exports: [ChartsComponent]
})
export class ChartsModule { }
