import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductoModel } from '../../../../models/producto.model';
import { ProductosService } from '../../../../services/productos.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styles: [
  ]
})
export class ProductosComponent implements OnInit {

  // Variable que guarda los productos del Usuario Activo
  productosUsuario: ProductoModel[];
  // Variable que crea el formulario
  formProducto: FormGroup;
  // Variable que guarda la Data recibida del Servicio
  data: Observable<Object>;
  // Variable que activa/desactiva el cargando
  cargando: Boolean = false;
  // Variable que activa/desactiva el cargando en el formulario
  cargandoPeticion: Boolean = false;
  // Variable que modifica el titulo del Formulario
  titleActionForm: String = "Agregar";
  // Variable que modifica el boton del Formulario
  btnActionForm: String = "Crear";
  // Variable que muetra o no el Formulario
  formularioActive: Boolean = false;
  // Variable que guarda la imagen del Producto
  imagenProducto: File;

  // Variable que activa el flotante
  activarAlert: Boolean = false
  // Variable que muestra la informacion en el flotante
  textAlert: String;

  
  constructor(
    private _productosService: ProductosService,
    private formBuilder: FormBuilder
  ) { 
    this.crearFormulario();
    this.getProductosUsuario();
  }

  ngOnInit(): void {
  }

  async getProductosUsuario(){
    // Activamos el loading
    this.cargando = true;

    // Obtenemos el Token
    const idUser = localStorage.getItem('token');

    // Realizamos la peticion
    this.data = await this._productosService.getProductosUsuario(idUser);

    // Evaluamos la respuesta
    this.data
      .toPromise()
        .then(async (response: ProductoModel[]) => {
          // Guardamos los productos (si los hay) en la variable 
          this.productosUsuario = response;
          // Desactivamos el loading
          this.cargando = false;
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        })
  }

  // Método que devuelve el string la ruta de una imagen
  rutearImagen(nameImage: String){
    return `https://artesanias-hbs.herokuapp.com/images/productos/${nameImage}`;
  }

  // Método que procesa los datos de un producto dependiendo la action
  actionProducto(){
    // Variable que determina la accion del Formulario
    let action: String;
    // Variable que guarda temporalmente los datos del Formulario
    let productoDatosTemp: ProductoModel;

    productoDatosTemp = this.formProducto.value;

    if(this.formProducto.controls.imagen.value != ''){
      productoDatosTemp.imagen = this.imagenProducto;
    }

    if(productoDatosTemp.nameImage == undefined){
      productoDatosTemp.nameImage = "";
    }

    console.log(this.formProducto.controls._id.value);

    // Evaluamos si el producto es nuevo o editado
    if(this.formProducto.controls._id.value === "" || this.formProducto.controls._id.value === null){
      this.crearProducto( this.crearFormData(productoDatosTemp) );
    } else {
      this.editarProducto(productoDatosTemp._id, this.crearFormData(productoDatosTemp) );
    }

    
  }

  crearFormData(dataProducto: ProductoModel){
    // Formulario que será devuelto
    let formDataTemp = new FormData;

    formDataTemp.append('idUser', localStorage.getItem('token'));
    formDataTemp.append('nombre', dataProducto.nombre);
    formDataTemp.append('descripcion', dataProducto.descripcion);
    formDataTemp.append('precio', dataProducto.precio);
    formDataTemp.append('stock', dataProducto.stock);
    formDataTemp.append('nameImage', dataProducto.nameImage);
    formDataTemp.append('imagen', dataProducto.imagen);

    return formDataTemp;
  }

  // Método para editar un Producto
  editarProducto(idProducto: String, dataProducto: FormData){
     // Activamos el cargando
     this.cargandoPeticion = true;
     // Enviamos el producto para ser editado
     let response = this._productosService.editarProducto(idProducto, dataProducto);
 
     // Evaluamos la respuesta
     response.toPromise()
         .then((res) => {
           // Desactivamos el Formulario
          this.formularioActive = false;
           // Desactivamos el cargando
           this.cargandoPeticion = false;
          //  Activamos el alert
          this.activarAlert = true;
          // Mostramos texto en el alert
          this.textAlert = "Producto Editado!! ✔"
           // Actualizamos la lista de productos
           this.getProductosUsuario();
         })
         .catch((err) => {
           console.log(err);
         })
  }

  // Método para cargar los datos de un productos al Formulario
  cargaProductoFormulario(dataProducto: ProductoModel){
    // Activamos el formulario
    this.formularioActive = true;
    // Actualizamos el Title
    this.titleActionForm = "Editando";
    // Actualizamos el btn
    this.btnActionForm = "Editar"
    // Creamos el Formulario
    this.formProducto = this.formBuilder.group({
      _id: [dataProducto._id, Validators.required],
      nombre: [dataProducto.nombre, Validators.required],
      descripcion: [dataProducto.descripcion, Validators.required],
      precio: [dataProducto.precio, Validators.required],
      stock: [dataProducto.stock],
      imagen: [dataProducto.imagen.name],
      nameImage: [dataProducto.nameImage, Validators.required],
    })
  }

  crearFormulario(){
    // Creamos el Formulario
    this.formProducto = this.formBuilder.group({
      _id: [''],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', Validators.required],
      stock: [''],
      imagen: [''],
      nameImage: [''],
    })
  }

  // Método que crea un producto
  crearProducto(dataProducto: FormData){
    // Activamos el cargando
    this.cargandoPeticion = true;
    // Enviamos el producto para ser creado
    let response = this._productosService.crearProducto(dataProducto);

    // Evaluamos la respuesta
    response.toPromise()
        .then((res) => {
          // Desactivamos el Formulario
          this.formularioActive = false;
          // Desactivamos el cargando
          this.cargandoPeticion = false;
          // Actualizamos la lista de productos
          this.getProductosUsuario();
        })
        .catch((err) => {
          console.log(err);
        })
  }

  borrarProducto(idProducto){
    // Activamos el cargando
    this.cargando = true;

    // Realizamos la peticion
    const response = this._productosService.borrarProducto(idProducto);
    response.toPromise()
        .then((response) => {
          console.log(response);
          this.getProductosUsuario();
        })
  }

  // Método que obtiene la imagen cargada
  obtenerImagen(event){
    return this.imagenProducto = event.target.files[0];
  }
}
