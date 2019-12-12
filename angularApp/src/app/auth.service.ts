import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _registerUrl = "http://localhost:3000/api/register";
  private _checkUserUrl = "http://localhost:3000/api/usercheck";
  private _loginUrl = "http://localhost:3000/api/login";


  constructor(private http: HttpClient, private _router: Router) { }

  registerUser(user) {
    return this.http.post<any>(this._registerUrl, user);
  }

  checkUser(user) {
    return this.http.post<any>(this._checkUserUrl, user);
  }

  loginUser(user) {
    return this.http.post<any>(this._loginUrl, user);
  }

  //only return true of false to indicate whether the token exists.
  loggedIn() {
    return !!localStorage.getItem('token');
  }

  logoutUser() {
    localStorage.removeItem('token');
    this._router.navigate(['/events']);
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
