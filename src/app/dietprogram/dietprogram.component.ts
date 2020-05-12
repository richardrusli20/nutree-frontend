import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-dietprogram',
  templateUrl: './dietprogram.component.html',
  styleUrls: ['./dietprogram.component.scss'],
  providers: [ApiService]
})
export class DietprogramComponent implements OnInit {

  title = 'frontend';
  dietprograms = [];
  selectedMovie;

  constructor(private api:ApiService) {
    this.getDietprogram();
  }

  getDietprogram = () =>{
    this.api.getAllDietProgram().subscribe(
      data => {
        console.log("success get DietProgram Data")
        this.dietprograms = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  ngOnInit(): void {
  }

}
