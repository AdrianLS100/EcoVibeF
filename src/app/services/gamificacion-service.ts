import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Recompensa} from '../models/recompensa-model';
import { EstadoGamificacion} from '../models/estadogamificacion-model';
import { CanjearRequest} from '../models/canjearrequest-model';
import { OtorgarPuntoRequest} from '../models/otorgarpuntorequest-model';

@Injectable({
  providedIn: 'root'
})
export class GamificacionService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiURL;

  constructor() { }

  getRecompensas() {
    return this.http.get<Recompensa[]>(`${this.apiUrl}/recompensas`);
  }

  getEstadoUsuario(usuarioId: number) {
    return this.http.get<EstadoGamificacion>(`${this.apiUrl}/estado/${usuarioId}`);
  }

  canjear(request: CanjearRequest) {
    return this.http.post<EstadoGamificacion>(`${this.apiUrl}/canjear`, request);
  }

  otorgarPuntosPorActividad(actividadId: number, usuarioId: number) {
    const body = {
      actividadId: actividadId,
      usuarioId: usuarioId
    };
    return this.http.post<EstadoGamificacion>(`${this.apiUrl}/otorgarPorActividad`, body);
  }
}
