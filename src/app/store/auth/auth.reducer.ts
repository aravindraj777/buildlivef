import { createReducer, on } from "@ngrx/store";
import { initialState } from "./auth.state";
import { loginFailure, loginSuccess, logout, setErrorMessage, updateFailure, updateSuccess } from "./auth.action";

export const authReducer = createReducer(initialState,
    on(loginSuccess,(state,{user})=>{
        return {
            ...state,
            isLoggedIn:true,
            user:user,
            error:null
        }
    }),

    on(loginFailure,(state,{error})=>{
        return {
            ...state,
            isLoggedIn:false,
            user:null,
            error:"Login Failed Invalid credentials"
        }
    }),
    on(updateSuccess,(state,{user})=>{
        console.log(user,"userrrrrrrrrrr")
        return{
            
            ...state,
            isLoggedIn:true,
            user:user,
            error:null
         }
    }),
    on(updateFailure,(state,{error})=>{
        return{
            ...state,
            error:error.message
        }
    }),
    on(logout, (state) => {
        return {
          ...state,
          user: null,
        };
      }),
      
    )