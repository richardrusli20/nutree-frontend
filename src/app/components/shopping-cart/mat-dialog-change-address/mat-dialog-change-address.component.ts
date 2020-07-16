import { Component, OnInit } from '@angular/core';
import  { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/api.service';
import {   
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  ValidatorFn,
  Validators,
  Form} from '@angular/forms';
import {Location, Appearance, GermanAddress} from '@angular-material-extensions/google-maps-autocomplete';
// import {} from '@types/googlemaps';
import PlaceResult = google.maps.places.PlaceResult;

@Component({
  selector: 'app-mat-dialog-changeaddress',
  templateUrl: './mat-dialog-change-address.component.html',
  styleUrls: ['./mat-dialog-change-address.component.scss']
})
export class MatDialogChangeaddressComponent implements OnInit {

  formAddress:FormGroup;
  customerAddress={city:"",postal_code:"",province:"",street:""};
  public appearance = Appearance;
  public zoom: number;
  public latitude: number;
  public longitude: number;
  public selectedAddress: GermanAddress;

  constructor(public api:ApiService, private formBuilder : FormBuilder, public dialogRef:MatDialogRef<MatDialogChangeaddressComponent>) { 
    this.formAddress = this.formBuilder.group({
      street:['',Validators.required],
      postal_code: ['',Validators.required],
      city: ['',Validators.required],
      province:['',Validators.required],
    });
    this.getCustomerProfile();
  }

  getCustomerProfile = () => {
    this.api.getCustomerProfile().subscribe(
      data => { 
        this.customerAddress = data;

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

  closeDialog(){
    this.dialogRef.close()
  }

  updateCustomerAddress = (address) => {
    this.api.updateCustomerAddress(address).subscribe(
      data => {
          // console.log(data)
          this.customerAddress = data; 
          this.closeDialog();
      },
      error => {
        console.log(error);
      }
    );
  }

  updateCustomerAddressAPI(){
    console.log(this.formAddress.value);
    if(this.selectedAddress.state.short == "Daerah Khusus Ibukota Jakarta"){
      this.updateCustomerAddress(this.formAddress.value);
    }
    else{
      console.log('We have not support that area')
    }
  }

  onAutocompleteSelected(result: PlaceResult) {
    console.log('onAutocompleteSelected: ', result);
    
  }

  onLocationSelected(location: Location) {
    console.log('onLocationSelected: ', location);
    this.latitude = location.latitude;
    this.longitude = location.longitude;
  }

  onGermanAddressMapped($event: GermanAddress) {
    console.log('onGermanAddressMapped', $event);
    this.selectedAddress = $event;
  }


  ngOnInit(): void {
  }

}
