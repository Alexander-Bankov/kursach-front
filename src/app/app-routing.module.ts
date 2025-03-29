import { NgModule } from '@angular/core';
import { RouterModule, Routes, provideRouter, withComponentInputBinding } from '@angular/router';
import { RegistrationComponent } from './components/registration-component/registration';
import { AuthorizationComponent } from './components/authorization-component/authorization';
import { HomeComponent } from './components/home-component/home.component';
import { AdminComponent } from './components/admin/admin.component';
import { ApplicationListComponent } from './components/application-list-component/application-list-component';
import { ApplicationEditComponent } from './components/edit-application-component/edit-application-component';


export const routes: Routes = [
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component: AuthorizationComponent },
  { path: 'home', component: HomeComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'applications', component: ApplicationListComponent },
  { path: 'applications/edit/:id', component: ApplicationEditComponent }, // Редактирование существующей заявки
  { path: 'applications/new', component: ApplicationEditComponent }, // Создание новой заявки
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Перенаправление на страницу входа по умолчанию
  // другие маршруты
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    provideRouter(routes, withComponentInputBinding())
  ]
})
export class AppRoutingModule { }
