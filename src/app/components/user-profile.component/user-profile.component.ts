import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AdminService } from '../../services/admin.service';
import { UserShowDTO } from '../../interfaces/UserShowDTO';
import { Router } from '@angular/router';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-user-profile',
  styleUrls: ['./user-profile.component.css'],
  templateUrl: './user-profile.component.html',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ]
})
export class UserProfileComponent implements OnInit {
  user: UserShowDTO | null = null; // Текущий пользователь
  users: UserShowDTO[] = []; // Список всех пользователей
  searchEmail: string = ''; // Поле для поиска
  isAdmin: boolean = false; // Флаг для проверки роли администратора
  showAdminSection: boolean = false; // Флаг для отображения секции администратора

  constructor(
    private userService: UserService,
    private adminService: AdminService,
    private router: Router
  ) {}

  ngOnInit() {
    this.checkUserRole(); // Проверяем роль пользователя
    this.userService.getCurrentUserInfo().subscribe((data) => {
      this.user = data;
    });
  }

  // Проверка роли пользователя
  checkUserRole() {
    const role = localStorage.getItem('role');
    this.isAdmin = role === 'ADMINISTRATOR';
  }

  // Выход из системы
  onLogout() {
    this.userService.logout().subscribe(
      () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('role');
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Ошибка при выходе:', error);
      }
    );
  }

  // Перевод роли в читаемый формат
  translateRole(role?: string): string {
    if (!role) {
      return 'Неизвестная роль';
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

  // Навигация
  goToApplications() {
    this.router.navigate(['/applications']);
  }

  goToCargos() {
    this.router.navigate(['/orders']);
  }

  goToEdit() {
    this.router.navigate(['/user-edit']);
  }

  goToInvoices() {
    this.router.navigate(['/invoices']);
  }

  // Загрузка всех пользователей
  loadAllUsers() {
    this.adminService.getAllUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Ошибка при загрузке пользователей:', error);
      }
    );
  }

  // Поиск пользователя по email
  searchUserByEmail() {
    if (!this.searchEmail.trim()) {
      return;
    }

    this.adminService.getUserByEmail(this.searchEmail).subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Ошибка при поиске пользователя:', error);
      }
    );
  }

  // Изменение роли пользователя на администратора
  changeRoleToAdmin(email: string) {
    this.adminService.changeUserRoleToAdmin(email).subscribe(
      () => {
        alert(`Роль пользователя с email ${email} успешно изменена на администратора.`);
        this.loadAllUsers(); // Обновляем список пользователей
      },
      (error) => {
        console.error('Ошибка при изменении роли:', error);
      }
    );
  }

  // Переключение видимости секции администратора
  toggleAdminSection() {
    this.showAdminSection = !this.showAdminSection;
  }
}
