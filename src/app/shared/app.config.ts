import { NgModule } from '@angular/core';
import { EditCustomerComponent } from '../customer/edit-customer/edit-customer.component';

export const APP_DI_CONFIG: any = {
    // For api calls
    parentDomain: 'http://10.0.0.163:8085/',
    endPoints: {
        Authentication:{
            Login: "Sign-In",
        },
        User:{
            Login: "api/Users/Create-User",
        },
        Customer: {
          getAllCustomer: "api/Customer/Get-Customers",
          addCustomer: "api/Customer/Add-Customer",
          EditCustomerComponentCustomer: "api/Customer/Edit-Customer",
        },
        Services:{
            getAllServices: "api/AddServiceServices/Get-Available-Services",
            addService:"api/AddServiceServices/Add-Services"
        }
    }
};