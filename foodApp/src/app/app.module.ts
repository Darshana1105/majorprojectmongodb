import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DeliveryComponent } from './components/deliveryExecutive/delivery/delivery.component';
import { DeliveryReportsComponent } from './components/deliveryExecutive/delivery-reports/delivery-reports.component';
import { MaterialModule } from './material/material.module';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { LandingMainComponent } from './components/landing-main/landing-main.component';
import { TopRestaurantCardComponent } from './components/top-restaurant-card/top-restaurant-card.component';
import { TopFoodCardComponent } from './components/top-food-card/top-food-card.component';
import { RestaurentOwnerHomeComponent } from './components/restaurent-owner-home/restaurent-owner-home.component';
import {LoginComponent} from './components/login/login.component';
import { RestaurantHomeComponent } from './components/restaurant-home/restaurant-home.component';
import { AddRatingDialogComponent } from './components/add-rating-dialog/add-rating-dialog.component';
import { RatingModule } from 'ng-starrating';
import { FoodItemComponent } from './components/food-item/food-item.component';
import { UpperCaseConverterPipe } from './utilities/upper-case-converter.pipe';
import { UpperCaseConverterButtonPipe } from './utilities/upper-case-converter-button.pipe';
import { PureVegFilterPipe } from './utilities/pure-veg-filter.pipe';
import { ViewCartComponent } from './components/view-cart/view-cart.component';
import { ViewCartItemComponent } from './components/view-cart-item/view-cart-item.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { RestaurantCardComponent } from './components/restaurant-card/restaurant-card.component';
import { RestaurantListComponent } from './components/restaurant-list/restaurant-list.component';
import { FilterDialogComponent } from './components/filter-dialog/filter-dialog.component';
import { TopRatedRestaurantPipe } from './top-rated-restaurant.pipe';
import { OrderBillComponent } from './components/order-bill/order-bill.component';
import { UserOrdersComponent } from './components/user-orders/user-orders.component';
import { AddressDialogueComponent } from './components/address-dialogue/address-dialogue.component';
import { ActiveOrderComponent } from './components/active-order/active-order.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { NotFoundComponent } from './components/not-found/not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DeliveryComponent,
    DeliveryReportsComponent,
    FooterComponent,
    LandingMainComponent,
    TopRestaurantCardComponent,
    TopFoodCardComponent,
    RestaurantListComponent,
    SearchBarComponent,
    RestaurantCardComponent,
    TopFoodCardComponent,
    RestaurentOwnerHomeComponent,
    LoginComponent,
    RestaurantHomeComponent,
    AddRatingDialogComponent,
    FoodItemComponent,
    UpperCaseConverterPipe,
    UpperCaseConverterButtonPipe,
    PureVegFilterPipe,
    ViewCartComponent,
    ViewCartItemComponent,
    FilterDialogComponent,
    TopRatedRestaurantPipe,
    NotFoundComponent,
    OrderBillComponent,
    UserOrdersComponent,
    AddressDialogueComponent,
    ActiveOrderComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    RatingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
