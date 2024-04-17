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
}
