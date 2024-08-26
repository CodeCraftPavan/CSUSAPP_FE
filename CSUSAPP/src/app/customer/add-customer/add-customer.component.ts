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

  }


}
