import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path: '', redirectTo: 'login',pathMatch: 'full'},
  {path: 'login', component:LoginComponent}, 
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
