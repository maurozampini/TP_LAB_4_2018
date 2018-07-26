import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../services/auth/auth.service';

@Injectable()
export class EncargadoGuard implements CanActivate {

  constructor(private auth : AuthService, private router : Router) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if(this.auth.isEncargado()) {
        return true;
      }
      this.router.navigate(['/']);
      return false;
  }
}
