import { Injectable } from '@angular/core';
import { GenericService } from '../generic/generic.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { InformeResult, ChartsData } from '../../model/informes';

@Injectable()
export class InformesService extends GenericService{

  constructor(protected http : HttpClient, protected helper : JwtHelperService) {
    super(http, helper);
  }


  getMediosDePago() : Promise<Array<ChartsData>> {
    return this.get<Array<InformeResult>>('/informes/viajes/modopago').toPromise().then(res => {
      let arr = new Array<ChartsData>();
      res.forEach(e => {
        arr.push({
          name : e.name == 'CC' ? 'Cuenta corriente' : 'Efectivo',
          value : e.total
        })
      });
      return arr;
    });
  }

  getHoras() : Promise<Array<ChartsData>> {
    return this.get<Array<InformeResult>>('/informes/viajes/hora').toPromise().then(res => {
      let arr = new Array<ChartsData>();
      res.forEach(e => {
        arr.push({
          name : e.name,
          value : e.total
        })
      });
      return arr;
    });
  }

  getComodidad() : Promise<Array<ChartsData>> {
    return this.get<Array<InformeResult>>('/informes/viajes/comodidad').toPromise().then(res => {
      let arr = new Array<ChartsData>();
      res.forEach(e => {
        arr.push({
          name : e.name.substr(0,1).toUpperCase() + e.name.substr(1, e.name.length),
          value : e.total
        })
      });
      return arr;
    });
  }
}
