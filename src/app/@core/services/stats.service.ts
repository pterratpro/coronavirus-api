import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class StatsService {

  constructor(private http: HttpClient) {}

  getAllGlobal(): Observable<any> {
    return this.http.get('https://api.thevirustracker.com/free-api?countryTotals=ALL');
  }
}
