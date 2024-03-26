import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../../models/company.mode';

@Injectable({
  providedIn: 'root'
})
export class OtherCompanyService {

  constructor(private _http: HttpClient) { }


  getOtherCompaniesOfUser(userEmail: string): Observable<Company[]> {
    const params = new HttpParams().set('userEmail', userEmail);
    return this._http.get<Company[]>('company/find-other-companies', { params: params });
  }
}
