import { HttpStatusCode } from "@angular/common/http";

export interface PlaceSearchResult {

    address: string;
    location?: google.maps.LatLng;
    imageUrl?: string;
    iconUrl?: string;
    name?: string;
}

export interface project {
    
    projectName:string;
    address:string;
    city: string;
    start_date: Date;
    end_date: Date;
    project_value: number;
    creator:string | undefined;
    company:string;
    
}

export interface projectCreateResponse {
    status:number;
    message:string;
}

export interface ProjectByCompany{
    id:string;
    projectName:string;
    address:string;
    city: string;
    start_date: Date;
    end_date: Date;
    status:string;
    project_value: number;
    creator:string | undefined;
    company:string;
}

export interface ProjectTeam {
    id:string ;
    name:string|undefined | null;
    party_email:string;
    party_phone:string;
    companyRole:string;
    projectRole:string;
}

export interface ProjectTask {
    id:string;
    taskName:string;
    startDate:Date;
    endDate:Date;
    project:project;
    taskAssigment:TaskAssignment;
}

export interface TaskAssignment {
    id:string;
    assignedTo:ProjectTeam;
    assignedBy:ProjectTeam;
    task:ProjectTask;
    assignedDate:Date
}