import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthorizationService } from './authorization-service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthorizationService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('accessToken'); // Получаем токен из localStorage
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}` // Устанавливаем заголовок Authorization
        }
      });
    }
    return next.handle(req); // Передаем запрос дальше
  }
}



// import { HttpRequest, HttpHandlerFn, HttpEvent, HttpInterceptorFn } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';
// import { inject } from '@angular/core';
// import { Router } from '@angular/router';
// import { StorageService } from './storage.service';
//
// export const AuthInterceptor: HttpInterceptorFn = (
//   request: HttpRequest<unknown>,
//   next: HttpHandlerFn
// ): Observable<HttpEvent<unknown>> => {
//   const storage = inject(StorageService);
//   const token = storage.getItem('accessToken');
//   console.log('interrupt -',token)
//
//   const headers: Record<string, string> = {
//     'Content-Type': 'application/json',
//     'Accept': 'application/json'
//   };
//
//   if (token) {
//     headers['Authorization'] = `Bearer ${token}`;
//   }
//
//   request = request.clone({
//     setHeaders: headers
//   });
//
//   return next(request).pipe(
//     catchError((error) => {
//       if (error.status === 401) {
//         console.log('Не аутентифицирован');
//
//       }
//       if (error.status === 403) {
//         console.log('Нет доступа');
//       }
//       return throwError(() => error);
//     })
//   );
// };
