import { Component, OnInit } from '@angular/core';
import { UserService } from './../../services/user.service';
import { UserShowDTO } from './../../interfaces/UserShowDTO';
import { UserEditDTO } from './../../interfaces/UserEditDTO';
import {FormsModule} from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-edit',
  styleUrls: ['./user-edit.component.css'],
  templateUrl: './user-edit.component.html',
  imports: [
    FormsModule
  ],
  standalone: true
})
export class UserEditComponent implements OnInit {
  user: UserShowDTO | null = null;
  userEditDTO: UserEditDTO = { fullName: '', email: '', phoneNumber: '' };

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.userService.getCurrentUserInfo().subscribe((data) => {
      this.user = data;
      this.userEditDTO = {
        fullName: data.fullName,
        email: data.email,
        phoneNumber: data.phoneNumber,
      };
    });
  }

  updateUser() {
    this.userService.updateUserInfo(this.userEditDTO).subscribe((data) => {
      this.user = data;

      // Перенаправляем обратно на страницу профиля после успешного обновления
      this.router.navigate(['/profile']);
    });
  }
}
