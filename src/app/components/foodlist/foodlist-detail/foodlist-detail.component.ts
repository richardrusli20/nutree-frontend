import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { 
  Router, 
  ActivatedRoute,
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError

} from '@angular/router';

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
  foodlistChange=[{foodlistid:0,changed:true}];
  loading = true

  constructor(public api:ApiService,private activeRoute: ActivatedRoute, private router:Router) {
    let id = parseInt(this.activeRoute.snapshot.paramMap.get('id'))
    this.foodListId = id
    this.getFoodlistDetail()
    this.getCustomerBag()
    this.router.events.subscribe((e : RouterEvent) => {
      this.navigationInterceptor(e);
    })
  }
  getFoodlistDetail = () => {
    this.api.getFoodlistDetail(this.foodListId).subscribe(
      data => {
        this.foodListDetail = data;
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
    console.log(this.foodlistQuantity)
    this.foodlistQuantity = this.foodlistQuantity + 1;
  }

  addToCart = () =>{

            this.api.addToCart(this.foodListId,this.foodlistQuantity).subscribe(
              data=>{
                console.log(data)
                this.loading = true;
              },
              error=>{
                console.log(error)
              }
            )

  }

  minusToCart = () => {
    if(!this.api.loggedIn()){
      this.router.navigate(['/login']);
    }
    console.log(this.foodlistQuantity)
    this.foodlistQuantity = this.foodlistQuantity - 1;
  }

  minusButton(){
    this.minusToCart()
  }


  updateFoodlist(foodlist){
    console.log(foodlist.id);
    this.router.navigate(['/foodlist/add',this.foodListId])
  }

  changed(event){
    this.foodlistQuantity = event.target.value
  }

  ngOnDestroy():void{
    console.log("destroyed")
    
  }

  ngOnInit(): void {

  }

  // Shows and hides the loading spinner during RouterEvent changes
  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.addToCart()
      console.log("Navigation Start")
      // this.loading = true
    }
    if (event instanceof NavigationEnd) {
      console.log("Navigation End")
      this.loading = false
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.loading = false
    }
    if (event instanceof NavigationError) {
      this.loading = false
    }
  }

}
