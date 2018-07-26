import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { SpinnerService } from '../../services/spinner/spinner.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit, OnDestroy {

  public reactiveForm : FormGroup;
  
  showError : boolean = false;
  messageError : string = '';
  autolog : string;

  constructor(private router : Router,private formBuilder: FormBuilder, private auth : AuthService, private spinner : SpinnerService) {
    this.reactiveForm = this.formBuilder.group({
      email : new FormControl('', [Validators.required]),
      password : new FormControl('', [Validators.required])
    })
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    
  }

  ingresar() {
    this._internalLogin(this.reactiveForm.value.email, this.reactiveForm.value.password);
  }

  private _internalLogin(mail, password) {
    this.spinner.showSpinner();
    this.auth.loginWithCredentials({email : mail, password : password}).then(res => {
      setTimeout(() => {
        this.showError = false;
        this.spinner.hiddenSpinner();
        this.router.navigate(['/']);
      }, 2000);
    }).catch(err => {
      setTimeout(() => {
        this.spinner.hiddenSpinner();
        this.showError = true;
        this.messageError = err.error.message;
        console.log(err);
      }, 2000);
    });
  }

  hiddenError() {
    this.showError = false
  }

  autoLogin() {
    switch(this.autolog) {
      case 'c' :
        this._internalLogin('cliente@remiseria.com', 'cliente');
      break;
      case 'ch' :
        this._internalLogin('chofer@remiseria.com', 'chofer');
      break;
      case 'e' : 
        this._internalLogin('encargado@remiseria.com', 'encargado');
      break;
    }
  }
}
