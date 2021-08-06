import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/model/order';
import { ConfigService, IDataDisplayer } from 'src/app/service/config.service';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  orderList$: Observable<Order[]> = this.orderservice.getAll();
  orderTable: IDataDisplayer[] = this.config.orderTable;
  orderTitle: string = 'Rendelések listája';

  constructor(
    private orderservice: OrderService,
    private config: ConfigService
  ) { }

  ngOnInit(): void {
  }

}