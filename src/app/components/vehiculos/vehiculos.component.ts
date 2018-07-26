import { Component, OnInit } from '@angular/core';
import { ChoferesFormComponent } from '../choferes-form/choferes-form.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { VehiculosFormsComponent } from '../vehiculos-forms/vehiculos-forms.component';
import { VehiculoService } from '../../services/vehiculo.service';
import { Vehiculo } from '../../model/vehiculo';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.css']
})
export class VehiculosComponent implements OnInit {

  displayedColumns = ['foto', 'color', 'patente', 'comodidad', 'modelo', 'marca', 'anio'];
  dataSource : Array<Vehiculo>;
  loading : boolean;
  matDialogRef : MatDialogRef<VehiculosFormsComponent>;

  constructor(private matDialog : MatDialog, private vSrv : VehiculoService) {
    this.dataSource = new Array<Vehiculo>();
  }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.loading = true;
    this.vSrv.getAll().then(res => {
      setTimeout(() => {
        this.dataSource = res;
        this.loading = false;
      }, 2000);
    }).catch(err => {
      console.log(err);
      this.loading = false;
    })
  }

  nuevo() {
    this.matDialogRef = this.matDialog.open(VehiculosFormsComponent, { width: '60%' });
    this.matDialogRef.afterClosed().subscribe(res => {
      if(res) {
        this.getAll();
      }
    });
  }

  editVehiculo(row) {
    this.matDialogRef = this.matDialog.open(VehiculosFormsComponent, { width: '60%', data : {
      patente : row.patente
    }});
    this.matDialogRef.afterClosed().subscribe(res => {
      if(res) {
        this.getAll();
      }
    });
  }
}
