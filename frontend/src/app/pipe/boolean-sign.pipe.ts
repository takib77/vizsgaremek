import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'booleanSign'
})
export class BooleanSignPipe implements PipeTransform {

  transform(value: any): any {
    if (typeof value === 'undefined') {
      return value = '-';
    }
    else if (value == true) {
      return value = '✔';
    }
    else if (value == false) {
      return value = '✖';
    }
    return value;
  }

}
