import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlanResponse, Plans } from '../../models/plan.model';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  constructor(private http:HttpClient) { }


  createPlan(planValue:Plans):Observable<Plans>{
    return this.http.post<Plans>('admin/plans/create-plan',planValue);
  }

  getAllPlans():Observable<PlanResponse[]>{
    return this.http.get<PlanResponse[]>('admin/plans/getAll-plans');
  }

  deactivatePlan(id: string): Observable<void> {
    return this.http.put<void>(`admin/plans/${id}/deactivate`, {});
  }

  activatePlan(id: string): Observable<void> {
    return this.http.put<void>(`admin/plans/${id}/activate`, {});
  }
}
