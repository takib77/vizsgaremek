import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
  }

  onSelectOne(product: Product): void {
    this.router.navigate(['/product', product._id])
  }

  onDeleteOne(product: Product): void {
    if (confirm(`Biztos hogy törli a(z) \"${product.name}\" nevű terméket?`))
      this.productservice.delete(product).subscribe(
        () => this.productList$ = this.productservice.getAll()
      )
    this.toastr.warning('Az adat törölve lett!', 'Törölve', { timeOut: 3000 });
  }

}
