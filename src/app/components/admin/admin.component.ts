// src/app/components/admin/admin.component.ts
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { UserShowDTO } from '../../interfaces/UserShowDTO';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  imports: [CommonModule] ,
  standalone: true,
})
export class AdminComponent implements OnInit {
  adminData?: UserShowDTO;
  message: string = '';


  constructor(private adminService: AdminService) { }


  ngOnInit() {
    this.fetchAdminInfo();
  }


  fetchAdminInfo() {
    this.adminService.getPersonalAdminInfo().subscribe({
      next: (response) => {
        this.adminData = response;
        this.message = '';  // Очистить сообщение об ошибке, если данные загружены успешно
      },
      error: (error) => {
        console.error('Ошибка загрузки данных администратора:', error);
        this.message = "Ошибка загрузки данных. Попробуйте еще раз позже.";
      }
    });
  }
}
