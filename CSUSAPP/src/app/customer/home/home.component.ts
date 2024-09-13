import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MasterService } from 'src/app/service/master.service/master.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  userdata:any;
  constructor(private router: Router) 
  { 
    this.userdata = JSON.parse(localStorage.getItem("userData")!);
  }

  userLogout(){
    localStorage.clear();
    return this.router.navigate([''])
  }

  navigateList(){
    this.router.navigate(['/customer']);
  }

}
