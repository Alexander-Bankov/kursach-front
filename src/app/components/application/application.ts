// src/app/components/application-list/application-list.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationService } from '../../services/application.service';
import { ShowApplicationDTO } from '../../interfaces/ShowApplicationDTO';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-application-list',
  templateUrl: './application.html',
  //imports: [CommonModule],
  standalone: false,
})
export class ApplicationListComponent implements OnInit {
  applications: ShowApplicationDTO[] = [];

  constructor(private applicationService: ApplicationService) {}

  ngOnInit() {
    this.applicationService.getAllApplications().subscribe(data => {
      this.applications = data;
    });
  }
}
