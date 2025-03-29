import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptor } from './services/AuthIntercepter'; // Укажите правильный путь к вашему интерцептору
import { AppComponent } from './app.component';
import { RegistrationComponent } from './components/registration-component/registration';
import { HomeComponent } from './components/home-component/home.component';
import { AdminComponent } from './components/admin/admin.component';
import { AuthorizationComponent } from './components/authorization-component/authorization';
import { ApplicationListComponent } from './components/application-list-component/application-list-component';
import { ApplicationComponent } from './components/application-component/application-component';
import { ApplicationEditComponent } from './components/edit-application-component/edit-application-component';



@NgModule({
  declarations: [ // Объявите ваши компоненты здесь
    //AppComponent,
    RegistrationComponent,
    HomeComponent,
    AdminComponent,
    AuthorizationComponent, // Добавьте его в объявления
    ApplicationListComponent,
    ApplicationComponent,
    ApplicationEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
