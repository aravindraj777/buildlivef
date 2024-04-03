import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WorkforceData } from '../../models/company.mode';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private _http:HttpClient) { }

   

  createCompany(companyData: any):Observable<any>{
    console.log(companyData,"compDataa");
    
    return this._http.post<any>('company/create',companyData);
  }

  // getAllCompaniesOfUser(userId:string):Observable<any[]>{
  //   return this._http.get<any[]>(`company/findall ${userId}`)
  // }

  // getAllCompaniesOfUser(userId: string): Observable<any[]> {
  //   // Append userId as a query parameter to the URL
  //   const url = `company/findall?userId=${userId}`;
  //   return this._http.get<any[]>(url);
  // }

  getAllCompaniesOfUser(userId: string): Observable<any[]> {
    const requestBody = { userId: userId };
    return this._http.post<any[]>('company/findall', requestBody);
  }

  createWorkForce(data:WorkforceData):Observable<any>{
   return this._http.post<any>('company/workforce/create',data);
  }
}
