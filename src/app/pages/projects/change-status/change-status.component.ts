import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskService } from '../../../core/services/task.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-status',
  templateUrl: './change-status.component.html',
  styleUrl: './change-status.component.scss'
})
export class ChangeStatusComponent {

  selectedStatus!:string;
  @Output() statusUpdated:EventEmitter<string> = new EventEmitter<string>();


  constructor(
    private dialogRef:MatDialogRef<ChangeStatusComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private taskService:TaskService
  ){

    this.selectedStatus = data.currentStatus;
  }


  updateStatus(): void {

    const newStatus = this.selectedStatus;
    console.log(newStatus,"news");
    
    this.taskService.updateTaskStatus(this.data.taskId, newStatus).subscribe(
      response => {
        this.dialogRef.close(true);
        this.showSuccessMessage("Status changed Successfully")
        this.statusUpdated.emit(newStatus);
      },
      error => {
        this.showErrorMessage('Error updating staus')
      }
    );
  }


  closeModal(): void {
    this.dialogRef.close();
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
