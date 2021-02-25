import { Component, OnInit } from '@angular/core';
import { Restaurant } from 'src/app/interfaces/restaurant';
import { RestaurantService } from 'src/app/utilities/restaurant.service';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.scss']
})
export class RestaurantListComponent implements OnInit {
  restaurants:Array<Restaurant>;

  constructor(private _restaurantService:RestaurantService) { 
    this.restaurants=[];
  }

  ngOnInit(): void {
    this._restaurantService.getAllRestaurants().subscribe((data)=>{
      console.log(data);
      
      this.restaurants = data;
    },
    (err)=>{
      console.log(err);
      
    }
    )
  }

}
