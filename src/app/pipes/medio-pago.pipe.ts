import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'medioPago'
})
export class MedioPagoPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(value == 'CC') {
      return 'Cuenta corriente'
    } else if(value == 'EFEC') {
      return 'Efectivo'
    }
    return 'No se sabe';
  }

}
