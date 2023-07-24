import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import * as moment from 'moment';
import { BehaviorSubject, Subject, map, switchMap, takeUntil } from 'rxjs';
import { IDiaryEntry } from 'src/app/models/diaryEntry.model';
import { DiaryService } from 'src/app/services/diary.service';

@Component({
  selector: 'app-insights',
  templateUrl: './insights.component.html',
  styleUrls: ['./insights.component.css'],
})
export class InsightsComponent implements OnInit, OnDestroy {
  startDate: any;
  endDate: any;

  insightData: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  insightData$ = this.insightData.asObservable();

  dataLoading$: Subject<boolean> = new Subject<boolean>();

  segment: string = 'spoons';

  dateChanged$: Subject<boolean> = new Subject<boolean>();

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private diaryService: DiaryService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.startDate = moment().startOf('week').toISOString();
    this.endDate = moment().endOf('week').toISOString();
    this.getWeekEntries();
    this.dateChanged$.next(true);
  }

  async getWeekEntries() {
    this.dateChanged$
      .pipe(
        takeUntil(this.destroy$),
        switchMap(() =>
          this.diaryService.getEntriesByPeriod(this.startDate, this.endDate)
        )
      )
      .subscribe(async (entries: IDiaryEntry[]) => {
        if (entries) {
          this.dataLoading$.next(false);

          const activitySummaryData = this.getActivitySummaryData(entries);
          const spoonUsageData = this.getSpoonUsageData(entries);
          const spoonChartData = this.getSpoonUsageChartData(entries);
          const moodData = this.getMoodData(entries);
          const painData = this.getPainData(entries);

          let data = {
            activitySummaryData,
            spoonUsageData,
            spoonChartData,
            moodData,
            painData,
          };
          this.insightData.next(data);

          const loading = await this.loadingCtrl.create({
            message: 'Loading data',
            duration: 500,
          });

          loading.present();

          this.dataLoading$.next(true);
        }
      });
  }

  getActivitySummaryData(entries: IDiaryEntry[]): any {
    const completedEntries = entries.filter((entry) =>
      entry.activities.some((activity) => activity.isCompleted)
    );
    const totalActivities = completedEntries.reduce(
      (total, entry) => total + entry.activities.length,
      0
    );
    const spoonCostDistribution = completedEntries.reduce(
      (distribution: any, entry) => {
        entry.activities.forEach((activity) => {
          if (activity.isCompleted) {
            const { spoonCost } = activity.activity;
            if (distribution.labels.includes(spoonCost)) {
              distribution.datasets[0].data[
                distribution.labels.indexOf(spoonCost)
              ]++;
            } else {
              distribution.labels.push(spoonCost);
              distribution.datasets[0].data.push(1);
            }
          }
        });
        return distribution;
      },
      { labels: [], datasets: [{ label: 'Spoon costs', data: [] }] }
    );

    const activitiesCount = completedEntries.reduce((count: any, entry) => {
      entry.activities.forEach((activity) => {
        if (activity.isCompleted) {
          const { name } = activity.activity;
          if (count[name]) {
            count[name]++;
          } else {
            count[name] = 1;
          }
        }
      });
      return count;
    }, {});

    const mostFrequentActivities = Object.entries(activitiesCount)
      .sort((a: any, b: any) => b[1] - a[1])
      .map(([name, count]) => ({ name, count }))
      .slice(0, 5);

    return {
      totalActivities,
      spoonCostDistribution,
      mostFrequentActivities,
    };
  }

  getSpoonUsageData(entries: IDiaryEntry[]): any {
    const totalDays = entries.length;
    const totalSpoonsUsed = entries.reduce(
      (total, entry) => total + entry.spoonsUsed,
      0
    );
    const averageSpoonsUsed = totalSpoonsUsed / totalDays;
    const overexertionDays = entries.filter(
      (entry) => entry.spoonsBorrowed > 0
    ).length;
    return {
      totalDays,
      totalSpoonsUsed,
      averageSpoonsUsed,
      overexertionDays,
    };
  }

  getSpoonUsageChartData(entries: IDiaryEntry[]): any {
    const chartData: any = {
      labels: [],
      datasets: [
        {
          label: 'Spoons used',
          data: [],
        },
        {
          label: 'Spoons borrowed',
          data: [],
        },
      ],
    };
    for (const entry of entries) {
      const { date, spoonsUsed, spoonsBorrowed } = entry;
      const formattedDate: any = moment(date).format('MMM,DD');

      chartData.labels.push(formattedDate);
      chartData.datasets[0].data.push(spoonsUsed);
      chartData.datasets[1].data.push(spoonsBorrowed);
    }

    return chartData;
  }

  getMoodData(entries: IDiaryEntry[]): any {
    const chartData: any = {
      labels: [],
      datasets: [
        {
          label: 'Morning',
          data: [],
        },
        {
          label: 'Afternoon',
          data: [],
        },
        {
          label: 'Evening',
          data: [],
        },
      ],
    };

    const avgChartData: any = {
      labels: [],
      datasets: [
        {
          label: 'Average mood',
          data: [],
        },
      ],
    };

    const moodData: any = {
      moodByPeriod: {
        Morning: [],
        Afternoon: [],
        Evening: [],
      },
      averageMoodByPeriod: {
        Morning: 0,
        Afternoon: 0,
        Evening: 0,
      },
    };

    const periods = ['Morning', 'Afternoon', 'Evening'];

    for (const entry of entries) {
      chartData.labels.push(moment(entry.date).format('MMM,DD'));
      avgChartData.labels.push(moment(entry.date).format('MMM,DD'));

      const mood = entry.mood;
      if (mood) {
        for (const period of periods) {
          const rating = mood.find((r) => r.period === period);
          if (rating) {
            moodData.moodByPeriod[period].push(rating.rating);
          } else {
            moodData.moodByPeriod[period].push(null);
          }
        }
      } else {
        for (const period of periods) {
          moodData.moodByPeriod[period].push(null);
        }
      }
    }

    const { Morning, Afternoon, Evening } = moodData.moodByPeriod;
    let totalRatingArr = [...Morning, ...Afternoon, ...Evening].filter(
      (rating: number | null) => rating !== null
    );
    if (totalRatingArr.length > 0) {
      moodData.averageMood = Math.round(
        totalRatingArr.reduce((a: number, b: number) => a + (b || 0), 0) /
          totalRatingArr.length
      );
    }

    for (let i = 0; i < avgChartData.labels.length; i++) {
      const morningMood = moodData.moodByPeriod.Morning[i];
      const afternoonMood = moodData.moodByPeriod.Afternoon[i];
      const eveningMood = moodData.moodByPeriod.Evening[i];

      const nonNullRatings = [morningMood, afternoonMood, eveningMood].filter(
        (rating: number | null) => rating !== null
      );

      const averageMood =
        nonNullRatings.length > 0
          ? Math.round(
              nonNullRatings.reduce(
                (sum: number, rating: number) => sum + rating,
                0
              ) / nonNullRatings.length
            )
          : null;

      avgChartData.datasets[0].data.push(averageMood);
    }

    const morningData = [...Morning].filter(
      (rating: number | null) => rating !== null
    );
    const afternoonData = [...Afternoon].filter(
      (rating: number | null) => rating !== null
    );
    const eveningData = [...Evening].filter(
      (rating: number | null) => rating !== null
    );

    moodData.averageMoodByPeriod.Morning = Math.round(
      morningData.reduce((a: number, b: number) => a + (b || 0), 0) /
        morningData.length
    );
    moodData.averageMoodByPeriod.Afternoon = Math.round(
      afternoonData.reduce((a: number, b: number) => a + (b || 0), 0) /
        afternoonData.length
    );
    moodData.averageMoodByPeriod.Evening = Math.round(
      eveningData.reduce((a: number, b: number) => a + (b || 0), 0) /
        eveningData.length
    );

    chartData.datasets[0].data = moodData.moodByPeriod.Morning;
    chartData.datasets[1].data = moodData.moodByPeriod.Afternoon;
    chartData.datasets[2].data = moodData.moodByPeriod.Evening;

    return {
      chartData: chartData,
      avgChartData: avgChartData,
      avgMood: moodData.averageMoodByPeriod,
      overallAvg: moodData.averageMood,
    };
  }

  getPainData(entries: IDiaryEntry[]): any {
    const chartData: any = {
      labels: [],
      datasets: [
        {
          label: 'Morning',
          data: [],
        },
        {
          label: 'Afternoon',
          data: [],
        },
        {
          label: 'Evening',
          data: [],
        },
      ],
    };

    const avgChartData: any = {
      labels: [],
      datasets: [
        {
          label: 'Average mood',
          data: [],
        },
      ],
    };

    const painData: any = {
      painByPeriod: {
        Morning: [],
        Afternoon: [],
        Evening: [],
      },
      averagePainByPeriod: {
        Morning: 0,
        Afternoon: 0,
        Evening: 0,
      },
    };

    const periods = ['Morning', 'Afternoon', 'Evening'];

    for (const entry of entries) {
      chartData.labels.push(moment(entry.date).format('MMM,DD'));

      const pain = entry.pain;
      if (pain) {
        for (const period of periods) {
          const rating = pain.find((r) => r.period === period);
          if (rating) {
            painData.painByPeriod[period].push(rating.rating);
          } else {
            painData.painByPeriod[period].push(null);
          }
        }
      } else {
        for (const period of periods) {
          painData.painByPeriod[period].push(null);
        }
      }
    }
    const { Morning, Afternoon, Evening } = painData.painByPeriod;
    let totalRatingArr = [...Morning, ...Afternoon, ...Evening].filter(
      (rating: number | null) => rating !== null
    );
    if (totalRatingArr.length > 0) {
      painData.averagePain = Math.round(
        totalRatingArr.reduce((a: number, b: number) => a + (b || 0), 0) /
          totalRatingArr.length
      );
    }

    for (let i = 0; i < avgChartData.labels.length; i++) {
      const morningPain = painData.moodByPeriod.Morning[i];
      const afternoonPain = painData.moodByPeriod.Afternoon[i];
      const eveningPain = painData.moodByPeriod.Evening[i];

      const nonNullRatings = [morningPain, afternoonPain, eveningPain].filter(
        (rating: number | null) => rating !== null
      );

      const averagePain =
        nonNullRatings.length > 0
          ? Math.round(
              nonNullRatings.reduce(
                (sum: number, rating: number) => sum + rating,
                0
              ) / nonNullRatings.length
            )
          : null;

      avgChartData.datasets[0].data.push(averagePain);
    }

    const morningData = [...Morning].filter(
      (rating: number | null) => rating !== null
    );
    const afternoonData = [...Afternoon].filter(
      (rating: number | null) => rating !== null
    );
    const eveningData = [...Evening].filter(
      (rating: number | null) => rating !== null
    );

    painData.averagePainByPeriod.Morning = Math.round(
      morningData.reduce((a: number, b: number) => a + (b || 0), 0) /
        morningData.length
    );
    painData.averagePainByPeriod.Afternoon = Math.round(
      afternoonData.reduce((a: number, b: number) => a + (b || 0), 0) /
        afternoonData.length
    );
    painData.averagePainByPeriod.Evening = Math.round(
      eveningData.reduce((a: number, b: number) => a + (b || 0), 0) /
        eveningData.length
    );

    chartData.datasets[0].data = painData.painByPeriod.Morning;
    chartData.datasets[1].data = painData.painByPeriod.Afternoon;
    chartData.datasets[2].data = painData.painByPeriod.Evening;

    return {
      chartData: chartData,
      avgChartData: avgChartData,
      avgPain: painData.averagePainByPeriod,
      overallAvg: painData.averagePain,
    };
  }

  onDateChanged() {
    if (
      moment(this.startDate).isBefore(this.endDate) &&
      moment(this.endDate).isAfter(this.startDate)
    ) {
      this.dateChanged$.next(true);
    } else {
      console.log('error check date range');
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
