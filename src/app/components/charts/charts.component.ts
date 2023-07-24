import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements AfterViewInit{
  @ViewChild('chartCanvas', { static: true }) chartCanvas!: ElementRef;
  @Input() type: any;
  @Input() data: any; 
  @Input() config:any;

  private chart!: Chart;

  ngAfterViewInit() {
    this.createChart();
  }

  private createChart() {
    this.chart = new Chart(this.chartCanvas.nativeElement.getContext('2d'), {
      type: this.type,
      data: this.data,
      options: this.config ? this.config : {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {

            grid: {
              display: false
            }
          },
          y: {
            ticks: {
              stepSize: 1,
            },
            grid: {
              display: false
            },
              beginAtZero: true
          }
      }
      }
    });
  }

}
