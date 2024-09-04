import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IndSegmentValue, RolesValue, ServicesValue, statusValue } from 'src/assets/mockData/enumValues';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { CustomerService } from 'src/app/shared/service/customer.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent {

  addCustomerForm!: FormGroup;
  rolesList = RolesValue;
  IndSegmentList = IndSegmentValue
  statusList = statusValue
  ServicesList = ServicesValue
  customerData:any;
  customerID:any;
  servicesList:any;
  associatesList:any;

  searchForm!: FormGroup;
  searchAssociateForm !: FormGroup;

  associatedisplayedColumns: string[] = ['associateName','role','contactInformation','edit'];
  servicedisplayedColumns: string[] = ['serviceName','saleDate','view'];

  constructor(private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private toastrService: ToastrService,
    private router: Router,
  ){
    this.addCustomerForm = this.formBuilder.group({
      id:[''],
      fullName: ['',Validators.required],
      region: ['',Validators.required],
      servicenames: [''],
      associatesNames: [''],
      abbrevation:['',Validators.required],
      industrySegment: [''],
      notes: [''],
      status: [''],
       crosSell: [''],
       upSell: [''],
       personResponsility: [''],
       goals: [''],
       accountHistory: [''],
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
  
    


  let res :any  = localStorage.getItem("customerData");
 let userData = JSON.parse(res)
  this.customerID  = userData.id
  this.getCustometByID()
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
      //     this.toastrService.success('Broker Updated successfully');
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

  updateCustomer(){

  //   this.servicesList = this.customerData.soldServices.$values;
  // this.associatesList = this.customerData.associates.$values;

    this.addCustomerForm.patchValue({
      id:this.customerData.id,
      abbrevation:this.customerData.abbrevation,
      fullName:this.customerData.fullName,
      region:this.customerData.region,
      industrySegment:this.customerData.industrySegment,
      notes:this.customerData.notes,
      status:this.customerData.status,
      servicenames:this.customerData.serviceNames,
      associatesNames:this.customerData.associateNames,
      crosSell:this.customerData.crosSell,
      upSell:this.customerData.upSell,
      personResponsility:this.customerData.personResponsility,
      goals:this.customerData.goals,
      accountHistory:this.customerData.accountHistory,
    })
    console.log(this.addCustomerForm.value,'customer data');
    
  }

  editService(element:any){

  }

  editAssociate(element:any){

  }

  addService(){
    this.searchForm.patchValue({
      customerId: this.customerData.id,
      saleDate: new Date(),
      status:0
    })
    const searchTerm = this.searchForm.get('serviceName')?.value;
     this.customerService.addCustomerService(this.searchForm.value).subscribe((data: any) => {
        if (data.status == 200) {
          this.router.navigate(['/customer/customersList']);
          // this.editDialogVisible = false;
          this.toastrService.success('Customer details updated successfully.');
          // this.GetAllReferral();
        }
        else {
          return;
        }
      })
    
  }

  addAssociate(){

    this.searchForm.patchValue({
      customerId: this.customerData.id,
    })

   // const searchTerm = this.searchAssociateForm.get('searchTerm')?.value;
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

  updateService(){
     this.customerService.updateCustomerService(this.searchForm.value).subscribe((data: any) => {
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

  updateAssociate(){
    this.customerService.updateAssociate(this.searchForm.value).subscribe((data: any) => {
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

  updateData(){
     
    // this.addCustomerForm.patchValue({
    //   id: this.customerData.id,
    // })
    this.customerService.updateCustomer(this.addCustomerForm.value).subscribe((data: any) => {
      if (data.statuscode == 200) {
     //   this.router.navigate(['/customer/customersList']);
        this.toastrService.success('Service Updated successfully');
        this.getCustometByID()
      }
      else {
        return;
      }
    })
  }

  getCustometByID(){
    var info: any = {};
    info.id = this.customerID
    this.customerService.getCustomerBYId(info).subscribe((resp: any) => {
      if (resp.statuscode == 200) {
      this.customerData = resp.data
     this.updateCustomer()
      }
      else {
        return;
      }
    })
  }

  navigateList(){
    this.router.navigate(['/customer']);
  }

  keyPressAlpha(event:any) {
    var inp = String.fromCharCode(event.keyCode);
    console.log(inp,'input');
    
    const controlValue = this.addCustomerForm.get('fullName')?.value || '';
console.log(controlValue,'controlValue');

    if(controlValue.length == 0){
      if (/[a-zA-Z]/.test(inp)) {
        return true;
      } else {
        event.preventDefault();
        return false;
      }
    } 
    else{
      if (/[a-zA-Z ]/.test(inp)) {
        return true;
      } else {
        event.preventDefault();
        return false;
      }

    }
  }

}

