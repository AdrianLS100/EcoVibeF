import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ComparativaPersonal} from '../models/comparativapersonal-model';

@Injectable({
  providedIn: 'root'
})
export class ComparativaService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiURL + '/comparativa';

  getComparativaPersonal(): Observable<ComparativaPersonal> {
    return this.http.get<ComparativaPersonal>(`${this.apiUrl}/personal`);
  }
}
