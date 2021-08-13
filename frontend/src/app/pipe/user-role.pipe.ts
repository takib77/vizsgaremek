import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userRole'
})
export class UserRolePipe implements PipeTransform {

  transform(value: number | string): string {
    let role: string;
    if (typeof value === 'string') value = parseInt(value);
    switch (value) {
      case 3:
        role = 'Admin';
        break;
      case 2:
        role = 'Üzemeltető';
        break;
      default: 1;
        role = 'Felhasználó'
        break;
    }
    return role
  }

}
