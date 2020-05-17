import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ApiService]
})
export class LoginComponent implements OnInit {

  login;
  loginCustomer;

  constructor(private api: ApiService) {
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
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnInit(): void {
  }

}
