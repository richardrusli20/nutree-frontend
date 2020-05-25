import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable,Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  subject = new Subject();
  
  baseurl = "http://127.0.0.1:8000";
  httpHeaders = new HttpHeaders({'Content-type' : 'application/json'});
  httpHeadersAuth = new HttpHeaders({'Content-type' : 'application/json','Authorization' : "token " + localStorage.getItem('token')});

  constructor(private http: HttpClient, private router: Router) { }

  // Get all diet Program
  getAllDietProgram():Observable<any>{
    return this.http.get(this.baseurl + '/api/dietprogram/', 
    {headers: this.httpHeaders});
  }  

  // Get all dietprogram Foodlist
  getDietProgramFoodlist(pk):Observable<any>{
    return this.http.get(this.baseurl + '/api/dietprogram/' + pk  + '/',
    {headers:this.httpHeaders});
  }

  // Get All Vendor Foods
  getVendorFoods():Observable<any>{
    // const body = { role: vendor.role , role_pk: vendor.role_pk };
    return this.http.get(this.baseurl + '/api/vendor/food/',
    {headers: this.httpHeadersAuth});
  } 
  createVendorFoods(food):Observable<any>{
    const body = { role_pk: food.role_pk, food_name: food.food_name, description:food.description, food_calories:food.food_calories };
    return this.http.post(this.baseurl + '/api/vendor/add/', body, 
    {headers: this.httpHeadersAuth});
  } 

  getFoodDetail(foodid):Observable<any>{
    return this.http.get( this.baseurl + '/api/food/' + foodid +'/',
    {headers: this.httpHeaders});
  }

  getFoodlistDetail(foodlistid):Observable<any>{
    return this.http.get( this.baseurl + '/api/foodlist/' + foodlistid + '/')
  }

  createFoodlist(foodList,foods_id):Observable<any>{
    const body = { dietprogram_pk: foodList.dietprogram_pk,foodlist_name:foodList.foodlist_name,food:foods_id,description:foodList.description,price:foodList.price, calories:foodList.calories, available_date:foodList.available_date };
    return this.http.post(this.baseurl + '/api/foodlist/create/', body,
    {headers: this.httpHeadersAuth});
  }

  // for admin
  getVendorFoodLists(foodList):Observable<any>{
    const body = { role:foodList.role, role_pk: foodList.role_pk };
    return this.http.post(this.baseurl + '/api/vendor/foodlist/', body,
    {headers: this.httpHeadersAuth});
  }
  // for customer
  getFoodlist(foodList):Observable<any>{
    return this.http.get(this.baseurl + '/api/vendor/foodlist/',
    {headers: this.httpHeadersAuth});
  }

  getVendorFoodListAdd(vendor):Observable<any>{
    // const body = { vendor_pk: vendor.vendor_pk };
    return this.http.get(this.baseurl + '/api/vendor/foodlist/add/',
    {headers: this.httpHeadersAuth});
  }

  // Cart Handler Service
  addToCart(foodlistid,qty):Observable<any>{
    const body = {foodlist_pk:foodlistid,quantity:qty}
    return this.http.post(this.baseurl + '/api/foodlist/add-to-bag/', body,
    {headers: this.httpHeadersAuth})
  }
  
  // customer bag
  getCustomerBag():Observable<any>{
    return this.http.get(this.baseurl + '/api/customer/bag/',
    {headers:this.httpHeadersAuth})
  }

  
  getCustomerProfile():Observable<any>{
    // const body = { vendor_pk: vendor.vendor_pk };
    return this.http.get(this.baseurl + '/api/customer/profile/',
    {headers: this.httpHeadersAuth});
  }
  
  updateCustomerProfile(customer):Observable<any>{
    const body = { customer_name:customer.customer_name,customer_phone:customer.customer_phone }
    return this.http.post(this.baseurl + '/api/customer/profile/update/', body,
    {headers:this.httpHeadersAuth});
  }

  updateCustomerAddress(address):Observable<any>{
    const body = { street:address.street,postal_code:address.postal_code,city:address.city,province:address.province}
    return this.http.post(this.baseurl + '/api/customer/address/update/', body,
    {headers:this.httpHeadersAuth});
  }
  // Customer


  createCustomer(customer): Observable<any> {
    const body = {customer_name: customer.customer_name , customer_email: customer.customer_email, password: customer.password, password2: customer.password2 };
    return this.http.post(this.baseurl + '/api/register/customer/', body,
    {headers: this.httpHeaders});
  }
  createVendor(vendor): Observable<any> {
    const body = {vendor_name:vendor.vendor_name, vendor_email:vendor.vendor_email, vendor_phone:vendor.vendor_phone, password:vendor.password, password2:vendor.password2};
    return this.http.post(this.baseurl + '/api/register/vendor/', body,
    {headers: this.httpHeaders});
  }
  login(loginData): Observable<any> {
    const body = {username: loginData.username , password: loginData.password };
    return this.http.post(this.baseurl + '/api/login/', body,
    {headers: this.httpHeaders});
  }


  logoutUser() {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('role_pk')
    localStorage.removeItem('username')
    this.router.navigate(['/'])
  }
  getToken(){
    return localStorage.getItem('token')
  }
  loggedIn(){
    return !!localStorage.getItem('token')
  }
  getRole(){
    return localStorage.getItem('role')
  }
  getRolePK(){
    return localStorage.getItem('role_pk')
  }
  getUsername(){
    return localStorage.getItem('username')
  }

  // messenger
  sendMsg(product){
    console.log(product)
    this.subject.next(product)
  }
  getMsg(){
    return this.subject.asObservable()
  }


}
