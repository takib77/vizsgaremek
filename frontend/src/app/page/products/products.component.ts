import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/product';
import { ConfigService, IDataDisplayer } from 'src/app/service/config.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  productsList$: Observable<Product[]> = this.productservice.getAll();
  productsTable: IDataDisplayer[] = this.config.productsTable;
  productsTitle: string = 'Termékek listája';

  constructor(
    private productservice: ProductService,
    private config: ConfigService
  ) { }

  ngOnInit(): void {
  }

}
