import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ProjectService } from '../../../core/services/project.service';


@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss'
})
export class UserDashboardComponent {

  data:any={}
  basicOptions: any;

  currentUserEmail!:string;
  currentUserId!:string;
  currentUserInfo: any;

  constructor(
    private _projectService:ProjectService,
    private _router:Router
){}


ngOnInit(): void {
 

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


  this._projectService.getAllProjectsOfUserCountMonthly(this.currentUserId, this.currentUserEmail)
      .subscribe(
        (responseData: any) => {
          // Process data and populate in the chart
          const projectCountByMonth = responseData; // Assuming responseData is in the correct format
          this.data = {
            labels: Object.keys(projectCountByMonth),
            datasets: [
              {
                label: 'Projects',
                backgroundColor: '#f87979',
                data: Object.values(projectCountByMonth)
              }
            ]
          };
          this.basicOptions = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          };
        },
        (error: any) => {
          console.error('Error fetching project count by month:', error);
        }
      );
  }
  
 
}

  // data = {
  //   labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  //   datasets: [
  //     {
  //       label: 'Projects',
  //       backgroundColor: '#f87979',
  //       data: [40, 20, 12, 39, 10, 80, 40]
  //     }
  //   ]
  // };


  // getAllProjectsOfUserCount():void{
  //   console.log(this.currentUserEmail+" "+this.currentUserId);
    
  //   this._projectService.getAllProjectsOfUserCountMonthly(this.currentUserEmail,this.currentUserId).subscribe({
      
  //   })


