import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Recurso} from '../models/recurso-model';

export interface Page<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

@Injectable({
  providedIn: 'root'
})
export class RecursoService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiURL + '/recursos';

  constructor() { }

  getRecursos(tipo?: string, q?: string, page: number = 0) {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', '9'); // (Pedimos 9 por página)

    if (tipo) {
      params = params.set('tipo', tipo);
    }
    if (q) {
      params = params.set('q', q);
    }

    return this.http.get<Page<Recurso>>(this.apiUrl, { params });
  }
}
