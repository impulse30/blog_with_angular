import { Injectable } from '@angular/core';
import { User, UserLogin } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: User[] = [];


  async storeUser(
    email: string,
    name: string,
    password: string
  ): Promise<User> {
    const user = {
      email: email,
      name: name,
      password: password,
    };
    let rep = await fetch('http://localhost:8000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    }).then((response) => response.json());

    console.log(rep);

    return rep;
  }

  async loginUser(email: string, password: string): Promise<UserLogin> {
    const user = {
      email: email,
      password: password,
    };

    let rep = await fetch('http://localhost:8000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },

      body: JSON.stringify(user),
    }).then((response) => response.json());
    console.log(rep);

    return rep;
  }

  async deconnexion() {
    let rep = await fetch('http://localhost:3333/deconnexion', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
    }).then((response) => response.json());
    console.log('rep', rep);
    return rep;
  }
}
