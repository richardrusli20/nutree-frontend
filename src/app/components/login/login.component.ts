import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ApiService]
})
export class LoginComponent implements OnInit {

  login;
  loginCustomer;

  constructor(private api: ApiService,private router:Router) {
    this.login = {login_success:false};
    this.loginCustomer = {username: '', password: '' };
    console.log("------");
    console.log(this.loginCustomer);
  }

  customerLogin = () => {
    this.api.login(this.loginCustomer).subscribe(
      data => {
        this.login = data;
        console.log(this.login);
        localStorage.setItem('token',data.token);
        localStorage.setItem('role',data.role);
        localStorage.setItem('role_pk',data.role_pk);
        localStorage.setItem('username',data.username);
        this.router.navigate(['']);
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnInit(): void {
  }

}
