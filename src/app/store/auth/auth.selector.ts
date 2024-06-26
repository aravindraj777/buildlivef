import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./auth.model";


export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectLoggedInUser = createSelector(
    selectAuthState,(authState:AuthState) => authState.user
    
)

export const getUserId = createSelector(selectAuthState,(state)=>{
    return state.user?.id;
})

export const getEmail = createSelector(selectAuthState,(state)=>{
    return state.user?.email;
})

export const getErrorMessage = createSelector(selectAuthState,(state)=>{
    return state?.error;
})
