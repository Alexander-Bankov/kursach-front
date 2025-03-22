import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Registration } from '../interfaces/Registration';
import { environment } from '../../environments/environments'; // Путь к файлу может отличаться

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private baseUrl = environment.registrationUrl; // Используем URL из environment

  constructor(private http: HttpClient) { }

  register(data: Registration): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }
}
