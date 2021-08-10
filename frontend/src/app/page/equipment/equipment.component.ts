import { Component, EventEmitter, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/model/product';
import { User } from 'src/app/model/user';
import { ProductService } from 'src/app/service/product.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent implements OnInit {

  equipmentList$: Observable<Product[]> = this.productservice.getAll()
    .pipe(map(items => items
      .filter(product => product.category === 'felszerelés')
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
    this.modalText.push(product.goodFor);
    if (product.size) this.modalText.push(product.size);
    if (product.material) this.modalText.push(product.material);
  }

}
