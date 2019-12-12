import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  confirmedPassword = "";
  emailExist = false;
  submitted=false;
  registerUserData = {
    email: "",
    password: ""
  };

  constructor(private _auth: AuthService, private _router: Router) { }

  ngOnInit() {
  }

  registerUser(){
    let regexpEmail = new RegExp('(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$)');
    let regexpPw = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{6,}$');
    this._auth.checkUser(this.registerUserData)
      .subscribe(
        res => {
          if (res.exist == true) {
            this.emailExist = true;
          } else {
            this.emailExist = false;
            if (regexpEmail.test(this.registerUserData.email) && regexpPw.test(this.registerUserData.password) 
            && this.confirmedPassword == this.registerUserData.password ) {
              this.finalizeRegistration();
            }
          }
        }, 
        err => console.log(err)
      )
  }

  finalizeRegistration() {
    this._auth.registerUser(this.registerUserData)
    .subscribe(
      res => {
        console.log(res);
        localStorage.setItem('token', res.token);
        this._router.navigate(['/special']);
      }, 
      err => console.log(err)
    )
  }
}
