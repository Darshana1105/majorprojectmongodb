import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { DeliveryExecutiveService } from 'src/app/utilities/delivery-executive/delivery-executive.service';
import { RestaurantService } from 'src/app/utilities/restaurant/restaurant.service';
import { UserService } from 'src/app/utilities/user.service';


@Component({
  selector: 'app-restaurent-owner-home',
  templateUrl: './restaurent-owner-home.component.html',
  styleUrls: ['./restaurent-owner-home.component.scss']
})
export class RestaurentOwnerHomeComponent implements OnInit {
  activeOrders:any = [];
  recentOrders: any =[];

  constructor(private _ordersServ: DeliveryExecutiveService,
    private formBuilder: FormBuilder, private _resServ: RestaurantService,
    private _userService:UserService) {
   }
  orders:any = [];
  totalOrders:any;
  rId:string="";

  ngOnInit(): void {
    this._userService.getUser().subscribe((data)=>{
      if(data!=undefined && data.role=='ro'){
        this.rId = data.restaurantId

      this._ordersServ.getOrdersByRes(this.rId).subscribe(res  =>{
        this.Ocount = res.orders.length;
        this.orders = res.orders;
        console.log(res.orders);
        console.log(this.rId)

      });
    }
      setInterval(() => { this.gOrders(); }, 2000);
    });

  }

    Acount = 0;
    Ocount = 0;

        gOrders():void{
          this._ordersServ.getOrdersByRes(this.rId).subscribe(res  =>{
              if(res.orders.length!=this.Ocount){
                  this.Ocount = res.orders.length
                  this.orders = res.orders
              }
          });
        }

        acceptOrder(value:any):void{
          console.log(value)
            this._resServ.acceptOrder(value).subscribe(res =>{
              console.log(res);
            })
              console.log(value);
        }

}
