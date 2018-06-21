import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';

import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ChoferComponent } from './components/chofer/chofer.component';
import { ChoferFormComponent } from './components/chofer-form/chofer-form.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { ClienteFormComponent } from './components/cliente-form/cliente-form.component';
import { VehiculoComponent } from './components/vehiculo/vehiculo.component';
import { VehiculoFormComponent } from './components/vehiculo-form/vehiculo-form.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { ErrorComponent } from './components/error/error.component';
import { VerificarJwtService } from './services/verigicar-jwt/verificar-jwt.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ChoferComponent,
    ChoferFormComponent,
    ClienteComponent,
    ClienteFormComponent,
    VehiculoComponent,
    VehiculoFormComponent,
    HeaderComponent,
    MenuComponent,
    RegisterFormComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [VerificarJwtService],
  bootstrap: [AppComponent]
})
export class AppModule { }
