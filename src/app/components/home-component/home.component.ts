// src/app/components/home/home.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: false,
})
export class HomeComponent {
  constructor() {}

  createRequest() {
    // Логика для создания заявки
    console.log('Создание заявки...');
  }

  viewRequests() {
    // Логика для просмотра заявок
    console.log('Просмотр заявок...');
  }

  viewInvoices() {
    // Логика для просмотра накладных
    console.log('Просмотр накладных...');
  }

  viewOrders() {
    // Логика для просмотра заказов
    console.log('Просмотр заказов...');
  }

  viewProfile() {
    // Логика для просмотра личного кабинета
    console.log('Просмотр личного кабинета...');
  }
}
