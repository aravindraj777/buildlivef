
export interface Party{
    id:string;
    name:string;
    party_email:string;
    party_phone:string;
    partyType: 'VENDOR' | 'CLIENT',
    companyRole: 'PROJECT_MANAGER' | 'SITE_ENGINEER'

}

export interface PartyDto {

    party_name: string,
    party_phone: string,
    party_email : string,
    partyType: string,
    companyRole:string,
}

export type PartyResponse ={
    message:string;
    status: number;
}

export interface PartyRetrieval{
    partyMembers: partyMember[]
}

export interface partyMember {
    id: string;
    name: string;
    party_email: string;
    party_phone: string;
    partyType: string;
    companyRole:string;
}