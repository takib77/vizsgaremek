import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/product';
import { ConfigService, IDataDisplayer } from 'src/app/service/config.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  productList$: Observable<Product[]> = this.productservice.getAll();
  productTable: IDataDisplayer[] = this.config.productTable;
  productTitle: string = 'Termékek listája';

  constructor(
    private productservice: ProductService,
    private config: ConfigService
  ) { }

  ngOnInit(): void {
  }

}
