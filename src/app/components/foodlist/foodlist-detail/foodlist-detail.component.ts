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

  constructor(private api:ApiService,private activeRoute: ActivatedRoute, private router:Router) {
    let id = parseInt(this.activeRoute.snapshot.paramMap.get('id'))
    this.foodListId = id
    this.getFoodlistDetail()
  }
  getFoodlistDetail = () => {
    this.api.getFoodlistDetail(this.foodListId).subscribe(
      data => {
        this.foodListDetail = data;
        console.log(this.foodListDetail);
        this.foods = data.foods;
        console.log(this.foods);
      },
      error => {
        console.log(error);
      }
    );
  }

  addToCart(){
    if(!this.api.loggedIn()){
      this.router.navigate(['/login']);
    }
    this.api.addToCart(this.foodListId,1).subscribe(
      data=> {
        console.log(data)
      },
      error=>{
        console.log(error)
      }
    )
  }

  ngOnInit(): void {
  }

}
