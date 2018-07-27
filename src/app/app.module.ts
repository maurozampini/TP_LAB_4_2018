import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RoutingModule } from './routing/routing.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';


import { JwtModule } from '@auth0/angular-jwt';

import { RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';

import { GenericService } from './services/generic/generic.service';
import { VehiculoService } from './services/vehiculo.service';
import { ChoferService } from './services/chofer/chofer.service';
import { ViajesService } from './services/viajes/viajes.service';
import { AuthService } from './services/auth/auth.service';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { AlertService } from './services/alert/alert.service';
import { ClientesService } from './services/clientes/clientes.service';
import { InformesService } from './services/informes/informes.service';
import { SpinnerService } from './services/spinner/spinner.service';
import { ChoferGuard } from './guards/chofer/chofer.guard';
import { ClienteGuard } from './guards/cliente/cliente.guard';
import { EncargadoGuard } from './guards/encargado/encargado.guard';
import { LogguedGuard } from './guards/loggued/loggued.guard';

import { AppComponent } from './app.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { DefaultComponent } from './components/default/default.component';
import { ViajesAsignadosComponent } from './components/viajes-asignados/viajes-asignados.component';
import { ViajesSolicitadosComponent } from './components/viajes-solicitados/viajes-solicitados.component';
import { ViajesComponent } from './components/viajes/viajes.component';
import { InformesComponent } from './components/informes/informes.component';
import { VehiculosComponent } from './components/vehiculos/vehiculos.component';
import { VehiculosFormsComponent } from './components/vehiculos-forms/vehiculos-forms.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ClientesFormComponent } from './components/clientes-form/clientes-form.component';
import { ChoferesComponent } from './components/choferes/choferes.component';
import { ChoferesFormComponent } from './components/choferes-form/choferes-form.component';
import { NuevoViajeFormComponent } from './components/nuevo-viaje-form/nuevo-viaje-form.component';
import { MisViajesComponent } from './components/mis-viajes/mis-viajes.component';
import { AlertComponent } from './components/alert/alert.component';
import { MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatTableModule } from '@angular/material';
import { AmazingTimePickerService, AmazingTimePickerModule } from 'amazing-time-picker';

import { AgmCoreModule } from '@agm/core';
import { GoogleMapSelectorComponent } from './components/google-map-selector/google-map-selector.component';
import { ComodidadPipe } from './pipes/comodidad.pipe';
import {InputMaskModule} from 'primeng/inputmask';
import {KeyFilterModule} from 'primeng/keyfilter';
import { TextMaskModule } from 'angular2-text-mask';
import { MedioPagoPipe } from './pipes/medio-pago.pipe';
import { EstadoPipe } from './pipes/estado.pipe';
import { FinalizarFormComponent } from './components/finalizar-form/finalizar-form.component';
import { PrecioPipe } from './pipes/precio.pipe';
import { EstadoColorDirective } from './directives/estado-color.directive';
import { BooleanPipe } from './pipes/boolean.pipe';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FileDropModule } from 'ngx-file-drop';
import { AgmDirectionModule } from 'agm-direction'

export function jwtTokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    RegisterFormComponent,
    NotFoundComponent,
    HomeComponent,
    HeaderComponent,
    MenuComponent,
    DefaultComponent,
    ViajesAsignadosComponent,
    ViajesSolicitadosComponent,
    ViajesComponent,
    InformesComponent,
    VehiculosComponent,
    VehiculosFormsComponent,
    ClientesComponent,
    ClientesFormComponent,
    ChoferesComponent,
    ChoferesFormComponent,
    NuevoViajeFormComponent,
    MisViajesComponent,
    AlertComponent,
    GoogleMapSelectorComponent,
    ComodidadPipe,
    MedioPagoPipe,
    EstadoPipe,
    FinalizarFormComponent,
    PrecioPipe,
    EstadoColorDirective,
    BooleanPipe
  ],
  imports: [
    MatFormFieldModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    TextMaskModule,
    MatSnackBarModule,
    NgxChartsModule,
    RecaptchaModule.forRoot(),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RoutingModule,
    FileDropModule,
    MatDialogModule,
    InputMaskModule,
    MatCheckboxModule,
    KeyFilterModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AgmCoreModule.forRoot({
      apiKey : 'AIzaSyDQ1jO7Is1k1hUlXifr_yzcVgTPYC7OitQ'
    }),
    MatSelectModule,
    AmazingTimePickerModule,
    MatSidenavModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: jwtTokenGetter,
        whitelistedDomains : [
          'localhost',
          'locomotivsublimaciones.esy.es'
        ],
        headerName : 'token',
        authScheme : ''
      }
    }),
    MatCardModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatIconModule,
    AgmDirectionModule,
    MatListModule,
    MatToolbarModule,
    MatButtonModule
  ],
  entryComponents : [
    AlertComponent,
    NuevoViajeFormComponent,
    GoogleMapSelectorComponent,
    ChoferesFormComponent,
    VehiculosFormsComponent,
    FinalizarFormComponent
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: { siteKey: '6LfypWYUAAAAAOQFcQiV9V_HY39I0qnz4DLeHrwt' } as RecaptchaSettings,
    },
    GenericService,
    AuthService,
    LogguedGuard,
    ViajesService,
    InformesService,
    ChoferService,
    ClientesService,
    VehiculoService,
    ClienteGuard,
    ChoferGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass : TokenInterceptorService,
      multi : true
    },
    EncargadoGuard,
    SpinnerService,
    AlertService,
    HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
