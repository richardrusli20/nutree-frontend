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

  getAllDietProgram():Observable<any>{
    return this.http.get(this.baseurl + '/api/dietprogram/', 
    {headers: this.httpHeaders});
  }  
  getVendorFoods(vendor):Observable<any>{
    const body = { role: vendor.role , role_pk: vendor.role_pk };
    return this.http.post(this.baseurl + '/api/vendor/food/', body, 
    {headers: this.httpHeadersAuth});
  } 
  createVendorFoods(food):Observable<any>{
    const body = { role_pk: food.role_pk, food_name: food.food_name, description:food.description, food_calories:food.food_calories };
    return this.http.post(this.baseurl + '/api/vendor/add/', body, 
    {headers: this.httpHeadersAuth});
  } 
  getAllFoodLists():Observable<any>{
    return this.http.get(this.baseurl + '/api/foodlist/',
    {headers: this.httpHeaders});
  }


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

  // messenger
  sendMsg(product){
    console.log(product)
    this.subject.next(product)
  }
  getMsg(){
    return this.subject.asObservable()
  }


}
