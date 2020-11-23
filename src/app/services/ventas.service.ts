import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VentaModel } from '../models/venta.model';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  private API_URL = "https://artesanias-hbs.herokuapp.com/"

  constructor(
    private http: HttpClient
  ) { }

  enviarVenta(datosVenta: VentaModel){
    const url = `${this.API_URL}ventas/new`;

    return this.http.post(url, datosVenta);
  }
}
