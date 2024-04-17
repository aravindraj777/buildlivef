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

  currentUserInfo: any;
  currentUserEmail!:string;
  currentUserId!:string;

  constructor(private _route:ActivatedRoute,
              private _projectService:ProjectService,
              private _router:Router
  ){}

  ngOnInit(): void {
    this._route.params.subscribe(params=>{
      this.companyId = params['id'];
    })

    const currentUserInfoString = sessionStorage.getItem('user');

   

    if (currentUserInfoString !== null) {
      // Parse the JSON string to get the user information object
      this.currentUserInfo = JSON.parse(currentUserInfoString);

      // Get the email from the user information
      this.currentUserEmail = this.currentUserInfo.email;
      this.currentUserId = this.currentUserInfo.id
      console.log(this.currentUserEmail,"hghghghghg");
    } else {
      console.error('Current user information not found in session storage.');
    }
    this.getAllProjects();
   
  }


  getAllProjects():void{
    console.log(this.currentUserEmail+" "+this.currentUserId);
    
    this._projectService.getAllProjectsOfUser(this.companyId,this.currentUserEmail,this.currentUserId).subscribe({
      
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
