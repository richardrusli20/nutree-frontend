import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import {   
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  ValidatorFn,
  Validators} from '@angular/forms'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  formCustomer:FormGroup;
  formAddress:FormGroup;
  boolean=false;
  booleanAddress=false;
  customerProfile={customer_name:"", customer_phone:""};
  customerAddress={city:"",postal_code:"",province:"",street:""}

  constructor(private api:ApiService, private formBuilder : FormBuilder, private router:Router) {
    this.getCustomerProfile();
    console.log("customerprofilename");
    console.log(this.customerProfile.customer_name);
  }

  getCustomerProfile = () => {
    this.api.getCustomerProfile().subscribe(
      data => {
        this.customerProfile = data;
        this.customerAddress = data;
        console.log(this.customerProfile);
        this.formCustomer = this.formBuilder.group({
          customer_name:[this.customerProfile.customer_name,Validators.required],
          customer_phone: [this.customerProfile.customer_phone,Validators.required],
        });
        this.formAddress = this.formBuilder.group({
          street:[this.customerAddress.street,Validators.required],
          postal_code: [this.customerAddress.postal_code,Validators.required],
          city: [this.customerAddress.city,Validators.required],
          province:[this.customerAddress.province,Validators.required],
        });
      },
      error => {
        console.log(error);
      }
    );
  }

  updateCustomerProfile = (customer) => {
    this.api.updateCustomerProfile(customer).subscribe(
      data => {
        console.log(data)
        this.customerProfile = data;
      },
      error => {
        console.log(error);
      }
    );
  }
  
  updateCustomerAddress = (address) => {
    this.api.updateCustomerAddress(address).subscribe(
      data => {
          console.log(data)
          this.customerAddress = data; 
      },
      error => {
        console.log(error);
      }
    );
  }

  update(){
    this.boolean=true;
  }

  updateCustomerProfileAPI(){
    console.log(this.formCustomer.value);
    this.updateCustomerProfile(this.formCustomer.value);
    this.boolean=false;
    this.getCustomerProfile();
  }

  Address(){
    this.booleanAddress=true;
  }

  updateCustomerAddressAPI(){
   
    console.log(this.formAddress.value);
    this.updateCustomerAddress(this.formAddress.value);
    this.booleanAddress=false;
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    // avoid memory leaks here by cleaning up after ourselves. If we  
    // don't then we will continue to run our initialiseInvites()   
    // method on every navigationEnd event.
  }

}
