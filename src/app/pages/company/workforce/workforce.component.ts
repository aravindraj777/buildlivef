import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CreateWorkforceComponent } from '../create-workforce/create-workforce.component';
import { WorkforceData, workForce } from '../../../models/company.mode';
import { CompanyService } from '../../../core/services/company.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-workforce',
  templateUrl: './workforce.component.html',
  styleUrl: './workforce.component.scss'
})
export class WorkforceComponent implements OnInit{
  

  companyId!:string;
  workforce:workForce[]=[];

  constructor(private _route:ActivatedRoute,
              private _dialog:MatDialog,
              private _companyService:CompanyService){}

  ngOnInit(): void {
    this._route.params.subscribe(params=>{
      this.companyId = params['id'];
      this.getAllWorkforceOfACompany();
    })

    console.log(this.companyId,"in wf");
   
    
  }

  openAddWorkForce(){
     const dialogRef = this._dialog.open(CreateWorkforceComponent,
      {width:'40%',data:{companyId:this.companyId}});

      dialogRef.componentInstance.workforceCreated.subscribe(() => {
        // Refresh workforce data after creation
        this.getAllWorkforceOfACompany();
      });
      
  }

  getAllWorkforceOfACompany():void{
    this._companyService.getAllWorkForce(this.companyId).subscribe({
      next:(response)=>{
        this.workforce = response;
      },
      error:(error)=>{
        console.log(error);
        
      }
    })
  };

  deleteWorkforce(worker:workForce){

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
       this.performDelete(worker);
      }
    });

  }

  private performDelete(worker:workForce):void{
    this._companyService.deleteWorkForce(worker.id).subscribe({
      next:() =>{
        this.getAllWorkforceOfACompany();
        Swal.fire('Deleted!', 'Workforce entry has been deleted.', 'success');
      },
      error: (error) => {
        console.error('Error deleting workforce entry:', error);
        Swal.fire('Error!', 'Failed to delete workforce entry.', 'error');
      }
    })

  }
  

}
