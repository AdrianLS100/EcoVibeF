import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Page} from './recursoeducativo-service';
import { Notificacion, NotificacionResumen} from '../models/notificacion-model';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiURL + '/notificaciones';

  constructor() { }

  getNotificaciones(usuarioId: number, page: number = 0, size: number = 5) {
    const params = new HttpParams()
      .set('usuarioId', usuarioId.toString())
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<Page<Notificacion>>(this.apiUrl, { params });
  }

  getResumen(usuarioId: number) {
    const params = new HttpParams().set('usuarioId', usuarioId.toString());
    return this.http.get<NotificacionResumen>(`${this.apiUrl}/resumen`, { params });
  }

  marcarLeidas(usuarioId: number, ids: number[]) {
    const params = new HttpParams().set('usuarioId', usuarioId.toString());
    return this.http.post<void>(`${this.apiUrl}/marcar-leidas`, ids, { params });
  }
}
