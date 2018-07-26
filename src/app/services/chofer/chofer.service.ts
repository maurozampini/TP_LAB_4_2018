import { Injectable } from '@angular/core';
import { GenericService } from '../generic/generic.service';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Chofer } from '../../model/chofer';
import { UploadFile, UploadEvent, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';

@Injectable()
export class ChoferService extends GenericService {

  constructor(protected http : HttpClient, protected helper : JwtHelperService) {
    super(http, helper);
  }

  getAll() : Promise<Array<Chofer>> {
    return this.get<Array<Chofer>>('/chofer/list').toPromise().then(res => {
      res.forEach(e => {
        e.foto = this.url + '/fotos/' + e.email + '.jpg';
      })
      return res;
    });
  }

  guardar(chofer : Chofer) : Promise<any> {
    return this.post<any>('/chofer/', chofer).toPromise();
  }

  acutalizar(chofer : Chofer) : Promise<any> {
    return this.put<any>('/chofer/', chofer).toPromise();
  }

  eliminar(email : string) : Promise<any> {
    return this.delete('/chofer/' + email).toPromise();
  }

  getChofer(email : string) : Promise<any> {
    return this.get('/chofer/find/' + email).toPromise();
  }

  subiFotoChofer(email : string, f : UploadFile) : Promise<any> {
    const fileEntry = f.fileEntry as FileSystemFileEntry;
    const formData = new FormData()
    let prom = new Promise((resolve, reject) => {

      fileEntry.file((file: File) => {

        formData.append('foto', file, f.relativePath + ';' + email);
        resolve(formData)
      });
    });

    return prom.then(res => {
      return this.http.post(this.url + '/chofer/foto', formData, { headers : this.headers, responseType : 'blob' }).toPromise();
    });
    
  }
}
