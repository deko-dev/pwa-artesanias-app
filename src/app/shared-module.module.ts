import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CargandoComponent } from './components/shared/cargando/cargando.component';
import { AlertComponent } from './components/shared/alert/alert.component';



@NgModule({
  declarations: [
    CargandoComponent,
    AlertComponent
  ],
  exports: [
    CargandoComponent,
    AlertComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModuleModule { }
