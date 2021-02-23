import { formatCurrency } from '@angular/common';
import { Component, createPlatformFactory, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { element } from 'protractor';
import { DeliveryExecutiveService } from 'src/app/services/delivery-executive/delivery-executive.service';


@Component({
  selector: 'app-delivery-user-profile',
  templateUrl: './delivery-user-profile.component.html',
  styleUrls: ['./delivery-user-profile.component.scss']
})
export class DeliveryUserProfileComponent implements OnInit {
  hide = true;
  profileForm: any;
  avgRating: number = 0;

  constructor(private _ordersServ: DeliveryExecutiveService) {}
  userdata:any
  userName:any
  postData:any
  RatingsObj:any;
  deRatings:any;
  ngOnInit(): void {

    this._ordersServ.getUserById("6030c1a0a56123fa757da6ba").subscribe(res  =>{
      console.log(res.user);
      this.userdata = res.user;
      this.Ratings();
      if(this.userdata){
      this.form();
      }
    });
  }
  
  // Calculate Average Ratings From Ratings Object 
  Ratings(){
      this.RatingsObj= this.userdata.deliveryExecutive.deliveryExecutiveRatings;
      const arrayLength:any = this.RatingsObj.length ;
      this.RatingsObj.forEach((element:any) => {
      this.avgRating  = this.avgRating + element.rating;
      
    });

      console.log( (this.avgRating)/arrayLength);
      this.deRatings = (this.avgRating)/arrayLength
  }

  // Get Profile Data from DE 
  sendProfile():void{
    this.postData = this.profileForm.value;
    let dataDe = {
      firstName:this.postData.firstName,
      lastName:this.postData.lastName,
      email:this.postData.email,
      birthDate:this.postData.birthDate,
      mobileNumber:this.postData.mobileNumber,
      gender:this.postData.gender,
      deliveryExecutive:{
        vehicleNumber:this.postData.vehicleNumber,
        deliveryExecutiveLocation:{
          streetAddress:this.postData.streetAddress,
          city:this.postData.city,
          zip:this.postData.pincode,
          state:this.postData.state
        }
      }

    }
    this._ordersServ.updateDe("6030c1a0a56123fa757da6ba", dataDe ).subscribe(res => {
    console.log(res);
    })
    // console.log(this.postData);
  }
 
  form(){
    this.profileForm = new FormGroup({
        firstName: new FormControl(this.userdata.firstName,Validators.required),
        lastName: new FormControl(this.userdata.lastName,Validators.required),
        email:new FormControl(this.userdata.email,[Validators.required, Validators.email]),
        birthDate: new FormControl(this.userdata.birthDate,Validators.required),
        mobileNumber: new FormControl(this.userdata.mobileNumber,[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
        vehicleNumber:new FormControl(this.userdata.deliveryExecutive.vehicleNumber,Validators.required),
        streetAddress:new FormControl(this.userdata.deliveryExecutive.deliveryExecutiveLocation.streetAddress,Validators.required),
        city:new FormControl(this.userdata.deliveryExecutive.deliveryExecutiveLocation.city,Validators.required),
        pincode:new FormControl(this.userdata.deliveryExecutive.deliveryExecutiveLocation.zip,[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{6}$")]),
        state:new FormControl(this.userdata.deliveryExecutive.deliveryExecutiveLocation.state,Validators.required),
        gender:new FormControl(this.userdata.gender),

    });
    console.log("this.userdata");
  }

  get firstName() { return this.profileForm.get('firstName'); }
  get lastName() { return this.profileForm.get('lastName'); }
  get email() { return this.profileForm.get('email'); }
  get mobileNumber() { return this.profileForm.get('mobileNumber'); }
  get vehicleNumber() { return this.profileForm.get('vehicleNumber'); }
  get streetAddress() { return this.profileForm.get('streetAddress'); }
  get city() { return this.profileForm.get('city'); }
  get pincode() { return this.profileForm.get('pincode'); }
  get state() { return this.profileForm.get('state'); }

}
