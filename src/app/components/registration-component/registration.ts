import { Component } from '@angular/core';
import { RegistrationService } from '../../services/registration-service';
import { Router } from '@angular/router';
import { Registration } from "../../interfaces/Registration";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.html',
  styleUrls: ['./registration.css'],
  standalone: false,
})
export class RegistrationComponent {
  message: string = '';

  constructor(private registrationService: RegistrationService, private router: Router) { }

  handleRegister(fullName: string, email: string, password: string, phoneNumber: string) {
    const registrationData: Registration = { fullName, email, password, phoneNumber };

    this.registrationService.register(registrationData).subscribe({
      next: (response) => {
        console.log(response);
        this.message = "Пользователь успешно зарегистрирован!";
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        console.log(err); // Сообщение об ошибке
        this.message = "Такой пользователь уже есть.";
      }
    });
  }

  handleGoBack() {
    this.router.navigate(['/']); // Укажите правильный маршрут для возврата
  }
}
