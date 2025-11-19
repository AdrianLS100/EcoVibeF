import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Recomendacion} from '../models/recomendacion-model';

@Injectable({
  providedIn: 'root'
})
export class RecomendacionService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiURL + '/recomendaciones';

  getRecomendaciones() {
    return this.http.get<Recomendacion[]>(this.apiUrl);
  }
}
