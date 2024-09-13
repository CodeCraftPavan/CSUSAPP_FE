import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { CreateUserComponent } from './create-user/create-user.component';

const routes: Routes = [
  { path: '', component:HomeComponent,
    children: [
  {path: '', redirectTo: 'customersList',pathMatch: 'full'},
  {path: 'home', component:HomeComponent}, 
  {path: 'addCustomer',component:AddCustomerComponent},
  {path: 'customersList',component:CustomersListComponent},
  {path: 'editCustomer',component:EditCustomerComponent},
  {path: 'addUser',component:CreateUserComponent},
]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
