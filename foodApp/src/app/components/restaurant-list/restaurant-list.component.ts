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
  restaurants: Array<Restaurant>;
  selectedFilters: Array<string> = [];
  selectedCity: string = '';
  searchText: string = '';
  topRatedCheck:boolean=false;
  constructor(private filter_dialog: MatDialog, private _restaurantService: RestaurantService) {
    this.restaurants = [];
  }

  ngOnInit(): void {

    this.searchR();
  }

  onSearchChange(event: string) {
    this.searchText = event;
    this.searchR();
  }

  onCitySelect(event: string) {
    this.selectedCity = event;
    this.searchR();
  }

  searchR() {

    this._restaurantService.searchRestaurants(this.selectedCity, this.searchText).subscribe((data) => {
      this.restaurants = data;
      console.log(data);
      
    },
      (err) => {
        console.log(err);
      }
    )


  }


  openDialog() {
    let filterDialog = this.filter_dialog.open(FilterDialogComponent, {
      width: '60vw',
      maxWidth: '1200px',
      height: '50vh',
      minHeight: 'max-content',
      maxHeight: '100%',
      hasBackdrop: true,
      data: this.selectedFilters
    });
    filterDialog.afterOpened().subscribe((result) => {
      console.log(result);

      if (result != undefined) {
        // this.selectedFilters=result;
      }
    })

  }

}
