import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ApiService]})
export class AppComponent {
  faSearch = faSearch;
  
  constructor(public api:ApiService){
  
  }
  loggedOut(){
    this.loggedOutAPI();
    this.api.loggedOut();
  }

  loggedOutAPI = () => {
    this.api.logout().subscribe(
      data => {
        console.log(data)
      },
      error => {
        console.log(error);
      }
    );
  }


}
