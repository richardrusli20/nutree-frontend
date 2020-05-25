import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.scss'],
  providers: [ApiService]
})
export class FoodsComponent implements OnInit {

  foods=[];
  // vendor={role:localStorage.getItem('role'),role_pk:localStorage.getItem('role_pk')};

  constructor(private api:ApiService,private router:Router) {
    // console.log(this.vendor);
    this.getVendorFoods();
    
    // this.customer = {customer_created:false};
    // this.selectedCustomer = {customer_name: '', customer_email: '' , password: '', password2: '' };
    // console.log("------");
    // console.log(this.selectedCustomer);
   }

  getVendorFoods = () => {
    this.api.getVendorFoods().subscribe(
      data => {
        this.foods = data.food;
        console.log(this.foods);
      },
      error => {
        console.log(error);
      }
    );
  }

  onSelect(food){
    console.log(food.id);
    this.router.navigate(['foods/detail',food.id]);
  }

  onAdd(){
    console.log("add Food Button");
    this.router.navigate(['/foods/add'])
  }

  ngOnInit(): void {
  }

}
