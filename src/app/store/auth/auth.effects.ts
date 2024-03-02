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



   login$ = createEffect (()=> 
            this._actions$.pipe(
                ofType(loginRequest),
                delay(3000),
                tap(() => this._ngxLoader.start()),
                switchMap((action)=> {
                    const loginData = action.login;
                    console.log("Rewuseting",loginData);
                    return this._userAuthService.login(loginData).pipe(
                        map((response:any) => {
                            console.log(response,"response");
                            if(response && response.user){
                                // const {user} = response.user;
                            console.log("userData",response.user);
                            return loginSuccess({user:response.user});
                            }
                            else{
                                return loginFailure({error : new Error ('Invalid response')})
                            }
                        }),
                        catchError((error) => {
                            console.error("error",error);
                            return of(loginFailure({error}));
                        })
                    )
                }),
                tap(() => this._ngxLoader.stop())
            )
   )             

}