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
  qty=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];

  constructor(private api:ApiService, private router:Router) { 
    this.foodlist={available_date:"",description:"",}
    this.getCustomerBag();
    // this.quantity();
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

  deleteCartItem = (foodlistid) => {
    this.api.deleteCartItem(foodlistid).subscribe(
      data => {
        this.cartItems = data.customer_bag;
      }
    )
  }
  changed(e,foodlistid){
    console.log(e.target.value)
    this.changeCartQty(foodlistid,e.target.value)
  }



  changeCartQty = (foodlistid,qty) => {

        this.api.addToCart(foodlistid,qty).subscribe(
          data=>{
            console.log(data)
            this.cartItems = data.customer_bag;
          },
          error=>{
            console.log(error)
          }
        )
        
  }

  ngOnInit(): void {
    if(!this.api.loggedIn()){
      this.router.navigate(['/login']);
    }
  }

}
