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
  searchTrace = null;

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


  public submitSearch() {

    this.router.navigate(['/trace', this.searchTrace]);

  }

  public endSearch() {
    this.searchTrace = null;
  }

  public initiateSearch() {
    this.searchTrace = '';
  }

  public showPreSearchBar() {
    return this.searchTrace == null;
  }

  public showSearchBar(): boolean {
    return this.searchTrace != null;
  }

  home() {
    this.router.navigate(['/home']);
  }

}
