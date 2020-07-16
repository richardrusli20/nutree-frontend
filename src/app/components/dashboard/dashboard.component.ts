import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  orders=[];
  todays_orders = [];
  todays_date;
  order_date = '';
  order_id;
  foodlist= [];
  date;
  total_order;
  completed_order;
  uncompleted_order;


  constructor(private api:ApiService, private dp:DatePipe) {
    this.getOrders()
    this.todays_date = new Date();
    this.todays_date = this.dp.transform(this.todays_date, 'dd-MM-yyyy')
    console.log(this.todays_date)
  }

  ngOnInit(): void {
  }

  getOrders = () => {
    this.api.getCustomerOrder().subscribe(
      data=>{
        
        this.orders = data.order;
        console.log(data.order)
        this.total_order = this.orders.length;
        this.uncompleted_order = 0;
        this.completed_order = 0;
      
        for(var i = 0 ; i <= data.order.length ; i++){
          this.order_date = this.dp.transform(data.order[i].order_date, 'dd-MM-yyyy')
          if(this.order_date == this.todays_date){
            console.log("todays date correct")
            this.todays_orders.push(data.order[i])  
          }
          else{
            console.log("date not correct")
          }
          
      
          if(!data.order[i].is_delivered){
            this.uncompleted_order++;
          }
          else{
            this.completed_order++;
          }
        }
        
      },
      error=>{
        console.log(error)
      }
    )
  }

}
