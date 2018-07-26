import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ChoferesFormComponent } from '../choferes-form/choferes-form.component';
import { Chofer } from '../../model/chofer';
import { ChoferService } from '../../services/chofer/chofer.service';

@Component({
  selector: 'app-choferes',
  templateUrl: './choferes.component.html',
  styleUrls: ['./choferes.component.css']
})
export class ChoferesComponent implements OnInit {


  loading : boolean;
  dataSource : Array<Chofer>;
  displayedColumns = ['foto', 'nombre', 'apellido', 'email', 'patente', 'activo'];
  matDialogRef : MatDialogRef<ChoferesFormComponent>;

  constructor(private matDialog : MatDialog, private choferService : ChoferService) { }

  ngOnInit(): void {
    this.getAll(); 
  }

  getAll() {
    this.loading = true;
    this.choferService.getAll().then(res => {
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

  nuevo() {
    this.matDialogRef = this.matDialog.open(ChoferesFormComponent, { width: '60%' });
    this.matDialogRef.afterClosed().subscribe(res => {
      if(res) {
        this.getAll();
      }
    });
  }

  edit(row) {
    this.matDialogRef = this.matDialog.open(ChoferesFormComponent, { width: '60%', data : {
      email : row.email
    }});
    this.matDialogRef.afterClosed().subscribe(res => {
      if(res) {
        this.getAll();
      }
    });
  }
}
