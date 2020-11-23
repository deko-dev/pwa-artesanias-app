import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  private API_URL = "https://artesanias-hbs.herokuapp.com/auth/register"

  constructor(
    private http: HttpClient
  ) { }

  // Método que hace el regsitro
  registro(datosRegistro = {}){
    return this.http.post(this.API_URL, datosRegistro);
    
  }
}
