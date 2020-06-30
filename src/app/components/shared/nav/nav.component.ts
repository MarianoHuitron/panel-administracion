import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  toggle() {

    document.getElementById('side').classList.toggle('hide');
    document.getElementById('enlaces-side').classList.toggle('hide-links');
    document.getElementById('content').classList.toggle('w-100');

  }

  logOut() {
    if(confirm('¿Salir de la aplicación?')) {
      this.authService.logOut();
    }
  }
}
