import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CargandoComponent } from './components/shared/cargando/cargando.component';
import { AlertComponent } from './components/shared/alert/alert.component';
import { AlertFlotanteComponent } from './components/shared/alert-flotante/alert-flotante.component';



@NgModule({
  declarations: [
    CargandoComponent,
    AlertComponent,
    AlertFlotanteComponent
  ],
  exports: [
    CargandoComponent,
    AlertComponent,
    AlertFlotanteComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModuleModule { }
