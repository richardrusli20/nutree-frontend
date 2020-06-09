import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router,ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [ApiService]
})
export class RegisterComponent implements OnInit {
  customer;
  selectedCustomer;

  userId: string;
  token: string;

  confirmed;
  private subscription: Subscription ;

  constructor(private api: ApiService, private router: Router, private route:ActivatedRoute) {
    this.customer = {customer_created:false};
    this.selectedCustomer = {customer_name: '', customer_email: '' , password: '', password2: '' };
    console.log("------");
    console.log(this.selectedCustomer);
  }

  createCustomer = () => {
    this.api.createCustomer(this.selectedCustomer).subscribe(
      data => {
        this.customer = data;
        console.log(this.customer);
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(params => {
      this.userId = params['userid'];
      this.token = params['token'];
      console.log("user id" + this.userId + " token " + this.token);
      this.confirmCustomer();
    })
    
  }

  confirmCustomer = () => {
    this.api.confirmCustomer(this.userId,this.token).subscribe(
      data=>{
        console.log("customer confirmed")
        console.log(data);
        this.confirmed = data;
      },
      error => {
        console.log(error);
      }
    )
  }

}
