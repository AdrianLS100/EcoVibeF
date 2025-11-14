import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Transporte} from '../models/transporte-model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransporteService {

  private http = inject(HttpClient);

  private url =environment.apiURL;

  constructor() { }

  crear(transporte: Transporte) {
    return this.http.post<Transporte>(this.url+"/transporte", transporte);
  }
}
