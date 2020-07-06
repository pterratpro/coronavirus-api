import { GlobalStats } from './../../../@core/data/stats';
import { Component, OnDestroy, Input, OnInit } from '@angular/core';
import { NbThemeService, NbColorHelper } from '@nebular/theme';
import { GlobalStats } from '../../../@core/data/stats';
@Component({
  selector: 'ngx-chartbar',
  templateUrl: './chartbar.component.html',
  styleUrls: ['./chartbar.component.scss'],
})
export class ChartbarComponent implements OnDestroy, OnInit {
  @Input()
  globalDataChart: GlobalStats[];

  data: any;
  options: any;
  themeSubscription: any;
  labelBarCharts: any;
  globalBarCharts: any;

  constructor(private theme: NbThemeService) {}

  ngOnInit(): void {
    this.labelBarCharts = this.globalDataChart
    .sort((a, b) => b.total_cases - a.total_cases).slice(0, 7)
    .map((stats) => stats.country.title);

    this.globalBarCharts = {global_cases: [], global_deaths: [], global_recovered: []};
    this.globalBarCharts.global_cases = this.globalDataChart
    .sort((a, b) => b.total_cases - a.total_cases).slice(0, 7)
    .map((stats) => stats.total_cases);
    this.globalBarCharts.global_deaths = this.globalDataChart
    .sort((a, b) => b.total_cases - a.total_cases).slice(0, 7)
    .map((stats) => stats.total_deaths);
    this.globalBarCharts.global_recovered = this.globalDataChart
    .sort((a, b) => b.total_cases - a.total_cases).slice(0, 7)
    .map((stats) => stats.total_recovered);
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;
      this.data = {
        labels: this.labelBarCharts,
        datasets: [{
          data: this.globalBarCharts.global_cases,
          label: 'Cases',
          backgroundColor: NbColorHelper.hexToRgbA(colors.primaryLight, 0.8),
        }, {
          data: this.globalBarCharts.global_recovered,
          label: 'Recovered',
          backgroundColor: NbColorHelper.hexToRgbA(colors.successLight, 0.8),
        },
        {
          data: this.globalBarCharts.global_deaths,
          label: 'Deaths',
          backgroundColor: NbColorHelper.hexToRgbA(colors.dangerLight, 0.8),
        }],
      };

      this.options = {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
          labels: {
            fontColor: chartjs.textColor,
          },
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: true,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
              },
            },
          ],
        },
      };
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
