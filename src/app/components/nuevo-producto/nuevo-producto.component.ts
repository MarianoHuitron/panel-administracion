import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductoService } from '../../services/producto.service';
import { HttpEventType } from '@angular/common/http';
import * as toast from 'toastr'; 

@Component({
  selector: 'app-nuevo-producto',
  templateUrl: './nuevo-producto.component.html',
  styleUrls: ['./nuevo-producto.component.css']
})
export class NuevoProductoComponent implements OnInit {

  form: FormGroup;
  uploadFiles: Array<File>;
  progress = false;
  progressValue = 0;
  carga: string = '0%';

  constructor(public prodService: ProductoService) {
    
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      price: new FormControl(null, [Validators.required, Validators.min(1)]),
      image: new FormControl(null, Validators.required),
      status: new FormControl(null, Validators.required)
    })
  }

  ngOnInit() {
    toast.options.closeButton = true;
    toast.options.positionClass = 'toast-bottom-right';
    
  }

  fileChange(element) {
    console.log('changea')
    this.uploadFiles = element.target.files;
    console.log(this.uploadFiles[0])
  }


  save() {
    
    this.progress = true;
    let formData = new FormData();

    for(let i = 0; i < this.uploadFiles.length; i++) {
      formData.append("image[]", this.uploadFiles[i], this.uploadFiles[i].name);
    }

    formData.append("name", this.form.value.name);
    formData.append("price", this.form.value.price);
    formData.append("status", this.form.value.status);

    this.prodService.createProduct(formData)
      .subscribe(event => {
        if(event.type == HttpEventType.UploadProgress) {
          this.progressValue = Math.round(event.loaded / event.total * 100);
          this.carga = this.progressValue.toString() + '%';
        } else if(event.type == HttpEventType.Response) {
          this.progress = false;
          this.progressValue = 0;
          this.carga = '0%';
          this.form.reset();
          toast.success('Producto guardado');
        }
      }, err => {
        console.log(err);
        toast.error('No se pudo guardar');
        this.carga = '0%';
        this.progressValue = 0;
        this.progress = false;
      })
  }
}
