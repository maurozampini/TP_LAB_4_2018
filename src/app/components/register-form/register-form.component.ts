import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, ValidatorFn } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Usuario } from '../../model/user';
import { Subscription } from 'rxjs/Subscription';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpinnerService } from '../../services/spinner/spinner.service';
import { AlertService } from '../../services/alert/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit, OnDestroy {

  public resolved : boolean = false;
  public reactiveForm: FormGroup;
  public secondPassword : string;

  constructor(private auth : AuthService, private router : Router , private formBuilder : FormBuilder,private snackBar: MatSnackBar, private spinner : SpinnerService, private snack : MatSnackBar, private alert : AlertService) {
    this.reactiveForm = this.formBuilder.group({
      firstName :  new FormControl('', [Validators.required]),
      lastName :  new FormControl('', [Validators.required]),
      password :  new FormControl('', [Validators.required, Validators.minLength(6)]),
      secondPassword : new FormControl('', [this.customValidator()]),
      email : new FormControl('', [Validators.required, Validators.email])
    })
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    
  }

  resolvedCaptcha(result) {
    this.resolved = true;
  }

  getErrorMessage() {
    return this.reactiveForm.controls.email.hasError('required') ? 'El correo es requerido' :
        this.reactiveForm.controls.email.hasError('email') ? 'Ingrese un correo valido' :
            '';
  }

  getErrorMessagePassword() {
    return this.reactiveForm.controls.password.hasError('required') ? 'El password es requerido' :
    this.reactiveForm.controls.password.hasError('minlength') ? 'Debe tener minimo 6 caracteres' : '';
  }


  customValidator() : ValidatorFn{
    return (control : FormControl) => {
      if(this.reactiveForm && this.reactiveForm.controls.secondPassword.value) {
        if(this.reactiveForm.controls.secondPassword.value != this.reactiveForm.controls.password.value) {
          return {isEquals : this.reactiveForm.controls.secondPassword.value != this.reactiveForm.controls.password.value};
        }
      }
      return null;
    }
    

  }
  
  registrarUsuario() {
    this.spinner.showSpinner();
    let newUser = new Usuario();
    newUser.nombre = this.reactiveForm.controls.firstName.value;
    newUser.apellido = this.reactiveForm.controls.lastName.value;
    newUser.email = this.reactiveForm.controls.email.value;
    newUser.activo = false;
    newUser.password = this.reactiveForm.controls.password.value;
    this.auth.registrarUsuario(newUser).then(res => {
      this.spinner.hiddenSpinner();
      this.snack.open('Se registro correctamente', 'Aceptar', {
        duration : 3000
      });
      this.router.navigate(['/ingresar'])
    }).catch(err => {
      this.spinner.hiddenSpinner();
      let alerta = this.alert.create({
        message : err.error.message,
        title : '¡Error!',
        buttons : ['Aceptar']
      });
      alerta.present();
    });
  }
}
