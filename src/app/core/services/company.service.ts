import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WorkforceData, workForce } from '../../models/company.mode';

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

  createWorkForce(data:WorkforceData):Observable<WorkforceData>{
   return this._http.post<WorkforceData>('company/workforce/create',data);
  }

  getAllWorkForce(comapanyId:string):Observable<workForce[]>{
    return this._http.get<workForce[]>(`company/${comapanyId}/get-workforce`);
  }

  deleteWorkForce(workerId:string):Observable<void>{
    return this._http.delete<void>(`company/${workerId}/delete`);
  }
}
