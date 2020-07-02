import { Component, OnInit } from '@angular/core';
import { Producto } from '../interfaces/producto.interface';
import { Router, ActivatedRoute } from '@angular/router';
import {map} from 'rxjs/operators';
import { ProductoService } from '../../services/producto.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as toast from 'toastr'; 
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  producto: Producto = {_id: '',name: '', price: 0, img_path: '', status: true, created_at: ''}
  idProd;
  form: FormGroup;
  uploadFiles: Array<File>;
  file: boolean = false;
  progress = false;
  progressValue = 0;
  carga: string = '0%';

  constructor(private router: Router, private Route:  ActivatedRoute, public prodService: ProductoService) { 

    this.form = new FormGroup ({
      name: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      status: new FormControl(null, Validators.required),
      image: new FormControl(null)
    });

    // this.form = new FormGroup({
    //   name: new FormControl(),
    //   price: new FormControl(),
    //   status: new FormControl(),
    //   image: new FormControl(),

    // })

  }

  ngOnInit() {
    toast.options.closeButton = true;
    toast.options.positionClass = 'toast-bottom-right';

    const param:any = this.Route.params.pipe(map(p => p.id));
    this.idProd = param.destination._value.id;
    this.getProduct();


  }


  getProduct() {
    this.prodService.getOneProduct(this.idProd)
      .subscribe((res:Producto) => {
        this.producto = res;
        console.log(this.producto)
        console.log(this.form)
      }, err => {
        console.log(err)
      })
  }

  update() {
    this.progress = true;
    let formData = new FormData();
    
    if(this.file) {
      for(let i = 0; i < this.uploadFiles.length; i++) {
        formData.append("image[]", this.uploadFiles[i], this.uploadFiles[i].name);
      }
    } else {
      formData.append("image[]", null);
    }
    

    formData.append("name", this.form.value.name);
    formData.append("price", this.form.value.price);
    formData.append("status", this.form.value.status);
    const algo = {
      name: 'jose'
    }

    this.prodService.updateProduct(formData, this.idProd)
      .subscribe(event => {
        if(event.type == HttpEventType.UploadProgress) {
          this.progressValue = Math.round(event.loaded / event.total * 100);
          this.carga = this.progressValue.toString() + '%';
        } else if(event.type == HttpEventType.Response) {
          this.progress = false;
          this.progressValue = 0;
          this.carga = '0%';
          this.form.reset();
          toast.success('Producto actializado');
          this.router.navigate(['/productos']);
        }
      }, err => {
        console.log(err);
        toast.error('No se pudo actualizar');
        this.carga = '0%';
        this.progressValue = 0;
        this.progress = false;
      })
  }
  

  fileChange(element) {
    this.file = true;
    this.uploadFiles = element.target.files;
    console.log(this.uploadFiles[0])
  }
}