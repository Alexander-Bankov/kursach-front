import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthorizationService } from '../../services/authorization-service';
import { Authorization } from '../../interfaces/Authorization'; // Импортируем интерфейс

@Component({
  selector: 'app-login',
  templateUrl: './authorization.html',
  styleUrls: ['./authorization.css'],
  standalone: false,
})
export class AuthorizationComponent implements OnInit {
  authForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthorizationService) {
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
        },
        error => {
          console.error('Ошибка авторизации', error);
        }
      );
    }
  }
}
