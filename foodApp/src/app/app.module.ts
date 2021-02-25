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
import { TopRestaurantCardComponent } from './components/top-restaurant-card/top-restaurant-card.component';
import { TopFoodCardComponent } from './components/top-food-card/top-food-card.component';
import { RestaurantListComponent } from './components/restaurant-list/restaurant-list.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { RestaurantCardComponent } from './components/restaurant-card/restaurant-card.component';
import { FilterDialogComponent } from './components/filter-dialog/filter-dialog.component';


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
    TopRestaurantCardComponent,
    TopFoodCardComponent,
    RestaurantListComponent,
    SearchBarComponent,
    RestaurantCardComponent,
    FilterDialogComponent,
    

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

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
