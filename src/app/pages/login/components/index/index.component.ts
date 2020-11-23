import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../../../services/login.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  // Variable que activa/desactiva el loading
  cargando: Boolean = false;
  // Variable que captura el Formulario
  formLogin: FormGroup;
  // Variable que muestra el error por pantalla
  error: String = '';

  constructor(
    private formBuilder: FormBuilder,
    private _loginService: LoginService,
    private router: Router
  ) {
    // Creamos el formulario
    this.crearFormulario();
    
   }

  ngOnInit(): void {
  }

  // Método que realiza el Login
  login(){
    // Iniciamos la animaciond de carga
    this.cargando = true;

    // Evaluamos que el formulario sea valido
    if(this.formLogin.valid){
      
      // Guardamos los datos del login del usuario
      const userLogin = this.formLogin.value;

      // Enviamos el longin al servicio de Login
      this._loginService.login(userLogin)
            .toPromise()
              .then((response:any) => {
                // Guardamos el Token en el LocalStorage
                localStorage.setItem('token', response.token);
                // Vaciamos el error
                this.error = '';
                // Quitamos la animacion de carga
                this.cargando = false;
                // Redirigiendo a Home
                this.router.navigateByUrl('/home');
              })
              .catch((err) => {
                // Capturamos el error y lo mostramos por pantalla
                this.error = err.error.message.loginMessage[0];
                // Quitamos la animacion de carga
                this.cargando = false;
              })
    } else {
      // En caso de que el Formluario sea invalido mostramos por pantalla
      this.error = "Datos erroneos";
    }

  }

  // Método que crea un formulario 
  crearFormulario(){
    // Creamos el grupo del formulario
    this.formLogin = this.formBuilder.group({
      email: ['',Validators.required],
      password: ['', Validators.required],
    })
  }
}
