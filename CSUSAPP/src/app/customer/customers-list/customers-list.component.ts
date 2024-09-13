import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/shared/service/customer.service';
import { AssociateComponent } from '../associate/associate.component';
import { MatDialog } from '@angular/material/dialog';
import { MasterService } from 'src/app/service/master.service/master.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent implements OnInit {

  pageStartNo: number = 0
  pageNo: number = 1

  searchKey:string = '';

  @ViewChild('myInput', { static: false }) inputElement!: ElementRef;


  totalPageCount:number = 1;
  dataSource:any = [];
  Pagination = {
    pageNumber: 1,
    pageSize: 10
  };
  userdata:any;

  displayedColumns: string[] = ['fullName','region','servicenames','associatesNames','view'];
  dialogRef:any;
  constructor( 
    private router: Router,
    private customerService: CustomerService,
    public dialog: MatDialog,
    private dataService: MasterService,
    private toastrService: ToastrService,
   ) { 
    this.userdata = JSON.parse(localStorage.getItem("userData")!);

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

 addUser(){
  this.router.navigate(['/customer/addUser']);
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

      if (resp.data.$values.length === 0) {
        this.toastrService.error('Customer name not found.');
        this.getcustomers(this.Pagination)
    } else {
      this.dataSource = resp.data.$values;
    }

    }
    else {
      return;
    }
  })
}

handleSearch() {
  const inputValue = this.inputElement.nativeElement.value;
  console.log('Search Input:', inputValue);
  this.searchKey = inputValue;
  this.getCustometBySearch()
  // this.dataService.changeUser(inputValue);
}

onInput(event: Event): void {
  const inputElement = event.target as HTMLInputElement;

  // Check if the input field is empty
  if (inputElement.value === '') {
   this.getcustomers(this.Pagination)
  }
}



}
