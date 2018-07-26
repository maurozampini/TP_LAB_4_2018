import { Injectable } from '@angular/core';
import { GenericService } from '../generic/generic.service';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Viajes } from '../../model/viajes';

@Injectable()
export class ViajesService extends GenericService {

  constructor(protected http : HttpClient, protected helper : JwtHelperService) {
    super(http, helper);
  }

  actualizarSolicitud(viaje : Viajes) : Promise<any> {
    viaje.fecha = viaje.getFecha();
    return this.put('/viajes/', viaje).toPromise();
  }

  solicitar(viaje : Viajes) : Promise<any> {
    viaje.fecha = viaje.getFecha();
    return this.post<any>('/viajes/', viaje).toPromise();
  }

  misViajes() : Promise<Array<Viajes>> {
    return this.get<Array<Viajes>>('/viajes/list/currentUser').toPromise();
  }

  eliminar(id : number) : Promise<any>  {
    return this.delete<any>('/viajes/' + id).toPromise();
  }

  getViajesDisponibles() : Promise<Array<Viajes>> {
    return this.get<Array<Viajes>>('/viajes/list/disponibles').toPromise();
  }

  tomarViaje(id : number) : Promise<any> {
    return this.get<any>('/viajes/tomar/' + id).toPromise();
  }

  finalizar(id : number, precio : number)  : Promise<any> {
    let b = {
      id : id,
      precio : precio
    }
    return this.put<any>('/viajes/finalizar/', b).toPromise();
  }

  findAll() : Promise<Array<Viajes>> {
    return this.get<Array<Viajes>>('/viajes/list').toPromise();
  }
}
