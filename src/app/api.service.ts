import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  baseurl = "http://127.0.0.1:8000";
  httpHeaders = new HttpHeaders({'Content-type' : 'application/json'});

  constructor(private http: HttpClient, private router: Router) { }

  getAllDietProgram():Observable<any>{
    return this.http.get(this.baseurl + '/api/dietprogram/', 
    {headers: this.httpHeaders});
  }  
  createCustomer(customer): Observable<any> {
    const body = {customer_name: customer.customer_name , customer_email: customer.customer_email, password: customer.password, password2: customer.password2 };
    return this.http.post(this.baseurl + '/api/register/customer/', body,
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
}
