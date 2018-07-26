import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GoogleMapSelectorComponent } from '../google-map-selector/google-map-selector.component';
import {Viajes} from '../../model/viajes';
import { ViajesService } from '../../services/viajes/viajes.service';
import { AlertService } from '../../services/alert/alert.service';
import { SpinnerService } from '../../services/spinner/spinner.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-viaje-form',
  templateUrl: './nuevo-viaje-form.component.html',
  styleUrls: ['./nuevo-viaje-form.component.css']
})
export class NuevoViajeFormComponent implements OnInit {
  title: string = 'My first AGM project';
  viaje : Viajes;
  minDate = new Date();

  gmSelector : MatDialogRef<GoogleMapSelectorComponent>;

  constructor(private matDialog : MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, private matDialogRef : MatDialogRef<NuevoViajeFormComponent>, public vService : ViajesService, public alertServ : AlertService, public spinner : SpinnerService, private router : Router) {
    this.viaje = new Viajes();
    this.viaje.origenLat = -34.6627102;
    this.viaje.origenLong = -58.3647037;
    this.viaje.destinoLat = -34.6627102;
    this.viaje.destinoLong = -58.3647037;
  }

  ngOnInit() {
    if(this.data && this.data.viaje) {
      
      this.viaje = Object.assign(this.viaje, this.data.viaje);
        let f = this.viaje.fecha.split('-');
        this.viaje.internalDate = new Date(f[0], f[1] - 1, f[2]);
      
    }
  }

  openOrigen() {
    this.gmSelector = this.matDialog.open(GoogleMapSelectorComponent, {
      width : '60%',
      data : {
        title : 'Seleccionar origen',
        lat : Number(this.viaje.origenLat),
        lng : Number(this.viaje.origenLong)
      }
    });

    this.gmSelector.afterClosed().subscribe(coords => {
      if(coords) {

        this.viaje.origenLat = coords.lat;
        this.viaje.origenLong = coords.lng;
        console.log(coords);
      }
    })
  }


  openDestino() {
    this.gmSelector = this.matDialog.open(GoogleMapSelectorComponent, {
      width : '60%',
      data : {
        title : 'Seleccionar destino',
        lat : Number(this.viaje.destinoLat),
        lng : Number(this.viaje.destinoLong)
      }
    });

    this.gmSelector.afterClosed().subscribe(coords => {
      if(coords) {

        this.viaje.destinoLat = coords.lat;
      this.viaje.destinoLong = coords.lng;
      console.log(coords);
      }
    })
  }

  solicitar() {
    if(this.hasErrors()) return;
    this.spinner.showSpinner();
    if(this.viaje.viajeID) {
      this.vService.actualizarSolicitud(this.viaje).then(res => {
        setTimeout(() => {
          this.spinner.hiddenSpinner();
          this.matDialogRef.close(true);
          if(!this.data || (this.data && !this.data.hideIrViajes) ) {

            let a = this.alertServ.create({
              message : '¿Desea ver sus viajes?',
              buttons : [
                {
                  text : 'Si',
                  color : 'primary',
                  handler : () => {
                    this.router.navigate(['/mis-viajes']);
                  },
                },
                'No'
              ]
            });
            a.presentConfirm();
          }
        }, 1500);
      }).catch(err => {
        setTimeout(() => {
          this.spinner.hiddenSpinner();
          let alerta = this.alertServ.create({
            message : err.error.message,
            title : '¡Error!',
            buttons : ['Aceptar']
          });
          alerta.present();
        }, 1500);
      });
    } else {
      this.vService.solicitar(this.viaje).then(res => {
        setTimeout(() => {
          this.spinner.hiddenSpinner();
          this.matDialogRef.close(true);
          if(!this.data || (this.data && !this.data.hideIrViajes) ) {

            let a = this.alertServ.create({
              message : '¿Desea ver sus viajes?',
              buttons : [
                {
                  text : 'Si',
                  color : 'primary',
                  handler : () => {
                    this.router.navigate(['/mis-viajes']);
                  },
                },
                'No'
              ]
            });
            a.presentConfirm();
          }
        }, 1500);
      }).catch(err => {
        setTimeout(() => {
          this.spinner.hiddenSpinner();
          let alerta = this.alertServ.create({
            message : err.error.message,
            title : '¡Error!',
            buttons : ['Aceptar']
          });
          alerta.present();
        }, 1500);
      })
    }
  }

  hasErrors() {
    let message;
    if(!this.viaje.comodidad) {
      message = 'No completo la comodidad';
    } else if (!this.viaje.internalDate) {
      message = 'No selecciono una fecha';
    } else if (!this.viaje.hora) {
      message = 'Debe indicar una hora';
    } else if (!this.viaje.medioPago) {
      message = 'Debe indicar el medio de pago';
    }
    if(message) {
      let a = this.alertServ.create({
        message : message
      });
      a.present();
      return true;
    }
    return false;
  }

  eliminar() {
    let a = this.alertServ.create({
      message : '¿Seguro que quiere eliminar el viaje solicitado?',
      buttons : [
        {
          text : 'Si',
          color :'primary',
          handler : () => {
            this.eleminarConfirm();
          }
        },
        'No'
      ]
    });
    a.presentConfirm();
  }

  eleminarConfirm() {
    this.spinner.showSpinner();
    this.vService.eliminar(this.viaje.viajeID).then(res => {

      setTimeout(() => {
        this.spinner.hiddenSpinner();
        this.matDialogRef.close(true);
      }, 1500);
    }).catch(err => {

      setTimeout(() => {
        this.spinner.hiddenSpinner();
        let alerta = this.alertServ.create({
          message : err.error.message,
          title : '¡Error!',
          buttons : ['Aceptar']
        });
        alerta.present();
      }, 1500);
    })
  }
}
