// invoice-list.component.ts
import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../../services/invoice.service';
import { InvoiceShowDTO } from '../../interfaces/InvoiceShowDTO';
import {InvoiceComponent} from '../invoice-component/invoice-component';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list-component.html',
  styleUrls: ['./invoice-list-component.css'],
  imports: [
    InvoiceComponent,
    CommonModule
  ],
  standalone: true
})
export class InvoiceListComponent implements OnInit {
  invoices: InvoiceShowDTO[] = []; // Массив накладных

  constructor(private invoiceService: InvoiceService) {}

  ngOnInit(): void {
    this.loadInvoices();
  }

  loadInvoices(): void {
    this.invoiceService.getAllInvoices().subscribe({
      next: (data) => {
        this.invoices = data; // Загружаем список накладных
      },
      error: () => {
        alert('Ошибка загрузки накладных!');
      }
    });
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
