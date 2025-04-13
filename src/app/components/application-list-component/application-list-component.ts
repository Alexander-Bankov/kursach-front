import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../../services/application.service';
import { AdminService } from '../../services/admin.service';
import { ShowApplicationDTO, ApplicationStatus } from '../../interfaces/application.model';
import { Router, RouterLink } from '@angular/router';
import { ApplicationComponent } from '../application-component/application-component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list-component.html',
  styleUrls: ['./application-list-component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ApplicationComponent,
    RouterLink,
    FormsModule
  ]
})
export class ApplicationListComponent implements OnInit {
  applications: ShowApplicationDTO[] = [];
  isAdmin: boolean = false;
  applicationStatus = ApplicationStatus;
  errorMessage: string = ''; // Поле для хранения сообщения об ошибке

  constructor(private applicationService: ApplicationService,
              private adminService: AdminService,
              private router: Router) {}

  ngOnInit() {
    this.checkUserRole();
    this.loadApplications();
  }

  checkUserRole() {
    const role = localStorage.getItem('role');
    this.isAdmin = role === 'ADMINISTRATOR';
  }

  loadApplications() {
    this.applicationService.getAllApplicationsByUserId().subscribe(data => {
      this.applications = data;
      this.errorMessage = ''; // Сбрасываем сообщение об ошибке при загрузке заявок
    }, error => {
      this.errorMessage = 'Ошибка при загрузке заявок.';
      console.error('Error loading applications:', error);
    });
  }

  deleteApplication(id: number | undefined) {
    if (id !== undefined) {
      this.applicationService.deleteApplication(id).subscribe(() => {
        this.loadApplications();
      }, error => {
        console.error('Error deleting application:', error);
      });
    } else {
      console.error('ID is undefined. Cannot delete application.');
    }
  }

  rejectApplication(id: number | undefined) {
    if (id !== undefined) {
      this.adminService.changeApplicationStatus(id, "REJECTED").subscribe(() => {
        this.loadApplications();
      }, error => {
        console.error('Error rejecting application:', error);
      });
    }
  }


  createInvoice(applicationId: number) {
    this.adminService.createInvoice(applicationId).subscribe(() => {
      console.log(`Invoice created for application ID: ${applicationId}`);
      this.errorMessage = ''; // Сбрасываем сообщение об ошибке при успехе
    }, error => {
      if (error.status === 400) {
        this.errorMessage = error.error; // Теперь это сообщение об ошибке сервера
        alert(error.error);
      } else {
        console.error('Error creating invoice:', error);
        this.errorMessage = 'Произошла ошибка при создании накладной. Попробуйте еще раз.';
      }
    });
  }
}
