import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-vendor',
  templateUrl: './register-vendor.component.html',
  styleUrls: ['./register-vendor.component.scss'],
  providers: [ApiService]
})
export class RegisterVendorComponent implements OnInit {

  vendor;
  selectedVendor;

  constructor(private api: ApiService, private router: Router) {
    this.vendor = {customer_created:false};
    this.selectedVendor = {vendor_name:'', vendor_email:'', vendor_phone:'', password:'', password2:''};
    console.log("------");
    console.log(this.selectedVendor);
  }

  createVendor = () => {
    this.api.createVendor(this.selectedVendor).subscribe(
      data => {
        this.vendor = data;
        console.log(this.vendor);
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnInit(): void {
  }

}
