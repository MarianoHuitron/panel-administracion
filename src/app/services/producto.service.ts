import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent, HttpEventType } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {


  

  constructor(private http: HttpClient, public authService: AuthService) { }

  apiUrl = 'http://localhost:3000/product';
  // apiUrl = 'https://server-app-pedidos.herokuapp.com/product';


  createProduct(data) {


    return this.http.post(`${this.apiUrl}/create-product`, data, {headers: new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    }), reportProgress: true, observe: 'events'});
     
  }

  getProducts() {

    return this.http.get(`${this.apiUrl}`, {headers: new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    })})

  }

  getOneProduct(idProd) {
    return this.http.get(`${this.apiUrl}/${idProd}`, {headers: new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    })});
  }

  updateProduct(product, idProd) {
    return this.http.put(`${this.apiUrl}/update/${idProd}`, product, {headers: new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    }), reportProgress: true, observe: 'events'});
  }


}
