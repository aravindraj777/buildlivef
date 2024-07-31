import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Router } from '@angular/router';
import { LoginModel, LoginResponse, UpdateModel, User } from '../../store/auth/auth.model';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { RootState } from '../../store/global/root.state';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private _http: HttpClient,
    private _store: Store<RootState>,
    private _router: Router) { }


  private readonly _ACCESS_TOKEN_KEY = 'token';
  private readonly _AUTH_HEADER = 'authorization';



  login(loginData: LoginModel): Observable<LoginResponse> {
    const body = loginData;
    return this._http.post<LoginResponse>('auth/user-login', body).pipe(
      tap(response => {
        const user = response?.user;
        if (user && user.roles === "ADMIN") {
          this._router.navigate(['/admin/dashboard']);
        } else {
          this._router.navigate(['/profile']);
        }
      })
    )
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this._ACCESS_TOKEN_KEY);
  }

  setAccessToken(token: string): void {
    localStorage.setItem(this._ACCESS_TOKEN_KEY, token);
  }

  logout() {
    sessionStorage.removeItem('user');
    localStorage.removeItem('token');

  }

  getCurrentUser() {
    const user = this._store.select(state => state.auth.user);
    return user;

  }


  updateUserDetails(userId: string, update: UpdateModel): Observable<User> {
    const url = `user/edit/${userId}`;
    return this._http.put<User>(url, update).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

  getUserEmail(): string | null {
    const userData = sessionStorage.getItem('user');
    if (userData) {
      const parsedData = JSON.parse(userData);
      return parsedData.email;
    }
    else {
      return null;
    }
  }


  updateProfileImage(userId: string | undefined, imageFile: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('image', imageFile);
    formData.append('userId', userId || '');
    return this._http.post<any>('user/update-photo', formData);

  }

  getUserPhoto(userId: string | undefined): Observable<any> {
    const params = new HttpParams().set('userId', userId || '');
    return this._http.get(`user/getUserPhoto`, { params, responseType: 'text' as 'json' });
  }


}
