import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Familia} from '../models/familia-model';
import {FamiliaCrearRequest} from '../models/familia-model';
import {FamiliaUnirseRequest} from '../models/familia-model';
import {FamiliaDashboard} from '../models/familia-dashboard-model';

@Injectable({
  providedIn: 'root'
})
export class FamiliaService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiURL + '/familia';

  constructor() { }

  crear(request: FamiliaCrearRequest): Observable<Familia> {
    return this.http.post<Familia>(`${this.apiUrl}/crear`, request);
  }

  unirse(request: FamiliaUnirseRequest): Observable<Familia> {
    return this.http.post<Familia>(`${this.apiUrl}/unirse`, request);
  }

  getMiDashboard(): Observable<FamiliaDashboard> {
    return this.http.get<FamiliaDashboard>(`${this.apiUrl}/mi-dashboard`);
  }
}
