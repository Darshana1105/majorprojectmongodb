import { Component, Input, OnInit } from '@angular/core';
import { RestaurantService } from 'src/app/utilities/restaurant/restaurant.service';
import { UserService } from 'src/app/utilities/user.service';
import { MatDialog } from '@angular/material/dialog';
import { AddressDialogueComponent } from '../address-dialogue/address-dialogue.component';
import { threadId } from 'worker_threads';
import { OrderService } from 'src/app/utilities/order.service';
// import { AddAddressComponent } from '../add-address/add-address.component';

@Component({
  selector: 'app-order-bill',
  templateUrl: './order-bill.component.html',
  styleUrls: ['./order-bill.component.scss']
})
export class OrderBillComponent implements OnInit {

  restaurantData: any = "";
  restaurantId: String = "";
  userCart: any = "";
  userObs;

  addressData = {
    streetAddress: "",
    landmark: "",
    area: "",
    zip: null,
    city: "",
    state: "",
    country: ""
  };

  @Input()
  isInOrderBill: boolean = true;


  constructor(private _userService: UserService, private _restaurantService: RestaurantService,private _orderService:OrderService, public dialog: MatDialog) {
    this.userObs = this._userService.getUser().subscribe((user) => {
      if (user?.cart != undefined && user?.cart != null) {


        this.restaurantId = user.cart.restaurantId
        this.userCart = user.cart.foodList;


        // console.log("cart :    00000", this.userCart);

        this._restaurantService.getRestaurantById(this.restaurantId).then((data) => {
          this.restaurantData = data;
          this.addressData.city = this.restaurantData.restaurantLocation.city;
          this.addressData.state = this.restaurantData.restaurantLocation.state;
          this.addressData.country = this.restaurantData.restaurantLocation.country;
        });
      } else {
        this.userCart = [];
      }
    });
  }

  ngOnInit(): void {

  }



  foodItemOfId(id: string): any {
    return this.restaurantData.menuDetails.find((food: any) => {
      return food._id == id
    });
  }

  getSubTotal(): number {
    let total = 0;
    if (this.userCart != undefined && this.restaurantData?.menuDetails.length != 0) {

      this.userCart.forEach((cartItem: any) => {
        let foodItem = this.foodItemOfId(cartItem.foodId);
        // console.log("foodPrice***********",foodItem,cartItem);

        total += foodItem.foodPrice * cartItem.quantity;
      })
    }
    return total;
  }

  addAddress() {
    const dialogRef = this.dialog.open(AddressDialogueComponent, {
      data: { addressData: this.addressData },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.addressData = result;
        console.log(this.addressData);
      }
    });
  }

  placeOrder(){
    this._orderService.addOrder(this.addressData).subscribe(async (data)=>{
      console.log("Order Placed....:",data);      
    });
    this._userService.clearCart().subscribe(async (data)=>{        
      await this._orderService.updateUserOrderDataLocal();
    });
  }
}
