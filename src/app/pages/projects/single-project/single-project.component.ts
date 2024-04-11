import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { PartyService } from '../../../core/services/party.service';
import { ActivatedRoute } from '@angular/router';
import { Party, PartyRetrieval, partyMember } from '../../../models/party.model';
import { ToastrService } from 'ngx-toastr';
import { ProjectTeam } from '../../../models/project.model';
import { ProjectService } from '../../../core/services/project.service';
import { MatDialog } from '@angular/material/dialog';
import { EditProjectroleComponent } from '../edit-projectrole/edit-projectrole.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-single-project',
  templateUrl: './single-project.component.html',
  styleUrl: './single-project.component.scss',
  
})

export class SingleProjectComponent implements OnInit {


  projectTeamMembers:ProjectTeam[]=[];
  showEmployeeList: boolean = false;
  showAccessModal: boolean = false;
  companyId!:string;
  employees:partyMember[]=[];
  projectId!:string;
  filteredProjectTeamMembers: ProjectTeam[] = []; 

  selectedEmployee: partyMember | null = null;
  showRoleSelectionModal: boolean = false;
  selectedProjectRole: string = ''; 
  searchQuery: string = '';

  constructor(private _partyService:PartyService,
              private _route:ActivatedRoute,
              private _toastr:ToastrService,
              private _projectService:ProjectService,
              private dialog:MatDialog
  ){}
  ngOnInit(): void {
    this._route.params.subscribe(params=>{
      this.companyId = params['companyId'];
      this.projectId = params['projectId'];
    })
    console.log(this.companyId,"idddd");
    this.fetchProjectTeamMembers();
    
  }

  toggleEmployeeList(): void {
    this.showEmployeeList = !this.showEmployeeList;
  }

  openAccessModal(): void {
    this.showAccessModal = true;
    this._partyService.getAllPartyMembers(this.companyId).subscribe(
      (response: PartyRetrieval[]) => {
        this.employees = []; // Clear the employees array before adding new party members
        response.forEach((response: PartyRetrieval) => {
          if (response && response.partyMembers) {
            this.employees = this.employees.concat(response.partyMembers);
          } else {
            console.error('Invalid response structure');
          }
        });
        console.log(this.employees);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  


closeAccessModal() {
        this.showAccessModal = false;
}


addEmployeeToProject(employee:partyMember){
  this.selectedEmployee = employee;
  console.log(this.selectedEmployee);
  
  this.showRoleSelectionModal = true;

}


saveEmployeeToProject(): void {
  if (this.selectedEmployee && this.selectedProjectRole) {
    this._partyService.saveEmployeeToProject(this.projectId, this.selectedEmployee, this.selectedProjectRole).subscribe(
      (response) => {
        console.log('Employee saved to project team:', response);
        this._toastr.success("Employee " + this.selectedEmployee?.name + " added to project");
        this.fetchProjectTeamMembers();
        
        // Remove the selected employee from the employees array
        this.employees = this.employees.filter(emp => emp.id !== this.selectedEmployee?.id);

        // Reset selectedEmployee and selectedProjectRole
        this.selectedEmployee = null;
        this.selectedProjectRole = '';
        
        // Close the modal
        this.showRoleSelectionModal = false;
      },
      (error) => {
        this._toastr.error("Already Exists in project");
        console.error('Error saving employee to project team:', error);

      }
    );
  } else {
    console.error('Please select an employee and project role');
  }
}


cancelAddEmployee(): void {
  this.selectedEmployee = null;
  this.selectedProjectRole = '';
  this.showRoleSelectionModal = false;
}


fetchProjectTeamMembers():void{
  this._projectService.getMembersOfAProject(this.projectId).subscribe(
    (members:ProjectTeam[])=>{
      this.projectTeamMembers = members;
      this.filteredProjectTeamMembers = [...members];
    }
  )
}


openEditModal(member:ProjectTeam){
   const dialogRef = this.dialog.open(EditProjectroleComponent,{
      width:'40%',
      data:{
      member:member,
      projectId:this.projectId
    }})

    dialogRef.componentInstance.roleUpdated.subscribe((updatedRole:string)=>{
      const index = this.projectTeamMembers.findIndex(m=> m.id === member.id);
      if(index != -1){
        this.projectTeamMembers[index].projectRole = updatedRole;
      }
    });
}


removeMember(member: ProjectTeam): void {
  Swal.fire({
      title: 'Are you sure?',
      text: 'You want to remove this member from the project team.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!'
  }).then((result) => {
      if (result.isConfirmed) {
          this.confirmRemoval(member);
      }
  });
}

confirmRemoval(member:ProjectTeam){
  console.log(member.id,this.projectId);
  
  this._projectService.removeMemberFromProject(this.projectId,member.id).subscribe(
    ()=>{
      this._projectService.showSuccessMessage("Member removed successfully");
      this.projectTeamMembers = this.projectTeamMembers.filter(item=>item.id !== member.id);
      this.filteredProjectTeamMembers = this.filteredProjectTeamMembers.filter(item => item.id !== member.id);
    },
    (error)=>{
      this._projectService.showErrorMessage("Failed to remove member");
      console.log(error);
      
    }
  )
}

filterProjectTeamMembers(): void {
  if (!this.searchQuery.trim()) {
    // If search query is empty, display all project team members
    this.filteredProjectTeamMembers = [...this.projectTeamMembers];
  } else {
    // Filter project team members based on search query
    this.filteredProjectTeamMembers = this.projectTeamMembers.filter((member) =>
      member.name.toLowerCase().includes(this.searchQuery.trim().toLowerCase())
    );
  }
}







}


 

