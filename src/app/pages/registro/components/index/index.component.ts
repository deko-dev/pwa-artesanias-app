import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistroService } from '../../../../services/registro.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styles: [
  ]
})
export class IndexComponent implements OnInit {

  // Variable que captura el formulario
  formRegistro: FormGroup;
  // Variable que activa/desactiva el loading
  cargando: Boolean = false;
  // Variable que captura el error
  error: String = "";

  constructor(
    private formBuilder: FormBuilder,
    private _registroService: RegistroService,
    private router: Router
  ) { 
    this.crearFormulario();
  }

  ngOnInit(): void {
  }

  // Método que crea el formulario 
  crearFormulario(){

    // Creamos el formulario
    this.formRegistro = this.formBuilder.group({
      rol: [''],
      tipoId: ['', Validators.required],
      nid: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      nacimiento: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      
    })
    

  }

  registro(){ 

    // Activamos el loading
    this.cargando = true;

      if(this.formRegistro.valid){
        // Obtenemos todos los valores del Formulario
        const datosRegistro = this.formRegistro.value;
        
        datosRegistro.rol = 1;
        this._registroService.registro(datosRegistro)
                .toPromise()
                  .then((response) => {
                    // Vaciamos el error
                    this.error = '';
                    // Quitamos la animacion de carga
                    this.cargando = false;
                    // Redirigiendo a Home
                    this.router.navigateByUrl('/login');
                  })
                  .catch((err) => {
                    // Capturamos el error 
                    this.error = err.error.message.loginMessage[0];

                    // Desactivamos el Cargando
                    this.cargando = false;
                  })

      } else {
        // Mostramos el error del formulario
        this.error = "Datos erroneos"
        this.cargando = false;
      }
  }

}
