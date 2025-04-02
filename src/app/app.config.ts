import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './services/AuthIntercepter'; // Укажите правильный путь к вашему интерцептору
import { AuthorizationService } from './services/authorization-service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withHashLocation()),
    provideHttpClient(
      withInterceptors([authInterceptor]) // Используем интерцептор
    ),
    AuthorizationService // Регистрация AuthorizationService
  ]
};
