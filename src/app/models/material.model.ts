export interface Material{
    id:string;
    materialName:string;
    unit:string;
    gst:number;
}


export interface ProjectMaterial {
    id: string;
    partyMember: string;
    entryPerson: string;
    materialName: string;
    quantity: number;
    currentStock: number;
    receivedStock: number;
    usedStock: number;
    usedDescription:string
    localDateTime: string; 
    project: string; 
}

export interface MaterialEntries {
    id:string;
    entryPerson:string;
    quantity:string;
    entryTime:string;
    projectMaterial:ProjectMaterial;
    materialType:MateralType;
}

export enum MateralType {
    RECEIVED = 'RECEIVED',
    USED = 'USED',
    PURCHASED = 'PURCHASED'
}