import { GlobalStats } from './../../@core/data/stats';
import { StatsService } from './../../@core/services/stats.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-ecommerce',
  templateUrl: './e-commerce.component.html',
})
export class ECommerceComponent implements OnInit {
  stats: GlobalStats[];

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
    });
  }
}
