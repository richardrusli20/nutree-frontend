import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DietprogramComponent } from './dietprogram/dietprogram.component';
import { RegisterComponent } from './register/register.component';
import { RegisterVendorComponent } from './register-vendor/register-vendor.component';
import { DietprogramDetailComponent } from './dietprogram-detail/dietprogram-detail.component';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ProductListComponent } from './shopping-cart/product-list/product-list.component';
import { FoodsComponent } from './foods/foods.component';
import { FoodAddComponent } from './foods/food-add/food-add.component';
import { FoodDetailComponent } from './foods/food-detail/food-detail.component';
import { FoodlistComponent } from './foodlist/foodlist.component';


const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: 'dietprogram', component:DietprogramComponent },
  { path: 'dietprogram/:id', component:DietprogramDetailComponent },
  { path: 'register', component:RegisterComponent },
  { path: 'register/vendor', component:RegisterVendorComponent },
  { path: 'login', component:LoginComponent },
  { path: 'welcome', component:WelcomeComponent },
  { path: 'foods', component:FoodsComponent },
  { path: 'foods/add', component:FoodAddComponent},
  { path: 'foods/detail/:id', component:FoodDetailComponent},
  { path: 'foodlist', component:FoodlistComponent },
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
  ProductListComponent, 
  FoodsComponent,
  FoodAddComponent ,
  FoodDetailComponent, 
  FoodlistComponent, 
  WelcomeComponent, 
  DietprogramComponent, 
  DietprogramDetailComponent, 
  LoginComponent, 
  RegisterComponent, 
  RegisterVendorComponent
]
