import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { IndSegmentValue, RolesValue, ServicesValue, statusValue } from 'src/assets/mockData/enumValues';
import { AssociateComponent } from '../associate/associate.component';
import { ServiceComponent } from '../service/service.component';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { CustomerService } from 'src/app/shared/service/customer.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent {

  addCustomerForm!: FormGroup;
  searchForm!: FormGroup;
  searchAssociateForm !: FormGroup;
  rolesList = RolesValue;
  IndSegmentList = IndSegmentValue
  statusList = statusValue
  ServicesList = ServicesValue
  dataSourceAssociate:any = [];
  serviceArray:any = [];

  displayedColumns: string[] = ['abbrevation','fullName','region','status','view','edit'];


  constructor(private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private customerService: CustomerService,
    private toastrService: ToastrService,
    private router: Router,
  ){
    this.addCustomerForm = this.formBuilder.group({
      fullName: [''],
      region: [''],
      serviceNames: [''],
      associatenames: [''],
      abbrevation: [''],
      industrySegment: [''],
      notes: [''],
      status: [''],
      crosSell: [''],
      upSell: [''],
    })
  
  }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      customerId : [''],
      serviceName: [''],
      saleDate : [''],
      status : [''],
    });

    this.searchAssociateForm = this.formBuilder.group({
      customerId: [''],
      associateName: [''],
      contactInformation : [''],
      roles : [''],
    });

    this.searchForm.get('serviceName')?.valueChanges
      .pipe(
        debounceTime(300), // Wait for the user to stop typing for 300ms
        distinctUntilChanged(), // Only proceed if the new value is different from the last
        filter(value => value.trim().length > 0) // Only proceed if the input is not empty
      )
      .subscribe(searchTerm => {
        this.performSearch(searchTerm);
      });


      this.searchAssociateForm.get('associateName')?.valueChanges
      .pipe(
        debounceTime(300), // Wait for the user to stop typing for 300ms
        distinctUntilChanged(), // Only proceed if the new value is different from the last
        filter(value => value.trim().length > 0) // Only proceed if the input is not empty
      )
      .subscribe(searchTerm => {
        this.performSearchAssociate(searchTerm);
      });

  }

  performSearch(searchTerm: any) {
    // Logic for searching, e.g., filtering a list or making an API call
    console.log('Searching for:', searchTerm);
    // Implement your search logic here
  }

  performSearchAssociate(searchTerm: any) {
    // Logic for searching, e.g., filtering a list or making an API call
    console.log('Searching for:', searchTerm);
    // Implement your search logic here
  }

  get soldServicesArray() {
    return this.addCustomerForm.get('soldServices') as FormArray;
  }

  get associatesArray() {
    return this.addCustomerForm.get('associates') as FormArray;
  }

  addsoldServices(){
    this.soldServicesArray.push(this.formBuilder.group({
      serviceName: [''],
       saleDate: [''],
    }));
  }

 

  addassociates(){
    this.associatesArray.push(this.formBuilder.group({
      associateName: [''],
      role: [''],
      contactInformation: ['']
    }));

  //  this.associatesArray.push(this.createassociatesItem());
  }

  createassociatesItem() {
    return this.formBuilder.group({
      associateName: [''],
      role: [''],
      contactInformation: [''],
    });
  }


  submitAddUser(){

    if (this.addCustomerForm.valid) {
      var info: any = {};
      var soldServices :any = []
      var associates :any = []
      const currentDate = new Date();

      var soldServiceList = this.soldServicesArray.value;
      soldServiceList.forEach((item: any) => {
        soldServices.push( { id: 0,serviceName: item.serviceName,saleDate: currentDate,status: true  } )
      })

      var associateList = this.associatesArray.value;
      associateList.forEach((item: any) => {
        associates.push( { id: 0,associateName: item.associateName,role: item.role,contactInformation: item.contactInformation  } )
      })
    
      info.newBrokerName = this.addCustomerForm.controls['abbrevation'].value;
      info.oldBrokerNumber = this.addCustomerForm.controls['fullName'].value;
      info.newBrokerNumber =this.addCustomerForm.controls['region'].value;
      info.newBrokerNumber =this.addCustomerForm.controls['industrySegment'].value;
      info.oldBrokerNumber = this.addCustomerForm.controls['notes'].value;
      info.newBrokerNumber =this.addCustomerForm.controls['status'].value;
      info.soldServices = soldServices
      info.associates = associates
      // this.service.UpdateReferral(info).subscribe((data: any) => {
      //   if (data.status == 200) {
      //     this.editDialogVisible = false;
       //  this.toastrService.success('Service Updated successfully');
      //     this.GetAllReferral();
      //   }
      //   else {
      //     return;
      //   }
      // })
    }

  }

  createServices(){
    this.soldServicesArray.value;
  }

  addService(){
    const searchTerm = this.searchForm.get('serviceName')?.value;
    // console.log('Search term:', searchTerm);
    this.serviceArray.push(this.searchForm.value)
    console.log(this.serviceArray,'');

     this.customerService.addCustomerService(this.searchForm.value).subscribe((data: any) => {
        if (data.status == 200) {
          // this.editDialogVisible = false;
          this.toastrService.success('Service Added successfully');
          // this.GetAllReferral();
        }
        else {
          return;
        }
      })
    
  }

  addAssociate(){
    const searchTerm = this.searchAssociateForm.get('searchTerm')?.value;
    this.customerService.addAssociate(this.searchForm.value).subscribe((data: any) => {
      if (data.status == 200) {
        // this.editDialogVisible = false;
        this.toastrService.success('Service Updated successfully');
        // this.GetAllReferral();
      }
      else {
        return;
      }
    })
  }

  

 

  removeService(){

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AssociateComponent, {
      width: '60%',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle the result here, e.g., save the data
        this.associatesArray.push(this.formBuilder.group({
          associateName: [result.associateName],
          role: [result.contactInformation],
          contactInformation: [result.role],
        }));
        console.log(this.associatesArray.value ,'associates list');
        this.dataSourceAssociate = this.associatesArray.value
        console.log('Data received from dialog:', result);
      }
    });

  }


  openDialog2(): void {
    const dialogRef = this.dialog.open(ServiceComponent, {
      width: '60%',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle the result here, e.g., save the data
        this.soldServicesArray.push(this.formBuilder.group({
          serviceName: [result.serviceName],
          saleDate: [result.saleDate]
        }));
        console.log(this.associatesArray.value ,'associates list');
        this.dataSourceAssociate = this.associatesArray.value
        console.log('Data received from dialog:', result);
      }
    });

  }

  addData(){
    this.customerService.addCustomer(this.addCustomerForm.value).subscribe((data: any) => {
      if (data.statuscode == 200) {
        this.toastrService.success('Customer Added successfully');
        this.router.navigate(['/customer/customersList']);
      }
      else {
        return;
      }
    })
  }

 

}
