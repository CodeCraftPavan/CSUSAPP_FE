import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/shared/service/customer.service';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent implements OnInit {

  constructor( 
    private router: Router,
    private _http : HttpClient,
    private customerService: CustomerService
   ) {   }

  ngOnInit(): void {
   this.getcustomers()
  }

  getcustomers(){
    this.customerService.getAllCustomers().subscribe((resp: any) => {
      console.log(resp);
      
  })
 }

}
