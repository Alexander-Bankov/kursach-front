import { Component, Input, Output, EventEmitter } from '@angular/core';
import { OrderShowDTO } from '../../interfaces/OrderShowDTO';
import { AdminService } from '../../services/admin.service'; // Импортируйте ваш сервис
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'order-component',
  templateUrl: './order-component.html',
  styleUrls: ['./order-component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ]
})
export class OrderComponent {
  @Input() order: OrderShowDTO | undefined;
  @Output() delete = new EventEmitter<number>();
  isAdmin: boolean = false;
  selectedStatus: string = ''; // Строка по умолчанию

  constructor(private adminService: AdminService) {
    this.checkUserRole();
  }

  checkUserRole() {
    const role = localStorage.getItem('role');
    this.isAdmin = role === 'ADMINISTRATOR';
  }

  onChangeStatus() {
    // Проверяем, что order определен
    if (this.order) {
      const order = this.order; // Сохраняем ссылку на order в локальную переменную

      // Проверяем, что выбран статус
      if (this.selectedStatus) {
        this.adminService.changeOrderStatus(order.id, this.selectedStatus)
          .subscribe({
            next: () => {
              alert('Статус успешно изменён');
              // Обновите статус заказа в компоненте
              order.status = this.selectedStatus; // Теперь TypeScript не должен выдавать ошибку
            },
            error: (err) => {
              console.error('Ошибка при изменении статуса', err);
              alert('Ошибка при изменении статуса');
            }
          });
      } else {
        alert('Пожалуйста, выберите статус');
      }
    } else {
      alert('Заказ не найден');
    }
  }

  onDelete() {
    if (this.order) {
      this.delete.emit(this.order.id);
    }
  }
}
