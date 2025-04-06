import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { OrderShowDTO } from '../../interfaces/OrderShowDTO';
import { CommonModule } from '@angular/common';
import {OrderComponent} from '../order-component/order-component';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list-component.html',
  styleUrls: ['./order-list-component.css'],
  standalone: true,
  imports: [CommonModule, OrderComponent]
})
export class OrderListComponent implements OnInit {
  orders: OrderShowDTO[] = []; // Массив заказов

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getAllOrders().subscribe({
      next: (data) => {
        this.orders = data; // Загружаем список заказов
      },
      error: () => {
        alert('Ошибка загрузки заказов!');
      }
    });
  }

  deleteOrder(orderId: number): void {
    if (confirm('Вы уверены, что хотите удалить этот заказ?')) {
      this.orderService.deleteOrder(orderId).subscribe({
        next: () => {
          this.orders = this.orders.filter((order) => order.id !== orderId); // Удаляем заказ из списка
          alert('Заказ успешно удален!');
        },
        error: () => {
          alert('Ошибка удаления заказа!');
        }
      });
    }
  }

  createOrder(): void {
    // Логика для добавления нового заказа (нужно будет реализовать)
  }
}
