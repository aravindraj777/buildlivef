import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProjectTeam } from '../../../models/project.model';
import { ProjectService } from '../../../core/services/project.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../../core/services/task.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss'
})
export class CreateTaskComponent implements OnInit{

  projectId!:string;
  partyEmail!:string;
  projectTeamMembers:ProjectTeam[]=[];
  taskForm!: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data:{projectId:string,userEmail:string},
                          private dialogRef: MatDialogRef<CreateTaskComponent>,
                          private _projectService:ProjectService,
                          private fb: FormBuilder,
                          private _taskService:TaskService,
                          private _toastr:ToastrService){


    this.projectId = data.projectId;
    this.partyEmail = data.userEmail
  }
  ngOnInit(): void {

    this.taskForm = this.fb.group({
      taskName: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      assignedTo: ['', Validators.required]
    });
    this.fetchProjectTeamMembers();
  }




  fetchProjectTeamMembers():void{
    this._projectService.getMembersOfAProject(this.projectId).subscribe(
      (members:ProjectTeam[])=>{
        this.projectTeamMembers = members;
      }
    )
  }

  onSubmit(){

    if(this.taskForm.valid){
      const taskData = {
        taskName: this.taskForm.get('taskName')?.value,
        startDate: this.taskForm.get('startDate')?.value,
        endDate: this.taskForm.get('endDate')?.value,
        assignedTo: this.taskForm.get('assignedTo')?.value,
        projectId: this.projectId,
        partyEmail: this.partyEmail
      };
        this._taskService.createTask(taskData).subscribe(
          (response)=>{
              this._toastr.success("created",response)
          },
          (error)=>{
            console.error(error);
            
          }
        )
    }

  }

  cancel(): void {
    this.dialogRef.close();
  }

}
