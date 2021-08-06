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

  animalTable: IDataDisplayer[] = [
    { key: '_id', title: '#' },
    { key: 'name', title: 'NÉV' },
    { key: 'category', title: 'OSZTÁLY' },
    { key: 'subCategory', title: 'KATEGÓRIA' },
    { key: 'description', title: 'LEÍRÁS' },
    { key: 'img', title: 'KÉP' },
    { key: 'price', title: 'ÁR' },
    { key: 'active', title: 'KAPHATÓ?' },
  ];

  orderTable: IDataDisplayer[] = [
    { key: '_id', title: '#' },
    { key: 'user', title: 'FELHASZNÁLÓ' },
    { key: 'products', title: 'TERMÉKEK' },
    { key: 'time', title: 'DÁTUM', pipes: [ConfigService.formateDate] },
    { key: 'note', title: 'MEGJEGYZÉS' },
  ];

  productTable: IDataDisplayer[] = [
    { key: '_id', title: '#' },
    { key: 'name', title: 'MEGNEVEZÉS' },
    { key: 'goodFor', title: 'MELYIK ÁLLATHOZ JÓ?' },
    { key: 'weight', title: 'TÖMEG' },
    { key: 'size', title: 'MÉRET' },
    { key: 'material', title: 'ANYAG' },
    {
      key: 'price', title: 'ÁR',
      pipes: [new CurrencyPipe('hu-HU')],
      pipeArgs: [['HUF', 'symbol', '3.0']]
    },
    { key: 'active', title: 'KAPHATÓ?', htmlOutput: ConfigService.booleanSign },
    { key: 'organic', title: 'TERMÉSZETES?', htmlOutput: ConfigService.booleanSign },
  ];

  userTable: IDataDisplayer[] = [
    { key: '_id', title: '#' },
    { key: 'first_name', title: 'VEZETÉKNÉV' },
    { key: 'last_name', title: 'KERESZTNÉV' },
    {
      key: 'address', title: 'CÍM',
      pipes: [ConfigService.getSubProperty],
      pipeArgs: [['country', 'city', 'street']]
    },
    { key: 'email', title: 'EMAIL CÍM' },
    { key: 'password', title: 'JELSZÓ' },
    { key: 'role', title: 'JOGOSULTSÁG' },
  ];

  constructor() { }

  static booleanSign(value: boolean): string {
    const icon: string = (value) ? 'fa-check' : 'fa-ban';
    return `<i class="fas ${icon}"></i>`;
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

  static curveLongString(data: string, start: number, end: number, curve: string = '...'): string {
    return data.slice(start, end) + curve;
  }

  static getSubProperty(obj: any, ...keys: string[]): string | number | boolean | undefined {
    return keys.map(key => get(obj, key)).join(' ');
  }

}
