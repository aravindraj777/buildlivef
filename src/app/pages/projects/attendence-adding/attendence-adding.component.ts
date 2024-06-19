import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectTeam } from '../../../models/project.model';
import { ProjectService } from '../../../core/services/project.service';
import { workForce } from '../../../models/company.mode';
import { CompanyService } from '../../../core/services/company.service';
import { ToastrService } from 'ngx-toastr';
import { AttendanceService } from '../../../core/services/attendance.service';

@Component({
  selector: 'app-attendence-adding',
  templateUrl: './attendence-adding.component.html',
  styleUrl: './attendence-adding.component.scss'
})
export class AttendenceAddingComponent implements OnInit{

  // projectId!: string;
  // companyId!:string;
  // selectedMember: string = '';

  // projectTeamMembers:ProjectTeam[]=[];
  // workforce:workForce[]=[];
  // selectedWorkforces: Set<string> = new Set<string>();

  // constructor(private route: ActivatedRoute,
  //             private _projectService:ProjectService,
  //             private _companyService:CompanyService
  // ) {}

  // ngOnInit(): void {
  //   this.route.queryParams.subscribe(params => {
  //     this.projectId = params['projectId'];
  //     this.companyId = params['companyId'];
  //   });

  //   this.fetchProjectTeamMembers();
  //   this.getAllWorkforceOfACompany();
  // }




  // fetchProjectTeamMembers():void{
  //   this._projectService.getMembersOfAProject(this.projectId).subscribe(
  //     (members:ProjectTeam[])=>{
  //       this.projectTeamMembers = members;
  //     }
  //   )
  // }

  // getAllWorkforceOfACompany():void{
  //   this._companyService.getAllWorkForce(this.companyId).subscribe({
  //     next:(response)=>{
  //       this.workforce = response;
  //     },
  //     error:(error)=>{
  //       console.log(error);
        
  //     }
  //   })
  // };


  // onAddWorkerClick(): void {
  //   // This method can be used to toggle visibility of dropdowns or any other actions on click
  // }


  // onTeamMemberSelect(event: Event): void {
  //   const selectElement = event.target as HTMLSelectElement;
  //   this.selectedMember = selectElement.value;
  // }


  // onWorkforceSelect(event: Event): void {
  //   const checkbox = event.target as HTMLInputElement;
  //   if (checkbox.checked) {
  //     this.selectedWorkforces.add(checkbox.value);
  //   } else {
  //     this.selectedWorkforces.delete(checkbox.value);
  //   }
  // }


  // submitAttendance(): void {
  //   const attendanceData = {
  //     projectId: this.projectId,
  //     teamMemberId: this.selectedMember,
  //     workforceIds: Array.from(this.selectedWorkforces),
  //     date: new Date().toISOString() // Or use a specific date if needed
  //   };

  //   // Call your service method to submit this data to the backend
  //   console.log(attendanceData);
  // }


  projectId!: string;
  companyId!: string;

  projectTeamMembers: ProjectTeam[] = [];
  workforce: workForce[] = [];
  selectedMember: string = '';
  selectedWorkforces: { [id: string]: number } = {}; // Use an object to store the quantities of selected workforces
  totalSalary: number = 0;

  constructor(
    private route: ActivatedRoute,
    private _projectService: ProjectService,
    private _companyService: CompanyService,
    private _toastrService: ToastrService,
    private _attendanceService :AttendanceService,
    private _router:Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.projectId = params['projectId'];
      this.companyId = params['companyId'];
    });

    this.fetchProjectTeamMembers();
    this.getAllWorkforceOfACompany();
  }

  fetchProjectTeamMembers(): void {
    this._projectService.getMembersOfAProject(this.projectId).subscribe(
      (members: ProjectTeam[]) => {
        this.projectTeamMembers = members;
      }
    );
  }

  getAllWorkforceOfACompany(): void {
    this._companyService.getAllWorkForce(this.companyId).subscribe({
      next: (response) => {
        this.workforce = response;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  onTeamMemberSelect(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedMember = selectElement.value;
  }

  onWorkforceSelect(event: Event, wfId: string): void {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectedWorkforces[wfId] = 1; // Initialize with quantity 1 when selected
    } else {
      delete this.selectedWorkforces[wfId];
    }
    this.calculateTotalSalary();
  }

  onQuantityChange(event: Event, wfId: string): void {
    const inputElement = event.target as HTMLInputElement;
    const quantity = parseInt(inputElement.value, 10);
    if (quantity > 0) {
      this.selectedWorkforces[wfId] = quantity;
    } else {
      delete this.selectedWorkforces[wfId];
    }
    this.calculateTotalSalary();
  }

  calculateTotalSalary(): void {
    this.totalSalary = Object.entries(this.selectedWorkforces).reduce((total, [wfId, quantity]) => {
      const wf = this.workforce.find(wf => wf.id === wfId);
      return total + (wf ? parseInt(wf.salaryPerShift, 10) * quantity : 0);
    }, 0);
  }

  submitAttendance(): void {
    const attendanceData = {
      projectId: this.projectId,
      companyId: this.companyId,
      teamMemberId: this.selectedMember,
      workforce: this.selectedWorkforces,
      totalSalary: this.totalSalary,
      date: new Date().toISOString() // Or use a specific date if needed
    };

    this._attendanceService.submitAttendance(attendanceData).subscribe({
      next:(res)=>{
        this._toastrService.success("Marked attendance");
        this._router.navigate(['projects/single-project', this.companyId, this.projectId]);
      },
    })
    console.log(attendanceData);
  }


  onAddWorkerClick(){

  }


  goBack(){
    this._router.navigate(['projects/single-project', this.companyId, this.projectId]);
  }


}
