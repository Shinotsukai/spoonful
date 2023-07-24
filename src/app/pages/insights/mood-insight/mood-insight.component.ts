import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mood-insight',
  templateUrl: './mood-insight.component.html',
  styleUrls: ['./mood-insight.component.scss'],
})
export class MoodInsightComponent implements OnInit {
  @Input() data: any;
  @Input() spoonData: any;

  hasData: boolean = false;

  moodCompareConfig: any;

  moodCompareData: any;

  ngOnInit() {
    console.log(this.data);
    let dataIsNull = this.data.chartData.datasets.every((dataset: any) => {
      let dataValues = dataset.data.filter((value: any) => value !== null);
      return dataValues.length === dataset.data.length;
    });

    if (dataIsNull) {
      this.hasData = false;
    } else {
      this.hasData = true;
      let compareData: any = {
        labels: [],
        datasets: [],
      };

      let newMappedMood = JSON.parse(JSON.stringify(this.data));

      let mappedSpoonData = JSON.parse(JSON.stringify(this.spoonData));

      newMappedMood.avgChartData.datasets =
        newMappedMood.avgChartData.datasets.map((dataset: any) => ({
          ...dataset,
          yAxisID: 'moodAxis',
        }));

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

      newMappedMood.avgChartData.datasets.forEach((dataset: any) => {
        compareData.datasets.push(dataset);
      });

      compareData.datasets.push(mappedSpoonData.datasets[0]);

      console.log('new mapped', compareData);

      this.moodCompareData = compareData;

      this.moodCompareConfig = {
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
}
