import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spoon-insight',
  templateUrl: './spoon-insight.component.html',
  styleUrls: ['./spoon-insight.component.scss']
})
export class SpoonInsightComponent {

  @Input()chartData:any;
  @Input()spoonUsage:any;

  chartConfig:any = {
    stacked:true,
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x:{            grid: {
        display: false
      },
        stacked:true
      },
      y: {            grid: {
        display: false
      },
        stacked:true,
          beginAtZero: true
      }
  }
  }

}
