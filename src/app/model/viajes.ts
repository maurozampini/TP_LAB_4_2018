export class Viajes {
    viajeID: number;
    usuarioID: number;
    origenLat: number;
    origenLong: number;
    destinoLat: number;
    destinoLong: number;
    comodidad: string;
    internalDate : Date = new Date();
    fecha: any;
    hora: string;
    medioPago: number;
    estado: number;

    public getFecha() {
        if(this.internalDate instanceof Date) {
          let d = this.internalDate;
          let month = '' + (d.getMonth() + 1);
          let day = '' + d.getDate();
          let year = d.getFullYear();
    
          if (month.length < 2) month = '0' + month;
          if (day.length < 2) day = '0' + day;
    
          return [year, month, day].join('-');
        }
        return this.internalDate
    }

}