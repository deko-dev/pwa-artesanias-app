import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './components/index/index.component';
import { RegistroRoutingModule } from './registro.routes';
import { SharedModuleModule } from '../../shared-module.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RegistroRoutingModule,
    SharedModuleModule
  ]
})
export class RegistroModule { }
