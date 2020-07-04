import { GlobalStats } from './../../@core/data/stats';
import { StatsService } from './../../@core/services/stats.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-ecommerce',
  templateUrl: './e-commerce.component.html',
})
export class ECommerceComponent implements OnInit {
  stats: GlobalStats[];
  // Globalcases
  topCountryGlobalCases: string[];
  topCountryGlobalCasesData: Object[];
  // Globalcases today
  topCountryToday: string[];
  topCountryTodayCases: Object[];
  constructor(private statsService: StatsService) {}
  ngOnInit(): void {
    this.statsService.getAllGlobal().pipe().subscribe(data => {
      this.stats = Object.keys(data.countryitems[0]).map((key, index) => {
        return {
          country: {
            id: data.countryitems[0][key].ourid,
            code: data.countryitems[0][key].code,
            title: data.countryitems[0][key].title,
          },
          total_cases: data.countryitems[0][key].total_cases,
          total_deaths: data.countryitems[0][key].total_deaths,
          total_active_cases: data.countryitems[0][key].total_active_cases,
          total_new_cases_today: data.countryitems[0][key].total_new_cases_today,
          total_new_deaths_today: data.countryitems[0][key].total_new_deaths_today,
          total_recovered: data.countryitems[0][key].total_recovered,
          total_serious_cases: data.countryitems[0][key].total_serious_cases,
          total_unresolved: data.countryitems[0][key].total_unresolved,
        };
    });
    this.topCountryGlobalCases = this.stats
      .sort((a, b) => b.total_cases - a.total_cases).slice(0, 5)
      .map(stats => stats.country.title);
    this.topCountryGlobalCasesData = this.stats
      .sort((a, b) => b.total_cases - a.total_cases).slice(0, 5)
      .map((stats) => ({name: stats.country.title, value: stats.total_cases}));
    this.topCountryToday = this.stats
      .sort((a, b) => b.total_new_cases_today - a.total_new_cases_today).slice(0, 5)
      .map(stats => stats.country.title);
    this.topCountryTodayCases = this.stats
      .sort((a, b) => b.total_new_cases_today - a.total_new_cases_today).slice(0, 5)
      .map((stats) => ({name: stats.country.title, value: stats.total_new_cases_today}));
    });
  }
}
