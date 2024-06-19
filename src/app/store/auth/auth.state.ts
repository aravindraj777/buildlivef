import { AuthState } from "./auth.model";

export const initialState : AuthState = {

    isLoggedIn :false,
    user : null ,
    error : ''
}