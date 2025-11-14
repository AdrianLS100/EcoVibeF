import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ActividadesDiarias } from '../models/actividadesdiarias-model';
@Injectable({
  providedIn: 'root'
})
export class ActividadesDiariasService {

  private http = inject(HttpClient);

  private url = environment.apiURL;

  constructor() { }

  crearActividad(usuarioId: number, fecha: string, descripcion: string) {
    const requestBody = {
      usuarioId: usuarioId,
      fecha: fecha,
      descripcion: descripcion
    };
    return this.http.post<ActividadesDiarias>(this.url + "/crearactividad", requestBody);
  }

  obtenerPorId(id: number) {
    return this.http.get<ActividadesDiarias>(`${this.url}/${id}`);
  }

  eliminar(id: number) {
    return this.http.delete<void>(`${this.url}/actividad/${id}`);
  }
}
