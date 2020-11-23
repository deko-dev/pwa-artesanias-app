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
  // Variable que activa y desactiva el Alert
  activarAlert: Boolean = false;
  // Variable que actualiza el texto del alert
  textAlert: String;

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
  
  // Método que agregar un producto al carrito de compras
  aggCarrito(producto: ProductoModel){
    console.log(producto);
    // Obtenemos el idUser
    let idUser = localStorage.getItem('token');

    // Verificamos si existe un carrito para este usuario
    let carrito = {
      productos: [],
      total: 0
    };

    if(localStorage.getItem(idUser)){
      let encontrado = false;
        carrito = JSON.parse(localStorage.getItem(idUser));
        let totalCar = {total: 0};
        carrito.productos.forEach((productoEnCar) => {
          if(productoEnCar.producto._id === producto._id){
            productoEnCar.cant += 1;
            carrito.total += productoEnCar.producto.precio
            encontrado = true;
          }
        })


        if(!encontrado){
          carrito.total += Number.parseInt(producto.precio);
          let proCantidad = {cant: 1, producto};
          carrito.productos.push(proCantidad);
        } 

        this.actualizarCarrito(carrito, idUser);
        this.activarAlert = true;
        this.textAlert = "Producto en carrito!! 🛒"
        setTimeout(()=> {
          this.activarAlert = false;
        }, 3000)
    } else {
        let proCantidad = {cant: 1, producto};
        carrito.total = Number.parseInt(producto.precio);
        carrito.productos.push(proCantidad);
        
        this.actualizarCarrito(carrito, idUser);
    }
    
    // $('.cantidad-carrito').text(carrito.length);
    
    // $('.box-carrito').addClass('new-producto');
    // setTimeout(() => {
    //     $('.box-carrito').removeClass('new-producto');
    // }, 3000)
  }

  // Método que actualiza el carrito
  actualizarCarrito(carrito = {}, idUser){
    const json = JSON.stringify(carrito);
    localStorage.setItem(idUser, json);
    
}

}
