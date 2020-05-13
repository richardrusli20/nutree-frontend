import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-dietprogram-detail',
  templateUrl: './dietprogram-detail.component.html',
  styleUrls: ['./dietprogram-detail.component.scss']
})
export class DietprogramDetailComponent implements OnInit {

  public dietProgramId;

  constructor(private route: ActivatedRoute) { 
    let id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.dietProgramId = id;
  }

  ngOnInit(): void {

  }

}
