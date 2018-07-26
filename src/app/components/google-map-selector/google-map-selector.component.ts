import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-google-map-selector',
  templateUrl: './google-map-selector.component.html',
  styleUrls: ['./google-map-selector.component.css']
})
export class GoogleMapSelectorComponent implements OnInit {

  lat: number = -34.6627102;
  lng: number = -58.3647037;
  destino : any;
  origen : any;

  constructor(
    public dialogRef: MatDialogRef<GoogleMapSelectorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      if(data.showRuta) {
        this.origen = data.origen;
        this.lat = data.origen.lat;
        this.lng = data.origen.lng;
        this.destino = data.destino;
      } else {

        if(data.lat && data.lng) {
          this.lat = data.lat;
          this.lng = data.lng;
        }
      }
    }

  ngOnInit() {
  }

  dblClick(event) {
    let coords = event.coords;
    this.lat = coords.lat;
    this.lng = coords.lng;
  }
  confirmar() {
    this.dialogRef.close({ lat : this.lat, lng : this.lng});
  }
}
