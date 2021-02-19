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
      this.orders = res.orders;
      console.log(res.orders);
    });
    //setInterval(() => { this.gOrders(); }, 2000);
  }
  count = 0;
  gOrders():void{
    this._ordersServ.getOrders().subscribe(res  =>{
      if(res.orders.length!=this.count){
        this.count = res.orders.length
        this.orders = res.orders
      }

    });
  }

  acceptOrder(value:any):void{
    // this._ordersServ.acceptOrder("602a35f1ef3f0f46d49e867e").subscribe(res =>{
    //   console.log(res);
    // })
    console.log(value)
  }
}
