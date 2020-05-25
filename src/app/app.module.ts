import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule,routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavigationComponent } from './components/navigation/navigation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BannerCarouselComponent } from './components/banner-carousel/banner-carousel.component';
import { DietprogramDetailComponent } from './components/dietprogram-detail/dietprogram-detail.component';
import { LoginComponent } from './components/login/login.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { RegisterVendorComponent } from './components/register-vendor/register-vendor.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { FoodlistComponent } from './components/foodlist/foodlist.component';
import { FoodsComponent } from './components/foods/foods.component';
import { ProductListComponent } from './components/shopping-cart/product-list/product-list.component';
import { FoodAddComponent } from './components/foods/food-add/food-add.component';
import { FoodDetailComponent } from './components/foods/food-detail/food-detail.component';
import { FoodlistAddComponent } from './components/foodlist/foodlist-add/foodlist-add.component';
import { FoodlistDetailComponent } from './components/foodlist/foodlist-detail/foodlist-detail.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CheckoutComponent } from './components/shopping-cart/checkout/checkout.component';
import { ProfileUpdateComponent } from './profile-update/profile-update.component';



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
    FoodlistAddComponent,
    FoodlistDetailComponent,
    DashboardComponent,
    ProfileComponent,
    CheckoutComponent,
    ProfileUpdateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    CarouselModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
