import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MasterService } from 'src/app/service/master.service/master.service';
import { UserService } from 'src/app/service/user.service/user.service';
import { CustomerService } from 'src/app/shared/service/customer.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  showLoginForm : boolean = true;
  loginText = 'Log In';
  submitted :boolean = false;
  get f(){ return this.loginForm.controls};

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router,
    private customerService: CustomerService
  ){
    this.loginForm = this.formBuilder.group({
      userEmail: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.customerService.login(this.loginForm.value).subscribe({next:(data: any) => {
        if(data.data){
        localStorage.setItem('Token', data.data.token);
        localStorage.setItem('firstName', data.data.firstName);
        localStorage.setItem('lastName', data.data.lastName);
        this.router.navigate(['/dashboard']);
        this.loginText = "Log In";
        }
      },error: (error:any) => {
        this.toastrService.error('Login Failed. Please try again.')
        this.loginText = 'Log In'
      }});
     
    }
  }
}
