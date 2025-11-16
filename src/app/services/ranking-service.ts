import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Ranking} from '../models/ranking-model';

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
}
