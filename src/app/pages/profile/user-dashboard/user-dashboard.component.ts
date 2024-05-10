import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ProjectService } from '../../../core/services/project.service';


@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss'
})
export class UserDashboardComponent {


  chartOptions: any = {
    title: {
      text: 'Monthly',
    },
    theme: 'light2',
    animationEnabled: true,
    axisX: {
      title: 'Month',
      interval: 1,
      labelAngle: -50, 
      valueFormatString: 'MMM', 
    },
    axisY: {
      title: 'Count',
      includeZero: true,
      valueFormatString: '#',
    },
    data: [
      {
        type: 'column', 
        color: '#01b8aa',
        dataPoints: [],
      },
    ],
  };
  
  
  




  data:any={}
  basicOptions: any;

  currentUserEmail!:string;
  currentUserId!:string;
  currentUserInfo: any;
  projectCounts: { [month: string]: number } = {}
  projectCountMonthly: number = 0;

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


  // this._projectService.getAllProjectsOfUserCountMonthly(this.currentUserId, this.currentUserEmail)
  //    .subscribe(()=>{
      
  //    })

  this.getProjectCountsByMonth()
  }



  getProjectCountsByMonth() {
    this._projectService.getAllProjectsOfUserCountMonthly(this.currentUserId, this.currentUserEmail)
      .subscribe(
        (response: { [month: string]: number }) => {
          // Assign the response directly to projectCounts
          this.projectCounts = response;
          console.log('Project counts by month:', this.projectCounts);
  
          const currentMonth = new Date().toISOString().slice(0, 7); 
          const currentMonthCount = this.projectCounts[currentMonth];
          if (currentMonthCount !== undefined) {
            this.projectCountMonthly = currentMonthCount;
          } else {
            this.projectCountMonthly = 0; 
            console.log("not found");
          }
  
          // Map project counts data to format required by CanvasJS
          const dataPoints = Object.entries(this.projectCounts).map(([month, count]) => ({
            label: month, // Use month as label
            y: count,     // Use count as y-value
          }));
  
          // Update chartOptions with the new dataPoints
          this.chartOptions.data[0].dataPoints = dataPoints;
        },
        (error) => {
          console.error('Error fetching project counts:', error);
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


