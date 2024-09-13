import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from 'src/app/shared/service/customer.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent {
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
      roles:['']
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.customerService.login(this.loginForm.value).subscribe({next:(res: any) => {
        if(res.data){
          this.toastrService.success(' Account created successful! Welcome to the app.')
        localStorage.setItem('userData',JSON.stringify(res.data));
        this.router.navigate(['/customer']);
        }
      },error: (error:any) => {
        console.log(error,'error');
        
        this.toastrService.error('Create Account Failed. Please try again.')
      }});
     
    }
  }
}
