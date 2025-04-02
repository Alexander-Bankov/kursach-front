import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthorizationService } from '../../services/authorization-service';
import { Authorization } from '../../interfaces/Authorization';
import { Router } from '@angular/router'; // Добавьте Router
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './authorization.html',
  styleUrls: ['./authorization.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class AuthorizationComponent implements OnInit {
  authForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthorizationService, private router: Router) {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.authForm.valid) {
      const authData: Authorization = this.authForm.value;
      this.authService.login(authData).subscribe(
        response => {
          console.log('Авторизация прошла успешно', response);
          this.router.navigate(['/profile']); // Перенаправление на страницу профиля при успешной авторизации
        },
        error => {
          console.error('Ошибка авторизации', error);
        }
      );
    }
  }
}
