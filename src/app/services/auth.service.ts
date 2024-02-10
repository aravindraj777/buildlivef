import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterResponse } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // constructor(private _http: HttpClient) { }

  

  // baseUrl = "http://localhost:8080/api/v1/"

  // registerUser(userData: FormData):Observable<RegisterResponse>{
  //   console.log("coming");
  //   return this._http.post<RegisterResponse>(`${this.baseUrl}/auth/register`,userData)
  // }
}
