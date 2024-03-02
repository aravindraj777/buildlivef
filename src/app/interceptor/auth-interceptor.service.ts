import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { UserAuthService } from '../core/services/user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private _authService:UserAuthService) { }
  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {

    const _BASE_URL = 'http://localhost:8080/api/v1/';

    let apiRequest = req.clone({
      url: _BASE_URL + req.url
    });

    let accessToken = this._authService.getAccessToken();
    if(accessToken) {
      apiRequest  = apiRequest.clone({
        setHeaders : {
          Authorization : `Bearer ${accessToken}`
        }
      });
    }

    return next.handle(apiRequest).pipe(
      tap(
          (event) => {
              if (event.type === HttpEventType.Response && event.status === 200) {
                  const { token, user } = event.body;

                  if (token) {
                      // Update the access token in the service
                      this._authService.setAccessToken(token);
                      apiRequest.clone({
                          setHeaders:{
                              Authorization: `Bearer ${token}`
                          }
                      })
                      console.log("Updated access token:", token);
                  }

                  console.log("Response from body:", event.body);
              }
          },
          catchError((error) => {
              if (error.status === 403 ) {
                 
                  console.log("Unauthorized error. Redirect to login page or refresh token.");
                  
                  // return this.handleUnauthorizedError()

              }
              return throwError(error);
          })
      )
  );

    throw new Error('Method not implemented.');
  }


}
