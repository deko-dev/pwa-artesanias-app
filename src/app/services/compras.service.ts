import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  private API_URL = "https://artesanias-hbs.herokuapp.com/"

  constructor(
    private http : HttpClient
  ) { }


  guardarCompra(datosCompra){
    const url = `${this.API_URL}compras/new`

    return this.http.post(url, datosCompra);
  }
}
