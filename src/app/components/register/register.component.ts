import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router,ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import {   
  FormBuilder,
  FormGroup,
  Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [ApiService]
})
export class RegisterComponent implements OnInit {
  customer;
  selectedCustomer;
  form:FormGroup;

  userId: string;
  token: string;

  confirmed;
  private subscription: Subscription ;

  constructor(private api: ApiService, private router: Router, private route:ActivatedRoute, private formBuilder:FormBuilder) {
    this.customer = {customer_created:false};
    this.confirmed = {is_activated:false};
    // this.selectedCustomer = {customer_name: '', customer_email: '' , password: '', password2: '' };
    // console.log("------");
    // console.log(this.selectedCustomer);
    this.form = this.formBuilder.group({
      customer_name:['',Validators.required],
      customer_email:['',Validators.required],
      password:['',Validators.required],
      password2:['',Validators.required]
    })
  }

  createCustomer = () => {
    if(this.form.valid){
      this.api.createCustomer(this.form.value).subscribe(
        data => {
          this.customer = data;
          console.log(this.customer);
        },
        error => {
          console.log(error);
        }
      );
    }
    else{
      console.log("registration form is invalid")
    }
  }

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(params => {
      this.userId = params['userid'];
      this.token = params['token'];
      console.log("user id" + this.userId + " token " + this.token);
      if(this.userId){
        this.confirmCustomer();
      }

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
