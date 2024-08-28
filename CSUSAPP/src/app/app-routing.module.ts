import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CustomersListComponent } from './customer/customers-list/customers-list.component';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {path: '', redirectTo: 'login',pathMatch: 'full'},
  {path: 'login', component:LoginComponent}, 
  {path: 'customer/customersList', component:CustomersListComponent}, 
  {
    path: 'dashboard',
    component: LayoutComponent,
    //canActivate:[AuthGuard],
    children: [
        {
      path: '',loadChildren: () => import('./layout/layout.module').then(x => x.LayoutModule),
      //canActivate: [AuthGuard]
  }]},
  // {path: '**',redirectTo: 'login'},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
