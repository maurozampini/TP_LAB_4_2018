import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { AlertService } from '../../services/alert/alert.service';

@Component({
  selector: 'app-finalizar-form',
  templateUrl: './finalizar-form.component.html',
  styleUrls: ['./finalizar-form.component.css']
})
export class FinalizarFormComponent implements OnInit {

  precio : number = 50;

  constructor(public dialogRef: MatDialogRef<FinalizarFormComponent>, private alert : AlertService) { }

  ngOnInit() {
  }

  conf() {
    if(this.precio && this.precio >= 50) {

      this.dialogRef.close(this.precio);
    } else {
      let a = this.alert.create({
        message : 'Debe indicar un precio mayor o igual a 50'
      });
      a.present();
    }
  }

  cancelar() {
    this.dialogRef.close(false);
  }
}
