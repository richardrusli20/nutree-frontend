import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ApiService]})
export class AppComponent {
  title = 'frontend';
  dietprograms = [];
  selectedMovie;
  

  constructor(private api:ApiService){
  
  }


}
