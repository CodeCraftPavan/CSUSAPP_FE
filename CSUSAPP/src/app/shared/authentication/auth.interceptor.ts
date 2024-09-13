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
  
     let userdata = JSON.parse(localStorage.getItem("userData")!);
     const LoginToken = userdata?.token
     if (LoginToken) {
       request = request.clone({
         setHeaders: {
           Authorization: `${LoginToken}`
         }
       });
     }
      return next.handle(request);
  }
}
