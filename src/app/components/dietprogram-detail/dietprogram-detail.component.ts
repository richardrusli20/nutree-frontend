import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dietprogram-detail',
  templateUrl: './dietprogram-detail.component.html',
  styleUrls: ['./dietprogram-detail.component.scss']
})
export class DietprogramDetailComponent implements OnInit {

  public dietProgramId;
  dietprogram_name='';
  foodlist=[];
  imageCollection = [];
  constructor(private api:ApiService,private activeRoute: ActivatedRoute, private router:Router) { 

    let id = parseInt(this.activeRoute.snapshot.paramMap.get('id'));
    this.dietProgramId = id;
    this.getDietProgramFoodlist();

 
  }

  
  getDietProgramFoodlist = () => {
    this.api.getDietProgramFoodlist(this.dietProgramId).subscribe(
      data => {
        this.foodlist=data.foodlist
        this.dietprogram_name=data.dietprogram_name
        for (let i = 0; i < this.foodlist.length; i++) {
          const url = 'http://via.placeholder.com/500x450?text=Image No ' + (i + 1);
            this.foodlist[i].foodlist_logo = url
            this.foodlist[i].show = false

        }
        console.log(this.foodlist)
      },
      error => {
        console.log(error);
      }
    );
  }
  
  onSelect(foodlist){
    console.log(foodlist.id)
    this.router.navigate(['foodlist/detail',foodlist.id])
  }

  ngOnInit(): void {

  }

}
