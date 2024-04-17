import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialEntries } from '../../../models/material.model';
import { ProjectService } from '../../../core/services/project.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-material-entry-details',
  templateUrl: './material-entry-details.component.html',
  styleUrl: './material-entry-details.component.scss'
})
export class MaterialEntryDetailsComponent implements OnInit{

  materialId!:string;
  materialEntries:MaterialEntries[]=[];
  currentPage = 1;
  pageSize = 10;
  isLoading = false;

  constructor(private _route:ActivatedRoute,
              private _projectService:ProjectService,
              private _router:Router,
              private _location:Location
  ){}
  ngOnInit(): void {
   this._route.queryParams.subscribe(params => {
    this.materialId = params['materialId'];
   });

   console.log(this.materialId);
   this.fetchProjectMaterialEntry();
  }

  fetchProjectMaterialEntry():void{
    this.isLoading = true;
    this._projectService.getMaterialEntries(this.materialId).subscribe(
      response=>{
        this.materialEntries = response
      },
      error=>{
        console.log(error);
        
      }
    )
  }

  goBack(){
   this._location.back();
  }

}
