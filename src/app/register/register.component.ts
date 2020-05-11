import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [ApiService]
})
export class RegisterComponent implements OnInit {
  customer;
  selectedCustomer;

  constructor(private api: ApiService) {
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
  }

}
