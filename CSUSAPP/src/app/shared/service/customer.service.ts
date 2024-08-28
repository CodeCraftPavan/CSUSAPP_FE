import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { APP_DI_CONFIG } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  login(user:any){
    return this.http.post<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Authentication.Login,user)
  }

  getAllCustomers(data:any){
    return this.http.post<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Customer.getAllCustomer,data)
  }

  addCustomerService(data:any){
    return this.http.post<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.customerService.addService,data)
  }

  updateCustomerService(data:any){
    return this.http.post<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.customerService.updateService,data)
  }

  addAssociate(data:any) {
    return this.http.post<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.customerAssociate.addAssociate,data)
  }

  updateAssociate(data:any) {
    return this.http.post<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.customerAssociate.updateAssociate,data)
  }

  addCustomer(data:any){
    return this.http.post<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Customer.addCustomer,data)
  }

  updateCustomer(data:any){
    return this.http.post<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Customer.EditCustomer,data)
  }
  
}
