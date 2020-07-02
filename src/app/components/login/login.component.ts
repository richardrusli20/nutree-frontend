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
  error={error:''};

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

  get username() { return this.form.get('username'); }
  get password() { return this.form.get('password'); }

  customerLogin = () => {
    this.api.login(this.loginCustomer).subscribe(
      data => {
        this.login = JSON.stringify(data);
        localStorage.setItem('data',this.login);
        // this.router.navigate(['/'])
        window.location.href = ''
      },
      error => {
        this.error = error.error;
        console.log(error.error);
        if(error.status == 500){
          this.error.error = "Email not exist"
        }
      }
    );
  }
  customerLogins(){
    if(this.form.valid){
      this.customerLogin()
      this.error.error = 'please enter your email';
      console.log('login form valid')
    }
    else{
      console.log('login form invalid')
    }
    
  }

  ngOnInit(): void {
    if(this.api.loggedIn()){
      this.router.navigate(['']);
    }
  }

}
