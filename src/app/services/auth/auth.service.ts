import { Injectable } from '@angular/core';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { Router } from '@angular/router';
//import { Credentials } from 'crypto';

@Injectable()
export class AuthService {

  public name: string;
  private token: string;
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private router: Router) { }

  public loginWithCredentials() {
    this.router.navigate(['/ingresar']);
  }
/*
  public registrarUsuario(user: Usuario): Promise<ResponseRegister> {
    return this.post<ResponseRegister>('/usuario/', user).toPromise();
  }

  public loginWithCredentials(cred: Credentials): Promise<ResponseLogin> {
    return this.post<ResponseLogin>('/auth/login', cred).toPromise().then(res => {
      setTimeout(() => {
        localStorage.setItem('token', res.token);
        this.token = res.token;
        this.getData();
      }, 2000)
      return res;
    });
  }

  public findAll() {
    return super.get<Array<Usuario>>('/usuario/list').toPromise();
  }
*/
  isLogued() {
    try {
      console.log('is logued', tokenNotExpired());
      let rta = tokenNotExpired() || false;
      return rta;
    } catch (error) {
      return false;
    }
  }

  public getToken() {
    try {
      console.log('getToken', this.jwtHelper.decodeToken(this.token));
      return this.jwtHelper.decodeToken(this.token);
    } catch (error) {
      return undefined;
    }
  }

  public getExpirationDate() {
    try {
      console.log('getExpirationDate', this.jwtHelper.getTokenExpirationDate(this.token))
      return this.jwtHelper.getTokenExpirationDate(this.token);
    } catch (error) {
      return null;
    }
  }

  public logOut() {
    try {
      localStorage.setItem('token', null);
      this.router.navigate(['/login']);
    } catch (error) {
      return false;
    }
  }
}
