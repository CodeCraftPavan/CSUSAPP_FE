import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/shared/service/customer.service';
import { AssociateComponent } from '../associate/associate.component';
import { MatDialog } from '@angular/material/dialog';
import { MasterService } from 'src/app/service/master.service/master.service';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent implements OnInit {

  pageStartNo: number = 0
  pageNo: number = 1

  searchKey:string = '';

  totalPageCount:number = 1;
  dataSource:any = [];
  Pagination = {
    pageNumber: 1,
    pageSize: 10
  };

  displayedColumns: string[] = ['fullName','region','servicenames','associatesNames','view'];
  dialogRef:any;
  constructor( 
    private router: Router,
    private customerService: CustomerService,
    public dialog: MatDialog,
    private dataService: MasterService
   ) { 
    this.dataService.currentUser.subscribe( user => {
      this.searchKey = user
      this.getCustometBySearch();
    });
     }

  ngOnInit(): void {
   this.getcustomers(this.Pagination)
   this.openDialog()
  }

  getcustomers(pagination:any){
    this.customerService.getAllCustomers(pagination).subscribe((resp: any) => {
      console.log(resp.items.$values);
      this.dataSource = resp.items.$values;
      let count:number  = (resp.totalCount/10);
      this.totalPageCount = Math.ceil(count)
      this.dialogRef.close();
  })
 }

 addCustomer(){
  this.router.navigate(['/customer/addCustomer']);
 }

 editCustomer(item:any){
  console.log(item);
  localStorage.setItem("customerData",JSON.stringify(item));
  this.router.navigate(['/customer/editCustomer']);
 }

 prevPage() {
  this.pageNo--
  this.Pagination.pageNumber = this.pageNo;
  this.getcustomers(this.Pagination);
}

nextPage() {
  this.pageNo++
  this.Pagination.pageNumber = this.pageNo;
  this.getcustomers(this.Pagination);
}

openDialog(): void {
  this.dialogRef = this.dialog.open(AssociateComponent, {
    width: '30%',
    // height:'40%',
     panelClass: 'custom-dialog-container',
    data: {}
  });
}

getCustometBySearch(){
  var info: any = {};
  info.searchTerm = this.searchKey;
  this.customerService.searchCustomer(info).subscribe((resp: any) => {
    if (resp.statuscode == 200) {
      this.dataSource = resp.data.$values;
    }
    else {
      return;
    }
  })
}

}
