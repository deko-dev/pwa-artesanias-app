import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UsuarioModel } from '../../../../models/usuario.model';
import { UsuariosService } from '../../../../services/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-edit',
  templateUrl: './perfil-edit.component.html',
  styles: [
  ]
})
export class PerfilEditComponent implements OnInit {

  // Variable que activa/desactiva el Loading
  cargando: Boolean = false;
  // Variable que recibe el Usuario Activo
  usuarioActivo: UsuarioModel;
  // Variable que guarda el Formulario
  formEditUsuario: FormGroup;
  // Variable que activará la actualizacion visual de los datos
  @Output() actualizarVisual = new EventEmitter<Boolean>();

  constructor(
    private _usuariosService: UsuariosService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { 
    this.crearFormulario();
    this.getUsuarioLocalStorage();
  }

  ngOnInit(): void {
  }


  // Método que recibe los datos y edita el usuario
  async editarUsuario(){

    // Extraemos los datos del Usuario Editado
    let usuarioEditado: Object;
    usuarioEditado = this.formEditUsuario.value;
    usuarioEditado['rol'] = 1;

    // Evaluamos si el usuario actualizó su password
    if( !this.formEditUsuario.controls.password.touched){
      delete usuarioEditado['password'];
    }
    console.log(usuarioEditado);
    // Iniciamos el Loadin
    this.cargando = true;
    // Cargamos el Id del Usuario desde LocalStorage
    const userId = localStorage.getItem('token');

    // Enviamos los datos ah actualizar
    const response = await this._usuariosService.editarUsuario(userId, usuarioEditado);

    // Esperamos los resultados de la Promesa
    response.toPromise()
        .then((res) => {
          // Apagamos el loading
          this.cargando = false
          // Redirigimos al perfil
          this.actualizarDatosVisuales(true);
          console.log(res)
        })
        .catch((err) => {
          // Apagamos el loading
          this.cargando = false
          console.log(err);
        })


  }

  // Método para crear el Formulario
  crearFormulario(){
    // Creamos el formulario 
    this.formEditUsuario = this.formBuilder.group({
      _id: [''],
      tipoId: [''],
      nid: [''],
      nombres: [''],
      apellidos: [''],
      nacimiento: [''],
      direccion: [''],
      telefono: [''],
      email: [''],
      password: ['']
    })

  }

  cargarData(dataUsuario: UsuarioModel){
    this.formEditUsuario = this.formBuilder.group({
      _id: [localStorage.getItem('token')],
      tipoId: [dataUsuario.tipoId],
      nid: [dataUsuario.nid],
      nombres: [dataUsuario.nombres],
      apellidos: [dataUsuario.apellidos],
      nacimiento: [dataUsuario.nacimiento],
      direccion: [dataUsuario.direccion],
      telefono: [dataUsuario.telefono],
      email: [dataUsuario.email],
      password: ['']
    })
  }


  // Método para cargar el usuario desde el LocalStorage
  getUsuarioLocalStorage(){

    // Cargaos el usuario desde el LocalStorage
    const usuario = JSON.parse(localStorage.getItem('usuarioActivo')); 

    // lo enviamos para cargar la data
    this.cargarData(usuario);
  }

  actualizarDatosVisuales(editado: Boolean){
    this.actualizarVisual.emit(editado);
  }

  



}
