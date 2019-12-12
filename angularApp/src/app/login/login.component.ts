import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginFail;
  submitted;
  loginUserData = {
    email: "",
    password: ""
  };

  constructor(private _auth: AuthService, private _router: Router) { }

  ngOnInit() {
  }

  loginUser(){
    this.loginFail = false;
    this._auth.loginUser(this.loginUserData)
      .subscribe(
        res => {
          localStorage.setItem('token',res.token);
          this._router.navigate(['/special']);
        }, 
        err => {
          this.loginFail = true;
        }      
      )
  }

}
