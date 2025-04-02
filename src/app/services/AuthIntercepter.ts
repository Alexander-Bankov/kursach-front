import { HttpRequest, HttpHandlerFn, HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { inject } from '@angular/core';
import { AuthorizationService } from './authorization-service';

export const authInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const authService = inject(AuthorizationService);
  const token = localStorage.getItem('accessToken'); // Получаем токен из localStorage

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  // else {
  //   console.warn('Токен не найден!'); // Если токен отсутствует
  // }

  request = request.clone({
    setHeaders: headers
  });

  return next(request).pipe(
    catchError((error) => {
      return throwError(() => error);
    })
  );
};
