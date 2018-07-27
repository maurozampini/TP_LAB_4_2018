import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class GenericService {

  //protected readonly url : string = 'http://localhost/tp';
  protected readonly url : string = 'http://locomotivsublimaciones.esy.es/tp';
  protected headers : any;
  constructor(protected http : HttpClient, protected helper : JwtHelperService) {
    this.headers = {
      'captcha' : 'captchauno'
    }
  }

  protected post<T>(api : string, body : any, headers?:any) {
    return this.http.post<T>(this.url + api, body, {
      headers : this.headers
    });
  }

  protected put<T>(api : string, body : any) {
    return this.http.put<T>(this.url + api, body, {
      headers : this.headers
    });
  }

  protected get<T>(api : string) {
    return this.http.get<T>(this.url + api, {
      headers : this.headers
    });
  }

  protected delete<T>(api : string) {
    return this.http.delete(this.url + api, {
      headers : this.headers
    });
  }
}
