import { createAction, props } from "@ngrx/store";
import { LoginModel, User, UpdateModel } from "./auth.model";


export const LOGIN_REQUEST = '[Auth] loginRequest';
export const LOGIN_SUCCESS = '[Auth] loginSuccess';
export const LOGIN_FAILURE = '[Auth] loginFailure';
export const LOGOUT_ACTION = '[Auth] logout'
export const SET_LOADING_SPINNER = '[shared state] set loading spinner';
export const SET_ERROR_MESSAGE = '[shared state] set error message';


export const loginRequest = createAction(LOGIN_REQUEST,props<{login:LoginModel}>());
export const loginSuccess = createAction(LOGIN_SUCCESS,props<{user:User}>());
export const loginFailure = createAction(LOGIN_FAILURE,props<{error:string}>());
export const logout = createAction(LOGOUT_ACTION)



export const UPDATE_REQUEST = '[User] updateRequest';
export const UPDATE_SUCCESS = '[User] updateuccess';
export const UPDATE_FAILURE = '[User] updateFailure';

export const updateRequest = createAction(UPDATE_REQUEST,props<{userId:string,update:UpdateModel}>());
export const updateSuccess = createAction(UPDATE_SUCCESS,props<{user:User}>());
export const updateFailure = createAction(UPDATE_FAILURE,props<{error:Error}>());

export const setLoadingSpinner = createAction(
    SET_LOADING_SPINNER,
    props<{ status: boolean }>()
  );
  
  export const setErrorMessage = createAction(
    SET_ERROR_MESSAGE,
    props<{ message: string }>()
  );