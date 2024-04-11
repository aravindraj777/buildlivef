import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProjectTeam } from '../../../models/project.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../../../core/services/project.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-edit-projectrole',
  templateUrl: './edit-projectrole.component.html',
  styleUrl: './edit-projectrole.component.scss'
})
export class EditProjectroleComponent implements OnInit{

  member!:ProjectTeam;
  projectId!:string;
  editForm!: FormGroup;
  @Output() roleUpdated:EventEmitter<string> = new EventEmitter<string>();

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
              private ref:MatDialogRef<EditProjectroleComponent>,
              private _projectService:ProjectService,
              ){

                this.member = data.member;
                this.projectId = data.projectId;
              }


  ngOnInit(): void {
    
    this.editForm = new FormGroup({
      projectRole: new FormControl(this.member.projectRole, Validators.required)
    });
    
  }            

  onSubmit():void{
    if(this.editForm.valid){
      const newRole = this.editForm.value.projectRole;
      this._projectService.updateProjectRole(this.projectId,this.member.id,newRole).subscribe(
        (response)=>{
          this.ref.close(true);
          this.showSuccessMessage("Role updated Successfully")
         this.roleUpdated.emit(newRole);
        },
        (error)=>{
          this.showErrorMessage('Error updating role')
        }
      )
    }
  }


  onCancel(){
    this.ref.close(false);
  }


  showSuccessMessage(message: string): void {
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: message
    });
  }

  showErrorMessage(message:string):void{
    Swal.fire({
      icon:'error',
      title:'Error',
      text:message
    })
  }
}
