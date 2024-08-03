


import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { UserAuthService } from '../core/services/user-auth.service';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AuthState } from '../store/auth/auth.model';
import { setErrorMessage } from '../store/auth/auth.action';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private _authService: UserAuthService,
    private _store: Store<AuthState>
  ) { }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {

    const _BASE_URL = 'https://api.buildlive360.online/api/v1/';
    // const _BASE_URL = 'http://localhost:7070/api/v1/';


    let apiRequest = req.clone({
      url: _BASE_URL + req.url
    });

    let accessToken = this._authService.getAccessToken();
    if (accessToken) {
      apiRequest = apiRequest.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`
        }
      });
    }

    return next.handle(apiRequest).pipe(
      tap(
        (event) => {
          if (event.type === HttpEventType.Response && event.status === 200) {
            const responseBody = event.body;
            if (responseBody && responseBody.token) {
              const { token, user } = responseBody;

              this._authService.setAccessToken(token);

            }

          }

        },
        catchError((error) => {
          if (error.status === 403) {

            this._store.dispatch(
              setErrorMessage({ message: "Invalid credentials" })
            )
          }
          return throwError(error);
        })
      )
    );
  }
}
