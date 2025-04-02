import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationService } from '../../services/application.service';
import { ApplicationDTO } from '../../interfaces/application.model';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-application-edit',
  templateUrl: './edit-application-component.html',
  styleUrls: ['./edit-application-component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class ApplicationEditComponent implements OnInit {
  applicationForm: FormGroup;
  applicationId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private applicationService: ApplicationService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.applicationForm = this.fb.group({
      desiredDepartureDate: [''],
      desiredDateOfReceipt: [''],
      desiredPointOfDeparture: [''],
      desiredPointOfReceipt: [''],
      description: ['']
    });
  }

  ngOnInit() {
    this.applicationId = this.route.snapshot.params['id'];
    if (this.applicationId) {
      this.loadApplication(this.applicationId);
    }
  }

  loadApplication(id: number) {
    this.applicationService.getApplicationById(id).subscribe(application => {
      this.applicationForm.patchValue(application);
    });
  }

  save() {
    const applicationDTO: ApplicationDTO = this.applicationForm.value;

    if (this.applicationId) {
      this.applicationService.updateApplication(this.applicationId, applicationDTO).subscribe(() => {
        this.router.navigate(['/applications']);
      });
    } else {
      this.applicationService.createApplication(applicationDTO).subscribe(() => {
        this.router.navigate(['/applications']);
      });
    }
  }
  goBack() {
    this.router.navigate(['/applications']); // Переход на страницу со списком заявок
  }
}
