import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-vendor-orders',
  templateUrl: './vendor-orders.component.html',
  styleUrls: ['./vendor-orders.component.scss']
})
export class VendorOrdersComponent implements OnInit {

  
  orders=[];
  order_id;
  foodlist= [];
  date;

  constructor(private api:ApiService) {
    this.getOrders();
  }

  getOrders = () => {
    this.api.getVendorOrder().subscribe(
      data=>{
        console.log(data)
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
