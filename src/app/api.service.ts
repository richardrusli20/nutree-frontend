import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable,Subject, BehaviorSubject } from 'rxjs';
import { AngularFireDatabase} from '@angular/fire/database';
import * as firebase from 'firebase';
import { Upload } from 'src/app/models/upload';



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private messageSource = new BehaviorSubject('null');
  sharedURL = this.messageSource.asObservable();
  private basePath:string = '/uploads';
  private uploadTask:firebase.storage.UploadTask;

  subject = new Subject();
  
  baseurl = "http://127.0.0.1:8000";
  httpHeaders = new HttpHeaders({'Content-type' : 'application/json'});
  httpHeadersAuth = new HttpHeaders({'Content-type' : 'application/json','Authorization' : "token " + this.getToken()});

  constructor(private http: HttpClient, private router: Router,private db:AngularFireDatabase) { }

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
    return this.http.get( this.baseurl + '/api/foodlist/' + foodlistid + '/',
    {headers:this.httpHeaders});
  }

  updateFoodlist(foodlist):Observable<any>{
    const body = {
      dietprogram_pk: foodlist.dietprogram,
      foodlist_name: foodlist.foodlist_name,
      food: foodlist.food,
      description: foodlist.description,
      price: foodlist.price,
      calories: foodlist.calories,
      available_date: foodlist.available_date
    }
    return this.http.post( this.baseurl + '/api/foodlist/' + foodlist.id + '/update/',body,
    {headers:this.httpHeadersAuth});
  }

  createFoodlist(foodList,foods_id,sharedURL):Observable<any>{
    const body = { dietprogram_pk: foodList.dietprogram_pk,foodlist_name:foodList.foodlist_name,food:foods_id,description:foodList.description,price:foodList.price, calories:foodList.calories, available_date:foodList.available_date, foodlist_logo:sharedURL };
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
    {headers: this.httpHeadersAuth});
  }

  deleteFoodlist(foodlistid):Observable<any>{
    return this.http.post(this.baseurl + '/api/foodlist/' + foodlistid + '/delete/',
    {headers:this.httpHeadersAuth});
  }

  deleteCartItem(foodlistid):Observable<any>{
    const body = {foodlist_pk:foodlistid}
    return this.http.post(this.baseurl + '/api/foodlist/remove-from-bag/',body,
    {headers:this.httpHeadersAuth});
  }
  
  // customer bag
  getCustomerBag():Observable<any>{
    return this.http.get(this.baseurl + '/api/customer/bag/',
    {headers:this.httpHeadersAuth})
  }

  getCustomerOrder():Observable<any>{
    return this.http.get(this.baseurl + '/api/customer/order/',
    {headers:this.httpHeadersAuth})
  }

  payNow():Observable<any>{
    const body = {delivery_cost:"5000"}
    return this.http.post(this.baseurl + '/api/customer/checkout/',body,
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

  updateCustomerPassword(customer):Observable<any>{
    const body = {username:this.getUsername(),old_password:customer.old_password,new_password:customer.new_password,new_password2:customer.new_password2}
    return this.http.post(this.baseurl + '/api/customer/password/update/', body,
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

  confirmCustomer(userid,token):Observable<any>{
    return this.http.get(this.baseurl + '/api/register/activate/' + userid + '/' + token + '/',
    {headers:this.httpHeaders})
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


  logout():Observable<any> {
    return this.http.post(this.baseurl + '/api/logout/',
    {headers:this.httpHeaders});
  }

  paymentSuccess():Observable<any> {
    return this.http.get(this.baseurl + '/api/payment/success/',
    {headers:this.httpHeadersAuth});
  }

  getToken(){
    var data = JSON.parse(localStorage.getItem('data'))
    // console.log(data)
    if(!data){
      return null
    }
    else{
      return data['token']
    }
  }
  
  loggedIn(){
    var data = JSON.parse(localStorage.getItem('data'))
    return !!data
  }
  loggedOut() {
    localStorage.clear()
    this.router.navigate(['/'])
  }

  getRole(){
    var data = JSON.parse(localStorage.getItem('data'))
    // console.log(data)
    if(!data){
      return null
    }
    else{
      return data['role']
    }
  }
  // getRolePK(){
  //   return localStorage.getItem('role_pk')
  // }
  getUsername(){
    var data = JSON.parse(localStorage.getItem('data'))
    // console.log(data)
    if(!data){
      return null
    }
    else{
      return data['username']
    }
  }

  // messenger
  sendMsg(product){
    console.log(product)
    this.subject.next(product)
  }
  getMsg(){
    return this.subject.asObservable()
  }

  setSharedURL(url:string){
    this.messageSource.next(url);
  }

  pushUpload(upload:Upload){
    let storageRef = firebase.storage().ref();
    this.uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);

    this.uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      },
      (error) =>{
        console.log(error)
      },
      () => {
        
        this.uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          upload.url = downloadURL;
          this.setSharedURL(upload.url);
          console.log('URL:' + upload.url);
        });
        // upload.name = upload.file.name
        // this.setSharedURL(upload.url);
        
        // this.saveFileData(upload)
      });
  }

}
