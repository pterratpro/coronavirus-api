import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StatsData, GlobalStats } from '../data/stats';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class StatsService{

  constructor(private http: HttpClient) {}

  getAllGlobal(): Observable<any> {
    return this.http.get('https://api.thevirustracker.com/free-api?countryTotals=ALL');
  }
}
