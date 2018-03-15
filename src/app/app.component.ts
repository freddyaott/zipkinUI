import { Component } from '@angular/core';
import {ZipkinApiService} from './service/zipkin-api.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  show = true;

  constructor (public zipkinService: ZipkinApiService, public router: Router) {

  }

  loggedIn() {
    return this.zipkinService.isLoggedIn();
  }

  logout() {
    this.zipkinService.logout();
    this.router.navigate(['/login']);
  }

  loggin() {
    this.router.navigate(['/login']);
  }

}
