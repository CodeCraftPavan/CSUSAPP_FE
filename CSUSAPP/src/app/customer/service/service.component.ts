import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent {

  addCustomerForm : FormGroup;

  constructor(
    private formBuilder: FormBuilder,
     public dialogRef: MatDialogRef<ServiceComponent>,
  ) {
    this.addCustomerForm = this.formBuilder.group({
      serviceName: [''],
      saleDate: ['']
    })
  }

  onNoClick(): void {
    this.dialogRef.close(this.addCustomerForm.value);
  }


}
