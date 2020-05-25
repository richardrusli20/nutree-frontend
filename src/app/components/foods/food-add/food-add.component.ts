import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-food-add',
  templateUrl: './food-add.component.html',
  styleUrls: ['./food-add.component.scss']
})
export class FoodAddComponent implements OnInit {
  foods;
  selectedFoods;

  constructor(private api:ApiService, private router: Router) {
    this.selectedFoods = {role_pk:localStorage.getItem('role_pk'),food_name:'',description:'',food_calories:''}
   }
   createVendorFoods = () => {
    this.api.createVendorFoods(this.selectedFoods).subscribe(
      data => {
        this.foods = data;
        console.log(this.foods);
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnInit(): void {
  }

}