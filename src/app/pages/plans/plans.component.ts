import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreatePlanComponent } from '../create-plan/create-plan.component';
import { Observable } from 'rxjs';
import { AuthState, User } from '../../store/auth/auth.model';
import { Store } from '@ngrx/store';
import { getUserId, selectLoggedInUser } from '../../store/auth/auth.selector';
import { PlanResponse } from '../../models/plan.model';
import { PlanService } from '../../core/services/plan.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrl: './plans.component.scss'
})
export class PlansComponent implements OnInit{

  loggedInUser!:Observable<User | null>;
  userId!:string | undefined;
  plans!:PlanResponse[];

  constructor(private dialog:MatDialog,
            private store:Store<AuthState>,
            private planService:PlanService,
            private snackBar:MatSnackBar
  ){


  }
  ngOnInit(): void {
     this.store.select(selectLoggedInUser).subscribe((user)=>{
      this.userId = user?.id
    });

    this.getAllPlans();
  }

  openCreatePlan(){
    const dialogRef = this.dialog.open(CreatePlanComponent,
      {width:'40%',data: this.userId}
    );

    dialogRef.componentInstance.planCreated.subscribe(()=>{
      this.getAllPlans();
    })
  }

  getAllPlans(){
    this.planService.getAllPlans().subscribe(({
      next: (res:PlanResponse[])=>{
        this.plans = res;
      }
    ,error: (error) => {
      console.log(error,"Error fetching plans");  
    }
    }))
  }


  togglePlanActivation(plan: PlanResponse): void {
    if (plan.isActive) {
      this.planService.deactivatePlan(plan.id).subscribe({
        next: () => {
          this.snackBar.open('Plan deactivated successfully', 'Close', {
            duration: 3000,
          });
          this.updatePlanStatus(plan.id, false);
        },
        error: (error) => {
          console.error("Error deactivating plan", error);
          this.snackBar.open('Failed to deactivate plan', 'Close', {
            duration: 3000,
          });
        }
      });
    } else {
      this.planService.activatePlan(plan.id).subscribe({
        next: () => {
          this.snackBar.open('Plan activated successfully', 'Close', {
            duration: 3000,
          });
          this.updatePlanStatus(plan.id, true);
        },
        error: (error) => {
          console.error("Error activating plan", error);
          this.snackBar.open('Failed to activate plan', 'Close', {
            duration: 3000,
          });
        }
      });
    }
  }

  private updatePlanStatus(id: string, isActive: boolean): void {
    const plan = this.plans.find(p => p.id === id);
    if (plan) {
      plan.isActive = isActive;
    }
  }
}
