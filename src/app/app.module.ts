import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DeferLoadModule } from '@trademe/ng-defer-load';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';


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
import { DietprogramDetailComponent } from './components/dietprogram/dietprogram-detail/dietprogram-detail.component';
import { LoginComponent } from './components/login/login.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterVendorComponent } from './components/register/register-vendor/register-vendor.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { FoodlistComponent } from './components/foodlist/foodlist.component';
import { FoodsComponent } from './components/foods/foods.component';
import { FoodAddComponent } from './components/foods/food-add/food-add.component';
import { FoodDetailComponent } from './components/foods/food-detail/food-detail.component';
import { FoodlistAddComponent } from './components/foodlist/foodlist-add/foodlist-add.component';
import { FoodlistDetailComponent } from './components/foodlist/foodlist-detail/foodlist-detail.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
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
import { MatDialogChangeaddressComponent } from './components/shopping-cart/mat-dialog-change-address/mat-dialog-change-address.component';
import { OrdersComponent } from './components/orders/orders.component';
import { FieldErrorDisplayComponent } from './field-error-display/field-error-display.component';
import { RegisterPartnershipComponent } from './register-partnership/register-partnership.component';
import { VendorOrdersComponent } from './components/orders/vendor-orders/vendor-orders.component';
import { WelcomeBottomComponent } from './components/welcome/welcome-bottom/welcome-bottom.component';
import { MatSuccessAddtocartComponent } from './mat-success-addtocart/mat-success-addtocart.component';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { AgmCoreModule } from '@agm/core';


const googleMapsParams = {
  apiKey: environment.GOOGLE_MAPS_API_KEY,
  libraries: ['places'],
  language: 'en',
  region: 'ID'
};

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
    MatDialogChangeaddressComponent,
    OrdersComponent,
    FieldErrorDisplayComponent,
    RegisterPartnershipComponent,
    VendorOrdersComponent,
    WelcomeBottomComponent,
    MatSuccessAddtocartComponent,
    MatDialogChangeaddressComponent,
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
    DeferLoadModule,
    // Firestore
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireMessagingModule,
    AngularFireDatabaseModule,
    AngularFireFunctionsModule,
    //Google Maps
    MatGoogleMapsAutocompleteModule,
    AgmCoreModule.forRoot(googleMapsParams),
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
