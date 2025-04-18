import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../../services/invoice.service';
import { InvoiceShowDTO } from '../../interfaces/InvoiceShowDTO';
import { InvoiceComponent } from '../invoice-component/invoice-component';
import { CommonModule } from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list-component.html',
  styleUrls: ['./invoice-list-component.css'],
  imports: [
    InvoiceComponent,
    CommonModule,
    RouterLink
  ],
  standalone: true
})
export class InvoiceListComponent implements OnInit {
  invoices: InvoiceShowDTO[] = []; // Массив накладных
  isAdmin: boolean = false;

  constructor(private invoiceService: InvoiceService) {}

  ngOnInit(): void {
    this.loadInvoices();
  }

  checkUserRole() {
    const role = localStorage.getItem('role');
    this.isAdmin = role === 'ADMINISTRATOR';
  }

  loadInvoices(): void {
    this.checkUserRole(); // Проверяем роль пользователя
    if (this.isAdmin) {
      this.invoiceService.getAllInvoices().subscribe({
        next: (data) => {
          this.invoices = data; // Загружаем все накладные
        },
        error: () => {
          alert('Ошибка загрузки накладных!');
        }
      });
    } else {
      this.invoiceService.getInvoicesByUser().subscribe({
        next: (data) => {
          this.invoices = data; // Загружаем накладные текущего пользователя
        },
        error: () => {
          alert('Ошибка загрузки накладных!');
        }
      });
    }
  }

  deleteInvoice(invoiceId: number): void {
    if (confirm('Вы уверены, что хотите удалить эту накладную?')) {
      this.invoiceService.deleteInvoice(invoiceId).subscribe({
        next: () => {
          this.invoices = this.invoices.filter((invoice) => invoice.invoiceId !== invoiceId);
          alert('Накладная успешно удалена!');
        },
        error: () => {
          alert('Ошибка удаления накладной!');
        }
      });
    }
  }
}
