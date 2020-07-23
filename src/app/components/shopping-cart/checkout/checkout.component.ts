import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {


  cartItems = [];
  foodlist = {};
  cartTotal = 0;
  customerProfile = {customer_name:'',customer_phone:'',street:'',province:'',postal_code:''};
  total_price = 0;

  constructor(private api:ApiService, private router:Router) { 
    this.foodlist={available_date:"",description:"",}
    this.getCustomerBag();
    this.getCustomerProfile();
  }

  
  setTotalPrice(cartItems,total_price){
    cartItems.forEach(function(item){
      total_price = total_price + (item.quantity * item.foodlist.price);
      // console.log(total_price)
      // console.log("setTotalPrice");
      // console.log(total_price);
    });
    this.total_price = total_price;
    // console.log(this.total_price)
  }

    getCustomerBag = () => {
      this.api.getCustomerBag().subscribe(
        data => {
          this.cartItems = data.customer_bag;
          // this.foodlist = data.foodlist;
          // console.log(this.cartItems);
          this.setTotalPrice(this.cartItems,this.total_price)
          // console.log(data.customer_bag[0].foodlist);
        },
        error => {
          console.log(error);
        }
      );
    }

    getCustomerProfile = () => {
      this.api.getCustomerProfile().subscribe(
        data => {
          this.customerProfile = data;
          // console.log(this.customerProfile)
        }),
        error => {
          console.log(error);
        }
    }

  routingToPayment(){
    this.router.navigate(['/cart/payment'])
  }

  ngOnInit(): void {
  }

}
