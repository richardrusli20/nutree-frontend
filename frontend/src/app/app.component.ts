import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ApiService]
})
export class AppComponent {
  title = 'frontend';
  dietprograms = [{title: 'diet A '}, {title: 'diet b'}];

  constructor(private api:ApiService){
    // this.getDietprogram();
  }
  // getDietprogram = () =>{
  //   this.api.getAllDietProgram().subscribe(
  //     data => {
  //       this.dietprograms = data;
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   )
  // }
}
