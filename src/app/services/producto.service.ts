import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent, HttpEventType } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {


  

  constructor(private http: HttpClient, public authService: AuthService) { }

  // apiUrl = 'http://localhost:3000/product';
  apiUrl = 'https://server-app-pedidos.herokuapp.com/product';


  createProduct(data) {


    return this.http.post(`${this.apiUrl}/create-product`, data, {headers: new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    }), reportProgress: true, observe: 'events'});
     
  }



}
