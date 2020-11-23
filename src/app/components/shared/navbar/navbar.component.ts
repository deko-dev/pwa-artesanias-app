import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit {

  token : String;
  toggle: Boolean =  false

  constructor(
    private router: Router
  ) { 

    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
    } else {
      this.token = null;
    }

  }

  ngOnInit(): void {
  }

  logout() {

    if(localStorage.getItem('token')){
      localStorage.removeItem('token');
      this.token = null;
      this.router.navigateByUrl('/login');
    }

  }

}
