

import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-associate',
  templateUrl: './associate.component.html',
  styleUrls: ['./associate.component.css']
})
export class AssociateComponent {

  addCustomerForm : FormGroup;

  constructor(
    private formBuilder: FormBuilder,
     public dialogRef: MatDialogRef<AssociateComponent>,
  ) {
    this.addCustomerForm = this.formBuilder.group({
      associateName: [''],
      role: [''],
      contactInformation: [''],
    })
  }

  onNoClick(): void {
    this.dialogRef.close(this.addCustomerForm.value);
  }

}

