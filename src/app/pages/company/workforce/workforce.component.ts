import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CreateWorkforceComponent } from '../create-workforce/create-workforce.component';

@Component({
  selector: 'app-workforce',
  templateUrl: './workforce.component.html',
  styleUrl: './workforce.component.scss'
})
export class WorkforceComponent implements OnInit{
  

  companyId!:string;

  constructor(private _route:ActivatedRoute,
              private _dialog:MatDialog){}

  ngOnInit(): void {
    this._route.params.subscribe(params=>{
      this.companyId = params['id'];
    })

    console.log(this.companyId,"in wf");
    
  }

  openAddWorkForce(){
      this._dialog.open(CreateWorkforceComponent,{width:'40%',data:{companyId:this.companyId}})
  }

  getAllWorkforceOfACompany(){
      
  }

  

}
