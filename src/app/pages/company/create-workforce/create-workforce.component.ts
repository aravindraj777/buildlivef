import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { WorkforceData } from '../../../models/company.mode';
import { CompanyService } from '../../../core/services/company.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-workforce',
  templateUrl: './create-workforce.component.html',
  styleUrl: './create-workforce.component.scss'
})
export class CreateWorkforceComponent implements OnInit {

  workforceForm!:FormGroup
  @Output() workforceCreated: EventEmitter<void> = new EventEmitter<void>();

  constructor(@Inject(MAT_DIALOG_DATA) public data:{companyId:string},

             private  _dialogRef:MatDialogRef<CreateWorkforceComponent>,
             private _formBuilder:FormBuilder,
             private _companyService:CompanyService,
             private _toastr:ToastrService){}


  ngOnInit(): void {
    

    this.workforceForm = this._formBuilder.group({
      partyType:this._formBuilder.control('',Validators.required),
      salaryPerShift:this._formBuilder.control('',Validators.required)
    });
    
  }

  createWorkForce():void{
    if(this.workforceForm.valid){
      const formData:WorkforceData = {
        companyId:this.data.companyId,
        workerType:this.workforceForm.value.partyType,
        salaryPerShift:this.workforceForm.value.salaryPerShift,
     };
     this._companyService.createWorkForce(formData).subscribe(
      {next: (response)=>{
        this._dialogRef.close();
        this._toastr.success("WorkForce added")
        this.workforceCreated.emit();
      },
      error: (error)=>{
        this._toastr.error("error",error)
      }
    })}
  };


 

  

}
