import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'booleanSign'
})
export class BooleanSignPipe implements PipeTransform {

  transform(value: any): any {
    if (value === true || value === 'true') {
      return value = '✔';
    }
    else if (value === false || value === 'false') {
      return value = '✖';
    }
    return value;
  }

}
