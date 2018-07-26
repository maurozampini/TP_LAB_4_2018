import { Component, OnInit } from '@angular/core';
import { InformesService } from '../../services/informes/informes.service';

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.css']
})
export class InformesComponent implements OnInit {

  view = [1100, 500];
  dataHora = [];
  loadingHora : boolean = true;
  loadingComodidad : boolean = true;
  loadingPagos : boolean = true;

  dataComodidad = [];

  dataModoPago = [];

  constructor(private iService : InformesService) { }

  ngOnInit() {
    this.iService.getComodidad().then(res => {
      setTimeout(() => {
        this.dataComodidad = res;
        this.loadingComodidad = false;
      }, 2000)
    }).catch(err => {
      console.log(err);
    });
    this.iService.getHoras().then(res => {
      setTimeout(() => {
        this.dataHora = res;
        this.loadingHora = false;
      }, 1000);
    }).catch(err => {
      console.log(err);
    });
    this.iService.getMediosDePago().then(res => {
      setTimeout(() => {
      this.dataModoPago = res;
      this.loadingPagos = false;
      }, 1500)
    }).catch(err => {
      console.log(err);
    });
  }

}
