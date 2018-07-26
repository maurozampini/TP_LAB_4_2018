import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../model/user';
import { ClientesService } from '../../services/clientes/clientes.service';
import { SpinnerService } from '../../services/spinner/spinner.service';
import { AlertService } from '../../services/alert/alert.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  loading : boolean;
  dataSource : Array<Usuario>;
  displayedColumns = ['nombre', 'apellido', 'email', 'activo'];

  constructor(private cServices : ClientesService, private spinner : SpinnerService, private alert : AlertService) { }

  ngOnInit(): void {
    this.getAll(); 
  }

  getAll() {
    this.loading = true;
    this.cServices.getAll().then(res => {
      setTimeout(() => {
        this.dataSource = res;
        this.loading = false;
      }, 2000);
    }).catch(err => {
      setTimeout(() => {
        this.loading = false;
        console.log(err);
      }, 1000);
    })
  }

  activar(usu) {
    this.spinner.showSpinner();
    this.cServices.activar(usu).then(res => {
      setTimeout(() => {
        this.spinner.hiddenSpinner();
      }, 1500);
    }).catch(err => {
      usu.activo = !usu.activo;
      setTimeout(() => {
        this.spinner.hiddenSpinner();
        let alerta = this.alert.create({
          message : err.error.message,
          title : '¡Error!',
          buttons : ['Aceptar']
        });
        alerta.present();

      }, 1500);
    });
  }

  desactivar(usu) {
    this.spinner.showSpinner();
    this.cServices.desactivar(usu).then(res => {
      setTimeout(() => {
        this.spinner.hiddenSpinner();
      }, 1500);
    }).catch(err => {
      usu.activo = !usu.activo;
      setTimeout(() => {
        this.spinner.hiddenSpinner();
        let alerta = this.alert.create({
          message : err.error.message,
          title : '¡Error!',
          buttons : ['Aceptar']
        });
        alerta.present();

      }, 1500);
    });
  }


  eliminar(usu : Usuario) {
    let a = this.alert.create({
      message : '¿Desea eliminar el auto con la patente ' + usu.nombre + ' ' + usu.apellido + '?',
      buttons : [
        {
          text : 'Aceptar',
          handler : () => {
            this.eliminarConfirm(usu);
          },
          color : 'primary'
        },
        'Cancelar'
      ]
    });
    a.presentConfirm();
  }
  
  eliminarConfirm(usu : Usuario) {

    this.spinner.showSpinner();
    this.cServices.eliminar(usu.email).then(res => {
      setTimeout(() => {
        this.spinner.hiddenSpinner();
        this.getAll();
      }, 1000);
    }).catch(err => {
      this.spinner.hiddenSpinner();
      let a = this.alert.create({
        message : err.error.message,
        title : 'Error'
      });
      a.present();
    })
  }
}
