import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { 
  Router, 
  ActivatedRoute,


} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {MatSuccessAddtocartComponent} from 'src/app/mat-success-addtocart/mat-success-addtocart.component';

@Component({
  selector: 'app-foodlist-detail',
  templateUrl: './foodlist-detail.component.html',
  styleUrls: ['./foodlist-detail.component.scss'],
  providers: [ApiService]
})
export class FoodlistDetailComponent implements OnInit {

  // foodList=[];
  foodListDetail={foodlist_name:"",description:"", available_date:"",price:0,diet_program:{id:0,dietProgram_name:''},calories:0,foods:[{id:0,food_name:''}],vendor:{vendor_name:''},foodlist_logo:'',location:''};
  foodListId=0;
  foods=[];
  cartItems=[{quantity:0,foodlist:{id:0}}];
  matchQuantity={quantity:0};
  foodlistQuantity=1;
  totalQty;
  foodlistChange=[{foodlistid:0,changed:true}];
  loading = true

  constructor(public api:ApiService,private activeRoute: ActivatedRoute, private router:Router,private dialog:MatDialog) {
    let id = parseInt(this.activeRoute.snapshot.paramMap.get('id'))
    this.foodListId = id
    this.getFoodlistDetail()
    this.getCustomerBag()

  }
  getFoodlistDetail = () => {
    this.api.getFoodlistDetail(this.foodListId).subscribe(
      data => {
        this.foodListDetail = data;
        console.log("getfoodlistdetail")
        console.log(this.foodListDetail);
        this.foods = data.foods;
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

  addButton() {
    if(!this.api.loggedIn()){
      this.router.navigate(['/login']);
    }
    this.addToCart()
    // console.log(this.foodlistQuantity)
    // this.foodlistQuantity = this.foodlistQuantity + 1;
  }

  addToCart = () =>{

            this.api.addToCart(this.foodListId,this.foodlistQuantity).subscribe(
              data=>{
                // console.log(data)
                this.openConfirmDialog();
                this.loading = true;
              },
              error=>{
                console.log(error)
              }
            )

  }

  plusButton(){
    if(!this.api.loggedIn()){
      this.router.navigate(['/login']);
    }
    this.foodlistQuantity = this.foodlistQuantity + 1;
  }

  minusButton(){
    if(!this.api.loggedIn()){
      this.router.navigate(['/login']);
    }
    
    if(this.foodlistQuantity == 1){
      
    }
    else{
      this.foodlistQuantity = this.foodlistQuantity - 1;
    }
  }

  


  updateFoodlist(){
    this.router.navigate(['/foodlist/update',this.foodListId])
  }

  deleteFoodlist(){
    console.log("delete foodlist")
    this.api.deleteFoodlist(this.foodListId).subscribe(
        data=>{
          console.log(data)
          this.router.navigate(['/foodlist'])
        },
        error=>{
          console.log(error)
        }
      )
    
  }

  changed(event){
    this.foodlistQuantity = event.target.value
  }

  ngOnDestroy():void{
    console.log("app foodlist-detail destroyed") 
  }

  ngOnInit(): void {

  }

  
  openConfirmDialog(){
    return this.dialog.open(MatSuccessAddtocartComponent,{
      width:'390px',
      panelClass: 'confirm-dialog-container',
      disableClose:true
    });
  }

  
}
