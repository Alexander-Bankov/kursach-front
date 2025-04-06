import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderShowDTO } from '../interfaces/OrderShowDTO';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private baseUrl = 'http://localhost:8080/orders'; // URL для работы с заказами

  constructor(private http: HttpClient) {}

  // Получить все заказы
  getAllOrders(): Observable<OrderShowDTO[]> {
    return this.http.get<OrderShowDTO[]>(this.baseUrl);
  }

  // Удалить заказ
  deleteOrder(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
