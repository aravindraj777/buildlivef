import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserAuthService } from "../../core/services/user-auth.service";
import { loginFailure, loginRequest, loginSuccess, logout, updateFailure, updateRequest, updateSuccess } from "./auth.action";
import { catchError, delay, map, mergeMap, of, switchMap, tap } from "rxjs";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";


@Injectable()
export class AuthEffects{
  
/**
 * Creates an instance of AuthEffects.
 * @param {Actions} _actions$
 * @param {HttpClient} _http
 * @param {UserAuthService} _userAuthService
 * @param {NgxUiLoaderService} _ngxLoader
 * @param {ToastrService} _toastr
 * @param {Router} _router
 * @memberof AuthEffects
 */
constructor(private _actions$ :Actions ,
                private _http:HttpClient,
                private _userAuthService: UserAuthService,
                private _ngxLoader:NgxUiLoaderService,
                private _toastr:ToastrService,
                private _router:Router){}





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
          return loginFailure({ error: 'Invalid Credentials' });
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





// updateUser$ = createEffect(() => this._actions$.pipe(
//   ofType(updateRequest),
//   mergeMap(({ userId, update }) => this._userAuthService.updateUserDetails(userId, update).pipe(
//     map(user => updateSuccess({ user })),
//     catchError(error => of(updateFailure({ error })))
//   ))
// ));

/**
 *
 *
 * @memberof AuthEffects
 */
updateUser$ = createEffect(() =>
    this._actions$.pipe(
      ofType(updateRequest),
      mergeMap(({ userId, update }) =>
        this._userAuthService.updateUserDetails(userId, update).pipe(
          map(user => updateSuccess({ user })),
          catchError(error => of(updateFailure({ error })))
        )
      ),
      tap(action => {
        if ('user' in action && action.user) {
          sessionStorage.setItem('user', JSON.stringify(action.user));
        }
      }),
      tap(action => {
        if (updateSuccess.type === action.type) {
          this._toastr.success('Profile updated successfully!', 'Success');
          this._router.navigate(['/profile']);
        }
      })
    )
  );


  logout$ = createEffect(
    () => {
      return this._actions$.pipe(
        ofType(logout),
        map((action) => {
          this._userAuthService.logout();
          this._router.navigateByUrl('/login');
        })
      );
    },
    { dispatch: false }
  );


   

}