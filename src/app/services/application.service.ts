import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShowApplicationDTO, ApplicationDTO } from '../interfaces/application.model';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private baseUrl = 'http://localhost:8080/api/applications'; // укажите базовый URL вашего API
  private baseUrl1 = 'http://localhost:8080/api/applications/for-user';

  constructor(private http: HttpClient) {}

  getAllApplications(): Observable<ShowApplicationDTO[]> {
    return this.http.get<ShowApplicationDTO[]>(this.baseUrl);
  }

  getAllApplicationsByUserId(): Observable<ShowApplicationDTO[]> {
    return this.http.get<ShowApplicationDTO[]>(`${this.baseUrl}/user`);
  }

  getApplicationById(id: number): Observable<ShowApplicationDTO> {
    return this.http.get<ShowApplicationDTO>(`${this.baseUrl}/${id}`);
  }

  createApplication(applicationDTO: ApplicationDTO): Observable<ShowApplicationDTO> {
    return this.http.post<ShowApplicationDTO>(this.baseUrl, applicationDTO);
  }

  updateApplication(id: number, applicationDTO: ApplicationDTO): Observable<ShowApplicationDTO> {
    return this.http.put<ShowApplicationDTO>(`${this.baseUrl}/${id}`, applicationDTO);
  }

  deleteApplication(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
