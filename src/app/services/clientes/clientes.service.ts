import { Injectable } from '@angular/core';
import { GenericService } from '../generic/generic.service';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Usuario } from '../../model/user';
import { SpinnerService } from '../spinner/spinner.service';

@Injectable()
export class ClientesService extends GenericService {

  constructor(protected http : HttpClient, protected helper : JwtHelperService) {
    super(http, helper);
  }

  getAll() : Promise<Array<Usuario>> {
    return this.get<Array<Usuario>>('/usuario/list/clientes').toPromise();
  }

  activar(usu : Usuario) : Promise<any> {
    usu.activo = true;
    return this.put<any>('/usuario/', usu).toPromise();
  }

  desactivar(usu : Usuario) : Promise<any> {
    usu.activo = false;
    return this.put<any>('/usuario/', usu).toPromise();
  }

  eliminar(email : string) : Promise<any> {
    return this.delete<any>('/usuario/' + email).toPromise();
  }
}
