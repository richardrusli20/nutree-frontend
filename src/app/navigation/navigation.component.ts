import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  providers: [ApiService]
  
})
export class NavigationComponent implements OnInit {

  faSearch = faSearch;
  
  constructor(public authService: ApiService) { 

  }

  ngOnInit(): void {
  }

}
