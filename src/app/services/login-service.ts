import {inject, Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {RequestDto, RegisterRequestDto} from '../models/authrequest-model';
import {map, Observable, tap} from 'rxjs';
import { ResponseDto } from '../models/authresponse-model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = environment.apiURL;
  private http: HttpClient = inject(HttpClient);
  constructor() { }

  login(requestDto: RequestDto): Observable<ResponseDto | null> {
    const loginUrl = this.url + "/auth/login";
    console.log("Enviando a:", loginUrl);

    return this.http.post<ResponseDto>(loginUrl, requestDto).pipe(
      tap((response) => {
        console.log("Respuesta recibida:", response);
        localStorage.setItem('token', response?.token);
        if (response.roles && response.roles.length > 0) {
          localStorage.setItem('rol', response.roles[0]);
        }
        if (response.usuarioId) {
          localStorage.setItem('usuarioId', response.usuarioId.toString());
        }
      })
    );
  }


  register(requestDto: RegisterRequestDto): Observable<any> {
    const registerUrl = this.url + "/auth/register";
    console.log("Registrando en:", registerUrl);

    return this.http.post(registerUrl, requestDto, { responseType: 'text' });
  }

  forgotPassword(email: string): Observable<any> {
    const forgotUrl = this.url + "/auth/forgot-password";
    return this.http.post(forgotUrl, { email: email });
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    const resetUrl = this.url + "/auth/reset-password";
    return this.http.post(resetUrl, { newPassword: newPassword }, {
      params: { token: token }
    });
  }

  getToken(): string | null { return localStorage.getItem('token'); }
  getUsuarioId(): string | null { return localStorage.getItem('usuarioId'); }
  isLoggedIn(): boolean { return this.getToken() != null; }
  logout(): void { localStorage.clear(); }

  getRole(): string | null {
    return localStorage.getItem('rol');
  }
}
