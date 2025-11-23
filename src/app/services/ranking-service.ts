import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {Ranking, RankingInstitucional} from '../models/ranking-model';
import { RankingFamiliar} from '../models/ranking-model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RankingService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiURL + '/ranking';

  constructor() { }

  getRanking(page: number, size: number) {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<Ranking[]>(this.apiUrl, { params });
  }

  getRankingFamiliar(): Observable<RankingFamiliar[]> {
    return this.http.get<RankingFamiliar[]>(`${this.apiUrl}/familiar`);
  }

  getRankingInstitucional(): Observable<RankingInstitucional[]> {
    return this.http.get<RankingInstitucional[]>(`${this.apiUrl}/institucional`);
  }
}
