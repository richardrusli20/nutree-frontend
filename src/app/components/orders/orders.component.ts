import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders=[];
  order_id;
  foodlist= [];
  date;

  constructor(private api:ApiService) {
    this.getOrders();
   }

  getOrders = () => {
    this.api.getCustomerOrder().subscribe(
      data=>{
        console.log(data.order)
        this.orders = data.order;
        // this.date = new Date (data.order_date);
        // this.foodlist = data.item;
        // console.log(this.foodlist)
        // this.order_id = Date.parse(data.order.order_date)
      },
      error=>{
        console.log(error)
      }
    )
  }

  ngOnInit(): void {
  }

}
