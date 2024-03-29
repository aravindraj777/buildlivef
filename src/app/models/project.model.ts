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