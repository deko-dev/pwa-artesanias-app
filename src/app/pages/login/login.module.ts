import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../../shared-module.module';
import { IndexComponent } from './components/index/index.component';
import { LoginRoutingModule } from './login.routes';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    LoginRoutingModule,
    ReactiveFormsModule
  ]
})
export class LoginModule { }
