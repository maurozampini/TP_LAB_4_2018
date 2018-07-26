import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'precio'
})
export class PrecioPipe implements PipeTransform {

  dolar(value: number) {
    var result = value / 30;
    return result.toFixed(2);
  }

  transform(value: any, args?: any): any {
    if (value > 0) {
      return '$ ' + value + ' // U$D ' + this.dolar(value);
    }
    return 'Sin asignar';
  }
}
