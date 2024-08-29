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
          EditCustomer: "api/Customer/Edit-Customer",
          getCustomerBYId: "api/Customer/Get-Customer-By-Id",
        },
        Services:{
            getAllServices: "api/AddServiceServices/Get-Available-Services",
            addService:"api/AddServiceServices/Add-Services"
        },
        customerService:{
            addService:"api/SoldServicesService/Add-Sold-Service",
            updateService:"api/SoldServicesService/Edit-Sold-Service"
        },
        customerAssociate:{
            addAssociate:"api/Associates/Add-Associates",
            updateAssociate:"api/Associates/Edit-Associates"
        }


    }
};