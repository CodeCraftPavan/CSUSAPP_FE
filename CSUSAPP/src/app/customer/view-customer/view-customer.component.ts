
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { IndSegmentValue, RolesValue, ServicesValue, statusValue } from 'src/assets/mockData/enumValues';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.css']
})
export class ViewCustomerComponent {

  addCustomerForm!: FormGroup;
  rolesList = RolesValue;
  IndSegmentList = IndSegmentValue
  statusList = statusValue
  ServicesList = ServicesValue
  customerData:any;

  constructor(private formBuilder: FormBuilder){
    this.addCustomerForm = this.formBuilder.group({
      abbrevation: [''],
      fullName: [''],
      region: [''],
      industrySegment: [''],
      accountCreationDate: [''],
      notes: [''],
      status: [''],
      soldServices: this.formBuilder.array([]),
      associates: this.formBuilder.array([]),
    })
  }

  ngOnInit() {
  let res :any  = localStorage.getItem("customerData");
  this.customerData = JSON.parse(res)
  console.log(this.customerData,'customer');
  
  this. updateCustomer()
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
    this.addCustomerForm.patchValue({
      abbrevation:this.customerData.abbrevation,
      fullName:this.customerData.fullName,
      region:this.customerData.region,
      industrySegment:this.customerData.industrySegment,
      notes:this.customerData.notes,
      status:this.customerData.status,
    })
  }

}


