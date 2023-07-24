import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-activity-insight',
  templateUrl: './activity-insight.component.html',
  styleUrls: ['./activity-insight.component.css']
})
export class ActivityInsightComponent {
  @Input()data:any
}
