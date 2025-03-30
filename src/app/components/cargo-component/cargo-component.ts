import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ShowApplicationDTO } from '../../interfaces/application.model';
import { Router } from '@angular/router';

@Component({
  selector: 'cargo-component',
  templateUrl: './cargo-component.html',
  styleUrls: ['./cargo-component.css'],
  standalone: false,
})
export class CargoComponent {
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
