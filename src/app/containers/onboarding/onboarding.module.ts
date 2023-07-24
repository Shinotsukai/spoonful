import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnboardingRoutingModule } from './onboarding-routing.module';
import { OnboardingComponent } from './onboarding.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [
    OnboardingComponent
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    IonicModule,
    CommonModule,
    OnboardingRoutingModule
  ],
  exports: [OnboardingComponent]
})
export class OnboardingModule { }
