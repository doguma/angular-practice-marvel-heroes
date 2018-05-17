import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './core/authentication.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

    user;

  constructor(private router: Router, public auth: AuthenticationService) { 
    this.user = auth.authInfo;
  }

  login() {
    this.auth.login();
  }

  logout(){
    this.auth.logout();
  }

}
