import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private API_URL = "https://artesanias-hbs.herokuapp.com/api/";

  constructor(
    private http: HttpClient
  ) { }

  // Método que devuelve un usuario
  getUser(idUsuario: String) {
    // Creamos la URL concatenando el id del Usuario
    const url = `${this.API_URL}getUsuario/${idUsuario}`;
  //Retornamos los resultados de la peticion http 
    return this.http.get(url)
  }

  // Método para editar un usuario
  editarUsuario(idUsuario: String, dataUsuario){
    // Creamos la URL concatenando el id del Usuario
    const url = `http://localhost:3000/api/editUsuario/${idUsuario}`;
    // Rentornamos los resultado de la petición http
    return this.http.put(url, dataUsuario);
  }

}
