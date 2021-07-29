import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { BaseService } from './base.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService<Product> {

  constructor(
    public http: HttpClient,
    public config: ConfigService
  ) {
    super(http, config);
    this.entity = 'products'
  }
}
