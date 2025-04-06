import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CargoDTO } from '../interfaces/CargoDTO';
import { CargoShowDTO } from '../interfaces/CargoShowDTO';

@Injectable({
  providedIn: 'root',
})
export class CargoService {
  private baseUrl = 'http://localhost:8080/api/cargo'; // URL для работы с грузами

  constructor(private http: HttpClient) {}

  // Получить все грузы по идентификатору заявки
  getAllByApplicationId(applicationId: number): Observable<CargoShowDTO[]> {
    return this.http.get<CargoShowDTO[]>(`${this.baseUrl}/application/${applicationId}`);
  }

  // Получить груз по идентификатору
  getCargoById(cargoId: number): Observable<CargoShowDTO> {
    return this.http.get<CargoShowDTO>(`${this.baseUrl}/${cargoId}`);
  }

  // Создать новый груз
  createCargo(cargo: CargoDTO): Observable<CargoShowDTO> {
    return this.http.post<CargoShowDTO>(this.baseUrl, cargo);
  }

  // Обновить существующий груз
  updateCargo(id: number, cargo: CargoDTO): Observable<CargoShowDTO> {
    return this.http.put<CargoShowDTO>(`${this.baseUrl}/${id}`, cargo);
  }

  // Удалить груз
  deleteCargo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Получить груз по идентификатору заявки и идентификатору груза
  getCargoByApplicationAndCargoId(applicationId: number, cargoId: number): Observable<CargoShowDTO> {
    return this.http.get<CargoShowDTO>(`${this.baseUrl}/application/${applicationId}/cargo/${cargoId}`);
  }
}
