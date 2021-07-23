import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Products } from '../model/products';
import { BaseService } from './base.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends BaseService<Products> {

  constructor(
    public http: HttpClient,
    public config: ConfigService
  ) {
    super(http, config);
    this.entity = 'products'
  }
}
