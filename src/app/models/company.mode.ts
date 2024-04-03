
export interface Company{
    id: string;
    companyName: string;
    cityName: string;
    address: string;
    phoneNumber: string;
    GSTNumber: string;
    PANNumber: string;
    owner: string;
    companyIsNotPresent: boolean;
}

export interface WorkforceData {
    companyId:string;
    workerType:string;
    salaryPerShift:string;
}

export type workForce ={
    id:string
    companyId:string;
    workerType:string;
    salaryPerShift:string;
}