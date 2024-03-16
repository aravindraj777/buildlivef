import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PartyDto, PartyResponse } from '../../models/party.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PartyService {

  constructor(private _http:HttpClient) { }


  createParty(companyId:string,partyData:PartyDto ):Observable<PartyResponse>{
      const party = {
        ...partyData,
        company_id: companyId
      };
      return this._http.post<PartyResponse>('company/create-party',party);
  }

}
