import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../services/user.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isConnected: boolean = false;
  nom!: string;

  route: Router = inject(Router);
  service: UserService = inject(UserService);

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.isConnected = true;
      this.nom = localStorage.getItem('nom') ?? '';
      console.log(this.nom);
    }
  }
  deconnexion() {
    localStorage.clear();
    this.isConnected = true;
    this.route.navigate(['/']).then(() => {
      window.location.reload();
    });
  }
}
