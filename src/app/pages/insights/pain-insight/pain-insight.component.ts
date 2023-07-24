import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-pain-insight',
  templateUrl: './pain-insight.component.html',
  styleUrls: ['./pain-insight.component.css']
})
export class PainInsightComponent implements OnInit, OnDestroy {
  @Input()data:any
  @Input()spoonData:any;

  hasData = false;
  painCompareConfig: any;

  painCompareData: any;

  constructor(){}

  ngOnInit() {
    let dataIsNull = this.data.chartData.datasets.every((dataset: any) => {
      let dataValues = dataset.data.filter((value: any) => value !== null);
      return dataValues.length === dataset.data.length;
    });

    if(dataIsNull){
      this.hasData = false;
    } else {
      this.hasData = true;
      let compareData: any = {
        labels: [],
        datasets: [],
      };

      let newMappedPain = JSON.parse(JSON.stringify(this.data));

      let mappedSpoonData = JSON.parse(JSON.stringify(this.spoonData));

      newMappedPain.chartData.datasets = newMappedPain.chartData.datasets.map(
        (dataset: any) => ({
          ...dataset,
          yAxisID: 'PainAxis',
        })
      );

      console.log('mapped spoon?', mappedSpoonData);

      mappedSpoonData.datasets = mappedSpoonData.datasets.map(
        (dataset: any) => ({
          ...dataset,
          yAxisID: 'spoonAxis',
          type: 'line',
          borderColor: 'rgba(255, 99, 132, 1)',
          fill: false,
          tension: 0.1,
        })
      );

      compareData.labels = this.data.chartData.labels;

      newMappedPain.chartData.datasets.forEach((dataset: any) => {
        compareData.datasets.push(dataset);
      });

      compareData.datasets.push(mappedSpoonData.datasets[0]);

      console.log('new mapped', compareData);

      this.painCompareData = compareData;

      this.painCompareConfig = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          moodAxis: {

            display: true,
            position: 'right',
            min: 1,
            max: 5,
            ticks: {
              stepSize: 1,
            },
            grid: {
              display: false,
              drawOnChartArea: false,
            },
          },
          spoonsAxis: {
            position: 'right',
            display: false,
            min: 0,
            max: 14 + 2, // Adjust the range based on your data
            ticks: {
              stepSize: 2,
            },
          },
          y: {
            display: false,
          },
        },
      };
    }
    
  }

  ngOnDestroy(): void {
    
  }
}
