import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { HomeComponent } from './home/home.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import { ViewCustomerComponent } from './view-customer/view-customer.component';
import {MatDialogModule} from '@angular/material/dialog';
import { AssociateComponent } from './associate/associate.component';
import { ServiceComponent } from './service/service.component';

@NgModule({
  declarations: [
    HomeComponent,
    AddCustomerComponent,
    EditCustomerComponent,
    CustomersListComponent,
    ViewCustomerComponent,
    AssociateComponent,
    ServiceComponent  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,MatDialogModule,
  ]
})
export class CustomerModule { }
