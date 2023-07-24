import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InsightsRoutingModule } from './insights-routing.module';
import { InsightsComponent } from './insights.component';
import { IonicModule } from '@ionic/angular';
import { ChartsModule } from 'src/app/components/charts/charts.module';
import { FormsModule } from '@angular/forms';
import { SpoonInsightComponent } from './spoon-insight/spoon-insight.component';
import { ActivityInsightComponent } from './activity-insight/activity-insight.component';
import { MoodInsightComponent } from './mood-insight/mood-insight.component';
import { PainInsightComponent } from './pain-insight/pain-insight.component';


@NgModule({
  declarations: [
    InsightsComponent,
    SpoonInsightComponent,
    ActivityInsightComponent,
    MoodInsightComponent,
    PainInsightComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    ChartsModule,
    FormsModule,
    InsightsRoutingModule
  ],
  exports: [InsightsComponent]
})
export class InsightsModule { }
