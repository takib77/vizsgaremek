import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-editor',
  templateUrl: './product-editor.component.html',
  styleUrls: ['./product-editor.component.scss']
})
export class ProductEditorComponent implements OnInit {

  product: Product = new Product();
  title: string = '';

  constructor(
    private productservice: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params => {
        if (params.id === '0') {
          this.product = new Product();
          this.title = 'Új felhasználó felvétele';
        }
        else
          this.productservice.get(params.id).subscribe(
            item => {
              this.product = item;
              this.title = 'Felhasználó szerkesztése';
            })
      })
  }

  onSubmit(product: Product): void {
    if (!product._id) {
      this.productservice.create(product).subscribe(() => {
        this.router.navigate(['/products'])
      });

    } else {
      this.productservice.update(product).subscribe(() => {
        this.router.navigate(['/products'])
      });
    }
  }

}
