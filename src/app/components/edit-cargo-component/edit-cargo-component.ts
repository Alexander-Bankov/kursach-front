import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CargoService } from '../../services/cargo.service';
import { CargoDTO } from '../../interfaces/CargoDTO';
import { CargoShowDTO } from '../../interfaces/CargoShowDTO';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-cargo',
  templateUrl: './edit-cargo-component.html',
  styleUrls: ['./edit-cargo-component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class EditCargoComponent implements OnInit {
  cargoForm: FormGroup;
  cargoId: number | null = null;
 applicationId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private cargoService: CargoService
  ) {
    this.cargoForm = this.fb.group({
      weight: [0, Validators.required],
      length: [0, Validators.required],
      width: [0, Validators.required],
      height: [0, Validators.required],
      content: ['', Validators.required],
      applicationId: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    // Проверяем, есть ли переданное состояние
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      const state = navigation.extras.state as { applicationId: number };
      if (state.applicationId) {
        this.cargoForm.get('applicationId')?.setValue(state.applicationId); // Устанавливаем applicationId из состояния
      }
    }

    this.route.params.subscribe(params => {
      this.cargoId = params['cargoId'];
      if (this.cargoId) {
        this.loadCargo(this.cargoId);
      }
    });
  }

  loadCargo(id: number): void {
    this.cargoService.getCargoById(id).subscribe({
      next: (cargo: CargoShowDTO) => {
        this.cargoForm.setValue({
          weight: cargo.weight,
          length: cargo.length,
          width: cargo.width,
          height: cargo.height,
          content: cargo.content,
          applicationId: cargo.applicationId,
        });
      },
      error: () => {
        alert('Ошибка загрузки груза!');
      }
    });
  }

  save(): void {
    const cargo: CargoDTO = this.cargoForm.value;

    this.route.params.subscribe(params => {
      this.applicationId = params['id'];
    });

    console.log(this.applicationId,"test");
    const apid = this.applicationId
    if (this.applicationId != null) {
      cargo.applicationId = this.applicationId;
    }

    if (this.cargoId) {
      this.cargoService.updateCargo(this.cargoId, cargo).subscribe({
        next: () => {
          alert('Груз успешно обновлен!');
          this.router.navigate([`/applications/${apid}/cargos`], {
            state: { application: { id: apid } } // Передаем applicationId в состояние
          });
        },
        error: () => {
          alert('Ошибка обновления груза!');
        }
      });
    } else {
      this.cargoService.createCargo(cargo).subscribe({
        next: () => {
          alert('Груз успешно создан!');
          this.router.navigate([`/applications/${apid}/cargos`], {
            state: { application: { id: apid } } // Передаем applicationId в состояние
          });
        },
        error: () => {
          alert('Ошибка создания груза!');
        }
      });
    }
  }

  goBack(): void {
    this.route.params.subscribe(params => {
      this.applicationId = params['id'];
    });

    console.log(this.applicationId,"test");
    const apid = this.applicationId
    if (this.applicationId) {
      this.router.navigate([`/applications/${apid}/cargos`], {
        state: { application: { id: apid } } // Передаем applicationId в состояние
      });
    } else {
      alert('Идентификатор приложения не найден!');
    }
  }
}
