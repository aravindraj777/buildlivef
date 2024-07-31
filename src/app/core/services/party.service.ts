import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Party, PartyDto, PartyResponse, PartyRetrieval, partyMember } from '../../models/party.model';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class PartyService {


  constructor(private _http: HttpClient) { }

  createParty(companyId: string, partyData: PartyDto): Observable<PartyResponse> {
    const party = {
      ...partyData,
      company_id: companyId
    };
    return this._http.post<PartyResponse>('company/create-party', party);
  }


  getUsersByEmail(email: string): Observable<any[]> {
    return this._http.get<any[]>(`user/search?email=${email}`);
  }


  getAllPartyMembers(companyId: string): Observable<PartyRetrieval[]> {
    return this._http.get<PartyRetrieval[]>(`company/${companyId}/partyMembers`)
  }

  saveEmployeeToProject(projectId: string, employee: partyMember, projectRole: string): Observable<any> {
    const data = { projectId, employee, projectRole };
    return this._http.post<any>('project/addToProject', data)
      .pipe(
        catchError((error) => {
          throw error;
        })
      );
  }

}
