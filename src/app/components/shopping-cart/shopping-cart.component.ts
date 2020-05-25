import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  cartItems = [];
  foodlist = {};
  cartTotal = 0;

  constructor(private api:ApiService, private router:Router) { 
    this.foodlist={available_date:"",description:"",}
    this.getCustomerBag();
  }


    getCustomerBag = () => {
      this.api.getCustomerBag().subscribe(
        data => {
          this.cartItems = data.customer_bag;
          // this.foodlist = data.foodlist;
          console.log(this.cartItems);
          console.log(data.customer_bag[0].foodlist);
        },
        error => {
          console.log(error);
        }
      );
    }


  ngOnInit(): void {
    
  }

}
