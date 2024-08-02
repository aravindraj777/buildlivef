export interface Plans {
    name:string;
    planType: 'BUSINESS' | 'INTERMEDIATE' | 'BASIC'
    price:number;
    planCreatorId: string | undefined
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


export interface PlanPaymentSuccess {
      planId: string,
      userId: string | undefined,
      transactionId:string
}
