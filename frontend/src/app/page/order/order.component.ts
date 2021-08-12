import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  pageName: string = 'orders';

  constructor(
    private orderservice: OrderService,
    private config: ConfigService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
  }

  onSelectOne(order: Order): void {
    this.router.navigate(['/orders/edit', order._id])
  }

  onDeleteOne(order: Order): void {
    if (confirm(`Biztos hogy törli a(z) \"${order._id}\" azonosítójű rendelést?`)) {
      this.orderservice.delete(order).subscribe(
        () => this.orderList$ = this.orderservice.getAll());
      this.toastr.warning('Az adat törölve lett!', 'Törölve', { timeOut: 3000 });
    }
  }

}