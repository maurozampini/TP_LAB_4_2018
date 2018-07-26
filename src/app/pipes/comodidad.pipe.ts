import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'comodidad'
})
export class ComodidadPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(value == 'uno') {
      return 'star_border';
    } else if (value == 'dos') {
      return 'star_border star_border';
    } else if (value == 'tres') {
      return 'star_border star_border star_border';
    } else if (value == 'cuatro') {
      return 'star_border star_border star_border star_border';
    } else if (value == 'cinco') {
      return 'star_border star_border star_border star_border star_border';
    }
    return '';
  }

}
