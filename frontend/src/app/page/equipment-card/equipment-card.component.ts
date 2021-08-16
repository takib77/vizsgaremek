import { Component, EventEmitter, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-equipment-card',
  templateUrl: './equipment-card.component.html',
  styleUrls: ['./equipment-card.component.scss']
})
export class EquipmentCardComponent implements OnInit {

  equipmentList$: Observable<Product[]> = this.productservice.getAll()
    .pipe(map(items => items
      .filter(product => product.category === 'felszerelés')
      .filter(product => product.active === true)
      .sort(() => 0.5 - Math.random())));

  selectProduct: EventEmitter<Product> = new EventEmitter<Product>();
  modalTitle: string = '';
  modalText: any[] = [];

  constructor(
    private productservice: ProductService,
  ) { }

  ngOnInit(): void { }

  onClickImage(product: Product): void {
    this.selectProduct.emit(product);
    this.modalText = [];
    this.modalTitle = product.name;
    this.modalText.push(`Melyik állat(ok)hoz jó: ${product.goodFor}`);
    if (product.size) this.modalText.push(`Méret: ${product.size}`);
    if (product.weight) this.modalText.push(`Súly: ${product.weight} gramm`);
  }

}
