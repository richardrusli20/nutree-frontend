import { Component, OnInit, Inject } from '@angular/core';
import  { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-payment-detail-dialog',
  templateUrl: './payment-detail-dialog.component.html',
  styleUrls: ['./payment-detail-dialog.component.scss']
})
export class PaymentDetailDialogComponent implements OnInit {

  cartItems=[];
  total_price = 0;

  constructor(private api:ApiService,public dialogRef:MatDialogRef<PaymentDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) {
      this.total_price = data.total_price;
      this.cartItems = data.cartItems;
    // this.getCustomerBag();
   }

    
  // getCustomerBag = () => {
  //   this.api.getCustomerBag().subscribe(
  //     data => {
  //       this.cartItems = data.customer_bag;
  //       console.log(this.cartItems);
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   );
  // }

  closeDialog(){
    this.dialogRef.close()
  }

  ngOnInit(): void {
  }

}
