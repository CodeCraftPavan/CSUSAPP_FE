import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { IndSegmentValue, RolesValue, ServicesValue, statusValue } from 'src/assets/mockData/enumValues';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent {

  addCustomerForm!: FormGroup;
  rolesList = RolesValue;
  IndSegmentList = IndSegmentValue
  statusList = statusValue
  ServicesList = ServicesValue


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


}
