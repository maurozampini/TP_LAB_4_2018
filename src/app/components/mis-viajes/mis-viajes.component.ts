import { Component, OnInit } from '@angular/core';
import { ViajesService } from '../../services/viajes/viajes.service';
import { Viajes } from '../../model/viajes';
import { MatDialog, MatDialogRef } from '@angular/material';
import { NuevoViajeFormComponent } from '../nuevo-viaje-form/nuevo-viaje-form.component';

@Component({
  selector: 'app-mis-viajes',
  templateUrl: './mis-viajes.component.html',
  styleUrls: ['./mis-viajes.component.css']
})
export class MisViajesComponent implements OnInit {

  loading : boolean;
  dataSource : Array<Viajes>;
  displayedColumns = ['fecha', 'hora', 'comodidad','medioPago', 'estado', 'precio'];
  matDialogRef : MatDialogRef<NuevoViajeFormComponent>;

  constructor(private viajes : ViajesService, private matDialog : MatDialog) { }

  ngOnInit() {
    this.getViajes();
  }

  getViajes() {

    this.loading = true;
    this.viajes.misViajes().then(res => {
      setTimeout(() => {
        this.loading = false;
        this.dataSource = res;
      }, 1550);
    }).catch(err => {
      console.log(err);
    });
  }

  edit(row) {
    this.matDialogRef= this.matDialog.open(NuevoViajeFormComponent, { width : '60%', data : { viaje : row, hideIrViajes : true }});
    this.matDialogRef.afterClosed().subscribe(res => {
      if(res) {
        this.getViajes();
      }
    });    
  }
}
