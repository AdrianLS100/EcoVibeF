import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CalculadoraPersonal} from '../models/calculadora-model';

@Injectable({
  providedIn: 'root'
})
export class CalculadoraService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiURL;

  constructor() { }

  calcular(data: CalculadoraPersonal) {
    return this.http.post<CalculadoraPersonal>(this.apiUrl + '/calculadora', data);
  }
}
