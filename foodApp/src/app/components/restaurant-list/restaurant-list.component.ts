import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Restaurant } from 'src/app/interfaces/restaurant';
import { RestaurantService } from 'src/app/utilities/restaurant.service';
import { FilterDialogComponent } from '../filter-dialog/filter-dialog.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.scss']
})
export class RestaurantListComponent implements OnInit {
  restaurants:Array<Restaurant>;

  constructor(private filter_dialog:MatDialog,private _restaurantService:RestaurantService) { 
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

  openDialog(){
    this.filter_dialog.open(FilterDialogComponent);
  }

}
