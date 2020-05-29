import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DietprogramComponent } from './components/dietprogram/dietprogram.component';
import { RegisterComponent } from './components/register/register.component';
import { RegisterVendorComponent } from './components/register-vendor/register-vendor.component';
import { DietprogramDetailComponent } from './components/dietprogram-detail/dietprogram-detail.component';
import { LoginComponent } from './components/login/login.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ProductListComponent } from './components/shopping-cart/product-list/product-list.component';
import { FoodsComponent } from './components/foods/foods.component';
import { FoodAddComponent } from './components/foods/food-add/food-add.component';
import { FoodDetailComponent } from './components/foods/food-detail/food-detail.component';
import { FoodlistComponent } from './components/foodlist/foodlist.component';
import { FoodlistAddComponent } from './components/foodlist/foodlist-add/foodlist-add.component';
import { FoodlistDetailComponent } from './components/foodlist/foodlist-detail/foodlist-detail.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CheckoutComponent } from './components/shopping-cart/checkout/checkout.component';


const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: 'profile', component:ProfileComponent},
  { path: 'dietprogram', component:DietprogramComponent },
  { path: 'dashboard', component:DashboardComponent },
  { path: 'dietprogram/:id', component:DietprogramDetailComponent },
  { path: 'register', component:RegisterComponent },
  { path: 'register/vendor', component:RegisterVendorComponent },
  { path: 'login', component:LoginComponent },
  { path: 'welcome', component:WelcomeComponent },
  { path: 'cart', component:ShoppingCartComponent},
  { path: 'checkout', component:CheckoutComponent},
  { path: 'foods', component:FoodsComponent },
  { path: 'foods/add', component:FoodAddComponent},
  { path: 'foods/detail/:id', component:FoodDetailComponent},
  { path: 'foodlist', component:FoodlistComponent },
  { path: 'foodlist/detail/:id', component:FoodlistDetailComponent },
  { path: 'foodlist/add', component:FoodlistAddComponent},
  { path: 'foodlist/add/:id', component:FoodlistAddComponent},
  { path: 'productlist', component:ProductListComponent},
  { path: '**', redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = 
[
  ProfileComponent,
  DashboardComponent,
  ProductListComponent, 
  CheckoutComponent,
  FoodsComponent,
  FoodAddComponent ,
  FoodDetailComponent, 
  FoodlistComponent, 
  FoodlistDetailComponent,
  FoodlistAddComponent,
  WelcomeComponent, 
  ShoppingCartComponent,
  DietprogramComponent, 
  DietprogramDetailComponent, 
  LoginComponent, 
  RegisterComponent, 
  RegisterVendorComponent
]
