import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private _http:HttpClient) { }


  createTask(data:any):Observable<any>{
    return this._http.post<any>('project/tasks/create-task',data)
  }

  getTaskDetails(taskId:string):Observable<any>{
    return this._http.get(`project/tasks/get-details/${taskId}`)
  }

  updateTaskStatus(taskId:string, selectedStatus:string):Observable<any>{
    return this._http.put<any>(`project/tasks/update-status/${taskId}`,{taskStatus:selectedStatus});
  }
}
