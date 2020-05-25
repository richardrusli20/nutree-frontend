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
  foodListDetail={foodlist_name:"",description:"", availdate:"",price:0};
  foodListId=0;

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
      },
      error => {
        console.log(error);
      }
    );
  }

  addToCart(){
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
