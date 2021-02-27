import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
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
  selectedFilters:Array<string>=[];
  selectedCity:string='';
  searchText:string='';
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

  onSearchChange(event:string){
    console.log(event);
    this.searchText=event;
    this._restaurantService.searchRestaurants(this.selectedCity,this.searchText).subscribe((data)=>{
      console.log(data);
      
    });
  }
  
  onCitySelect(event:string){
    console.log(event);
    this.selectedCity=event;
    this._restaurantService.searchRestaurants(this.selectedCity,this.searchText).subscribe((data)=>{
      console.log(data);
      
    },(err)=>{
      console.log(err);
      
    });
  }

  openDialog(){
    this.filter_dialog.open(FilterDialogComponent,{
      width:'60vw',
      maxWidth:'1200px',
      height:'50vh',
      minHeight:'max-content',
      maxHeight:'100%',
      hasBackdrop:true,
      data:this.selectedFilters
    });
  }

}
