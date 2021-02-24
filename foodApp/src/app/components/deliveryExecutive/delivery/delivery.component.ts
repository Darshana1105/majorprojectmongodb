import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { DeliveryExecutiveService } from 'src/app/services/delivery-executive/delivery-executive.service';

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

 constructor(private _ordersServ: DeliveryExecutiveService,private formBuilder: FormBuilder) { }
 orders:any = [];
 ngOnInit(): void {
  this._ordersServ.activeOrders(this.dId).subscribe(res  =>{
    this.Acount = res.orders.length;
    this.activeOrders = res.orders;
    console.log(this.activeOrders);

  });
   this._ordersServ.getOrders().subscribe(res  =>{
     this.Ocount = res.orders.length;
     this.orders = res.orders;
     console.log(res.orders);
   });
   this._ordersServ.getRecent(this.dId).subscribe(res  =>{
    this.recentOrders = res.orders;
    console.log(res.orders);
  });
   setInterval(() => { this.gOrders(); }, 2000);
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
   this._ordersServ.activeOrders(this.dId).subscribe(res  =>{
    if(res.orders.length!=this.Acount){
      this.Acount = res.orders.length;
      this.activeOrders = res.orders;
      console.log(this.activeOrders);
    }
  });

 }

  acceptOrder(value:any):void{

    if(this.Acount<3){
      this._ordersServ.acceptOrder(value[0],this.dId).subscribe(res =>{
        console.log(res);
      })
      //console.log(value)
    }else{
      alert("Oops!! Cant accept more than 3 orders at a time")
    }
  }



 change(id:any,email:any,restaurantName:string,total:number){
   console.log(id);
  let status = '';
  status = this.statusForm.value.selected;
  let data = {
    restaurantName : restaurantName,
    billAmount : total
  }

  if(status === 'delivered'){
    this._ordersServ.orderStatus(id,"delivered").subscribe(res =>{
      console.log(res);
    })
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
