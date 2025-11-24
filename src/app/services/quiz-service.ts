import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Pregunta} from '../models/pregunta-model';

@Injectable({ providedIn: 'root' })
export class QuizService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiURL + '/quiz';

  obtenerQuiz(): Observable<Pregunta[]> {
    return this.http.get<Pregunta[]>(`${this.apiUrl}/nuevo`);
  }

  reclamarPuntos(puntos: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/reclamar-premio`, { puntos });
  }
}
