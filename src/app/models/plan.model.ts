export interface Plans {
    name:string;
    planType: 'BUSINESS' | 'INTERMEDIATE' | 'BASIC'
    price:number;
    creatorId: string | undefined
    isActive:boolean
}

export interface PlanResponse{
    id:string;
    planName:string;
    planPrice:number;
    planType: 'BUSINESS' | 'INTERMEDIATE' | 'BASIC';
    planCreatorId:string;
    isActive:boolean;
}

