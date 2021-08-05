import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any[] | null, key: string = '', phrase: string | number | boolean): Array<any> | null {

    if (!Array.isArray(value) || !key || !phrase) {
      return value;
    }

    phrase = typeof phrase === 'number' ? phrase : ('' + phrase).toLowerCase();

    return value.filter(item => {
      if (typeof item[key] === 'number' && typeof phrase === 'number') {
        return item[key] === phrase;
      }

      return ('' + item[key]).toLowerCase().includes(phrase as string);
    })

  }
}


