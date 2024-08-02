import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlanPaymentSuccess, PlanResponse, Plans } from '../../models/plan.model';

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

  purchasePlan(planId: string, userId?: string) {
    let params = new HttpParams().set('planId', planId);
  
    if (userId) {
      params = params.set('userId', userId);
    }
  
    return this.http.post('user/purchase-plan', {}, { params });

  }

  subscriptionSuccess(paymentData:PlanPaymentSuccess):Observable<any>{
    return this.http.post<any>('user/subscription-success',paymentData)
  }

  checkPlanPurchased(userId: string | undefined, planId: string): Observable<boolean> {
    return this.http.get<boolean>(`user/${userId}/plans/${planId}/purchased`);
  }

  
}
