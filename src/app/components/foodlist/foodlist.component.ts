import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-foodlist',
  templateUrl: './foodlist.component.html',
  styleUrls: ['./foodlist.component.scss'],
  providers: [ApiService]
})
export class FoodlistComponent implements OnInit {

  foodList=[];
  vendor={role:localStorage.getItem('role'),role_pk:localStorage.getItem('role_pk')};

  constructor(private api:ApiService, private router:Router) { 
    console.log(this.vendor);
    this.getFoodlist();
  }

  getFoodlist = () => {
    this.api.getFoodlist(this.vendor).subscribe(
      data => {
        this.foodList = data.foodlist;
        console.log(this.foodList);
      },
      error => {
        console.log(error);
      }
    );
  }

  onSelect(foodlist){
    console.log(foodlist.id)
    this.router.navigate(['foodlist/detail',foodlist.id])
  }

  onAdd(){
    console.log("add Food List Button")
    this.router.navigate(['/foodlist/add'])
  }

  ngOnInit(): void {
  }

}

