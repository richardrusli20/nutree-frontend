import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  providers: [ApiService]
})
export class WelcomeComponent implements OnInit {

  constructor(public authService: ApiService) { }

  ngOnInit(): void {
  }

}
