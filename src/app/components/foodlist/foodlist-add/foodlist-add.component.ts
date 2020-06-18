import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import {   
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  ValidatorFn,
  Validators} from '@angular/forms';
import { Upload } from 'src/app/models/upload';

@Component({
  selector: 'app-foodlist-add',
  templateUrl: './foodlist-add.component.html',
  styleUrls: ['./foodlist-add.component.scss'],
  providers: [ApiService]
})
export class FoodlistAddComponent implements OnInit {

  form: FormGroup;
  foods = [];
  dietPrograms=[];
  vendor;
  foodlist={foodlist_name:'',diet_program:{id:0},foods:[{id:0,food_name:''}],price:0,description:'',available_date:'yyy-mm-dd',foodlist_logo:''};
  foodListId;
  selectedFile: FileList;
  sharedURL:string;
  uploaded:boolean;
  currentUpload:Upload;
  foodsArray = [];

  // foodlist={};
  // foods_id=[];

  selectedFoodlist;
  constructor(private api:ApiService, private formBuilder : FormBuilder, private activeRoute: ActivatedRoute,private router:Router) {
    let id = parseInt(this.activeRoute.snapshot.paramMap.get('id'))
    this.foodListId = id
    this.getVendorFoodlistAdd();

    // this.selectedFoodlist = {foodlist_name:'',foodlist_dietprogram:'',foodlist_foods:[],foodlist_availdate:'',foodlist_price:0,foodlist_logo:''}
    this.vendor = {role_pk:localStorage.getItem('role_pk')}
    // const formControls = this.foods.map(control => new FormControl(false));
    this.form = this.formBuilder.group({
      foodlist_name:['',Validators.required],
      foods: new FormArray([], this.minSelectedCheckboxes(1)),
      dietprogram_pk:['',Validators.required],
      description:['',[Validators.required,Validators.minLength(20)]],
      price:['',Validators.required],
      calories:['',Validators.required],
      available_date:['',Validators.required],
      logo:[''],
    });
    
  }

  getFoodlist = (foods) => {
    this.api.getFoodlistDetail(this.foodListId).subscribe(
      data => {
        // console.log(data);
        this.foodlist = data
        // console.log(this.foodlist.foods)
        this.checkIfSelected(foods,this.foodlist.foods);
        this.form = this.formBuilder.group({
          foodlist_name:[this.foodlist.foodlist_name,Validators.required],
          foods: [this.foodlist.foods, [this.minSelectedCheckboxes(1),Validators.required]],
          dietprogram_pk:[this.foodlist.diet_program.id,Validators.required],
          description:[this.foodlist.description,[Validators.required,Validators.minLength(20)]],
          price:[this.foodlist.price,Validators.required],
          calories:[this.foodlist,Validators.required],
          available_date:[this.foodlist.available_date,Validators.required],
          logo:[this.foodlist.foodlist_logo],
        });
      },
      error => {
        console.log(error);
      }
    );   
  }

  getVendorFoodlistAdd = () => {
    this.api.getVendorFoodListAdd(this.vendor).subscribe(
      data => {
        this.foods = data.food;
        this.dietPrograms = data.dietprogram;
        
        if(this.foodListId){
          this.getFoodlist(this.foods)
        }
        else{
          this.addCheckboxes(this.foods);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  createFoodlist = (foodlist,foods_id,sharedURL) => {
    this.api.createFoodlist(foodlist,foods_id,sharedURL).subscribe(
      data => {
        console.log("foodlist created successfully");
        this.router.navigate(['/foodlist']);
      },
      error => {
        console.log(error);
      }
    );
  }

  updateFoodlist = (foodlist) =>{
    this.api.updateFoodlist(foodlist).subscribe(
      data =>{
        console.log("foodlist updated");
        this.router.navigate(['/foodlist']);
      },
      error => {
        console.log(error);
      }
    )
  }

  submit(){
    const selectedFoodids = this.form.value.foods
      .map((checked, index) => (checked ? this.foods[index].id : null))
      .filter(value => value !== null);
    console.log("--------------")
    console.log(selectedFoodids);
    console.log("---thisform---");
    console.log(this.form.value);
    if(this.form.valid){
      if(this.foodListId){
        console.log("update foodlist")
        this.api.updateFoodlist(this.form.value);
      }
      else{
        console.log("upload and create fooodlist")
        this.onUpload(selectedFoodids);
      }
      
    }
    else{
      console.log('foodlist add form is invalid')
    }
  }

  private checkIfSelected(foods,foods_1){
    // console.log(foods);
    // console.log(foods_1);   
    foods.forEach((o,i) => {
        // console.log(foods_1.find(x=>x.id === foods[i].id));
        if(foods_1.find(x=>x.id === foods[i].id)){
          if(i == 0){
            const control = new FormControl(i===0);
            (this.form.controls.foods as FormArray).push(control);
          }
          else{
          const control = new FormControl(i); // if first item set to true, else false
          (this.form.controls.foods as FormArray).push(control);
          }
        }
        else{
          const control = new FormControl(); // if first item set to true, else false
          (this.form.controls.foods as FormArray).push(control);
        }

    });
  }

  private addCheckboxes(foods) {

    foods.forEach((o, i) => {
      // console.log(this.form.controls.foods);
      const control = new FormControl(i === 0); // if first item set to true, else false
      (this.form.controls.foods as FormArray).push(control);
    });
  }

  // formControl() { return (this.form.get('foods') as FormArray).controls; } 

   minSelectedCheckboxes(min = 1) {
    const validator: ValidatorFn = (formArray: FormArray) => {
      const totalSelected = formArray.controls
        // get a list of checkbox values (boolean)
        .map(control => control.value)
        // total up the number of checked checkboxes
        .reduce((prev, next) => next ? prev + next : prev, 0);
  
      // if the total is not greater than the minimum, return the error message
      return totalSelected >= min ? null : { required: true };
    };
  
    return validator;
  }

  onFileSelected(event){
    this.selectedFile = event.target.files;
  }

  onUpload(selectedFoodids){
    console.log(this.selectedFile.item(0))
    let file = this.selectedFile.item(0)
    this.currentUpload = new Upload(file);
    this.api.pushUpload(this.currentUpload)

      this.api.sharedURL.subscribe(
        message => {
          if(message == 'null'){
            console.log("loading")
          }
          else{
            this.sharedURL = message
            this.createFoodlist(this.form.value,selectedFoodids,this.sharedURL)
          }
          
          
      }
      )
    // }
  }



  ngOnInit(): void {
  }

}

