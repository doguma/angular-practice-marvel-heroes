import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hero } from '../hero';


import { AuthenticationService } from '../core/authentication.service';

@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.css']
})
export class MypageComponent implements OnInit {

  user;
  userinfo;

  constructor(public auth: AuthenticationService){   
    this.user = auth.authInfo;
  }


  ngOnInit() {
  }

  onSubmit() {
    this.user = this.auth.authInfo;

    this.auth.updateUserData(this.user);
  }


}
