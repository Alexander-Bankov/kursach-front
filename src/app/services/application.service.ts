// src/app/services/application.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShowApplicationDTO } from '../interfaces/ShowApplicationDTO';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private applicationsUrl = `${environment.baseUrl}/api/applications`;

  constructor(private http: HttpClient) {}

  getAllApplications() {
    return this.http.get<ShowApplicationDTO[]>(this.applicationsUrl);
  }
}
