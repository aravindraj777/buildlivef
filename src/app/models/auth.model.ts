export interface User{
    name:string;
    email:string;
    phone:string;
    password:string;
    role:string;
}

export interface RegisterResponse{
    status:string;
    message:string;
    
}

export interface AdminVerifiation{
    userId:string;
    otpValue:string;
}

