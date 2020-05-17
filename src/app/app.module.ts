import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule,routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavigationComponent } from './navigation/navigation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BannerCarouselComponent } from './banner-carousel/banner-carousel.component';
import { DietprogramDetailComponent } from './dietprogram-detail/dietprogram-detail.component';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { RegisterVendorComponent } from './register-vendor/register-vendor.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { FoodlistComponent } from './foodlist/foodlist.component';
import { FoodsComponent } from './foods/foods.component';
import { ProductListComponent } from './shopping-cart/product-list/product-list.component';
import { FoodAddComponent } from './foods/food-add/food-add.component';
import { FoodDetailComponent } from './foods/food-detail/food-detail.component';



@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    NavigationComponent,
    BannerCarouselComponent,
    DietprogramDetailComponent,
    LoginComponent,
    WelcomeComponent,
    RegisterVendorComponent,
    ShoppingCartComponent,
    FoodlistComponent,
    FoodsComponent,
    ProductListComponent,
    FoodAddComponent,
    FoodDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    CarouselModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
