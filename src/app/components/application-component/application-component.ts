import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ShowApplicationDTO } from '../../interfaces/application.model';
import { Router } from '@angular/router';
import {CommonModule, DatePipe} from '@angular/common';

@Component({
  selector: 'app-application-component',
  templateUrl: './application-component.html',
  styleUrls: ['./application-component.css'],
  standalone: true,
  imports: [
    CommonModule,
    DatePipe
  ]
})
export class ApplicationComponent {
  @Input() application: ShowApplicationDTO | undefined;
  @Output() delete = new EventEmitter<number>();

  constructor(private router: Router) {}

  onDelete() {
    if (this.application) {
      this.delete.emit(this.application.id);
    }
  }
  openApplicationEdit(id: number | undefined) {
    if (id !== undefined) {
      this.router.navigate(['/applications/edit', id]); // Переходим на страницу редактирования
    }
  }
}
