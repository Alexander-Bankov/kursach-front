import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import { CargoService } from '../../services/cargo.service';
import { CargoShowDTO } from '../../interfaces/CargoShowDTO';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cargo-list',
  templateUrl: './cargo-list-component.html',
  styleUrls: ['./cargo-list-component.css'],
  standalone: true,
  imports: [CommonModule, RouterLink],
})
export class CargoListComponent implements OnInit {
  application: any; // Информация о заявке
  cargos: CargoShowDTO[] = []; // Массив грузов

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cargoService: CargoService
  ) {}

  ngOnInit(): void {
    // Проверяем, содержится ли состояние
    if (history.state.application) {
      this.application = history.state.application; // Получаем данные о заявке из состояния
      console.log("history state",history.state.application.id)
    } else {
      console.error('history.state.application is undefined');
    }
    //console.log(application.id);

    const applicationId = this.application.id;

    // Проверка на существование идентификатора заявки
    if (!applicationId) {
      alert('Не удалось получить идентификатор заявки!');
      this.router.navigate(['/applications']);
      return;
    }

    this.loadCargos(applicationId);
  }
  loadCargos(applicationId: number): void {
    this.cargoService.getAllByApplicationId(applicationId).subscribe({
      next: (data) => {
        this.cargos = data; // Загружаем список грузов
      },
      error: () => {
        alert('Ошибка загрузки грузов!');
      }
    });
  }

  createCargo(): void {
    this.router.navigate([`/applications/${this.application.id}/cargos/new`],{
      state: { applicationId: this.application.id } // Передаем applicationId в состояние
  });
  }

  editCargo(cargo: CargoShowDTO): void {
    this.router.navigate([`/applications/${this.application.id}/cargos/${cargo.cargoId}/edit`], {
      state: { applicationId: this.application.id } // Передаем applicationId в состояние
    });
  }

  deleteCargo(cargoId: number): void {
    if (confirm('Вы уверены, что хотите удалить этот груз?')) {
      this.cargoService.deleteCargo(cargoId).subscribe({
        next: () => {
          this.cargos = this.cargos.filter((cargo) => cargo.cargoId !== cargoId); // Удаляем груз из списка
          alert('Груз успешно удален!');
        },
        error: () => {
          alert('Ошибка удаления груза!');
        }
      });
    }
  }
}
