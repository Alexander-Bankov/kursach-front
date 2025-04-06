import { Component, Input, Output, EventEmitter } from '@angular/core';
import { OrderShowDTO } from '../../interfaces/OrderShowDTO';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'order-component',
  templateUrl: './order-component.html',
  styleUrls: ['./order-component.css'],
  standalone: true,
  imports: [
    CommonModule,
  ]
})
export class OrderComponent {
  @Input() order: OrderShowDTO | undefined;
  @Output() delete = new EventEmitter<number>();

  onDelete() {
    if (this.order) {
      this.delete.emit(this.order.id);
    }
  }
}
