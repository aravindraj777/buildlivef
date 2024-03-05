import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserAuthService } from "../../core/services/user-auth.service";
import { loginFailure, loginRequest, loginSuccess } from "./auth.action";
import { catchError, delay, map, of, switchMap, tap } from "rxjs";
import { NgxUiLoaderService } from "ngx-ui-loader";


@Injectable()
export class AuthEffects{

    constructor(private _actions$ :Actions ,
                private _http:HttpClient,
                private _userAuthService: UserAuthService,
                private _ngxLoader:NgxUiLoaderService){}





login$ = createEffect(() => 
this._actions$.pipe(
  ofType(loginRequest),
  tap(() => this._ngxLoader.start()),
  switchMap((action) => {
    const loginData = action.login;
    return this._userAuthService.login(loginData).pipe(
      map((response: any) => {
        if (response && response.user) {
          return loginSuccess({ user: response.user });
        } else {
          return loginFailure({ error: new Error('Invalid response') });
        }
      }),
      catchError((error) => of(loginFailure({ error })))
    );
  }),
  tap((action) => {
    if (action.type === "[Auth] loginSuccess") {
      sessionStorage.setItem('user', JSON.stringify(action.user));
    }
  }),
  tap(() => this._ngxLoader.stop())
)
);
   

}