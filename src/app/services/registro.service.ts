import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  private API_URL = "http://localhost:3000/auth/register"

  constructor(
    private http: HttpClient
  ) { }

  // Método que hace el regsitro
  registro(datosRegistro = {}){
    return this.http.post(this.API_URL, datosRegistro);
    
  }
}
