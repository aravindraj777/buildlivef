import { Injectable } from '@angular/core';
import { ProjectByCompany, ProjectTask, ProjectTeam, project, projectCreateResponse } from '../../models/project.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import Swal from 'sweetalert2';
import { MaterialEntries, ProjectMaterial } from '../../models/material.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private _http:HttpClient) { }


  
  createProject(projectData:project):Observable<projectCreateResponse>{
    return this._http.post<projectCreateResponse>('project/create',projectData)
  }
  
  getAllProjectsOfUser(comapanyId:string,userEmail:string,userId:string):Observable<ProjectByCompany[]>{
      return this._http.get<ProjectByCompany[]>(`project/${comapanyId}/company/${userEmail}/${userId}`)
  }

  getAllProjectsOfUserCountMonthly(userId:string,userEmail:string):Observable<any>{
    return this._http.get<any>(`project/countByMonth/${userId}/${userEmail}`)
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


receiveMaterial(requestData:any):Observable<any>{
  return this._http.post<any>('project/materials/received-materials',requestData)
}

usedMaterial(requestData:any):Observable<any>{
  return this._http.post<any>('project/materials/used-materials',requestData)
}

getProjectMaterials(projectId: string): Observable<ProjectMaterial[]> {
  return this._http.get<ProjectMaterial[]>(`project/${projectId}/materials/project-materials`);
}

getProjectUserRole(projectId:string,partyEmail:string):Observable<any>{
  return this._http.get<any>(`project/${projectId}/project-team/${partyEmail}`);
}

getMaterialEntries(materialId:string):Observable<MaterialEntries[]>{
  return this._http.get<MaterialEntries[]>(`project/materials/projectMaterial-entries`,{
    params: {
      materialId: materialId
    }
  })
}

getAllProjectTasks(projectId:string,partyEmail:string):Observable<any[]>{
  console.log(partyEmail,"heeloooo");
  
  const params = new HttpParams()
                  .set('projectId',projectId)
                  .set('partyEmail',partyEmail)
                  

  return this._http.get<any[]>('project/tasks/getAll-projectTasks',{params})                
}



}
