import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../services/auth/auth.service';

@Injectable()
export class LogguedGuard implements CanActivate {

  constructor(private auth : AuthService, private router : Router) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if(this.auth.isLogued()) {
        return true;
      }
      this.router.navigate(['/']);
      return false;
  }
}
