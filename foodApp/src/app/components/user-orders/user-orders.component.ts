import { Component, OnInit } from '@angular/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { UserService } from 'src/app/utilities/user.service';
import { RestaurantService } from 'src/app/utilities/restaurant/restaurant.service';
import { MatStepper } from '@angular/material/stepper';
import { ViewChild } from '@angular/core';
import { OrderService } from 'src/app/utilities/order.service';
import { MatDialog } from '@angular/material/dialog';
import { AddRatingDialogComponent } from '../add-rating-dialog/add-rating-dialog.component';


@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    }
  ]
})
export class UserOrdersComponent implements OnInit {


  @ViewChild('stepper')
  // private myStepper: MatStepper= new MatStepper();



  restaurantData: any;
  orders: any;
  pastOrders: Array<any>=[];
  currentOrders: Array<any>=[];
  rating: number = 0;

selectedIndex:number=0;

  constructor(private _userService: UserService, private _restaurantService: RestaurantService, private _orderService: OrderService, public dialog: MatDialog) { }

   ngOnInit(): void {

// this.myStepper.next();

    this._orderService.getUserOrders().subscribe((data) => {

      console.log(data);
      this.orders = data; 

      if(this.orders!=undefined)
      {
        this.pastOrders = this.orders.filter((order: any) => { return order.orderStatus == 'delivered' });
  
        this.currentOrders = this.orders.filter((order: any) => { return order.orderStatus != 'delivered' });
      }

      // this.myStepper.next();


    })
  }

  addFoodRating(restaurantId:string,foodList: any){
    const dialogRef = this.dialog.open(AddRatingDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      
      this.rating = result;      
      let ratingData={
        restaurantId: restaurantId,
        foodList: foodList,
        rating:this.rating
      }

      this._orderService.addFoodRating(ratingData).subscribe((data)=>{
        console.log(data);
      })

    });
  }

  addDeliveryRating(deId:string){
    const dialogRef = this.dialog.open(AddRatingDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.rating = result;      
      let ratingData={
        deId:deId,
        rating:this.rating
      }

      this._orderService.addDeRating(ratingData).subscribe((data)=>{
        console.log(data);
      })
    });
  }
}
