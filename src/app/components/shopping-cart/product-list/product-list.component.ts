import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  productLists=[
    {id:1,product_name:"product1",price:50},
    {id:2,product_name:"product2",price:20}
  ]

  @Input() productItem:Product

  constructor(private apiService : ApiService) { 
  }

  ngOnInit(): void {
  }

  handleAddtoCart(){
    this.apiService.sendMsg(this.productLists)
  }

}
