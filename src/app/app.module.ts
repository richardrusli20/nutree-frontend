import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DeferLoadModule } from '@trademe/ng-defer-load';


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
import { FoodAddComponent } from './components/foods/food-add/food-add.component';
import { FoodDetailComponent } from './components/foods/food-detail/food-detail.component';
import { FoodlistAddComponent } from './components/foodlist/foodlist-add/foodlist-add.component';
import { FoodlistDetailComponent } from './components/foodlist/foodlist-detail/foodlist-detail.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CheckoutComponent } from './components/shopping-cart/checkout/checkout.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatConfirmDialogComponent } from './components/shopping-cart/mat-confirm-dialog/mat-confirm-dialog.component';
import { PaymentComponent } from './components/shopping-cart/payment/payment.component';
import { PaymentDetailDialogComponent } from './components/shopping-cart/payment/payment-detail-dialog/payment-detail-dialog.component';
import { MatDialogChangeAddressComponent } from './components/shopping-cart/mat-dialog-change-address/mat-dialog-change-address.component';
import { OrdersComponent } from './components/orders/orders.component';


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
    FoodAddComponent,
    FoodDetailComponent,
    FoodlistAddComponent,
    FoodlistDetailComponent,
    DashboardComponent,
    ProfileComponent,
    CheckoutComponent,
    MatConfirmDialogComponent,
    PaymentComponent,
    PaymentDetailDialogComponent,
    MatDialogChangeAddressComponent,
    OrdersComponent,
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
    ReactiveFormsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatDialogModule,
    MatGridListModule,
    MatListModule,
    DeferLoadModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
