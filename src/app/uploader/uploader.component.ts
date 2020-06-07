import { Component,OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss']
})
export class UploaderComponent implements OnInit {

  isHovering: boolean;

  files:File;
  sharedURL:string;
  uploaded:boolean;
  // files: File[] = [];

  constructor(private api:ApiService ){
    this.api.sharedURL.subscribe(message => this.sharedURL = message)
    console.log("uploader")
    console.log(this.sharedURL)
    
    if(this.sharedURL == ''){
      this.uploaded = false;
    }
    else{
      this.uploaded = true;
    }
  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onDrop(files: File) {
  this.files = files;
    // for (let i = 0; i < files.length; i++) {
    //   this.files.push(files.item(i));
    // }
  }

  checkFile(event){
    console.log(event.target.files)
    this.files = event.target.files;
  }

  ngOnInit():void{

  }
}