import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {ZipkinApiService} from '../service/zipkin-api.service';

@Injectable()
export class AuthGuardGuard implements CanActivate {

  constructor(private router: Router, private zipKinApi: ZipkinApiService) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (this.zipKinApi.isLoggedIn()) {
      return true;
    } else {
     this.router.navigate(['/login']);
    }
    return true;
  }
}
