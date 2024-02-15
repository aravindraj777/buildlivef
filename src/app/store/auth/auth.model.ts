export interface AuthState{
    isLoggedIn:boolean;
    user:null | User;
    error:Error | null;

}

export interface User{

    id:string;
    name:string;
    email:string;
    phone:string;
    password:string;
    roles:string;
}

export interface LoginModel {
    name: string ;
    password : string
}

export interface LoginResponse{
    user:User;
    accessToken :string;
}