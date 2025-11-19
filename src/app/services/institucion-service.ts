import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import {InstitucionDashboard, InstitucionUnirseRequest} from '../models/institucion-model';

@Injectable({ providedIn: 'root' })
export class InstitucionService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiURL + '/institucion';

  crear(data: {nombre: string, tipo: string}): Observable<any> {
    return this.http.post(`${this.apiUrl}/crear`, data);
  }

  unirse(codigo: InstitucionUnirseRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/unirse`, { codigoInvitacion: codigo });
  }

  getDashboard(): Observable<InstitucionDashboard> {
    return this.http.get<InstitucionDashboard>(`${this.apiUrl}/dashboard`);
  }
}
