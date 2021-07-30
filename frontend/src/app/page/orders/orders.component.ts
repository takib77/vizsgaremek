import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/model/order';
import { ConfigService, IDataDisplayer } from 'src/app/service/config.service';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  ordersList$: Observable<Order[]> = this.orderservice.getAll();
  ordersTable: IDataDisplayer[] = this.config.ordersTable;
  ordersTitle: string = 'Rendelések listája';

  constructor(
    private orderservice: OrderService,
    private config: ConfigService
  ) { }

  ngOnInit(): void {
  }

}