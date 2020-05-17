import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

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

  constructor(private api:ApiService, private router:Router) {
    this.getDietprogram();
  }

  getDietprogram = () =>{
    this.api.getAllDietProgram().subscribe(
      data => {
        this.dietprograms = data;
        console.log("success get DietProgram Data" + this.dietprograms)
      },
      error => {
        console.log(error);
      }
    )
  }

  ngOnInit(): void {
  }

  onSelect(dietprogram){
    console.log(dietprogram.id);
    this.router.navigate(['/dietprogram',dietprogram.id]);
  }

}
