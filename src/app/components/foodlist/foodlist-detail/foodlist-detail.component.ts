import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-foodlist-detail',
  templateUrl: './foodlist-detail.component.html',
  styleUrls: ['./foodlist-detail.component.scss'],
  providers: [ApiService]
})
export class FoodlistDetailComponent implements OnInit {

  // foodList=[];
  foodListDetail={foodlist_name:"",description:"", available_date:"",price:0,diet_program:{id:0,dietProgram_name:''},foods:[{id:0,food_name:''}],vendor:{vendor_name:''}};
  foodListId=0;
  foods=[];
  cartItems=[{quantity:0,foodlist:{id:0}}];
  matchQuantity={quantity:0};
  foodlistQuantity=0;
  totalQty;

  constructor(public api:ApiService,private activeRoute: ActivatedRoute, private router:Router) {
    let id = parseInt(this.activeRoute.snapshot.paramMap.get('id'))
    this.foodListId = id
    this.getFoodlistDetail()
    this.getCustomerBag()
    // this.addToCart()
  }
  getFoodlistDetail = () => {
    this.api.getFoodlistDetail(this.foodListId).subscribe(
      data => {
        this.foodListDetail = data;
        // console.log(this.foodListDetail);
        this.foods = data.foods;
        // console.log(this.foods);
      },
      error => {
        console.log(error);
      }
    );
  }

  getCustomerBag=() => {
    this.api.getCustomerBag().subscribe(
      data => {
        console.log(data)
        this.cartItems = data.customer_bag;
        this.matchQuantity = this.cartItems.find(x => x.foodlist.id === this.foodListId)
        if(this.matchQuantity != null){
          this.foodlistQuantity = this.matchQuantity.quantity
        }
        
      }
    );
  }

  addToCart = () => {
    if(!this.api.loggedIn()){
      this.router.navigate(['/login']);
    }
    this.api.getCustomerBag().subscribe(
      data => {
        this.cartItems = data.customer_bag;
        // this.foodlist = data.foodlist;
        // console.log(this.cartItems.find(x => x.foodlist.id === this.foodListId));
            this.matchQuantity = this.cartItems.find(x => x.foodlist.id === this.foodListId)
            console.log(this.matchQuantity)
            // call api addtocart with total quantity
            this.totalQty = 1;
            if(this.matchQuantity != null){
              this.totalQty = this.matchQuantity.quantity + 1;
            }

            this.api.addToCart(this.foodListId,this.totalQty).subscribe(
              data=>{
                console.log(data)
                this.cartItems = data.customer_bag;
                this.matchQuantity = this.cartItems.find(x => x.foodlist.id === this.foodListId)
                if(this.matchQuantity != null){
                  this.foodlistQuantity = this.matchQuantity.quantity
                }
              },
              error=>{
                console.log(error)
              }
            )
          },
          error => {
            console.log(error);
          }
        );
  }

  minusToCart = () => {
    if(!this.api.loggedIn()){
      this.router.navigate(['/login']);
    }
    this.api.getCustomerBag().subscribe(
      data => {
        this.cartItems = data.customer_bag;
        // this.foodlist = data.foodlist;
        // console.log(this.cartItems.find(x => x.foodlist.id === this.foodListId));
      
        this.matchQuantity = this.cartItems.find(x => x.foodlist.id === this.foodListId)
        console.log(this.matchQuantity)
        // call api addtocart with total quantity
      if(this.matchQuantity.quantity != 0){
        this.totalQty = this.matchQuantity.quantity - 1;
      }

        this.api.addToCart(this.foodListId,this.totalQty).subscribe(
          data=>{
            console.log(data)
            this.cartItems = data.customer_bag;
            this.matchQuantity = this.cartItems.find(x => x.foodlist.id === this.foodListId)
            if(this.matchQuantity != null){
              this.foodlistQuantity = this.matchQuantity.quantity
            }
          },
          error=>{
            console.log(error)
          }
        )
      },
      error => {
        console.log(error);
      }
    );
  }



  addButton(){
    this.addToCart()
  }
  minusButton(){
    this.minusToCart()
  }


  updateFoodlist(foodlist){
    console.log(foodlist.id);
    this.router.navigate(['/foodlist/add',this.foodListId])
  }


  // addToCart(){
  //   if(!this.api.loggedIn()){
  //     this.router.navigate(['/login']);
  //   }
  //   this.totalQty = this.matchQuantity + 1;
  //   this.api.addToCart(this.foodListId,this.totalQty).subscribe(
  //     data=> {
  //       // console.log(data)
  //     },
  //     error=>{
  //       console.log(error)
  //     }
  //   )
  //   }

  ngOnInit(): void {
  }

}
