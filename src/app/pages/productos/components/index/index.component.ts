import { Component, OnInit } from '@angular/core';
import { ProductoModel } from 'src/app/models/producto.model';
import { ProductosService } from '../../../../services/productos.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styles: [
  ]
})
export class IndexComponent implements OnInit {

  // Variable qeu guarda los productos
  productosTotal: ProductoModel[] = [];
  // Variable que contiene la data
  data: Observable<Object>;
  // Variable que activa y desactiva el Loading
  cargando: Boolean = false;

  constructor(
    private _productosService: ProductosService
  ) { 
    this.cargarProductos();
  }

  ngOnInit(): void {
  }

  cargarProductos(){
    // Activamos el loading
    this.cargando = true;

    // Enviamos la petición
    this.data = this._productosService.getProductos();

    // Evaluamos los datos 
    this.data.toPromise()
        .then((response: ProductoModel[])=> {
          this.cargando = false;
          if(localStorage.getItem('token')){
            this.destacarProductos(response)
          }else {
            this.productosTotal = response;
          }
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

  // Método que cargar solamente los productos que no son del Usuario
  destacarProductos(productos: ProductoModel[]){

    productos.forEach(
        (producto: ProductoModel) => {
          if(producto.idUser !== localStorage.getItem('token')){
            this.productosTotal.push(producto)
          }
        }
    )

    return this.productosTotal;
  }
  
}
