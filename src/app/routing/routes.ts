
import { Routes, Route } from '@angular/router';
import { LoginFormComponent } from '../components/login-form/login-form.component';
import { RegisterFormComponent } from '../components/register-form/register-form.component';
import { NotFoundComponent } from '../components/not-found/not-found.component';
import { HomeComponent } from '../components/home/home.component';
import { DefaultComponent } from '../components/default/default.component';
import { ViajesAsignadosComponent } from '../components/viajes-asignados/viajes-asignados.component';
import { ViajesSolicitadosComponent } from '../components/viajes-solicitados/viajes-solicitados.component';
import { ViajesComponent } from '../components/viajes/viajes.component';
import { InformesComponent } from '../components/informes/informes.component';
import { VehiculosComponent } from '../components/vehiculos/vehiculos.component';
import { ChoferesComponent } from '../components/choferes/choferes.component';
import { ClientesComponent } from '../components/clientes/clientes.component';
import { NuevoViajeFormComponent } from '../components/nuevo-viaje-form/nuevo-viaje-form.component';
import { MisViajesComponent } from '../components/mis-viajes/mis-viajes.component';
import { LogguedGuard } from '../guards/loggued/loggued.guard';
import { ChoferGuard } from '../guards/chofer/chofer.guard';
import { EncargadoGuard } from '../guards/encargado/encargado.guard';
import { ClienteGuard } from '../guards/cliente/cliente.guard';

const rLogin : Route = {
    path : 'ingresar',
    component : LoginFormComponent
};

const rRegister : Route = {
    path : 'registrar',
    component : RegisterFormComponent
};

const rError : Route = {
    path : '**',
    component : NotFoundComponent
};

const rHome : Route = {
    path : '',
    component : HomeComponent
}

const rViajesAsignados : Route = {
    path : 'viajes-disponibles',
    component : ViajesAsignadosComponent,
    canActivate : [
        LogguedGuard,
        ChoferGuard
    ]
}

const rViajesSolicitados : Route = {
    path : 'viajes-solicitados',
    component : ViajesSolicitadosComponent,
    canActivate : [
        LogguedGuard,
        EncargadoGuard
    ]
}

const rViajes : Route = {
    path : 'viajes',
    component : ViajesComponent,
    canActivate : [
        LogguedGuard,
        EncargadoGuard
    ]
}

const rInformes : Route = {
    path : 'informes',
    component : InformesComponent,
    canActivate : [
        LogguedGuard,
        EncargadoGuard
    ]
}

const rVehiculos : Route = {
    path : 'vehiculos',
    component : VehiculosComponent,
    canActivate : [
        LogguedGuard,
        EncargadoGuard
    ]
}

const rChoferes : Route = {
    path : 'choferes',
    component : ChoferesComponent,
    canActivate : [
        LogguedGuard,
        EncargadoGuard
    ]
}

const rClientes : Route = {
    path : 'clientes',
    component : ClientesComponent,
    canActivate : [
        LogguedGuard,
        EncargadoGuard
    ]
}

const rMisViajes : Route = {
    path : 'mis-viajes',
    component : MisViajesComponent,
    canActivate : [
        LogguedGuard,
        ClienteGuard
    ]
}


const rDefualt : Route = {
    path : '',
    component : DefaultComponent,
    children : [
        rHome,
        rLogin,
        rRegister,
        rViajesAsignados,
        rViajesSolicitados,
        rViajes,
        rInformes,
        rVehiculos,
        rChoferes,
        rClientes,
        rMisViajes,
        rError //siempre a lo ultimo
    ]
}

export const Ruteos : Routes = [
    rDefualt
]