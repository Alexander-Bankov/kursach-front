import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Authorization } from '../interfaces/Authorization';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  private apiUrl = environment.authorizationUrl; // URL из окружения

  constructor(private http: HttpClient, public router: Router) {}

  login(authData: Authorization): Observable<any> {
    return this.http.post<any>(this.apiUrl, authData, { withCredentials: true })
      .pipe(
        tap(response => {
          if (response.accessToken) {
            console.log('token -', response.accessToken);
            localStorage.setItem('accessToken', response.accessToken);
            console.log('Токен сохранен в localStorage:', localStorage.getItem('accessToken'));
            //this.router.navigate(['/applications']);
          }
        })
      );
  }

  // logout(): void {
  //   localStorage.removeItem('accessToken'); // Удаляем токен при логауте
  //   this.router.navigate(['/login']);
  // }
}
