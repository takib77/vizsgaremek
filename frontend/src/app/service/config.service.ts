import { CurrencyPipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { get } from 'lodash';

export interface IDataDisplayer {
  key: string;
  title: string;
  outputTransform?: any;
  htmlOutput?: any;
  pipes?: any[];
  pipeArgs?: any[][];
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  // public readonly apiUrl: string = 'http://localhost:3000/';
  public readonly apiUrl: string = 'http://127.0.0.1:3000/';

  animalTable: IDataDisplayer[] = [
    { key: 'name', title: 'NÉV' },
    { key: 'category', title: 'KATEGÓRIA' },
    { key: 'description', title: 'LEÍRÁS', pipes: [ConfigService.cutLongString], pipeArgs: [[0, 250]] },
    {
      key: 'price', title: 'ÁR',
      pipes: [new CurrencyPipe('hu-HU')],
      pipeArgs: [['HUF', 'symbol', '3.0']]
    },
    { key: "active", title: 'ELÉRHETŐ?' }
  ];

  animalSearch: IDataDisplayer[] = [
    { key: 'name', title: 'NÉV' },
    { key: 'category', title: 'KATEGÓRIA' },
    { key: 'description', title: 'LEÍRÁS' },
    { key: 'price', title: 'ÁR' }
  ];

  orderTable: IDataDisplayer[] = [
    { key: 'user', title: 'MEGRENDELŐ AZ.' },
    { key: 'products', title: 'TERMÉK(EK) AZ.' },
    { key: 'time', title: 'DÁTUM' },
    { key: 'note', title: 'MEGJEGYZÉS' },
  ];

  productTable: IDataDisplayer[] = [
    { key: 'name', title: 'TERMÉKNÉV' },
    { key: 'goodFor', title: 'MELYIK ÁLLATHOZ JÓ?' },
    { key: 'weight', title: 'TÖMEG' },
    { key: 'size', title: 'MÉRET' },
    {
      key: 'price', title: 'ÁR',
      pipes: [new CurrencyPipe('hu-HU')],
      pipeArgs: [['HUF', 'symbol', '3.0']]
    },
    { key: "active", title: 'ELÉRHETŐ?' },
    { key: "organic", title: 'TERMÉSZETES?' }
  ];

  productSearch: IDataDisplayer[] = [
    { key: 'name', title: 'TERMÉKNÉV' },
    { key: 'goodFor', title: 'MELYIK ÁLLATHOZ JÓ?' },
    { key: 'weight', title: 'TÖMEG' },
    { key: 'size', title: 'MÉRET' },
    { key: 'price', title: 'ÁR' }
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
  ];

  constructor() { }

  static cutLongString(data: string, start: number, end: number, curve: string = '...'): string {
    return data.slice(start, end) + curve;
  }

  static getSubProperty(obj: any, ...keys: string[]): string | number | boolean | undefined {
    return keys.map(key => get(obj, key)).join(' ');
  }

}
