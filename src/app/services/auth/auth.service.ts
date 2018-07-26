import { Injectable } from '@angular/core';
import { Usuario, ResponseRegister, Credentials, ResponseLogin, AuthData, ERol } from '../../model/user';
import { GenericService } from '../generic/generic.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable()
export class AuthService extends GenericService {

  private token : string;
  private data : AuthData;

  constructor(protected http : HttpClient, protected helper : JwtHelperService, protected router : Router) {
    super(http, helper);
    this.token = localStorage.getItem('token');
    this.getData();
  }

  public registrarUsuario(user : Usuario) : Promise<ResponseRegister> {
    return this.post<ResponseRegister>('/usuario/', user).toPromise();
  }

  public loginWithCredentials(cred : Credentials) : Promise<ResponseLogin> {
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

  public isLogued() : boolean {
    return !this.helper.isTokenExpired(this.token) || false;
  }

  public getData() : void {
    let info = this.helper.decodeToken(this.token);
    if(info) {
      this.data = info.data as AuthData;
    }
  }

  public dameNombre() : string {
    return this.data ? this.data.usuario : '';
  }

  public isCliente() : boolean {
    return this.getRol() == ERol.CLIENTE;
  }

  public isChofer() : boolean {
    return this.getRol() == ERol.CHOFER;
  }

  public isEncargado() : boolean {
    return this.getRol() == ERol.ENCARGADO;
  }

  private getRol() {
    if(!this.data)
      return -1;
    return this.data.rol;
  }

  public logout() {
    this.token = null;
    this.data = null;
    localStorage.removeItem('token');
    this.router.navigate(['/ingresar']);
  }
}
