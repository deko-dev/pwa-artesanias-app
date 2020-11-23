import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OptionsComponent } from './components/options/options.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { InformativoComponent } from './components/informativo/informativo.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { HomeRoutingModule } from './home.routes';




@NgModule({
  declarations: [
    OptionsComponent, 
    AboutUsComponent, 
    InformativoComponent, 
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
