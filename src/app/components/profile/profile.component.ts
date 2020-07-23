import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import {   
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  ValidatorFn,
  Validators,
  Form} from '@angular/forms';
  import { GermanAddress} from '@angular-material-extensions/google-maps-autocomplete';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  formCustomer:FormGroup;
  formPassword:FormGroup;
  formAddress:FormGroup;
  boolean=false;
  booleanPassword=false;
  booleanAddress=false;
  customerProfile={customer_name:"", customer_phone:""};
  customerAddress={city:"",postal_code:"",province:"",street:""}
  username = '';
  public selectedAddress: GermanAddress;
  address = '';

  formVendor:FormGroup;
  formVendorPassword:FormGroup;
  formVendorAddress:FormGroup;
  vendorProfile={vendor_name:"", vendor_phone:""};
  booleanVendor=false;
  booleanVendorPassword=false;
  booleanVendorAddress=false;
  vendorAddress={city:"",postal_code:"",province:"",street:""}
  


  constructor(public api:ApiService, private formBuilder : FormBuilder, private router:Router) {
    if(api.getRole() == 'customer'){
      this.getCustomerProfile();
    }
    else if(api.getRole() == 'vendor'){
      this.getVendorProfile();
    }
    this.username = this.api.getUsername();
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

        this.formPassword = this.formBuilder.group({
          username:['',Validators.required],
          old_password:['',Validators.required],
          new_password:['',Validators.required],
          new_password2:['',Validators.required]
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

  getVendorProfile = () => {
    this.api.getVendorProfile().subscribe(
      data => {
        this.vendorProfile = data;
        this.vendorAddress = data.vendor_address;
        // this.customerAddress = data;
        console.log(this.vendorProfile);
        this.formVendor = this.formBuilder.group({
          // vendor_logo:['',Validators.required],
          vendor_name:[this.vendorProfile.vendor_name,Validators.required],
          vendor_phone:[this.vendorProfile.vendor_phone,Validators.required],
        });

        this.formVendorPassword = this.formBuilder.group({
          username:['',Validators.required],
          old_password:['',Validators.required],
          new_password:['',Validators.required],
          new_password2:['',Validators.required]
        });

        this.formVendorAddress = this.formBuilder.group({
          street:[this.vendorAddress.street,Validators.required],
          postal_code: [this.vendorAddress.postal_code,Validators.required],
          city: ['Jakarta',Validators.required],
          province:['DKI Jakarta',Validators.required],
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


  
  updateCustomerPassword = (customer) =>{
    this.api.updateCustomerPassword(customer).subscribe(
      data=>{
        console.log(data)
      },
      error=>{
        console.log(error)
      }
  )}
  
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


  updateVendorProfile = (vendor) => {
    this.api.updateVendorProfile(vendor).subscribe(
      data => {
        console.log(data)
        this.vendorProfile = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  updateVendorAddress = (address) => {
    this.api.updateVendorAddress(address).subscribe(
      data => {
          console.log(data)
          this.vendorAddress = data; 
      },
      error => {
        console.log(error);
      }
    );
  }


  //Customer Update
  update(){
    this.boolean=true;
  }

  updateCustomerProfileAPI(){
    console.log(this.formCustomer.value);
    this.updateCustomerProfile(this.formCustomer.value);
    this.boolean=false;
    this.getCustomerProfile();
  }

  updateCustomerPasswordAPI(){
    console.log(this.formCustomer.value);
    this.updateCustomerPassword(this.formPassword.value);
    this.booleanPassword=false;
    this.getCustomerProfile();
  }


  Address(){
    this.booleanAddress=true;
  }

  vendorAddressbool(){
    this.booleanVendorAddress = true;
  }



  updateCustomerAddressAPI(){
    // console.log(this.formAddress.value.city)
    if(this.formAddress.value.city == "Daerah Khusus Ibukota Jakarta" || this.formAddress.value.city == "Jakarta"){
      this.updateCustomerAddress(this.formAddress.value);
      this.booleanAddress=false;
    }
    else{
      console.log('We have not support that area')
    }
  }

  // updateCustomerAddressAPI(){
  //   try{
  //     this.address = this.selectedAddress.state.short;
  //   }
  //   catch (error){
  //     console.log(error)
  //   }
    
  //   if(this.address == "Daerah Khusus Ibukota Jakarta" || this.address == "Jakarta"){
  //     this.updateCustomerAddress(this.formAddress.value);
  //     this.booleanAddress=false;
  //   }
  //   else{
  //     console.log('We have not support that area')
  //   }
  // }

  onGermanAddressMapped($event: GermanAddress) {
    console.log('onGermanAddressMapped', $event);
    this.selectedAddress = $event;

    this.formAddress = this.formBuilder.group({
      street:[this.selectedAddress.displayAddress,Validators.required],
      postal_code: [this.selectedAddress.postalCode,Validators.required],
      city: [this.selectedAddress.state.long,Validators.required],
      province:[this.selectedAddress.state.short,Validators.required],
    });

  }
  
  // onGermanAddressMapped($event: GermanAddress) {
  //   console.log('onGermanAddressMapped', $event);
  //   this.selectedAddress = $event;
  //   console.log(this.selectedAddress)
  // }



  updatePassword(){
    this.booleanPassword=true;
  }


  // Vendor Update
  updateVendor(){
    this.booleanVendor=true;
  }

  updateVendorProfileAPI(){
    console.log(this.formVendor.value);
    this.updateVendorProfile(this.formVendor.value);
    this.booleanVendor=false;
    this.getVendorProfile();
  }

  updateVendorPasswordAPI(){
    console.log(this.formCustomer.value);
    this.updateCustomerPassword(this.formPassword.value);
    this.booleanPassword=false;
    // this.getVendorProfile();
  }


  AddressVendor(){
    this.booleanAddress=true;
  }

  updateVendorAddressAPI(){
    console.log(this.formVendorAddress.value);
    this.updateVendorAddress(this.formVendorAddress.value);
    this.booleanVendorAddress=false;
  }

  updateVendorPassword(){
    this.booleanVendorPassword=true;
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    // avoid memory leaks here by cleaning up after ourselves. If we  
    // don't then we will continue to run our initialiseInvites()   
    // method on every navigationEnd event.
  }

}
