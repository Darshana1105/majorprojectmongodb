import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeliveryUserProfileComponent } from './components/deliveryExecutive/delivery-user-profile/delivery-user-profile.component';
import { DeliveryComponent } from './components/deliveryExecutive/delivery/delivery.component';

const routes: Routes = [
{path:'', component:DeliveryComponent},
{path:'de-profile', component:DeliveryUserProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
