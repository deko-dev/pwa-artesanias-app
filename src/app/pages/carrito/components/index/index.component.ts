import { Component, OnInit } from '@angular/core';
import { VentaModel } from '../../../../models/venta.model';
import { VentasService } from '../../../../services/ventas.service';
import { ComprasService } from '../../../../services/compras.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styles: [
  ]
})
export class IndexComponent implements OnInit {

  // Variable que guarda los productos
  productosInCar = [];

  cargando: Boolean = false;
  activarAlert: Boolean = false;
  textAlert: String= '';

  constructor(
    private _ventaService: VentasService,
    private _compraService: ComprasService
  ) { 
    // Obtenemos token del Usuario
    const token = localStorage.getItem('token');

    // Cargamos los productos desde el LocalStorage
    this.productosInCar = JSON.parse(localStorage.getItem(token)).productos;
  }

  ngOnInit(): void {
  }

  async hacerPedido(){
    this.cargando = true;
     // Obtenemos token del Usuario
     const token = localStorage.getItem('token');

     // Cargamos los productos desde el LocalStorage
     this.productosInCar = JSON.parse(localStorage.getItem(token)).productos;

    // Realizamos la peticion 
    let response = await this._ventaService.enviarVenta(this.armarDatosVenta(this.productosInCar));

    response.toPromise()
        .then((response:any) => {
          const token = localStorage.getItem('token');
          this.activarAlert = true;
          this.textAlert = response.message
          localStorage.removeItem(token);
          this.productosInCar = [];
          this.cargando = false;

          let datosCompras = {
            idUser: token,
            idVenta: response.data._id,
            factura: response.data.factura
          }

          this.guardarCompra(datosCompras);
          
        })
        .catch((err) => {
          console.log(err);
        })

  }

  armarDatosVenta(productos = []){

    let dataVenta: VentaModel;
    let productosId = [];
    productos.forEach((producto) => { 
      productosId.push({ cant: producto.cant, productoId: producto.producto._id });
    })

    dataVenta = {
      fecha: this.armarFecha(),
      factura: this.codigoFactura(),
      productos: productosId
    }

    return dataVenta;
  }

  codigoFactura(){
    return `ATACO${new Date().getUTCMilliseconds()}`;
  }

  armarFecha(){
    let fecha = new Date();
    return `${fecha.getDate()}-${fecha.getMonth()+1}-${fecha.getFullYear()}`;
  }


  guardarCompra(datosCompra){

  const response = this._compraService.guardarCompra(datosCompra)

      response.toPromise()
          .then((response) => {
            console.log(response);
          })
          .catch((err) => {
            console.log(err);
          })
    
  }

}
