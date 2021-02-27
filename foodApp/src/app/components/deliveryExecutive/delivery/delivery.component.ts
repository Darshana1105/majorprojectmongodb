import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { DeliveryExecutiveService } from 'src/app/utilities/delivery-executive/delivery-executive.service';
import { UserService } from 'src/app/utilities/user.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent implements OnInit {
 activeOrders:any = [];
 dId = "6030c1a0a56123fa757da6ba";
 statusForm = this.formBuilder.group({
  selected: ['', Validators.required],
});
  recentOrders:any = [];

 constructor(private _ordersServ: DeliveryExecutiveService,private _userService:UserService,private formBuilder: FormBuilder) { }
 orders:any = [];
 ngOnInit(): void {
  this._userService.getUser().subscribe((data)=>{
    if(data!=undefined && data.role=='de')
    {
      this._ordersServ.activeOrders().subscribe(res  =>{
        this.Acount = res.orders.length;
        this.activeOrders = res.orders;
        console.log(this.activeOrders);
    
      });
       this._ordersServ.getOrders().subscribe(res  =>{
         this.Ocount = res.orders.length;
         this.orders = res.orders;
         console.log(res.orders);
       });
       this._ordersServ.getRecent().subscribe(res  =>{
        this.recentOrders = res.orders;
        console.log(res.orders);
      });
    }
  });
   setInterval(() => { this.gOrders(); }, 2000);
  
 }
 Acount = 0;
 Ocount = 0;
 gOrders():void{
   this._ordersServ.getOrders().subscribe(res  =>{
     if(res.orders.length!=this.Ocount){
       this.Ocount = res.orders.length
       this.orders = res.orders
     }

   });
   this._ordersServ.activeOrders().subscribe(res  =>{
    if(res.orders.length!=this.Acount){
      this.Acount = res.orders.length;
      this.activeOrders = res.orders;
      console.log(this.activeOrders);
    }
  });

 }

  acceptOrder(value:any,email:any):void{
    console.log(value,email);
    if(this.Acount<3){
      let val = Math.floor(1000 + Math.random() * 9000);
      this._ordersServ.acceptOrder(value,val,email).subscribe(res =>{
        console.log(res);
      })
      //console.log(value)
    }else{
      alert("Oops!! Cant accept more than 3 orders at a time")
    }
  }



 change(id:any,email:any,restaurantName:string,total:number,otp:number){
   console.log(id);
  let status = '';
  status = this.statusForm.value.selected;
  let data = {
    restaurantName : restaurantName,
    billAmount : total
  }

  if(status === 'delivered'){
    let dOtp:any = prompt("Enter OTP");
    if(dOtp == otp){
      this._ordersServ.orderStatus(id,"delivered").subscribe(res =>{
      })
      this._ordersServ.sendMail(email,"delivered",data).subscribe(res =>{
        console.log(res);
      })
      alert("success");
    }else{
      alert('OTP is incorrect please try again');
    }
  }else if(status === 'pickedup'){
    this._ordersServ.sendMail(email,"Picked-up",data).subscribe(res =>{
      console.log(res);
    })
    this._ordersServ.orderStatus(id,"Picked-up").subscribe(res =>{
      console.log(res);
    })

  }else if(status === 'ontheway'){
    this._ordersServ.sendMail(email,"On-the-Way",data).subscribe(res =>{
      console.log(res);
    })
    this._ordersServ.orderStatus(id,"On-the-Way").subscribe(res =>{
      console.log(res);
    })
  }

 }
}
