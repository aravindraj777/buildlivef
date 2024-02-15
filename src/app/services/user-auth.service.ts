import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Router } from '@angular/router';
import { LoginModel, LoginResponse } from '../store/auth/auth.model';
import { Observable, tap } from 'rxjs';
import { RootState } from '../store/global/root.state';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private _http:HttpClient,
              private _store:Store<RootState>,
              private _router:Router) { }

  
  private readonly _ACCESS_TOKEN_KEY = 'token';
  private readonly _AUTH_HEADER = 'authorization';        
  
  
  login(loginData:LoginModel):Observable<LoginResponse> {
    const body = loginData;
    return this._http.post<LoginResponse> ('auth/user-login',body).pipe(
      tap(response => {
        const user = response?.user;
        console.log(user,"response user");

        if(user){
          if(user.roles === "USER")
          this._router.navigate(['sidebar']);
        }
        else{
          this._router.navigate(['adminHome'])
        }
      })
    )
  }

  getAccessToken():string | null {
    return localStorage.getItem (this._ACCESS_TOKEN_KEY);
  }

  setAccessToken(token: string ):void{
      localStorage.setItem(this._ACCESS_TOKEN_KEY,token);
  }

  logOut():void{
    localStorage.removeItem(this._ACCESS_TOKEN_KEY);
    this._router.navigate([''])
  }
}
