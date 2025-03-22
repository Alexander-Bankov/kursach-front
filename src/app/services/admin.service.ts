// src/app/services/admin.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserShowDTO } from '../interfaces/UserShowDTO';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = `${environment.baseUrl}/api/admin`;  // URL к вашему контроллеру

  constructor(private http: HttpClient) { }

  getPersonalAdminInfo(): Observable<UserShowDTO> {
    return this.http.get<UserShowDTO>(`${this.baseUrl}/get-personal-info`, { withCredentials: true });
  }
}
