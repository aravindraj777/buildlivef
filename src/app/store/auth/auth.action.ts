import { createAction, props } from "@ngrx/store";
import { LoginModel, User } from "./auth.model";


export const LOGIN_REQUEST = '[Auth] loginRequest';
export const LOGIN_SUCCESS = '[Auth] loginSuccess';
export const LOGIN_FAILURE = '[Auth] loginFailure';

export const loginRequest = createAction(LOGIN_REQUEST,props<{login:LoginModel}>());
export const loginSuccess = createAction(LOGIN_SUCCESS,props<{user:User}>());
export const loginFailure = createAction(LOGIN_FAILURE,props<{error:Error}>());