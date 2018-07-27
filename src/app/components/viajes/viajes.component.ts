import { Component, OnInit } from '@angular/core';
import { Viajes } from '../../model/viajes';
import { ViajesService } from '../../services/viajes/viajes.service';
//import { MatTableDataSource } from '@angular/material';

import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.component.html',
  styleUrls: ['./viajes.component.css']
})
export class ViajesComponent implements OnInit {

  loading : boolean;
  dataSource : Array<Viajes>;
  displayedColumns = ['fecha', 'hora', 'comodidad','medioPago', 'estado', 'precio'];
  misViajes: Array<any> = [];

  constructor(private viajes : ViajesService) { }

  ngOnInit() {
    this.getViajes();
  }

  getViajes() {

    this.loading = true;
    this.misViajes = [];
    this.viajes.findAll().then(res => {
      setTimeout(() => {
        this.loading = false;
        this.dataSource = res;
      }, 1550);
    }).catch(err => {
      console.log(err);
    });
  }

exportar(){

var columns = [
  { title: "fecha", dataKey: "fecha" },
  { title: "hora", dataKey: "hora" },
  { title: "comodidad", dataKey: "comodidad" },
  { title: "medioPago", dataKey: "medioPago" },
  { title: "estado", dataKey: "estado" },
  { title: "precio", dataKey: "precio" }
 ];

 var doc = new jsPDF('landscape');
 doc.autoTable(columns, this.dataSource);
 doc.save('table.pdf');

 }
/*
 applyFilter(filterValue: string) {
  filterValue = filterValue.trim(); // Remove whitespace
  filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
  this.dataSource.filter = filterValue;
}
*/
}
