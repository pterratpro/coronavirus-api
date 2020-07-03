import { Observable } from 'rxjs';

export interface GlobalStats {
  country: Country;
  total_cases: number;
  total_recovered: number;
  total_unresolved: number;
  total_deaths: number;
  total_new_cases_today: number;
  total_new_deaths_today: number;
  total_active_cases: number;
  total_serious_cases: number;
}

export interface Country {
  id: number;
  title: string;
  code: string;
}


export abstract class StatsData {
  abstract getAllGlobal(): Observable<GlobalStats[]>;
}
