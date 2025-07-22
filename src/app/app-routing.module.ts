import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CustomersListComponent } from './customer/customers-list/customers-list.component';

const routes: Routes = [
  {path: '', redirectTo: 'login',pathMatch: 'full'},
  {path: 'login', component:LoginComponent}, 
  {path: 'customer/customersList', component:CustomersListComponent}, 
  // {path: '**',redirectTo: 'login'},
  {
    path: 'customer',loadChildren: () => import('./customer/customer.module').then((m) => m.CustomerModule),
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
