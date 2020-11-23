import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private API_URL = "https://artesanias-hbs.herokuapp.com/auth/login";

  constructor(
    private http: HttpClient
  ) { }


  login(datoslogin = {}){
    return this.http.post(this.API_URL, datoslogin);
  }

  logout(){

  }
}
