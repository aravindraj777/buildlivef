import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../../core/services/task.service';
import { Store } from '@ngrx/store';
import { AuthState, User} from '../../../store/auth/auth.model';
import { Observable } from 'rxjs';
import { selectLoggedInUser } from '../../../store/auth/auth.selector';
import { MatDialog } from '@angular/material/dialog';
import { ChangeStatusComponent } from '../change-status/change-status.component';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss'
})
export class TaskDetailsComponent implements OnInit{

  taskId!:string;
  taskDetails!:any;
  loggedInUser$!:Observable< User| null>

  constructor(private route:ActivatedRoute,
              private taskService:TaskService,
              private store:Store<AuthState>,
              private dialog:MatDialog
  ){}


  ngOnInit(): void {
   this.route.queryParams.subscribe(params => {
    this.taskId = params['taskId'];
    this.loggedInUser$ = this.store.select(selectLoggedInUser)
   })

   console.log(this.taskId,"taskId");
   this.getTaskDetails();
   
  }

  getTaskDetails():void{
      this.taskService.getTaskDetails(this.taskId).subscribe(
        {next: (res)=>{
          this.taskDetails = res
        ,console.log(this.taskDetails);
        
        },
      error: (err)=>{
            console.log(err);
            
      }},
        
      )
  }


  openChangeStatusModal(){

    const dialogRef = this.dialog.open(ChangeStatusComponent,{

      data: {
        taskId:this.taskId,
        currentStatus:this.taskDetails?.taskStatus
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.taskDetails.taskStatus = result;
      }
    })
  }
  

  
}
