import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  pageName: string = 'product';

  constructor(
    private productservice: ProductService,
    private config: ConfigService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSelectOne(product: Product): void {
    this.router.navigate(['/product', product._id])
  }

  onDeleteOne(product: Product): void {
    if (confirm(`Biztos hogy törli a \"${product.name}\" nevű terméket?`))
      this.productservice.delete(product).subscribe(
        () => this.productList$ = this.productservice.getAll()
      )
  }

}
