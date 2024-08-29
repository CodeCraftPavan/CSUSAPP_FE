import { Routes } from "@angular/router";
import { AddCustomerComponent } from "../customer/add-customer/add-customer.component";
import { CustomersListComponent } from "../customer/customers-list/customers-list.component";
import { EditCustomerComponent } from "../customer/edit-customer/edit-customer.component";

export const LayoutRoutes: Routes = [
 
    {
        path: '',loadChildren: () => import('../customer/customer.module').then((m) => m.CustomerModule),
    },
 ];