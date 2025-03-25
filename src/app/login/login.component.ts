import { Component, inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { UserLogin } from '../models/user';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [NgIf, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  service: UserService = inject(UserService);
  router: Router = inject(Router);
  isOpen: boolean = false;
  showToast: boolean = false; // ✅ Ajout du state pour le toast

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  login() {
    this.service
      .loginUser(
        this.loginForm.value.email ?? '',
        this.loginForm.value.password ?? ''
      )
      .then((response: UserLogin) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('nom', response.name);
          this.showToast = true; // ✅ Affichage du toast

          // ✅ Masquer le toast après 3 secondes
          setTimeout(() => {
            this.showToast = false;
            this.router.navigate(['articles']);
            location.reload();
          }, 3000);
        } else {
          this.isOpen = true;
        }
      });
  }

  close() {
    this.isOpen = false;
  }
}
