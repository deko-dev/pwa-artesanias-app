import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './components/index/index.component';
import { ProductoCarComponent } from './components/producto-car/producto-car.component';
import { SharedModuleModule } from '../../shared-module.module';
import { CarritoRoutingModule } from './carrito.routes';



@NgModule({
  declarations: [IndexComponent, ProductoCarComponent],
  imports: [
    CommonModule,
    CarritoRoutingModule,
    SharedModuleModule
  ]
})
export class CarritoModule { }
