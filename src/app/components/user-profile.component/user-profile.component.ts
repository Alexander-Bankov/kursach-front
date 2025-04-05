import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserShowDTO } from '../../interfaces/UserShowDTO';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  styleUrls: ['./user-profile.component.css'],
  templateUrl: './user-profile.component.html',
  standalone: true,
})
export class UserProfileComponent implements OnInit {
  user: UserShowDTO | null = null;

  constructor(private userService: UserService, private router: Router) { } // Добавьте Router в конструктор

  ngOnInit() {
    this.userService.getCurrentUserInfo().subscribe((data) => {
      this.user = data;
    });
  }

  onLogout() {
    this.userService.logout().subscribe(
      () => {
        // Удаляем токен из localStorage
        localStorage.removeItem('accessToken'); // Удаление токена
        localStorage.removeItem('role');
        this.router.navigate(['/login']); // Перенаправление на страницу логина
      },
      (error) => {
        console.error('Ошибка при выходе:', error);
      }
    );
  }
  translateRole(role?: string): string {
    if (!role) {
      return 'Неизвестная роль'; // Возвращаем значение по умолчанию
    }

    switch (role) {
      case 'USER':
        return 'Пользователь';
      case 'ADMINISTRATOR':
        return 'Администратор';
      default:
        return 'Неизвестная роль';
    }
  }
  // goToEdit() {
  //   this.router.navigate(['/user-edit']); // Предположительно, пользователь будет редактировать свой профиль по этому маршруту
  // }

  goToApplications() {
    this.router.navigate(['/applications']); // Переход на страницу заявок
  }

  goToCargos() {
    this.router.navigate(['/cargos']); // Переход на страницу грузов
  }

  goToEdit() {
    this.router.navigate(['/user-edit']);
  }
}
