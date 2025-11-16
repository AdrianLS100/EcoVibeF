import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Profile} from '../models/profile-model';
import {UpdatePassword} from '../models/profile-model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiURL + '/profile';

  constructor() { }

  getProfile(): Observable<Profile> {
    return this.http.get<Profile>(this.apiUrl);
  }

  changePassword(request: UpdatePassword): Observable<any> {
    return this.http.post(`${this.apiUrl}/change-password`, request);
  }
}
