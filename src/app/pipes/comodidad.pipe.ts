import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'comodidad'
})
export class ComodidadPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(value == 'uno') {
      return 'star';
    } else if (value == 'dos') {
      return 'star star';
    } else if (value == 'tres') {
      return 'star star star';
    } else if (value == 'cuatro') {
      return 'star star star star';
    } else if (value == 'cinco') {
      return 'star star star star star';
    }
    return '';
  }

}
