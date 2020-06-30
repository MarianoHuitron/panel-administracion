import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = 'https://server-app-pedidos.herokuapp.com/user';
  // apiUrl = 'http://localhost:3000/user';

  constructor(private http: HttpClient) { }

  login(data) {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

}
