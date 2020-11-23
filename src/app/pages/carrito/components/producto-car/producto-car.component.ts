import { Component, Input, OnInit } from '@angular/core';
import { ProductoModel } from 'src/app/models/producto.model';

@Component({
  selector: 'app-producto-car',
  templateUrl: './producto-car.component.html',
  styles: [
  ]
})
export class ProductoCarComponent implements OnInit {

  @Input()
  producto
  @Input()
  posProducto;

  constructor() { }

  ngOnInit(): void {
  }

  // Método que devuelve el string la ruta de una imagen
  rutearImagen(nameImage: String){
    return `https://artesanias-hbs.herokuapp.com/images/productos/${nameImage}`;
  }

  // Borrar producto del carrito
  borrarProductoCarrito(posProducto){
      // Obtenemos el idUser
      let idUser = localStorage.getItem('token');
  
      // Verificamos si existe un carrito para este usuario
      let carrito = {
        productos: [],
        total: 0
      };

      carrito = JSON.parse(localStorage.getItem(idUser));
      let totalCar = {total: 0};
      let productoBorrado = carrito.productos[posProducto];
      carrito.productos.splice(posProducto, 1);
      carrito.total -= productoBorrado.precio;
        
      window.location.href = "carrito";
      this.actualizarCarrito(carrito, idUser);
      // this.activarAlert = true;
      // this.textAlert = "Producto en carrito!! 🛒"
      // setTimeout(()=> {
      //   this.activarAlert = false;
      // }, 3000)
  
  }
  
    
  

  // Método que actualiza el carrito
  actualizarCarrito(carrito = {productos: [], total: 0}, idUser){
    const json = JSON.stringify(carrito);

    if(carrito.productos.length == 0){
      localStorage.removeItem(idUser);
    } else {
      localStorage.setItem(idUser, json);
    }   
  }

}
