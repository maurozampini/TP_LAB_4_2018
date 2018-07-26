import { Injectable } from '@angular/core';
import { GenericService } from './generic/generic.service';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Vehiculo } from '../model/vehiculo';
import { UploadFile, FileSystemFileEntry } from 'ngx-file-drop';

@Injectable()
export class VehiculoService extends GenericService {

  constructor(protected http : HttpClient, protected helper : JwtHelperService) {
    super(http, helper);
  }

  public insertar(v : Vehiculo) {
    return this.post('/vehiculo/', v).toPromise();
  }

  public actualizar(v : Vehiculo) {
    return this.put('/vehiculo/', v).toPromise();
  }

  public getAll() {
    return this.get<Array<Vehiculo>>('/vehiculo/list').toPromise().then(res => {
      res.forEach(e => {
        e.foto = this.url + '/fotos/' +e.patente + '.jpg';
      })
      return res;
    });
  }

  public getVehiculo(patente : string) {
    return this.get<Vehiculo>('/vehiculo/find/' + patente).toPromise();
  }

  public eliminar(patente : string) {
    return this.delete('/vehiculo/'+patente).toPromise();
  }

  subiFotoVehiculo(email : string, f : UploadFile) : Promise<any> {
    const fileEntry = f.fileEntry as FileSystemFileEntry;
    const formData = new FormData()
    let prom = new Promise((resolve, reject) => {

      fileEntry.file((file: File) => {

        formData.append('foto', file, f.relativePath + ';' + email);
        resolve(formData)
      });
    });

    return prom.then(res => {
      return this.http.post(this.url + '/vehiculo/foto', res, { headers : this.headers, responseType : 'blob' }).toPromise();
    });
    
  }
}
