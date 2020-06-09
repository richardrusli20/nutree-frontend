import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import {   
  FormBuilder,
  FormGroup,
  Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ApiService]
})
export class LoginComponent implements OnInit {

  form:FormGroup;
  login;
  loginCustomer;

  constructor(private api: ApiService,private router:Router, private formBuilder : FormBuilder) {
    this.login = {login_success:false};
    this.loginCustomer = {username: '', password: '' };
    console.log("------");
    console.log(this.loginCustomer);
    this.form = this.formBuilder.group({
      username:['',[Validators.required,Validators.email]],
      password:['',Validators.required]
    });
  }

  customerLogin = () => {
    this.api.login(this.loginCustomer).subscribe(
      data => {
        this.login = JSON.stringify(data);
        localStorage.setItem('data',this.login);
        this.router.navigate(['/'])
      },
      error => {
        console.log(error);
      }
    );
  }
  customerLogins(){
    this.customerLogin()
  }

  ngOnInit(): void {
    if(this.api.loggedIn()){
      this.router.navigate(['']);
    }
  }

}
