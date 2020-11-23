import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert-flotante',
  templateUrl: './alert-flotante.component.html',
  styleUrls: ['./alert-flotante.component.scss']
})
export class AlertFlotanteComponent implements OnInit {

  @Input()
  textoAlertFlotante: String = "Producto agregado";

  constructor() { }

  ngOnInit(): void {
  }

}
