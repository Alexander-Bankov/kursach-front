import { Routes } from '@angular/router';
import { RegistrationComponent } from './components/registration-component/registration';
import { AuthorizationComponent } from './components/authorization-component/authorization';
import { HomeComponent } from './components/home-component/home.component';
import { AdminComponent } from './components/admin/admin.component';
import { ApplicationListComponent } from './components/application-list-component/application-list-component';
import { ApplicationEditComponent } from './components/edit-application-component/edit-application-component';
import { CargoListComponent } from './components/cargo-list-component/cargo-list-component';
import { EditCargoComponent } from './components/edit-cargo-component/edit-cargo-component';
import { UserProfileComponent } from './components/user-profile.component/user-profile.component';
import {UserEditComponent} from './components/user-edit-component/user-edit.component';
import {InvoiceListComponent} from './components/invoice-list-component/invoice-list-component';
import {OrderListComponent} from './components/order-list-component/order-list-component'; // Добавьте импорт

export const routes: Routes = [
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component: AuthorizationComponent },
  { path: 'home', component: HomeComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'applications', component: ApplicationListComponent },
  { path: 'applications/edit/:id', component: ApplicationEditComponent },
  { path: 'applications/new', component: ApplicationEditComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'applications/:id/cargos', component: CargoListComponent },
  { path: 'applications/:id/cargos/new', component: EditCargoComponent },
  { path: 'applications/:id/cargos/:cargoId/edit', component: EditCargoComponent },
  { path: 'profile', component: UserProfileComponent }, // Добавьте маршрут для профиля
  { path: 'user-edit', component: UserEditComponent },
  { path: 'invoices', component: InvoiceListComponent },
  { path: 'orders', component: OrderListComponent }
  // другие маршруты
];
