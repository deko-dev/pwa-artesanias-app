import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { UsuariosService } from '../../../../services/usuarios.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  // Variable que activa/desactiva el Edit
  editando: Boolean = false;
  // Variable que activa/desactiva el loading
  cargando: Boolean = false;
  // Variable que guarda el Usuario
  usuarioActivo: UsuarioModel;
  // Variable que guardara la data
  data: Observable<Object>;

  // Varibale que activa/desactiva la alert
  activarAlert: Boolean = false;
  // Variable que actualiza el texto del alert
  textAlert: String;

  constructor(
    private _usuariosService: UsuariosService
  ) { 
    this.cargarPerfil();
  }

  ngOnInit(): void {
  }

  // Método que carga un usuario
  async cargarPerfil(){
    // Activamos el laoding
    this.cargando = true;
    // Variable que guarda el token del usuario
    let token: String;
    // Recuperamos el token/userId  
    if(localStorage.getItem('token')){
      // Si existe un token lo guardamos
      token = localStorage.getItem('token');

      // Traemos el Usuario
      this.data = await this._usuariosService.getUser(token);

      this.data.toPromise()
            .then(async (response: UsuarioModel) => {
                this.usuarioActivo = await response;
                localStorage.setItem('usuarioActivo', JSON.stringify(this.usuarioActivo));
                this.cargando = false;
            })
            .catch((err) => {
              console.log(err);
            })
    }

  }

  

  formatearNombre(nombres: String, apellidos: String){
    return `${nombres} ${apellidos}`;
  };

  actualizarVisual(editado: Boolean){
    this.activarAlert = true;
    this.textAlert = "Usuario Editado!! 💪"
    this.cargando = true;
    this.editando = false;

    setTimeout(()=>{
      this.cargarPerfil();
      this.cargando = false;
    }, 2000)
  }


}
