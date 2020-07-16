import { Component, OnInit } from '@angular/core';
import  { MatDialogRef } from '@angular/material/dialog'

@Component({
  selector: 'app-mat-success-addtocart',
  templateUrl: './mat-success-addtocart.component.html',
  styleUrls: ['./mat-success-addtocart.component.scss']
})
export class MatSuccessAddtocartComponent implements OnInit {

  constructor( public dialogRef:MatDialogRef<MatSuccessAddtocartComponent>) {
    this.dialogRef.afterOpened().subscribe(_ => {
      setTimeout(()=>{
        dialogRef.close();
      },1500)
    })
   }

  ngOnInit(): void {
  }

}
