import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { AuthService } from './auth/auth.service';
import { MatDialog } from '@angular/material';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private router : Router, private auth : AuthService, private matDialog : MatDialog) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.handleHttp(req, next);
  }

  private handleHttp(req: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>> {
    const authReq = req.clone();
    return next.handle(authReq).do(res => {
      this.handleResponse(res);
    }, (error : HttpErrorResponse) => {
      this.handleError(error);
    }, () => {
      this.handleComplete();
    }) as any;
  }

  handleError(error : HttpErrorResponse) {
    //intercept the respons error and displace it to the console
    console.log("Error Occurred");
    //console.log(error);
    if(error.status == 401 || error.status == 403) {
      
      this.auth.logout();
      this.matDialog.closeAll();
      //return Observable.throw(error);
    }
      
    //return the error to the method that called it
    return Observable.throw(error);
  }

  handleResponse(response) {

  }

  handleComplete() {
   
  }


}
