import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeliveryReportsComponent } from './components/deliveryExecutive/delivery-reports/delivery-reports.component';
import { DeliveryUserProfileComponent } from './components/deliveryExecutive/delivery-user-profile/delivery-user-profile.component';
import { DeliveryComponent } from './components/deliveryExecutive/delivery/delivery.component';

const routes: Routes = [
{path:'', component:DeliveryComponent},
{path:'de-profile', component:DeliveryUserProfileComponent},
{path:'de-reports', component:DeliveryReportsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }