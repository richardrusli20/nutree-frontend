import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service';

import { 
  Router,
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError} from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ApiService]})
export class AppComponent {

  cartItems = [];
  
  constructor(public api:ApiService, private router:Router){
    this.router.events.subscribe((e : RouterEvent) => {
      this.navigationInterceptor(e);
    })
  }
  loggedOut(){
    this.loggedOutAPI();
    this.api.loggedOut();
  }

  loggedOutAPI = () => {
    this.api.logout().subscribe(
      data => {
        console.log(data)
      },
      error => {
        console.log(error);
      }
    );
  }


  ngOnInit(): void {
    console.log("app component on")
    this.getCustomerBag()

  }
  getCustomerBag = () => {
    this.api.getCustomerBag().subscribe(
      data => {
        // console.log(data.customer_bag)
        this.cartItems = data.customer_bag;
        // this.foodlistQuantity = data.customer_bag
      },
      error => {
        console.log(error);
      }
    );
}


  // Shows and hides the loading spinner during RouterEvent changes
  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      // this.addToCart()
      console.log("Navigation Start")
      
      // this.loading = true
    }
    if (event instanceof NavigationEnd) {
      console.log("Navigation End")
      this.getCustomerBag()
      // this.loading = false
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      console.log("Navigation Cancel")
      // this.loading = false
    }
    if (event instanceof NavigationError) {
      console.log("Navigation Error")
      // this.loading = false
    }
  }


}
