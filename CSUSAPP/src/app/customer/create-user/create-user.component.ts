import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from 'src/app/shared/service/customer.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})


export class CreateUserComponent {
  loginForm: FormGroup;
  showLoginForm : boolean = true;
  submitted :boolean = false;
  get f(){ return this.loginForm.controls};

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router,
    private customerService: CustomerService
  ){
    this.loginForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', Validators.required],
      userEMailId: ['', [Validators.required]],
      password: ['', Validators.required],
      roles:[0]
    });
  }

  onLogin() {
    console.log(this.loginForm.value,'values');
    
    if (this.loginForm.valid) {
      this.customerService.createUser(this.loginForm.value).subscribe({next:(res: any) => {
        if(res.statuscode == 200){
          this.toastrService.success('User created successful! ')
        this.router.navigate(['/customer']);
        }
      },error: (error:any) => {
        console.log(error,'error');
        
        this.toastrService.error('Create Account Failed. Please try again.')
      }});
     
    }
  }

  navigateList(){
    this.router.navigate(['/customer']);
  }
}
