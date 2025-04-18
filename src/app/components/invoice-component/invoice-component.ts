import { Component, Input, Output, EventEmitter } from '@angular/core';
import { InvoiceShowDTO } from '../../interfaces/InvoiceShowDTO';
import { InvoiceService } from '../../services/invoice.service';
import { UserService } from '../../services/user.service';
import { AdminService } from '../../services/admin.service'; // Импортируем AdminService
import { CommonModule } from '@angular/common';

@Component({
  selector: 'invoice-component',
  templateUrl: './invoice-component.html',
  styleUrls: ['./invoice-component.css'],
  standalone: true,
  imports: [
    CommonModule,
  ]
})
export class InvoiceComponent {
  @Input() invoice: InvoiceShowDTO | undefined;
  @Output() delete = new EventEmitter<number>();

  isAdmin: boolean = false;

  constructor(private invoiceService: InvoiceService, private adminService: AdminService, private userService: UserService) {
    this.checkUserRole(); // Проверяем роль пользователя
  }

  checkUserRole() {
    const role = localStorage.getItem('role');
    this.isAdmin = role === 'ADMINISTRATOR';
  }

  onDelete() {
    if (this.invoice) {
      this.delete.emit(this.invoice.invoiceId);
    }
  }

  onConfirmInvoice() {
    if (this.invoice) {
      console.log('Подтверждение накладной с ID:', this.invoice.applicationId); // Лог для отладки
      this.adminService.confirmedInvoice(this.invoice.applicationId).subscribe({
        next: () => {
          alert('Накладная подтверждена!');
        },
        error: () => {
          alert('Ошибка подтверждения накладной!');
        }
      });
    } else {
      console.error('Ошибка: invoice не определен.'); // Лог для отладки
    }
  }

  onChangeCost() {
    if (this.invoice) {
      console.log('Изменение стоимости накладной с ID:', this.invoice.applicationId); // Лог для отладки
      this.adminService.changeCostInvoice(this.invoice.applicationId).subscribe({
        next: () => {
          alert('Стоимость накладной изменена!');
        },
        error: () => {
          alert('Ошибка при изменении стоимости накладной!');
        }
      });
    } else {
      console.error('Ошибка: invoice не определен.'); // Лог для отладки
    }
  }
  onCreateOrder() {
    if (this.invoice) {
      console.log('Оформление заказа для накладной с ID:', this.invoice.invoiceId); // Лог для отладки
      this.userService.createOrder(this.invoice.invoiceId).subscribe({
        next: () => {
          alert('Заказ оформлен!');
        },
        error: () => {
          alert('Ошибка оформления заказа!');
        }
      });
    } else {
      console.error('Ошибка: invoice не определен.'); // Лог для отладки
    }
  }
}
