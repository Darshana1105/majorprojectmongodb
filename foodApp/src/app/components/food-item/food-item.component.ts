import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/utilities/user.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-food-item',
  templateUrl: './food-item.component.html',
  styleUrls: ['./food-item.component.scss']
})
export class FoodItemComponent implements OnInit, OnDestroy {

  @Input() foodData: any;

  userData: any;
  userObs: any;

  constructor(private _userService: UserService, private _itemprice: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit(): void {


    this.userObs = this._userService.getUser().subscribe((user) => {
      this.userData = user;
    })
  }
  ngOnDestroy() {
    this.userObs.unsubscribe();
  }


  price: number = 400;

  isFoodInCart(id: String): number {
    return this.userData.cart.foodList.findIndex((item: any) => item.foodId == id);
  }

   incrementItem(foodId: String) {

    if (this.userData.cart==undefined || this.userData.cart==null || this.userData?.cart.restaurantId == this.foodData.restaurantId) {
      let foodItem = {
        foodId: foodId,
        restaurantId: this.foodData.restaurantId
      }

      console.log(foodItem);
      if (this.userData?.role == 'user') {

      this._userService.incrementCartItem(foodItem).subscribe(async (data) => {
        await this._userService.updateUserDataLocal();
        // this.userData = await this._userService.getUser();
      });

      this.addtocart(this.foodData.food.foodPrice);
    }
    else {
      this.openDialogLogin();
    }
    }else{
      if(confirm("Your cart has existing items from another restaurant. Do you want to clear cart?")){
        this._userService.clearCart().subscribe(async (data)=>{
          await this._userService.updateUserDataLocal();
        })
      }
    }
  }

  decrementItem(foodId: String) {
    if (this.userData?.role == 'user') {
      let foodItem = {
        foodId: foodId,
        restaurantId: this.foodData.restaurantId
      }
      this._userService.decrementCartItem(foodItem).subscribe(async (data) => {
        await this._userService.updateUserDataLocal();
        // this.userData= await this._userService.getUser();
      })
    }
    else {
      this.openDialogLogin();
    }
  }


  addtocart(price: number) {
    this._itemprice.open("1 Item added to Cart!", "Price: " + price.toString(), {
      duration: 3000,
    })
  }


  // avgRating: Number = 0
  // ratingAvg(): Number {
  //   this.avgRating = this.foodData.foodRating.reduce((total:number, current:any) => total + current.rating, 0) / this.foodData.foodRating.length;
  //   return this.avgRating ;
  // }

  openDialogLogin() {
   let loginPopup= this._itemprice.open("Please login to add item.",'Login Here.',{
      duration: 3000,
    });
    loginPopup.onAction().subscribe(()=>{

      const dialogRef = this.dialog.open(LoginComponent);
    })
  }
}
