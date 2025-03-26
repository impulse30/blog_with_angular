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
  showToast: boolean = false;
  errorMessage: string = '';

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  login() {
    this.errorMessage = '';
    this.showToast = false;

    this.service
      .loginUser(
        this.loginForm.value.email ?? '',
        this.loginForm.value.password ?? ''
      )
      .then((response: UserLogin) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('nom', response.name);
          this.showToast = true; //  Affichage du toast vert

          setTimeout(() => {
            this.showToast = false;
            this.router.navigate(['/articles']).then(() => {
              window.location.reload();
            });
          }, 3000);
        } else {
          this.errorMessage = 'Email ou mot de passe incorrect.';
          setTimeout(() => (this.errorMessage = ''), 3000); // Masquer après 3s
        }
      })
      .catch(() => {
        this.errorMessage = 'Une erreur est survenue. Veuillez réessayer.';
        setTimeout(() => (this.errorMessage = ''), 3000);
      });
  }
}
