// invoice.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InvoiceShowDTO } from '../interfaces/InvoiceShowDTO';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private baseUrl = 'http://localhost:8080/invoices'; // URL для работы с накладными

  constructor(private http: HttpClient) {}

  // Получить все накладные
  getAllInvoices(): Observable<InvoiceShowDTO[]> {
    return this.http.get<InvoiceShowDTO[]>(this.baseUrl);
  }

  // Удалить накладную
  deleteInvoice(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
