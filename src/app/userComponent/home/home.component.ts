import { Component, OnInit } from '@angular/core';
import { DeliveryExecutiveService } from 'src/app/services/delivery-executive/delivery-executive.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private _ordersServ: DeliveryExecutiveService) { }
  orders:any = [];
  ngOnInit(): void {
    this._ordersServ.getOrders().subscribe(res  =>{
      this.count = res.orders.length;

      res.orders.forEach((element:any) => {
        this._ordersServ.getRestaurantById
          (element.restaurantDetails.restaurantId).subscribe(res  =>{
          element.restaurantDetails = res[0]

          this.orders.push(element);
        });
      });
    });
    setInterval(() => { this.gOrders(); }, 2000);
  }
  count = 0;
  gOrders():void{
    this._ordersServ.getOrders().subscribe(res  =>{
      if(res.orders.length!=this.count){
        this.count = res.orders.length
        this.orders = [];
        res.orders.forEach((element:any) => {
          this._ordersServ.getRestaurantById
            (element.restaurantDetails.restaurantId).subscribe(res  =>{
            element.restaurantDetails = res[0]

            this.orders.push(element);
          });
        });
      }

    });
  }

  acceptOrder(value:any):void{
    this._ordersServ.acceptOrder(value[0],"602a35f1ef3f0f46d49e867e").subscribe(res =>{
      console.log(res);
    })
  }
}
