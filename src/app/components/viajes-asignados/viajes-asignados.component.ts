import { Component, OnInit } from '@angular/core';
import { Viajes } from '../../model/viajes';
import { ViajesService } from '../../services/viajes/viajes.service';
import { GoogleMapSelectorComponent } from '../google-map-selector/google-map-selector.component';
import { MatDialogRef, MatDialog } from '@angular/material';
import { AlertService } from '../../services/alert/alert.service';
import { FinalizarFormComponent } from '../finalizar-form/finalizar-form.component';

@Component({
  selector: 'app-viajes-asignados',
  templateUrl: './viajes-asignados.component.html',
  styleUrls: ['./viajes-asignados.component.css']
})
export class ViajesAsignadosComponent implements OnInit {

  loading : boolean;
  dataSource : Array<Viajes>;
  displayedColumns = ['fecha', 'hora', 'ruta', 'medioPago', 'estado'];
  gmSelector : MatDialogRef<GoogleMapSelectorComponent>;
  finalizarRef : MatDialogRef<FinalizarFormComponent>;

  constructor(private vSrv : ViajesService, private matDialog : MatDialog, private alert : AlertService) { }

  ngOnInit() {
    this.getViajes();
  }

  getViajes() {
    this.loading = true;
    this.vSrv.getViajesDisponibles().then(res => {
      setTimeout(() => {
        this.loading = false;
        this.dataSource = res;
      }, 1000);
    }).catch(err => {
      console.log(err);
    });
  }

  openMap(row : Viajes, destino) {
    this.gmSelector = this.matDialog.open(GoogleMapSelectorComponent, {
      width : '60%',
      data : {
        hidenButtons : true,
        title : 'Seleccionar destino',
        lat : Number(destino ? row.destinoLat : row.origenLat),
        lng : Number(destino ? row.destinoLong : row.origenLong)
      }
    });

  }

  verRuta(row : Viajes) {
    this.gmSelector = this.matDialog.open(GoogleMapSelectorComponent, {
      width : '60%',
      data : {
        hidenButtons : true,
        title : 'Seleccionar destino',
        showRuta : true,
        origen : {

            lat : Number(row.origenLat),
            lng : Number(row.origenLong)
        },
        destino : {

            lat : Number(row.destinoLat),
            lng : Number(row.destinoLong)
        }
      }
    });

  }

  tomarViaje(row : Viajes) {
    let a = this.alert.create({
      message : '¿Seguro que toma este viaje?',
      buttons : [
        {
          text : 'Si',
          color : 'primary',
          handler : () => {
            this._tomarViaje(row);
          }
        },
        'No'
      ]
    });
    a.presentConfirm();
  }

  finalizar(row : Viajes) {
    this.finalizarRef = this.matDialog.open(FinalizarFormComponent);
    this.finalizarRef.afterClosed().subscribe(res => {
      
      this._finalizarViaje(row, res)
    });
  }

  private _tomarViaje(viaje : Viajes) {
    this.vSrv.tomarViaje(viaje.viajeID).then(res => {
      this.getViajes();
    }).catch(err => {
      let alerta = this.alert.create({
        message : err.error.message,
        title : '¡Error!',
        buttons : ['Aceptar']
      });
      alerta.present();
    });
  }

  private _finalizarViaje(viaje : Viajes, precio : number) {
    this.vSrv.finalizar(viaje.viajeID, precio).then(res => {
      this.getViajes();
    }).catch(err => {
      let alerta = this.alert.create({
        message : err.error.message,
        title : '¡Error!',
        buttons : ['Aceptar']
      });
      alerta.present();
    });
  }
}
