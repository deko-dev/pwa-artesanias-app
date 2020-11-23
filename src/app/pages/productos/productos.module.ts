import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './components/index/index.component';
import { ProductosRoutingModule } from './productos.routes';
import { SharedModuleModule } from '../../shared-module.module';



@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    SharedModuleModule
  ]
})
export class ProductosModule { }
