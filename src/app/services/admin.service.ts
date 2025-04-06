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
  changeApplicationStatus(id: number, status: string): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/change-status-application/${id}/${status}`, {});
  }

  createInvoice(applicationid: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/create-invoice/${applicationid}`, {});
  }
  getAllUsers(): Observable<UserShowDTO[]> {
    return this.http.get<UserShowDTO[]>(`${this.baseUrl}/get-all-user`, {
      withCredentials: true,
    });
  }

  // Найти пользователя по email
  getUserByEmail(email: string): Observable<UserShowDTO[]> {
    return this.http.get<UserShowDTO[]>(
      `${this.baseUrl}/get-user-by-email?email=${email}`,
      { withCredentials: true }
    );
  }

  // Изменить роль пользователя на администратора
  changeUserRoleToAdmin(email: string): Observable<void> {
    return this.http.put<void>(
      `${this.baseUrl}/change-role?email=${email}`,
      {},
      { withCredentials: true }
    );
  }

}
