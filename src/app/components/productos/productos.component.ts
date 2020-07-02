import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../interfaces/producto.interface';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  constructor(public prodService: ProductoService) { }

  productos: Array<Producto> = [];

  ngOnInit() {
    this.getData()
  }


  getData() {
    this.prodService.getProducts()
      .subscribe((res: Producto[]) => {
        this.productos = res;
        console.log(this.productos)
      }, err => {
        console.error(err)
      })
  }

}
