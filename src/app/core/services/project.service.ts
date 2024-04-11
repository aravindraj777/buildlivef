import { Injectable } from '@angular/core';
import { ProjectByCompany, ProjectTeam, project, projectCreateResponse } from '../../models/project.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private _http:HttpClient) { }


  
  createProject(projectData:project):Observable<projectCreateResponse>{
    return this._http.post<projectCreateResponse>('project/create',projectData)
  }
  
  getAllProjectsOfCompany(comapanyId:string):Observable<ProjectByCompany[]>{
      return this._http.get<ProjectByCompany[]>(`project/${comapanyId}/company`)
  }

  getMembersOfAProject(projectId:string):Observable<ProjectTeam[]>{
      return this._http.get<ProjectTeam[]>(`project/${projectId}/team-members`)
  }

  updateProjectRole(projectId: string,memberId:string,newRole:string):Observable<any>{
    return this._http.put<any>(`project/${projectId}/team-members/${memberId}/update-role`,{role:newRole});
  }

  removeMemberFromProject(projectId:string,memberId:string):Observable<any>{
    return this._http.delete<any>(`project/${projectId}/team-members/${memberId}/remove`);

  }

  showSuccessMessage(message:string):void{
    Swal.fire('Success',message,'success')
  }

  showErrorMessage(message: string): void {
    Swal.fire('Error', message, 'error');
}


}
