import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { RestaurantService } from 'src/app/utilities/restaurant/restaurant.service';
import { UserService } from 'src/app/utilities/user.service';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.scss']
})
export class ViewCartComponent implements OnInit, OnDestroy {

  cartItems: Array<any> = [];
  restaurantFoodList: Array<any> = [];
  restaurantId: any = '';

  userObs: any;

  constructor(private _userService: UserService, private _restaurantService: RestaurantService) {
  }

  ngOnInit(): void {
    // this.cartItems = await this._userService.getUser().
    // this.foodlist = this._restaurantService.getRestaurantById()

    // this._userService.getUser().then((data) => {
    //   this.restaurantId = data.cart.restaurantId
    //   this.cartItems = data.cart.foodList;


    //   console.log("cart :    00000", this.cartItems);

    //   this._restaurantService.getRestaurantById(this.restaurantId).then((data) => {
    //     this.restaurantFoodList = data.menuDetails;

    //     console.log(this.restaurantFoodList);

    //   })
    // })
    this.userObs = this._userService.getUser().subscribe((user) => {
      if (user.cart != undefined && user.cart!=null) {
        
        
      this.restaurantId = user.cart.restaurantId
      this.cartItems = user.cart.foodList;


      console.log("cart :    00000", this.cartItems);

      this._restaurantService.getRestaurantById(this.restaurantId).then((data) => {
        this.restaurantFoodList = data.menuDetails;      
      });
    }else
    {
      this.cartItems=[];
    }
    
      // }
      // else {
      //   this._userService.updateUserDataLocal();

      // }
    },(err)=>{
      console.log(err);
      
    });

  }
  ngOnDestroy(): void {
    this.userObs.unsubscribe();
  }


  foodItemOfId(id: string): any {
    return this.restaurantFoodList.find((food) => {
      return food._id == id
    });
  }

  getSubTotal(): number {
    let total = 0;
    if(this.cartItems!=undefined && this.restaurantFoodList.length!=0)
    {
      
      this.cartItems.forEach((cartItem: any) => {
        let foodItem = this.foodItemOfId(cartItem.foodId);
        // console.log("foodPrice***********",foodItem,cartItem);
        
        total += foodItem.foodPrice * cartItem.quantity;
      })
    }
    return total;
  }

  decrementItem(foodId: String) {
    let foodItem = {
      foodId: foodId,
      restaurantId: this.restaurantId
    }
    this._userService.decrementCartItem(foodItem).subscribe(async (data) => {
      await this._userService.updateUserDataLocal();
      // let temp= await this._userService.getUser();
      // this.cartItems=temp.cart.foodList;
    })
  };

  incrementItem(foodId: String) {

    let foodItem = {
      foodId: foodId,
      restaurantId: this.restaurantId
    }
    console.log(foodItem);
    this._userService.incrementCartItem(foodItem).subscribe(async (data) => {
       this._userService.updateUserDataLocal();
      //   let temp = await this._userService.getUser();
      //   this.cartItems=temp.cart.foodList;
    });

    // this.addtocart(this.foodData.food.foodPrice)
  };

  removeItem(foodId:String){
    let foodItem={
      foodId: foodId,
      restaurantId: this.restaurantId
    }
    this._userService.removeItem(foodItem).subscribe(async(data)=>{
      this._userService.updateUserDataLocal();
    })
  }

  clearCart(){
    this._userService.clearCart().subscribe((data)=>{
      this._userService.updateUserDataLocal();
    });
  }

}
