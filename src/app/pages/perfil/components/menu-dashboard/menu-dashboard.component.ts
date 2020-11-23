import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-dashboard',
  templateUrl: './menu-dashboard.component.html',
  styles: [
  ]
})
export class MenuDashboardComponent implements OnInit {

  // Variable que activa y desactiva el toogle
  expand = false;
  constructor() { }

  ngOnInit(): void {
  }

}
