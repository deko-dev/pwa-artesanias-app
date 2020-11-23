import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styles: [
  ]
})
export class AlertComponent implements OnInit {

  @Input()
  textoAlert: String;

  constructor() { }

  ngOnInit(): void {
  }

}
