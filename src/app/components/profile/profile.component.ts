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
  customerProfile={customer_name:"", city:"", customer_phone:"", postal_code:"",province:"",street:""};

  constructor(private api:ApiService, private formBuilder : FormBuilder, private router:Router) {
    this.getCustomerProfile();
    console.log("customerprofilename");
    console.log(this.customerProfile.customer_name);
    this.formCustomer = this.formBuilder.group({
      customer_name:[this.customerProfile.customer_name,Validators.required],
      customer_phone: [this.customerProfile.customer_phone,Validators.required],
    });

    this.formAddress = this.formBuilder.group({
      street:['',Validators.required],
      postal_code: ['',Validators.required],
      city: ['',Validators.required],
      province:['',Validators.required],
    });

    
  }

  getCustomerProfile = () => {
    this.api.getCustomerProfile().subscribe(
      data => {
        this.customerProfile = data;
        console.log(this.customerProfile);
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
