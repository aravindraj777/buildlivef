import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminVerifiation } from '../../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private _http:HttpClient) { }


  adminSignup(formData:FormData):Observable<any>{
   return this._http.post<any>('auth/admin-register',formData);
  }

  verifyOtp(otpVerificationData:AdminVerifiation):Observable<any>{
    return this._http.post<any>('auth/admin-verifyotp',otpVerificationData)
  }

  

}
