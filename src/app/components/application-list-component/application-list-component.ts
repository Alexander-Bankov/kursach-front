import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../../services/application.service';
import { ShowApplicationDTO } from '../../interfaces/application.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list-component.html',
  styleUrls: ['./application-list-component.css'],
  standalone: false,
})
export class ApplicationListComponent implements OnInit {
  applications: ShowApplicationDTO[] = [];

  constructor(private applicationService: ApplicationService,
              private router: Router) {}

  ngOnInit() {
    this.loadApplications();
  }

  loadApplications() {
    this.applicationService.getAllApplications().subscribe(data => {
      this.applications = data;
    });
  }

  deleteApplication(id: number | undefined) {
    if (id !== undefined) {
      this.applicationService.deleteApplication(id).subscribe(() => {
        this.loadApplications();
      });
    } else {
      console.error('ID is undefined. Cannot delete application.');
    }
  }

  openApplicationEdit(id: number | null) {
    if (id !== null) {
      this.router.navigate(['/applications/edit', id]); // Переходите на страницу редактирования
    }
  }
}
