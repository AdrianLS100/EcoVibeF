import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Recurso} from '../models/recurso-model';

// (El backend devuelve un objeto 'Page' de Spring, que tiene esta estructura)
export interface Page<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number; // (Número de página actual)
}

@Injectable({
  providedIn: 'root'
})
export class RecursoService {

  private http = inject(HttpClient);
  // Llama a: GET /api/recursos (según tu RecursoEducativoController)
  private apiUrl = environment.apiURL + '/recursos';

  constructor() { }

  /**
   * Obtiene la lista de recursos, con filtros opcionales.
   */
  getRecursos(tipo?: string, q?: string, page: number = 0): Observable<Page<Recurso>> {
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
