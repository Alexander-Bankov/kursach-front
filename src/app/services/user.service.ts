import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserShowDTO } from './../interfaces/UserShowDTO';
import { UserEditDTO } from './../interfaces/UserEditDTO';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:8080/personal-info';

  constructor(private http: HttpClient) {}

  getCurrentUserInfo(): Observable<UserShowDTO> {
    return this.http.get<UserShowDTO>(`${this.baseUrl}/current`);
  }

  updateUserInfo(userEditDTO: UserEditDTO): Observable<UserShowDTO> {
    return this.http.put<UserShowDTO>(`${this.baseUrl}/update`, userEditDTO);
  }

  logout(): Observable<string> {
    return this.http.post<string>('http://localhost:8080/gruz/logout', {});
  }

  createOrder(invoiceId: number): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/create-order/${invoiceId}`, {});
  }

  cancelAll(invoiceId: number): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/cancel-all/${invoiceId}`, {});
  }
}
