import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Party, PartyDto, PartyResponse, PartyRetrieval } from '../../models/party.model';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class PartyService {
  
/**
 * Creates an instance of PartyService.
 * @param {HttpClient} _http
 * @memberof PartyService
 */
constructor(private _http:HttpClient) { }




/**
 *
 *
 * @param {string} companyId
 * @param {PartyDto} partyData
 * @return {*}  {Observable<PartyResponse>}
 * @memberof PartyService
 */
createParty(companyId:string,partyData:PartyDto ):Observable<PartyResponse>{
      const party = {
        ...partyData,
        company_id: companyId
      };
      return this._http.post<PartyResponse>('company/create-party',party);
  }



  
/**
 *
 *
 * @param {string} email
 * @return {*}  {Observable<any[]>}
 * @memberof PartyService
 */
getUsersByEmail(email: string): Observable<any[]> {
    return this._http.get<any[]>(`user/search?email=${email}`);
  }


  getAllPartyMembers(companyId:string):Observable<PartyRetrieval[]>{
    return this._http.get<PartyRetrieval[]>(`company/${companyId}/partyMembers`)
  }

}
