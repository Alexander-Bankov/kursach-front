// invoice.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { InvoiceShowDTO } from '../../interfaces/InvoiceShowDTO';
import { InvoiceService } from '../../services/invoice.service';
import {CommonModule, DatePipe} from '@angular/common';

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

  constructor(private invoiceService: InvoiceService) {}

  onDelete() {
    if (this.invoice) {
      this.delete.emit(this.invoice.invoiceId);
    }
  }
}
