import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OptionModalComponent } from './option-modal.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    OptionModalComponent
  ],
  imports: [
    IonicModule,
    FormsModule,
    CommonModule
  ],
  exports: [
    OptionModalComponent
  ]
})
export class OptionModalModule { }
