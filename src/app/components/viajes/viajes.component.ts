import { Component, OnInit } from '@angular/core';
import { Viajes } from '../../model/viajes';
import { ViajesService } from '../../services/viajes/viajes.service';

@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.component.html',
  styleUrls: ['./viajes.component.css']
})
export class ViajesComponent implements OnInit {

  loading : boolean;
  dataSource : Array<Viajes>;
  displayedColumns = ['fecha', 'hora', 'comodidad','medioPago', 'estado', 'precio'];

  constructor(private viajes : ViajesService) { }

  ngOnInit() {
    this.getViajes();
  }

  getViajes() {

    this.loading = true;
    this.viajes.findAll().then(res => {
      setTimeout(() => {
        this.loading = false;
        this.dataSource = res;
      }, 1550);
    }).catch(err => {
      console.log(err);
    });
  }
}
