import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectByCompany } from '../../../models/project.model';
import { ProjectService } from '../../../core/services/project.service';

@Component({
  selector: 'app-all-projects',
  templateUrl: './all-projects.component.html',
  styleUrl: './all-projects.component.scss'
})
export class AllProjectsComponent implements OnInit{

  companyId!:string;
  projectsOfCompany:ProjectByCompany[] = [];

  constructor(private _route:ActivatedRoute,
              private _projectService:ProjectService,
              private _router:Router
  ){}

  ngOnInit(): void {
    this._route.params.subscribe(params=>{
      this.companyId = params['id'];
    })

    this.getAllProjects();
  }


  getAllProjects():void{
    this._projectService.getAllProjectsOfCompany(this.companyId).subscribe({
      next:(response:ProjectByCompany[])=>{
        this.projectsOfCompany=response;
      },
      error:(error)=>{
        console.log(error);
        
      }
    })
  }

  enterProject(companyId:string, projectId:string):void{
      this._router.navigate(['projects/single-project',companyId,projectId])
  }




}
