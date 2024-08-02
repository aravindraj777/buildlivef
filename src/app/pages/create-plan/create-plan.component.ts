import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { AuthState, User } from '../../store/auth/auth.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogRef } from '@angular/cdk/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Plans } from '../../models/plan.model';
import { PlanService } from '../../core/services/plan.service';

@Component({
  selector: 'app-create-plan',
  templateUrl: './create-plan.component.html',
  styleUrl: './create-plan.component.scss'
})
export class CreatePlanComponent implements OnInit{

  userId!:string | undefined;
  planForm!:FormGroup;
  @Output() planCreated: EventEmitter<void> = new EventEmitter<void>();

  constructor(@Inject(MAT_DIALOG_DATA) public data:string | undefined,
               private dialogRef:DialogRef,
               private fb:FormBuilder,
               private store:Store<AuthState>,
               private router:Router,
               private toastr:ToastrService,
              private planService:PlanService){
    
             

  }

  

  // ngOnInit(): void {
  //   this.userId = this.data;
  //   console.log(this.userId+"da");
    
  //   this.planForm = this.fb.group({
  //     name: ['', Validators.required],
  //     type: ['', Validators.required],
  //     price: ['', [Validators.required, Validators.min(0),Validators.pattern("^[0-9]*$")]],
  //   });
  // }

  //   onSubmit():void{
  //     if (this.planForm.valid) {
  //       console.log('Form submitted!', this.planForm.value);
  //       const planData:Plans = {
  //         name:this.planForm.value.name,
  //         planType:this.planForm.value.type,
  //         price:this.planForm.value.price,
  //         creatorId:this.userId,
  //         isActive:true
  //       }

  //       this.planService.createPlan(planData).subscribe(
  //         {next : (response) => {
  //           this.dialogRef.close();
  //           this.toastr.success("New plan created")
  //           this.planCreated.emit();
  //         }}
  //       )
  //     } else {
  //       this.toastr.error("Error while creating plan")
  //     }
  //   }
  

  //   onCancel(): void {
  //     this.dialogRef.close();
  //   }


  ngOnInit(): void {
    this.userId = this.data;
    console.log(this.userId+"uu");
    
    this.planForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
    });

    this.planForm.get('type')?.valueChanges.subscribe(type => {
      const priceControl = this.planForm.get('price');
      if (type === 'BASIC') {
        priceControl?.setValidators([Validators.required, Validators.min(0), Validators.max(0)]);
        priceControl?.setValue(0);
        priceControl?.disable();
      } else if (type === 'INTERMEDIATE') {
        priceControl?.setValidators([Validators.required, Validators.min(2000), Validators.max(4000)]);
        priceControl?.enable();
        priceControl?.reset();
      } else if (type === 'BUSINESS') {
        priceControl?.setValidators([Validators.required, Validators.min(4000), Validators.max(8000)]);
        priceControl?.enable();
        priceControl?.reset();
      }
      priceControl?.updateValueAndValidity();
    });
  }

  onSubmit(): void {
    if (this.planForm.valid) {
      const planData: Plans = {
        name: this.planForm.value.name,
        planType: this.planForm.value.type,
        price: this.planForm.value.price,
        planCreatorId: this.userId,
        isActive: true
      };

      console.log("Plan Data:", planData);
      this.planService.createPlan(planData).subscribe({
        next: (response) => {
          this.dialogRef.close();
          this.toastr.success("New plan created");
          this.planCreated.emit();
        },
        error: () => {
          this.toastr.error("Error while creating plan");
        }
      });
    } else {
      this.toastr.error("Error while creating plan");
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  get priceErrorMessage() {
    const priceControl = this.planForm.get('price');
    if (priceControl?.hasError('min')) {
      return `Price must be at least ${priceControl.errors?.['min'].min}`;
    } else if (priceControl?.hasError('max')) {
      return `Price must be at most ${priceControl.errors?.['max'].max}`;
    } else if (priceControl?.hasError('pattern')) {
      return 'Price must be a valid number';
    } else if (priceControl?.hasError('required')) {
      return 'Price is required';
    }
    return '';
  }


}
