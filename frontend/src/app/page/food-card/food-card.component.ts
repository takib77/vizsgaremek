import { Component, EventEmitter, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/model/product';
import { User } from 'src/app/model/user';
import { ProductService } from 'src/app/service/product.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-food-card',
  templateUrl: './food-card.component.html',
  styleUrls: ['./food-card.component.scss']
})
export class FoodCardComponent implements OnInit {

  foodList$: Observable<Product[]> = this.productservice.getAll()
    .pipe(map(items => items
      .filter(product => product.category === 'eledel')
      .filter(product => product.active === true)
      .sort(() => 0.5 - Math.random())));

  user$: User = new User();

  selectProduct: EventEmitter<Product> = new EventEmitter<Product>();
  modalTitle: string = '';
  modalText: any[] = [];

  constructor(
    private productservice: ProductService,
    private userservice: UserService
  ) { }

  ngOnInit(): void {
    this.user$.role = 0;
  }

  onClickImage(product: Product): void {
    this.selectProduct.emit(product);
    this.modalText = [];
    this.modalTitle = product.name;
    this.modalText.push(`Melyik állat(ok)hoz jó: ${product.goodFor}`);
    if (product.weight) this.modalText.push(`Súly: ${product.weight} gramm`);
    if (product.organic) {
      const boolean = (product.organic) ? 'Természetes: Igen' : 'Természtes: Nem';
      this.modalText.push(boolean);
    }
  }

}
