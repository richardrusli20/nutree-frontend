import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.component.html',
  styleUrls: ['./food-detail.component.scss'],
  providers: [ApiService]
})
export class FoodDetailComponent implements OnInit {

  public food_detail;
  foodId;
  constructor(private api:ApiService, private router:Router, private route: ActivatedRoute) { 
    
    let id = parseInt(this.route.snapshot.paramMap.get('id'))
    this.foodId = id
    this.getFoodDetail()
  }

  getFoodDetail = () => {
    this.api.getFoodDetail(this.foodId).subscribe(
      data => {
        this.food_detail = data;
        console.log(this.food_detail);
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnInit(): void {
  }

}
