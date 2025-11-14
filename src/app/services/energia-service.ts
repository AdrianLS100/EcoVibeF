import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Energia} from '../models/energia-model';

@Injectable({
  providedIn: 'root'
})
export class EnergiaService {

  private http = inject(HttpClient);
  private url = environment.apiURL;

  constructor() { }

  crear(energia: Energia): Observable<Energia> {
    return this.http.post<Energia>(this.url + '/energia', energia);
  }
}
