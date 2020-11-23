import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { ProductosComponent } from './components/productos/productos.component';
import { VentasComponent } from './components/ventas/ventas.component';
import { ComprasComponent } from './components/compras/compras.component';
import { PerfilRoutingModule } from './perfil.routes';
import { PerfilEditComponent } from './components/perfil-edit/perfil-edit.component';
import { SharedModuleModule } from '../../shared-module.module';
import { MenuDashboardComponent } from './components/menu-dashboard/menu-dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductosEditComponent } from './components/productos-edit/productos-edit.component';



@NgModule({
  declarations: [DashboardComponent, PerfilComponent, ProductosComponent, VentasComponent, ComprasComponent, PerfilEditComponent, MenuDashboardComponent, ProductosEditComponent],
  imports: [
    CommonModule,
    PerfilRoutingModule,
    SharedModuleModule,
    ReactiveFormsModule
  ]
})
export class PerfilModule { }
