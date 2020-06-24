import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import {   
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  ValidatorFn,
  Validators} from '@angular/forms';
import { Upload } from 'src/app/models/upload';

@Component({
  selector: 'app-food-add',
  templateUrl: './food-add.component.html',
  styleUrls: ['./food-add.component.scss']
})
export class FoodAddComponent implements OnInit {
  foods;
  selectedFoods;
  form :FormGroup;
  sharedURL:string;
  selectedFile: FileList;
  currentUpload:Upload;

  constructor(private api:ApiService, private router: Router,private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      food_name:['',Validators.required],
      description:['',Validators.required],
      food_calories:['',Validators.required],
      food_photo:[''],
    });  
  
  }
   createVendorFoods = (form,sharedURL) => {
    this.api.createVendorFoods(form,sharedURL).subscribe(
      data => {
        this.foods = data;
        console.log(this.foods);
      },
      error => {
        console.log(error);
      }
    );
  }

  onFileSelected(event){
    this.selectedFile = event.target.files;
  }

  onSubmit(){
    if(this.form.valid){
      this.onUpload();
    }
    else{
      console.log("form is invalid food")
    }
  }

  onUpload(){
    console.log(this.selectedFile.item(0))
    let file = this.selectedFile.item(0)
    this.currentUpload = new Upload(file);
    this.api.pushUpload(this.currentUpload,"foods")

      this.api.sharedURL.subscribe(
        message => {
          if(message == 'null'){
            console.log("loading")
          }
          else{
            this.sharedURL = message
            this.createVendorFoods(this.form.value,this.sharedURL)
          }
      }
      )
  }

  ngOnInit(): void {
  }

}