import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  emailText = '';
  passwordText = '';
  loading = false;
  noAccess = '';

  constructor(public userService: UserService, public authService: AuthService, private router: Router) { 
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)])
    });

  }

  ngOnInit() {
  }


  login() {
    this.noAccess = '';
    this.passwordText = '';
    this.emailText = '';
    this.loading = true;

    this.userService.login(this.form.value)
      .subscribe((res:any) => {

        const payload = this.authService.decodeToken(res.token);

        if(payload.payload.rol == 'admin') {

          this.form.reset();
          this.authService.login(res.token);
          this.loading = false;
          this.router.navigate(['/home']);

        } else {

          this.noAccess = 'No tiene autorización para entrar, contacte un administrador';
          this.loading = false;

        }
       
        

        

      }, err => {     
        this.loading = false;
        if(err.error.errors.email) {
          this.passwordText = '';
          this.emailText = err.error.errors.email.properties.message;
        } else if(err.error.errors.password) {
          this.emailText = '';
          this.passwordText = err.error.errors.password.properties.message;
        } else {
          this.emailText = '';
          this.passwordText = '';
        }
        
      });

  }

}
