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
      this.customerService.login(this.loginForm.value).subscribe({next:(res: any) => {
        if(res.data){
          this.toastrService.success('Login successful! Welcome to the app.')
        localStorage.setItem('userData',JSON.stringify(res.data));
        this.router.navigate(['/customer']);
        }
      },error: (error:any) => {
        console.log(error,'error');
        
        this.toastrService.error('Login Failed. Please try again.')
      }});
     
    }
  }
}
