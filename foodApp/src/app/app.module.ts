import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DeliveryComponent } from './components/deliveryExecutive/delivery/delivery.component';
import { DeliveryProfileComponent } from './components/deliveryExecutive/delivery-profile/delivery-profile.component';
import { DeliveryReportsComponent } from './components/deliveryExecutive/delivery-reports/delivery-reports.component';
import { MaterialModule } from './material/material.module';
import { FooterComponent } from './components/footer/footer.component';
import { DeliveryUserProfileComponent } from './components/deliveryExecutive/delivery-user-profile/delivery-user-profile.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { LandingMainComponent } from './components/landing-main/landing-main.component';
import { RestaurantCardComponent } from './components/restaurant-card/restaurant-card.component';
import { TopFoodCardComponent } from './components/top-food-card/top-food-card.component';
import { RestaurentOwnerHomeComponent } from './components/restaurent-owner-home/restaurent-owner-home.component';

import { RestaurantHomeComponent } from './components/restaurant-home/restaurant-home.component';
import { AddRatingDialogComponent } from './components/add-rating-dialog/add-rating-dialog.component';
import { RatingModule } from 'ng-starrating';
import { FoodItemComponent } from './components/food-item/food-item.component';
import { UpperCaseConverterPipe } from './utilities/upper-case-converter.pipe';
import { UpperCaseConverterButtonPipe } from './utilities/upper-case-converter-button.pipe';
import { PureVegFilterPipe } from './utilities/pure-veg-filter.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DeliveryComponent,
    DeliveryProfileComponent,
    DeliveryReportsComponent,
    FooterComponent,
    DeliveryUserProfileComponent,
    LandingMainComponent,
    RestaurantCardComponent,
    TopFoodCardComponent,
    RestaurentOwnerHomeComponent,
    
    RestaurantHomeComponent,
    AddRatingDialogComponent,
    FoodItemComponent,
    UpperCaseConverterPipe,
    UpperCaseConverterButtonPipe,
    PureVegFilterPipe

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    ChartsModule,
    RatingModule,
    FormsModule

    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
