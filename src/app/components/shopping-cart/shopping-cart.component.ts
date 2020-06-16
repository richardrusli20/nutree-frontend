import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatConfirmDialogComponent } from 'src/app/components/shopping-cart/mat-confirm-dialog/mat-confirm-dialog.component'
import { faOtter } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  cartItems = [];
  foodlist = {};
  cartTotal = 0;
  matchQuantity={quantity:0};
  changedFoodlist=[];
  customerProfile = {customer_name:'',province:'',city:'',street:'',customer_phone:'',postal_code:''};
  total_price = 0;
  dataLoaded: Promise<boolean>;
  // qty=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
  foodlistQuantity = 0;
  zeroQty=false;
  
  constructor(private api:ApiService, private router:Router,private dialog:MatDialog) { 
    this.getCustomerBag();
    this.getCustomerProfile();
  
    this.foodlist={available_date:"",description:"",}
  }

  setTotalPrice(cartItems,total_price){
    cartItems.forEach(function(item){
      total_price = total_price + (item.quantity * item.foodlist.price);
      // console.log(total_price)
      // console.log("setTotalPrice");
      // console.log(total_price);
    });
    this.total_price = total_price;
    console.log(this.total_price)
  }

  getCustomerBag = () => {
    if(this.api.loggedIn()){
      this.api.getCustomerBag().subscribe(
        data => {
          console.log(data.customer_bag)
          this.cartItems = data.customer_bag;
          this.setTotalPrice(this.cartItems,this.total_price);
          this.dataLoaded = Promise.resolve(true);

          // this.foodlistQuantity = data.customer_bag
        },
        error => {
          console.log(error);
        }
      );
    }
    else{
      console.log("user not logged in")
    }
  }

  deleteCartItem = (foodlistid) => {
    this.openConfirmDialog().afterClosed().subscribe(res =>{
      console.log(res)
      if(res == "true"){
          this.api.deleteCartItem(foodlistid).subscribe(
            data => {
              this.cartItems = data.customer_bag;
            }
          )
      }
      else{
        console.log("deletefailed")
      }
    });

  }

  goToFoodlist(foodlistid){
    this.router.navigate(['/foodlist/detail/',foodlistid])
  }

  changed(e,foodlistid){
    console.log(e + "foodlist id = " + foodlistid)
    this.foodlistQuantity=e.target.value;
    this.addToCart(foodlistid,e.target.value)
  }

  openConfirmDialog(){
    return this.dialog.open(MatConfirmDialogComponent,{
      width:'390px',
      panelClass: 'confirm-dialog-container',
      disableClose:true
    });
  }



  // changeCartQty = (foodlistid,qty) => {

  //       this.api.addToCart(foodlistid,qty).subscribe(
  //         data=>{
  //           console.log(data)
  //           this.cartItems = data.customer_bag;
  //         },
  //         error=>{
  //           console.log(error)
  //         }
  //       )
        
  // }


  addButton(index) {
    if(!this.api.loggedIn()){
      this.router.navigate(['/login']);
    }
    // console.log(this.cartItems[index])
    // console.log(this.cartItems[index].foodlist.id)
    this.cartItems[index].quantity = this.cartItems[index].quantity + 1;
    this.total_price = 0;
    this.setTotalPrice(this.cartItems,this.total_price);
  }

  addToCart = (foodlistid,qty) =>{

      this.api.addToCart(foodlistid,qty).subscribe(
          data=>{
            // console.log(data)
            this.cartItems = data.customer_bag;
            this.setTotalPrice(this.cartItems,this.total_price);
            this.dataLoaded = Promise.resolve(true);
          },
          error=>{
            console.log(error)
        }
      )

  }

  minusToCart = (index) => {
    if(!this.api.loggedIn()){
      this.router.navigate(['/login']);
    }
    console.log(this.cartItems[index])
    this.cartItems[index].quantity = this.cartItems[index].quantity - 1;
    if(this.cartItems[index].quantity == 1){
      // add popup box "Are you sure? confirm, no"
      // this.deleteCartItem(this.cartItems[index].foodlist.id)
      this.zeroQty = true;
    }
    this.setTotalPrice(this.cartItems,this.total_price);
  }

  minusButton(index){
    this.minusToCart(index)
  }

  updateQuantityAPI(){
    console.log("updateQuantityAPI")
    // console.log(this.cartItems[0].foodlist)
    for(var i = 0; i <= this.cartItems.length ; i++){
      // this.addToCart(this.cartItems[i].foodlist.id,this.cartItems[i].quantity)
    }
  }


  ngOnInit(): void {
    if(!this.api.loggedIn()){
      this.router.navigate(['/login']);
    }
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

  ngOnDestroy():void{
    this.updateQuantityAPI();
  }

  
}

