import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-order-editor',
  templateUrl: './order-editor.component.html',
  styleUrls: ['./order-editor.component.scss']
})
export class OrderEditorComponent implements OnInit {

  order: Order = new Order();
  title: string = '';

  constructor(
    private orderservice: OrderService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params => {
        if (params.id === '0') {
          this.order = new Order();
          this.title = 'Új rendelés felvétele';
        }
        else
          this.orderservice.get(params.id).subscribe(
            item => {
              this.order = item;
              this.title = 'Rendelés szerkesztése';
            })
      })
  }

  onSubmit(order: Order): void {
    if (!order._id) {
      this.orderservice.create(order).subscribe(() => {
        this.router.navigate(['/orders'])
      });

    } else {
      this.orderservice.update(order).subscribe(() => {
        this.router.navigate(['/orders'])
      });
    }
  }

}
