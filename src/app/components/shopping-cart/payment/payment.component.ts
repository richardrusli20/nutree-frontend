import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PaymentDetailDialogComponent } from './payment-detail-dialog/payment-detail-dialog.component'

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  cartItems = [];
  total_price=0;

  constructor(private api:ApiService, private router:Router,private dialog:MatDialog) {
    this.getCustomerBag();
  }

  openDetail(){
    return this.dialog.open(PaymentDetailDialogComponent,{
      width:'390px',
      panelClass: 'confirm-dialog-container',
      disableClose:true,
      data:{
        total_price:this.total_price,
        cartItems:this.cartItems,
      }
    });
  }

  setTotalPrice(cartItems,total_price){
    cartItems.forEach(function(item){
      total_price = total_price + (item.quantity * item.foodlist.price);
      // console.log(total_price)
      console.log("setTotalPrice");
      console.log(total_price);
    });
    this.total_price = total_price;
    console.log(this.total_price)
  }
  
  getCustomerBag = () => {
    this.api.getCustomerBag().subscribe(
      data => {
        this.cartItems = data.customer_bag;
        // this.foodlist = data.foodlist;
        this.setTotalPrice(this.cartItems,this.total_price)
        console.log(this.cartItems);
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnInit(): void {
  }

}
