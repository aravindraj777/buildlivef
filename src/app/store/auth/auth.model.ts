export interface AuthState{
    isLoggedIn:boolean;
    user:null | User;
    error:string | null;
    

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

export interface UpdateModel {
    name:string,
    email:string,
    phone:string
}

export interface LoginResponse{
    user:User;
    accessToken :string;
}

export interface Company{
    id:string,
    companyName:string,
    cityName:string,
    address:string,
    phoneNumber:string,
    GSTNumber:string,
    PANNumber:string

}

