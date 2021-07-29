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

  constructor() { }
}
