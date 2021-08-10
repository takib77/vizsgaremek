import { CurrencyPipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { get } from 'lodash';

export interface IDataDisplayer {
  key: string;
  title: string;
  hidden?: boolean;
  outputTransform?: any;
  htmlOutput?: any;
  pipes?: any[];
  pipeArgs?: any[][];
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  public readonly apiUrl: string = 'http://localhost:3000/';
  public readonly serviceUrl: string = 'http://127.0.0.1:3000/';

  animalTable: IDataDisplayer[] = [
    { key: 'name', title: 'NÉV' },
    { key: 'category', title: 'KATEGÓRIA' },
    { key: 'description', title: 'LEÍRÁS' },
    { key: 'price', title: 'ÁR' },
    { key: 'active', title: 'KAPHATÓ?', htmlOutput: ConfigService.booleanSign },
  ];

  orderTable: IDataDisplayer[] = [
    { key: 'user', title: 'MEGRENDELŐ AZ.' },
    { key: 'products', title: 'TERMÉK(EK) AZ.' },
    { key: 'time', title: 'DÁTUM', pipes: [ConfigService.formateDate] },
    { key: 'note', title: 'MEGJEGYZÉS' },
  ];

  productTable: IDataDisplayer[] = [
    { key: 'name', title: 'TERMÉKNÉV' },
    { key: 'goodFor', title: 'MELYIK ÁLLATHOZ JÓ?' },
    { key: 'weight', title: 'TÖMEG', htmlOutput: ConfigService.noData },
    { key: 'size', title: 'MÉRET', htmlOutput: ConfigService.noData },
    { key: 'material', title: 'ANYAG', htmlOutput: ConfigService.noData },
    {
      key: 'price', title: 'ÁR',
      pipes: [new CurrencyPipe('hu-HU')],
      pipeArgs: [['HUF', 'symbol', '3.0']]
    },
    { key: 'active', title: 'KAPHATÓ?', htmlOutput: ConfigService.booleanSign },
    { key: 'organic', title: 'TERMÉSZETES?', htmlOutput: ConfigService.booleanSign },
  ];

  userTable: IDataDisplayer[] = [
    { key: 'first_name', title: 'VEZETÉKNÉV' },
    { key: 'last_name', title: 'KERESZTNÉV' },
    {
      key: 'address', title: 'CÍM',
      pipes: [ConfigService.getSubProperty],
      pipeArgs: [['country', 'zip', 'city', 'street', 'houseNumber']]
    },
    { key: 'email', title: 'EMAIL CÍM' },
    { key: 'password', title: 'JELSZÓ', htmlOutput: ConfigService.passwordSign },
    { key: 'role', title: 'JOGOSULTSÁG', htmlOutput: ConfigService.roleText },
  ];

  constructor() { }

  static booleanSign(value: boolean | undefined): string {
    if (typeof value === 'undefined') {
      return 'Nincs adat';
    }
    const icon: string = (value) ? 'fa-check' : 'fa-ban';
    return `<i class="fas ${icon}"></i>`;
  }

  static noData(value: any): string {
    return (value === undefined) ? 'Ninca adat' : value;
  }

  static passwordSign(value: string): string {
    return value = '********';
  }

  static roleText(value: number | string): string {
    let role: string;
    if (typeof value === 'string') value = parseInt(value);
    switch (value) {
      case 3:
        role = 'Admin';
        break;
      case 2:
        role = 'Szerkesztő';
        break;
      default: 1;
        role = 'Felhasználó'
        break;
    }
    return role;
  }

  static formateDate(date: number): string | number {
    const dateOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    return Intl.DateTimeFormat('hu', dateOptions).format(date);
  }

  static cutLongString(data: string, start: number, end: number, curve: string = '...'): string {
    return data.slice(start, end) + curve;
  }

  static getSubProperty(obj: any, ...keys: string[]): string | number | boolean | undefined {
    return keys.map(key => get(obj, key)).join(' ');
  }

}
