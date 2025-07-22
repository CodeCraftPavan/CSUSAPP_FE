import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

   TOKEN_HEADER_KEY = 'Authorization';

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
  
     // Get the token from localStorage
     const LoginToken = localStorage.getItem("Token");
 console.log(LoginToken,'LoginToken');
 
     if (LoginToken) {
       // Clone the request and set the new header in one step
       request = request.clone({
         setHeaders: {
           Authorization: `${LoginToken}`
         }
       });
     }
 
     // Pass the modified request to the next handler
     return next.handle(request);

  }
}
