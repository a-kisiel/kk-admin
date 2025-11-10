import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router'
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  auth = inject(AuthService);
  router = new Router();
  usernameControl = new FormControl('');
  passwordControl = new FormControl('');

  submit() {
    if (!this.usernameControl.value || !this.passwordControl.value)
      return;
    this.auth.login(this.usernameControl.value, this.passwordControl.value);
  }
}
