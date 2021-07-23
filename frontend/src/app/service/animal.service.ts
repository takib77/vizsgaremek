import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Animal } from '../model/animal';
import { BaseService } from './base.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class AnimalService extends BaseService<Animal> {

  constructor(
    public http: HttpClient,
    public config: ConfigService
  ) {
    super(http, config);
    this.entity = 'animals';
  }

}
