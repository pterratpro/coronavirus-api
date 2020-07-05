import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { NbMediaBreakpoint, NbMediaBreakpointsService, NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';
import { CountryOrderData } from '../../../@core/data/country-order';

@Component({
  selector: 'ngx-country-orders',
  styleUrls: ['./country-orders.component.scss'],
  template: `
    <nb-card [size]="breakpoint.width >= breakpoints.md ? 'medium' : 'giant'">
      <nb-card-header>Covid-19 Map</nb-card-header>
      <nb-card-body>
        <ngx-country-orders-map style="width:'100%'" (select)="selectCountryById($event)"
                                countryId="USA">
        </ngx-country-orders-map>
      </nb-card-body>
    </nb-card>
    <nb-card [size]="breakpoint.width >= breakpoints.md ? 'medium' : 'giant'">
      <nb-card-header>Covid-19 Map statistics</nb-card-header>
      <nb-card-body>
        <ngx-country-orders-chart [countryName]="countryName"
                                  [data]="countryData"
                                  [labels]="countriesCategories"
                                  maxValue="20">
        </ngx-country-orders-chart>
      </nb-card-body>
    </nb-card>
  `,
})
export class CountryOrdersComponent implements OnInit, OnDestroy {

  private alive = true;
  @Input()
  globalData: any;
  countryName = '';
  countryData: number[] = [];
  countriesCategories: string[];
  breakpoint: NbMediaBreakpoint = { name: '', width: 0 };
  breakpoints: any;

  constructor(private themeService: NbThemeService,
              private breakpointService: NbMediaBreakpointsService,
              private countryOrderService: CountryOrderData) {
    this.breakpoints = this.breakpointService.getBreakpointsMap();
  }

  ngOnInit() {
    this.themeService.onMediaQueryChange()
      .pipe(takeWhile(() => this.alive))
      .subscribe(([oldValue, newValue]) => {
        this.breakpoint = newValue;
      });
    this.countryOrderService.getCountriesCategories()
      .pipe(takeWhile(() => this.alive))
      .subscribe((countriesCategories) => {
        this.countriesCategories = countriesCategories;
      });
  }

  selectCountryById(countryName: any) {
    this.countryName = countryName.name;
    let countryDataNoFormat = this.globalData.find(country => country.country.title  === countryName.name);
    if (!countryDataNoFormat)
      countryDataNoFormat = this.globalData.find(country => country.country.code  === countryName.name);
    if (!countryDataNoFormat)
      countryDataNoFormat = this.globalData.find(country => country.country.title  === countryName.id);
    if (!countryDataNoFormat)
      countryDataNoFormat = this.globalData.find(country => country.country.code  === countryName.id);
    this.countryData = [
      countryDataNoFormat.total_cases,
      countryDataNoFormat.total_recovered,
      countryDataNoFormat.total_deaths,
      countryDataNoFormat.total_new_cases_today,
      countryDataNoFormat.total_new_deaths_today,
    ].reverse();
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
