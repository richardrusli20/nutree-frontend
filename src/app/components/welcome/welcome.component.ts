import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  providers: [ApiService]
})
export class WelcomeComponent implements OnInit {

  location = [];
  constructor(public authService: ApiService) {
    this.location = [
      {
        id:1,
        city : "Jakarta Utara"
      },
      {
        id:2,
        city : "Jakarta Barat"
      },
      {
        id:3,
        city : "Tangerang"
      }
    ]
  }

  ngOnInit(): void {
  }

}
