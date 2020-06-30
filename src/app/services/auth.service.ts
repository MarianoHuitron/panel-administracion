import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as jwt from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  login(token) {
    if(localStorage.getItem('token')) {
      localStorage.removeItem('token');
    }
    localStorage.setItem('token', token);
  }

  logOut() {
    if(localStorage.getItem('token')) {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }
  }

  isLogged() {
    return (localStorage.getItem('token'))? true : false; 
  }

  getToken() {
    return localStorage.getItem('token')
  }

  decodeToken(token) {
    return jwt(token)
  }
}
