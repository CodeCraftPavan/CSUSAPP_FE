import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, BehaviorSubject } from 'rxjs';


const TOKEN_KEY = 'auth-token';

@Component({
  selector: 'app-master.service',
  template: `
    <p>
      master.service works!
    </p>
  `,
  styles: [
  ]
})

@Injectable({
  providedIn: 'root'
})

export class MasterService {
 
  private userSource = new BehaviorSubject<any>({}); // BehaviorSubject to hold user data
  currentUser = this.userSource.asObservable(); // Observable to allow components to subscribe to the data changes

  constructor() { }


  changeUser(user: any) { // Method to change user data
    this.userSource.next(user); // Update the BehaviorSubject value
  }


  

  
  
}
