import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Float Maps';

  authRout = ['/login', '/register']

  isAuth = false;

  constructor(public router: Router) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.isAuth = this.authRout.includes(val.urlAfterRedirects)
      }
    })
  }

}