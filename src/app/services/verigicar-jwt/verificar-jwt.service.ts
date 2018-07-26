import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class VerificarJwtService implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> {
    if (this.auth.isLogued()) {
      return true;
    }
    else {
      this.router.navigate(['/error']);
      // this.router.navigate(['/pages/forms/inputs']);
      return false;
    }
  }
}
