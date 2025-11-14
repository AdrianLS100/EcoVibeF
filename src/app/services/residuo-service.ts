import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Residuo} from '../models/residuo-model';

@Injectable({
  providedIn: 'root'
})
export class ResiduoService {

  private http = inject(HttpClient);

  private apiUrl = environment.apiURL;

  constructor() { }

  crear(residuo: Residuo): Observable<Residuo> {
    return this.http.post<Residuo>(this.apiUrl + '/residuo', residuo);
  }
}
