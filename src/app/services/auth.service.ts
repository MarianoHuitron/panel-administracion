import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(token) {
    if(localStorage.getItem('token')) {
      localStorage.removeItem('token');
    }
    localStorage.setItem('token', token);
  }

  logOut() {
    
  }

  isLogged() {
    return (localStorage.getItem('token'))? true : false; 
  }

  getToken() {
    return localStorage.getItem('token')
  }
}
