import { Component, OnInit } from '@angular/core';
import { PlanService } from '../../../core/services/plan.service';
import { PlanResponse } from '../../../models/plan.model';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../store/auth/auth.model';
import { getUserId } from '../../../store/auth/auth.selector';
import Swal from 'sweetalert2';

declare var Razorpay:any
@Component({
  selector: 'app-user-plans',
  templateUrl: './user-plans.component.html',
  styleUrl: './user-plans.component.scss'
})
export class UserPlansComponent implements OnInit{

  purchasedPlans: Set<string> = new Set();
  plans!:PlanResponse[];
  loggedUserId!:string | undefined;
  currentPlanId!:string;
  constructor(private planService:PlanService,
              private store:Store<AuthState>
  ){
    
  }
  ngOnInit(): void {
    this.getAllPlans();
     this.store.select(getUserId).subscribe(id=>{
      this.loggedUserId = id;
    })

    console.log(this.loggedUserId);

    this.fetchPurchasedPlans();
    
  }


  getAllPlans(){
    this.planService.getAllPlans().subscribe(({
      next: (res:PlanResponse[])=>{
        this.plans = res;
        this.fetchPurchasedPlans();
      }
    ,error: (error) => {
      console.log(error,"Error fetching plans");  
    }
    }))
  }


  getPlanClass(planType: string): string {
    switch (planType) {
      case 'BASIC':
        return 'basic-plan';
      case 'INTERMEDIATE':
        return 'intermediate-plan';
      case 'BUSINESS':
        return 'business-plan';
      default:
        return '';
    }
  }
  
  getIconClass(planType: string): string {
    switch (planType) {
      case 'BASIC':
        return 'text-indigo-600';
      case 'INTERMEDIATE':
        return 'text-red-500';
      case 'BUSINESS':
        return 'text-blue-500';
      default:
        return '';
    }
  }


  buySubscription(planId:string){
      this.currentPlanId = planId;
     this.planService.purchasePlan(planId,this.loggedUserId).subscribe((response)=>{
      this.openTransactionModal(response);
     }),
     (error:any)=>{
      console.log(error);
     }
    
  }

  openTransactionModal(response:any){
    var options = {
      order_id: response.order_id,
      key: response.key,
      amount: response.amount,
      currency : response.currency,
      name: 'BUILDLIVE360',
      description : 'Payment For Subscription',
      image: '/assets/logo.png',
      handler: (response:any)=>{
        if(response != null && response.razorpay_payment_id!= null){
          console.log("subscription success");
          this.processResponse(response);
        }
      },
      prefill : {
        name : 'BUILDLIVE ADMIN',
        email : 'buildlive360@gmail.com',
        contact: '6238648001'
      },
      note : {
        address : 'plan subscription'
      },
      theme : {
        color : '#060e3d'
      }
    };
    var razorpayObject = new Razorpay(options);
    razorpayObject.open();
  }

  processResponse(res:any){
    this.subscriptionSuccess(res.razorpay_payment_id)
  }

  subscriptionSuccess(transactionId:string){
    const data  = {
      planId: this.currentPlanId,
      userId: this.loggedUserId,
      transactionId:transactionId
    };
    this.planService.subscriptionSuccess(data).subscribe({
      next: (response)=>{
        Swal.fire({
          title:'Good Job',
          text:'Payment success',
          icon: 'success'
        })
      }
    })
  }

  fetchPurchasedPlans() {
    if (!this.plans || this.plans.length === 0) {
      console.warn('No plans available to fetch purchased status.');
      return;
    }

    this.plans.forEach(plan => {
      this.planService.checkPlanPurchased(this.loggedUserId, plan.id).subscribe(purchased => {
        if (purchased) {
          this.purchasedPlans.add(plan.id);
        }
      });
    });
  }

 
  
}
