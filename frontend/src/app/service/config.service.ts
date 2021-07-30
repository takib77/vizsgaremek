import { Injectable } from '@angular/core';

export interface IDataDisplayer {
  key?: string;
  title?: string;
  hidden?: boolean;
  pipes?: any[];
  pipeArgs?: any[][];
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  public readonly apiUrl: string = 'http://localhost:3000/';

  animalsTable: IDataDisplayer[] = [
    { key: 'id', title: '#' },
    { key: 'name', title: 'NÉV' },
    { key: 'category', title: 'OSZTÁLY' },
    { key: 'subCategory', title: 'KATEGÓRIA' },
    { key: 'description', title: 'LEÍRÁS' },
    { key: 'img', title: 'KÉP' },
    { key: 'price', title: 'ÁR' },
    { key: 'active', title: 'KAPHATÓ?' },
  ];

  ordersTable: IDataDisplayer[] = [
    { key: 'id', title: '#' },
    { key: 'user', title: 'FELHASZNÁLÓ' },
    { key: 'products', title: 'TERMÉKEK' },
    { key: 'time', title: 'DÁTUM' },
    { key: 'note', title: 'MEGJEGYZÉS' },
  ];

  productsTable: IDataDisplayer[] = [
    { key: 'id', title: '#' },
    { key: 'name', title: 'MEGNEVEZÉS' },
    { key: 'goodFor', title: 'MELYIK ÁLLATHOZ JÓ?' },
    { key: 'weight', title: 'TÖMEG' },
    { key: 'size', title: 'MÉRET' },
    { key: 'material', title: 'ANYAG' },
    { key: 'price', title: 'ÁR' },
    { key: 'active', title: 'KAPHATÓ?' },
    { key: 'organic', title: 'TERMÉSZETES?' },
  ];

  usersTable: IDataDisplayer[] = [
    { key: 'id', title: '#' },
    { key: 'firstName', title: 'VEZETÉKNÉV' },
    { key: 'lastName', title: 'KERESZTNÉV' },
    { key: 'email', title: 'EMAIL' },
    { key: 'password', title: 'JELSZÓ' },
    { key: 'role', title: 'JOGOSULTSÁG' },
  ];

  constructor() { }
}
