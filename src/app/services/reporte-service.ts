import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Reporte} from '../models/reporte-model';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  private http = inject(HttpClient);

  private apiUrl = environment.apiURL;

  constructor() { }

  obtenerReporte(actividadId: number): Observable<Reporte> {
    const body = { actividadId: actividadId };
    return this.http.post<Reporte>(this.apiUrl + '/calcular', body);
  }
}
