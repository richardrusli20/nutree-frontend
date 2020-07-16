import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { DatePipe } from '@angular/common';

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

  constructor(private api:ApiService,private dp:DatePipe) {
    this.getOrders();
   }

  getOrders = () => {
    this.api.getCustomerOrder().subscribe(
      data=>{
        console.log(data.order)
        this.orders = data.order;
        
      },
      error=>{
        console.log(error)
      }
    )
  }

  ngOnInit(): void {
  }

}
