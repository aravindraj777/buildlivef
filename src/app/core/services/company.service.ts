import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { WorkforceData, workForce } from '../../models/company.mode';
import { Material } from '../../models/material.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private _http:HttpClient) { }

   

  createCompany(companyData: any):Observable<any>{
    return this._http.post<any>('company/create',companyData);
  }

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

  addMaterialsToCompany(companyId: string, formData: FormData): Observable<any> {
    return this._http.post<any>(`company/${companyId}/add-material`, formData)
      .pipe(
        catchError(error => {
          return throwError(error);
        })
      );
  }

  fetchMaterialsOfACompany(companyId:string):Observable<Material[]>{
    return this._http.get<Material[]>(`company/${companyId}/get-company-materials`);
  }
}
