import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';

const routes: Routes = [
  {path: '', redirectTo: 'home',pathMatch: 'full'},
  {path: 'home', component:HomeComponent}, 
  {path: 'addCustomer',component:AddCustomerComponent},
  {path: 'customersList',component:CustomersListComponent},
  {path: 'editCustomer',component:EditCustomerComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
