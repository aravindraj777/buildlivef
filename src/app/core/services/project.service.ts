import { Injectable } from '@angular/core';
import { project, projectCreateResponse } from '../../models/project.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private _http:HttpClient) { }


  
  createProject(projectData:project):Observable<projectCreateResponse>{
    return this._http.post<projectCreateResponse>('project/create',projectData)
  }
  
  getAllProjectsOfCompany(comapanyId:string):Observable<project[]>{
      return this._http.get<project[]>(`project/${comapanyId}/compan`)
  }


}
