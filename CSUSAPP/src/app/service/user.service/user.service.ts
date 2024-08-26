import { Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user.service',
  template: `
    <p>
      user.service works!
    </p>
  `,
  styles: [
  ]
})

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://10.0.0.163:8081/get-feed-back';
  constructor(private http: HttpClient) { }

  login(data: any) {
    //return this.http.post<any>("https://localhost:44361/api/AuthManagement/Sign-In", data)
    return this.http.post<any>('http://10.0.0.163:8085/Sign-In', data);
  }

//   verifyEmail(data: any) {
//     return this.http.post<any>(APP_DI_CONFIG.parentDomain + APP_DI_CONFIG.endPoints.Authentication.VerifyEmail, data);
//   }

//   verifyOTP(data: any) {
//     return this.http.post<any>(APP_DI_CONFIG.parentDomain + APP_DI_CONFIG.endPoints.Authentication.VerifyOTP, data);
//   }

  createUser(data: any) {
    return this.http.post<any>('http://10.0.0.163:8085/api/Users/Create-User', data);
  }
  

 

 
//   resetPassword(data: passwordReset) {
//     return this.http.post<any>(`http://10.0.0.163:8081/api/AuthManagement/ResetPassword`,  data);
//   }

  
}
