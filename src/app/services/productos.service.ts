import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private API_URL = 'https://artesanias-hbs.herokuapp.com/';

  constructor(
    private http: HttpClient
  ) { }


  // Método que devuelve todos los productos de un usuario
  getProductosUsuario(idUsuario: String){
    // Creamos la URL para obtener los productos del Usuario
    const url = `${this.API_URL}api/getProductosUsuario/${idUsuario}`;
    // Retornamos la peticion
    return this.http.get(url);
  }

  // Método que devuelve todos los Productos
  getProductos(){
    // Creamos la URL para obtener los productos
    const url = `${this.API_URL}api/getProductos/`
    // Ejecutamos la petición
    return this.http.get(url);
  }

  // Método que devuelve un Producto
  getProducto(idProducto: String){
    // Creamos la URL para obtener el Producto
    const url = `${this.API_URL}productos/ver/${idProducto}`;
    // Retornamos la petición
    return this.http.get(url);
  }


  // Método para crear un Producto
  crearProducto(datosProductos: FormData){
    // Creamos la URL para crear un producto
    const url = `${this.API_URL}productos/new`;
    // Retornamos la peticion
    return this.http.post(url, datosProductos);
  }

  // Método para editar un producto
  editarProducto(idProducto: String, datosProductos: FormData){
    // Creamos la URL para editar el Producto
    const url = `${this.API_URL}productos/edit/${idProducto}`;
    // Retornamos la peticion
    return this.http.put(url, datosProductos);
  }

  // Método para eliminar un producto
  borrarProducto(idProducto: String){
    // Creamos la ruta para elimar el Producto
    const url = `${this.API_URL}productos/delete/${idProducto}`;
    // Retornamos la peticion
    return this.http.delete(url);
  }
}
